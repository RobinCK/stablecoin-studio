import {
	Button,
	useDisclosure,
	Flex,
	Stack,
	GridItem,
	InputRightElement,
	Grid,
	Center,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import BaseContainer from '../../components/BaseContainer';
import InputController from '../../components/Form/InputController';
import { propertyNotFound } from '../../constant';
import { SelectController } from '../../components/Form/SelectController';
import Icon from '../../components/Icon';
import { SELECTED_WALLET_COIN } from '../../store/slices/walletSlice';
import NoFeesManagement from './components/NoFeesManagement';
import {
	AddFixedFeeRequest,
	AddFractionalFeeRequest,
	UpdateCustomFeesRequest,
	GetStableCoinDetailsRequest,
	HBAR_DECIMALS,
} from 'hedera-stable-coin-sdk';
import type {
	RequestFractionalFee,
	RequestCustomFee,
	RequestFixedFee,
	StableCoinViewModel,
} from 'hedera-stable-coin-sdk';
import { handleRequestValidation } from '../../utils/validationsHelper';
import SDKService from '../../services/SDKService';
import SelectCreatableController from '../../components/Form/SelectCreatableController';
import ModalNotification from '../../components/ModalNotification';

const MAX_FEES = 10;

type FeeTypes = RequestFractionalFee | RequestFixedFee | RequestCustomFee;

const FeesManagement = () => {
	const [awaitingUpdate, setAwaitingUpdate] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>();
	const { t } = useTranslation(['feesManagement', 'global']);
	const [error, setError] = useState<any>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const variant = awaitingUpdate ? 'loading' : success ? 'success' : 'error';

	const { control, getValues, setValue, watch } = useForm({
		mode: 'onChange',
	});
	const {
		fields: fees,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'fees',
	});
	// const feeRef = useRef<SelectInstance<unknown, boolean, GroupBase<unknown>>>(null);
	const selectedStableCoin = useSelector(SELECTED_WALLET_COIN);

	const isMaxFees = useMemo(() => fees.length >= MAX_FEES, [fees]);

	const fixedFee = new AddFixedFeeRequest({
		tokenId: selectedStableCoin!.tokenId!.toString(),
		collectorId: '0.0.1',
		collectorsExempt: false,
		decimals: 0,
		tokenIdCollected: '0.0.0',
		amount: '1',
	});

	const fractionalFee = new AddFractionalFeeRequest({
		tokenId: selectedStableCoin!.tokenId!.toString(),
		collectorId: '0.0.1',
		collectorsExempt: false,
		decimals: 0,
		amountNumerator: '1',
		amountDenominator: '10',
		min: '1',
		max: '5',
		net: false,
	});

	enum FeeTypeValue {
		FIXED,
		FRACTIONAL,
	}

	const feeTypeOption = {
		FIXED: {
			value: FeeTypeValue.FIXED,
			label: t('feeType.fixed'),
		},
		FRACTIONAL: {
			value: FeeTypeValue.FRACTIONAL,
			label: t('feeType.fractional'),
		},
	};
	const senderOrReceiverOption = {
		SENDER: {
			value: 0,
			label: 'Sender',
		},
		RECIEVER: {
			value: 1,
			label: 'Receiver',
		},
	};
	const collectorsExemptOption = {
		FALSE: {
			value: 0,
			label: 'False',
		},
		TRUE: {
			value: 1,
			label: 'True',
		},
	};
	const collectorIdOption = {
		HBAR: { label: 'HBAR', value: '0.0.0' },
		CURRENT_TOKEN: {
			label: t('feesManagement:tokensFeeOption:currentToken'),
			value: selectedStableCoin!.tokenId!.toString(),
		},
		CUSTOM: {
			label: t('feesManagement:tokensFeeOption:customToken'),
			value: '',
		},
	};
	useEffect(() => {
		const parsedFees = selectedStableCoin!.customFees!.map((item: FeeTypes) => {
			if ('amount' in item) {
				return {
					feeType: feeTypeOption.FIXED,
					amountOrPercentage: item.amount,
					collectorAccount: item.collectorId,
					collectorsExempt: item.collectorsExempt
						? collectorsExemptOption.TRUE
						: collectorsExemptOption.FALSE,
					tokenIdCollected: ((tokenId) => {
						switch (tokenId) {
							case collectorIdOption.HBAR.value:
								return collectorIdOption.HBAR;
							case collectorIdOption.CURRENT_TOKEN.value:
								return collectorIdOption.CURRENT_TOKEN;
							default:
								return {
									value: tokenId,
									label: tokenId,
								};
						}
					})(item.tokenIdCollected),
					senderOrReceiver: senderOrReceiverOption.SENDER,
				};
			}
			// TODO
			//  Fixed => sender
			//  fractional => ambos, pero actualmente solo reciever
			return {
				feeType: feeTypeOption.FRACTIONAL,
				amountOrPercentage: (item as RequestFractionalFee).percentage,
				collectorAccount: item.collectorId,
				collectorsExempt: item.collectorsExempt
					? collectorsExemptOption.TRUE
					: collectorsExemptOption.FALSE,
				senderOrReceiver: (item as RequestFractionalFee).net
					? senderOrReceiverOption.SENDER
					: senderOrReceiverOption.RECIEVER,
				min: (item as RequestFractionalFee).min,
				max: (item as RequestFractionalFee).max,
				tokenIdCollected: collectorIdOption.CURRENT_TOKEN,
			};
		});

		setValue('fees', parsedFees);
	}, []);

	const selectorStyle = {
		wrapper: {
			border: '1px',
			borderColor: 'brand.black',
			borderRadius: '8px',
			height: 'min',
			width: 'full',
		},
		menuList: {
			maxH: '220px',
			overflowY: 'auto',
			bg: 'brand.white',
			boxShadow: 'down-black',
			p: 2,
			zIndex: 99,
		},
		valueSelected: {
			fontSize: '14px',
			fontWeight: '500',
		},
	};

	const feeDataHeader = [
		t('feesManagement:columns:feeType'),
		t('feesManagement:columns:amount'),
		t('feesManagement:columns:minimumAmount'),
		t('feesManagement:columns:maximumAmount'),
		t('feesManagement:columns:collectorAccount'),
		t('feesManagement:columns:collectorsExempt'),
		t('feesManagement:columns:assessmentMethod'),
		t('feesManagement:columns:tokenFee'),
		t('feesManagement:columns:actions'),
	];

	/* const handleSelectFee = async (event: any) => {
		console.log(event.value);
		console.log(feeRef.current);
		feeRef.current?.selectOption(0);

		if (event.value === '') {
			// TODO
			onOpenCustomToken();
		}
	}; */
	const handleAddNewRow = async () => {
		if (fees.length >= 10) return;

		// Default values when add new row
		append({
			feeType: feeTypeOption.FIXED,
			collectorsExempt: collectorsExemptOption.FALSE,
			senderOrReceiver: senderOrReceiverOption.SENDER,
			tokenIdCollected: collectorIdOption.HBAR,
			min: undefined,
			amount: undefined,
		});
	};

	async function handleRemoveRow(i: number): Promise<void> {
		remove(i);
	}

	const handleUpdateTokenFees = async () => {
		const requestCustomFeeArray: RequestCustomFee[] = [];
		// console.log(getValues());

		for (const fee of getValues().fees) {
			const feeType: FeeTypeValue = fee.feeType.value;
			const collectorAccount: string = fee.collectorAccount;
			const collectorsExempt: boolean = fee.collectorsExempt.value;

			switch (feeType) {
				case FeeTypeValue.FRACTIONAL: {
					const min: string = fee.min;
					const max: string = fee.max;

					const requestFractionalFee: RequestFractionalFee = {
						collectorId: collectorAccount,
						collectorsExempt,
						decimals: 2,
						amountNumerator: '1',
						amountDenominator: '20',
						min,
						max,
						net: false,
						percentage: '', // TODO
					};
					requestCustomFeeArray.push(requestFractionalFee);
					break;
				}

				case FeeTypeValue.FIXED: {
					const amount: string = fee.amountOrPercentage;
					const currency: string = fee.tokenIdCollected.value;
					let decimals = HBAR_DECIMALS;
					if (currency === selectedStableCoin!.tokenId!.toString()) {
						decimals = selectedStableCoin!.decimals ?? 0;
					} else if (currency !== collectorIdOption.HBAR.value) {
						const detailsExternalStableCoin: StableCoinViewModel =
							await SDKService.getStableCoinDetails(
								new GetStableCoinDetailsRequest({
									id: currency,
								}),
							);
						decimals = detailsExternalStableCoin.decimals ?? 0;
					}

					const requestFixedFee: RequestFixedFee = {
						collectorId: collectorAccount,
						collectorsExempt,
						decimals,
						tokenIdCollected:
							currency === collectorIdOption.HBAR.value ? collectorIdOption.HBAR.value : currency,
						amount,
					};
					requestCustomFeeArray.push(requestFixedFee);
					break;
				}
			}
		}

		if (selectedStableCoin?.tokenId) {
			const updateCustomFeesRequest = new UpdateCustomFeesRequest({
				tokenId: selectedStableCoin!.tokenId!.toString(),
				customFees: requestCustomFeeArray,
			});

			try {
				onOpen();
				setAwaitingUpdate(true);
				await SDKService.updateCustomFees(updateCustomFeesRequest);
				setError('');
				setAwaitingUpdate(false);
				setSuccess(true);
			} catch (error: any) {
				setAwaitingUpdate(false);
				console.log(error);
				setError(error?.transactionError?.transactionUrl);
				setSuccess(false);
				setAwaitingUpdate(false);
			}
		}
	};

	return (
		<BaseContainer title={t('feesManagement:title')}>
			{selectedStableCoin && selectedStableCoin.feeScheduleKey && (
				<Flex
					direction='column'
					bg='brand.gray100'
					px={{ base: 4, lg: 14 }}
					pt={{ base: 4, lg: 14 }}
					pb={6}
				>
					<Grid
						templateColumns={'1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.2fr'}
						gap={{ base: 4 }}
						alignItems='center'
					>
						{feeDataHeader.map((feeColumn: string, index: number) => (
							<GridItem key={`details-fee-${index}`} fontSize='14px' fontWeight='bold'>
								{feeColumn}
							</GridItem>
						))}

						{fees &&
							fees.map((field, i) => {
								return (
									<React.Fragment key={i}>
										<GridItem>
											<SelectController
												key={field.id}
												control={control}
												name={`fees.${i}.feeType` as const}
												options={Object.values(feeTypeOption)}
												overrideStyles={selectorStyle}
												addonLeft={true}
												variant='unstyled'
												// defaultValue={
												// 	field !== undefined
												// 		? `fees.${i}.amount` in field
												// 			? feeTypeOption.FRACTIONAL.value
												// 			: feeTypeOption.FIXED.value
												// 		: feeTypeOption.FIXED.value
												// }
											/>
										</GridItem>
										<GridItem>
											<InputController
												key={field.id}
												control={control}
												rules={{
													required: t('global:validations.required') ?? propertyNotFound,
													validate: {
														validation: (value: string) => {
															// if fixed
															fixedFee.amount = value;
															const res = handleRequestValidation(fixedFee.validate('amount'));
															// else fractional
															// const res = handleRequestValidation(fractionalFee.validate('amount'));
															return res;
															// return true;
														},
													},
												}}
												name={`fees.${i}.amountOrPercentage`}
												placeholder={t('amountPlaceholder') ?? propertyNotFound}
												// defaultValue={
												// 	field !== undefined ? ('amount' in field ? field.amount : '') : ''
												// }
												isReadOnly={false}
												rightElement={
													watch(`fees.${i}.feeType`)?.value === feeTypeOption.FRACTIONAL.value && (
														<InputRightElement>
															<Icon name='Percent' />
														</InputRightElement>
													)
												}
											/>
										</GridItem>
										<GridItem>
											<InputController
												key={field.id}
												control={control}
												rules={{
													required: t('global:validations.required') ?? propertyNotFound,
													validate: {
														validation: (value: string) => {
															fractionalFee.min = value;
															const res = handleRequestValidation(fractionalFee.validate('min'));
															return res;
														},
													},
												}}
												name={`fees.${i}.min`}
												placeholder={t('minPlaceholder') ?? propertyNotFound}
												// defaultValue={
												// 	customFees[i] !== undefined && customFees[i].min
												// 		? customFees[i].min._value.toString()
												// 		: ''
												// }
												isReadOnly={false}
												disabled={
													watch(`fees.${i}.feeType`)?.value !== feeTypeOption.FRACTIONAL.value
												}
											/>
										</GridItem>
										<GridItem>
											<InputController
												key={field.id}
												control={control}
												rules={{
													required: t('global:validations.required') ?? propertyNotFound,
													validate: {
														validation: (value: string) => {
															fractionalFee.max = value;
															const res = handleRequestValidation(fractionalFee.validate('max'));
															return res;
														},
													},
												}}
												name={`fees.${i}.max`}
												placeholder={t('maxPlaceholder') ?? propertyNotFound}
												// defaultValue={
												// 	customFees[i] !== undefined && customFees[i].max
												// 		? customFees[i].max._value.toString()
												// 		: ''
												// }
												isReadOnly={false}
												disabled={
													watch(`fees.${i}.feeType`)?.value !== feeTypeOption.FRACTIONAL.value
												}
											/>
										</GridItem>
										<GridItem>
											<InputController
												key={field.id}
												rules={{
													required: t('global:validations.required') ?? propertyNotFound,
													validate: {
														validation: (value: string) => {
															fixedFee.collectorId = value;
															const res = handleRequestValidation(fixedFee.validate('collectorId'));
															return res;
														},
													},
												}}
												isRequired
												control={control}
												name={`fees.${i}.collectorAccount`}
												placeholder={t('collectorAccountPlaceholder') ?? propertyNotFound}
												isReadOnly={false}
											/>
										</GridItem>
										<GridItem>
											<SelectController
												key={field.id}
												control={control}
												name={`fees.${i}.collectorsExempt`}
												options={Object.values(collectorsExemptOption)}
												overrideStyles={selectorStyle}
												addonLeft={true}
												variant='unstyled'
											/>
										</GridItem>
										<GridItem>
											<SelectController
												key={field.id}
												control={control}
												name={`fees.${i}.senderOrReceiver`}
												options={Object.values(senderOrReceiverOption)}
												overrideStyles={selectorStyle}
												addonLeft={true}
												variant='unstyled'
											/>
										</GridItem>
										<GridItem>
											<SelectCreatableController
												key={field.id}
												styles={{
													dropdownIndicator: (provided) => ({
														...provided,
														bg: 'transparent',
														px: 2,
														cursor: 'inherit',
													}),
													indicatorSeparator: (provided) => ({
														...provided,
														display: 'none',
													}),
												}}
												name={`fees.${i}.tokenIdCollected`}
												control={control}
												options={[...Object.values(collectorIdOption)]}
											/>
										</GridItem>
										<GridItem>
											<Center>
												<Icon name='Trash' fontSize='22px' onClick={() => handleRemoveRow(i)} />
											</Center>
										</GridItem>
										{/* {isOpenCustomToken && (
											<ModalInput
												setValue={(tokenId: string) => {
													setValue(`fees.${i}.tokenIdCollected`, tokenId);
													console.log(getValues());
												}}
												isOpen={isOpenCustomToken}
												onClose={onCloseCustomToken}
												placeholderInput='0.0.0'
												title={'Introduce tokenId'}
											/>
											)} */}
									</React.Fragment>
								);
							})}
					</Grid>
					<Flex justify='flex-end' pt={6} px={6} pb={6}>
						<Stack direction='row' spacing={6}>
							<Button variant='primary' onClick={handleUpdateTokenFees}>
								{t('updateTokenFees.saveChangesButtonText')}
							</Button>
							<Button variant='primary' onClick={handleAddNewRow} isDisabled={isMaxFees}>
								{t('updateTokenFees.addRowButtonText')}
							</Button>
						</Stack>
					</Flex>
				</Flex>
			)}
			<ModalNotification
				variant={variant}
				title={
					awaitingUpdate
						? 'Loading'
						: t('notification.title', {
								result: success ? 'Success' : 'Error',
						  })
				}
				description={
					awaitingUpdate ? undefined : t(`notification.description${success ? 'Success' : 'Error'}`)
				}
				isOpen={isOpen}
				onClose={onClose}
				onClick={onClose}
				errorTransactionUrl={error}
				closeButton={false}
				closeOnOverlayClick={false}
			/>
			{selectedStableCoin && !selectedStableCoin.feeScheduleKey && <NoFeesManagement />}
		</BaseContainer>
	);
};

export default FeesManagement;
