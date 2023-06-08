import {
  configurationService,
  language,
  utilsService,
  wizardService,
} from '../../../index.js';
import Service from '../Service.js';
import { IFactoryConfig } from '../../../domain/configuration/interfaces/IFactoryConfig.js';
import {
  Network,
  SetConfigurationRequest,
  UpgradeFactoryImplementationRequest,
} from '@hashgraph-dev/stablecoin-npm-sdk';
import ConfigurationFactoryProxyService from '../factoryProxy/ConfigurationFactoryProxyService.js';
import ImplementationFactoryProxyService from '../factoryProxy/ImplementationFactoryProxyService.js';
import { ProxyConfigurationViewModel } from '@hashgraph-dev/stablecoin-npm-sdk';
import { ChangeFactoryProxyOwnerRequest } from '@hashgraph-dev/stablecoin-npm-sdk';
import OwnerFactoryProxyService from '../factoryProxy/OwnerFactoryProxyService.js';
import { ZERO_ADDRESS } from 'core/Constants.js';
const colors = require('colors');

export default class SetFactoryService extends Service {
  
  constructor() {
    super('Set Factory Configuration');
  }

  /**
   * Function to set the factory configuration
   */
  public async configureFactories(): Promise<IFactoryConfig[]> {
    const factories: IFactoryConfig[] = [];
    let factory_testnet = await utilsService.defaultSingleAsk(
      language.getText('configuration.askFactoryAddress') + ' | TESTNET',
      ZERO_ADDRESS,
    );
    while (!/\d\.\d\.\d/.test(factory_testnet)) {
      console.log(language.getText('validations.wrongFormatAddress'));
      factory_testnet = await utilsService.defaultSingleAsk(
        language.getText('configuration.askFactoryAddress') + ' | TESTNET',
        ZERO_ADDRESS,
      );
    }
    let factory_previewnet = await utilsService.defaultSingleAsk(
      language.getText('configuration.askFactoryAddress') + ' | PREVIEWNET',
      ZERO_ADDRESS,
    );
    while (!/\d\.\d\.\d/.test(factory_previewnet)) {
      console.log(language.getText('validations.wrongFormatAddress'));
      factory_previewnet = await utilsService.defaultSingleAsk(
        language.getText('configuration.askFactoryAddress') + ' | PREVIEWNET',
        ZERO_ADDRESS,
      );
    }
    factories.push({
      id: factory_testnet,
      network: 'testnet',
    });
    factories.push({
      id: factory_previewnet,
      network: 'previewnet',
    });

    // Set a default factories
    const defaultCfgData = configurationService.getConfiguration();
    defaultCfgData.factories = factories;
    configurationService.setConfiguration(defaultCfgData);
    return factories;
  }

  /**
   * Function to set the sdk factory address
   * 
   * @param factoryId
   */
  public async setSDKFactory(factoryId: string): Promise<void> {
    const req = new SetConfigurationRequest({ factoryAddress: factoryId });
    await Network.setConfig(req);
  }

  /**
   * Function to get the sdk factory address
   */
  public async getSDKFactory(): Promise<string> {
    return await Network.getFactoryAddress();
  }

  /**
   * Function to manage the factory menu
   */
  public async manageFactoryMenu(): Promise<void> {
    const currentAccount = utilsService.getCurrentAccount();
    const currentMirror = utilsService.getCurrentMirror();
    const currentRPC = utilsService.getCurrentRPC();
    const currentFactory = utilsService.getCurrentFactory();

    let factoryProxyConfig;
    try {
      factoryProxyConfig =
        await new ConfigurationFactoryProxyService().getFactoryProxyconfiguration(
          currentFactory.id,
        );
    } catch (Error) {
      factoryProxyConfig = { owner: '0.0.0' };
    }

    const currentImplementation: string =
      factoryProxyConfig.implementationAddress.toString();
    const owner: string = factoryProxyConfig.owner.toString();

    const filteredOptions: string[] = await this.filterManageFactoryOptions(
      language.getArrayFromObject('wizard.manageFactoryOptions'),
      owner,
    );

    const factoryAction = await utilsService.defaultMultipleAsk(
      language.getText('wizard.configurationMenuTitle'),
      filteredOptions,
      false,
      {
        network: currentAccount.network,
        account: `${currentAccount.accountId} - ${currentAccount.alias}`,
        mirrorNode: currentMirror.name,
        rpc: currentRPC.name,
      },
    );
    switch (factoryAction) {
      case language.getText('wizard.manageFactoryOptions.ChangeFactory'):
        await utilsService.cleanAndShowBanner();
        await this.changeFactory();
        utilsService.showMessage(language.getText('wizard.factoryChanged'));
        break;

      case language.getText('wizard.manageFactoryOptions.UpgradeFactory'):
        await utilsService.cleanAndShowBanner();
        await this.upgradeFactory(currentFactory, currentImplementation);
        break;

      case language.getText('wizard.manageFactoryOptions.ChangeOwner'):
        await utilsService.cleanAndShowBanner();
        await this.changeFactoryOwner(currentFactory);
        break;

      case language.getText('wizard.manageFactoryOptions.FactoryDetails'):
        await utilsService.cleanAndShowBanner();
        this.showFactoryDetails(factoryProxyConfig);
        break;

      default:
        await utilsService.cleanAndShowBanner();
        await wizardService.configurationMenu();
    }
    await this.manageFactoryMenu();
  }

  /**
   * Function to show the factory details
   * 
   * @param factoryProxyConfig The factory proxy configuration
   */
  private showFactoryDetails(factoryProxyConfig: ProxyConfigurationViewModel) {
    utilsService.showMessage(
      colors.yellow(
        `${language.getText('factory.implementation')}: ${
          factoryProxyConfig.implementationAddress.value
        }`,
      ),
    );
    utilsService.showMessage(
      colors.yellow(
        `${language.getText('factory.owner')}: ${
          factoryProxyConfig.owner.value
        }`,
      ),
    );
  }

  /**
   * Function to filter the options to manage the factory
   * 
   * @param options The options to filter
   * @param factoryOwner The owner of the factory
   * @returns The filtered options
   */
  private async filterManageFactoryOptions(
    options: string[],
    factoryOwner: string,
  ): Promise<string[]> {
    const configAccount = utilsService.getCurrentAccount();

    let filteredOptions: string[] = [];
    filteredOptions = options.filter((option) => {
      if (
        (option ===
          language.getText('wizard.manageFactoryOptions.UpgradeFactory') &&
          factoryOwner !== configAccount.accountId) ||
        (option ===
          language.getText('wizard.manageFactoryOptions.ChangeOwner') &&
          factoryOwner !== configAccount.accountId)
      )
        return false;
      return true;
    });

    return filteredOptions;
  }

  /**
   * Function to change the configured factory
   * 
   * @returns The new factory configuration
   */
  public async changeFactory(): Promise<IFactoryConfig[]> {
    const configuration = configurationService.getConfiguration();
    const currentAccount = utilsService.getCurrentAccount();
    const currentMirror = utilsService.getCurrentMirror();
    const currentRPC = utilsService.getCurrentRPC();

    const factories: IFactoryConfig[] = configuration?.factories || [];

    const networks = configurationService
      .getConfiguration()
      .networks.map((network) => network.name);
    const network = await utilsService.defaultMultipleAsk(
      language.getText('wizard.networkManage'),
      networks,
      false,
      {
        network: currentAccount.network,
        mirrorNode: currentMirror.name,
        rpc: currentRPC.name,
        account: `${currentAccount.accountId} - ${currentAccount.alias}`,
      },
    );

    const factoryId = await utilsService.defaultSingleAsk(
      language.getText('configuration.askFactoryId'),
      ZERO_ADDRESS,
    );

    if (factories && factories.map((val) => val.network)) {
      factories[factories.map((val) => val.network).indexOf(network)].id =
        factoryId;
    } else {
      factories.push({ id: factoryId, network: network });
    }

    // Set factories
    configuration.factories = factories;
    configurationService.setConfiguration(configuration);
    return factories;
  }

  /**
   * Function to upgrade the configured factory
   * 
   * @param factory Factory to upgrade
   * @param currentImpl Current implementation of the factory
   */
  public async upgradeFactory(
    factory: IFactoryConfig,
    currentImpl: string,
  ): Promise<void> {
    await utilsService.cleanAndShowBanner();

    const upgradeImplementationRequest =
      new UpgradeFactoryImplementationRequest({
        factoryId: factory.id,
        implementationAddress: '',
      });

    try {
      await new ImplementationFactoryProxyService().upgradeImplementation(
        upgradeImplementationRequest,
        currentImpl,
      );
    } catch (error) {
      await utilsService.askErrorConfirmation(
        async () => await this.manageFactoryMenu(),
        error,
      );
    }
  }

  /**
   * Function to change the owner of the configured factory
   * 
   * @param factory Factory to change the owner
   */
  public async changeFactoryOwner(factory: IFactoryConfig): Promise<void> {
    await utilsService.cleanAndShowBanner();

    const changeFactoryProxyOwnerRequest = new ChangeFactoryProxyOwnerRequest({
      factoryId: factory.id,
      targetId: '',
    });

    try {
      await new OwnerFactoryProxyService().changeFactoryProxyOwner(
        changeFactoryProxyOwnerRequest,
      );
    } catch (error) {
      await utilsService.askErrorConfirmation(
        async () => await this.manageFactoryMenu(),
        error,
      );
    }
  }

}
