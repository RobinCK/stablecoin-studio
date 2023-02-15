import { Button, useDisclosure, Flex, Stack, GridItem, SimpleGrid } from '@chakra-ui/react';

import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AwaitingWalletSignature from '../../components/AwaitingWalletSignature';
import BaseContainer from '../../components/BaseContainer';
import InputController from '../../components/Form/InputController';
import { propertyNotFound } from '../../constant';
import { SelectController } from '../../components/Form/SelectController';
import Icon from '../../components/Icon';

import { useRefreshCoinInfo } from '../../hooks/useRefreshCoinInfo';
import { SELECTED_WALLET_COIN } from '../../store/slices/walletSlice';
import NoFeesManagement from './components/NoFeesManagement';
import FeeSelectController from './components/FeeSelectController';
import {
	AddFixedFeeRequest,
	AddFractionalFeeRequest,
	UpdateCustomFeesRequest,
} from 'hedera-stable-coin-sdk';
import { handleRequestValidation } from '../../utils/validationsHelper';

const FeesManagement = () => {
	const [awaitingUpdate, setAwaitingUpdate] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>();
	const [error, setError] = useState<any>();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const variant = awaitingUpdate ? 'loading' : success ? 'success' : 'error';
	const { control, getValues } = useForm({
		mode: 'onChange',
	});

	const selectedStableCoin = useSelector(SELECTED_WALLET_COIN);
	const [customFeesRequest, setCustomFeesRequest] = useState(
		new UpdateCustomFeesRequest({
			tokenId: selectedStableCoin!.tokenId!.toString(),
			customFees: [],
		}),
	);

	const fixedFee = new AddFixedFeeRequest({
		tokenId: selectedStableCoin!.tokenId!.toString(),
		fee: {
			amount: '1',
			collectorId: '0.0.1',
			collectorsExempt: false,
			decimals: 0,
			tokenIdCollected: '0.0.0',
		},
	});

	// TODO: Add useEffect to load current customFees from stablecoin

	// const isLoading = useRefreshCoinInfo();

	const { t } = useTranslation(['feesManagement', 'global']);

	const collectorsExempt = [
		{
			value: 0,
			label: 'false',
		},
		{
			value: 1,
			label: 'true',
		},
	];

	const selectorStyle = {
		wrapper: {
			border: '1px',
			borderColor: 'brand.black',
			borderRadius: '8px',
			height: 'min',
			width: '120px',
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

	const handleSelectFee = async (event: any) => {
		console.log(event.value);
		if (event.value === '') {
			// TODO
			console.log('show modal');
		}
	};
	const handleAddNewRow = () => {
		// const newCustomFees = {...customFeesRequest};
		console.log(customFeesRequest);
		
		// const updatedCustomFeesRequest = { ...customFeesRequest };
		// updatedCustomFeesRequest.customFees.push({
		// 	collectorId: '',
		// 	collectorsExempt: true,
		// 	decimals: selectedStableCoin?.decimals!,
		// 	fee
		// });
		// console.log(updatedCustomFeesRequest as UpdateCustomFeesRequest,customFeesRequest);

		// setCustomFeesRequest(updatedCustomFeesRequest as UpdateCustomFeesRequest);
	};
	const customFees: any[] = ['a'];
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
					<SimpleGrid columns={{ base: 9 }} gap={{ base: 4 }} alignItems='center'>
						{feeDataHeader.map((feeColumn: string, index: number) => (
							<GridItem key={`details-fee-${index}`} fontSize='14px' fontWeight='bold'>
								{feeColumn}
							</GridItem>
						))}

						{customFees.map((field, i) => {
							return (
								<React.Fragment key={i}>
									<GridItem>
										<SelectController
											control={control}
											name={`${i}.feeType`}
											options={[
												{
													value: 0,
													label: t('feeType.fixed'),
												},
												{
													value: 1,
													label: t('feeType.fractional'),
												},
											]}
											overrideStyles={selectorStyle}
											addonLeft={true}
											variant='unstyled'
											// defaultValue={
											// 	customFees[i] !== undefined
											// 		? customFees[i].amountDenominator
											// 			? '1'
											// 			: '0'
											// 		: '0'
											// }
										/>
									</GridItem>
									<GridItem>
										<InputController
											control={control}
											rules={{
												required: t('global:validations.required') ?? propertyNotFound,
												validate: {
													validation: (value: string) => {
														fixedFee.fee.amount = value;
														const res = handleRequestValidation(fixedFee.validate('fee'));
														return res;
														// return true;
													},
												},
											}}
											name={`${i}.amountOrPercentage`}
											placeholder={t('amountPlaceholder') ?? propertyNotFound}
											// defaultValue={
											// 	customFees[i] !== undefined
											// 		? customFees[i].amount
											// 			? customFees[i].amount._value
											// 			: ''
											// 		: ''
											// }
											isReadOnly={false}
										/>
									</GridItem>
									<GridItem>
										<InputController
											control={control}
											rules={{
												required: t('global:validations.required') ?? propertyNotFound,
												validate: {
													validation: (value: string) => {
														// fractionalFeeRequest.fee.min = value;
														// const res = handleRequestValidation(
														// 	fractionalFeeRequest.validate('min'),
														// );
														// return res;
														return true;
													},
												},
											}}
											name={`${i}.min`}
											placeholder={t('minPlaceholder') ?? propertyNotFound}
											// defaultValue={
											// 	customFees[i] !== undefined && customFees[i].min
											// 		? customFees[i].min._value.toString()
											// 		: ''
											// }
											isReadOnly={false}
										/>
									</GridItem>
									<GridItem>
										<InputController
											control={control}
											rules={{
												required: t('global:validations.required') ?? propertyNotFound,
												validate: {
													validation: (value: string) => {
														// fractionalFeeRequest.fee.max = value;
														// const res = handleRequestValidation(
														// 	fractionalFeeRequest.fee.validate('max'),
														// );
														// return res;
														return true;
													},
												},
											}}
											name={`${i}.max`}
											placeholder={t('maxPlaceholder') ?? propertyNotFound}
											// defaultValue={
											// 	customFees[i] !== undefined && customFees[i].max
											// 		? customFees[i].max._value.toString()
											// 		: ''
											// }
											isReadOnly={false}
										/>
									</GridItem>
									<GridItem>
										<InputController
											rules={{
												required: t('global:validations.required') ?? propertyNotFound,
												validate: {
													validation: (value: string) => {
														fixedFee.fee.collectorId = value;
														const res = handleRequestValidation(fixedFee.validate('fee'));
														return res;
													
													},
												},
											}}
											isRequired
											control={control}
											name={`${i}.collectorAccount`}
											placeholder={t('collectorAccountPlaceholder') ?? propertyNotFound}
											// defaultValue={
											// 	customFees[i] !== undefined && customFees[i].collectorId !== undefined
											// 		? customFees[i].collectorId.value.toString()
											// 		: ''
											// }
											isReadOnly={false}
										/>
									</GridItem>
									<GridItem>
										<SelectController
											control={control}
											name={`${i}.collectorsExempt`}
											options={collectorsExempt}
											overrideStyles={selectorStyle}
											addonLeft={true}
											variant='unstyled'
											// defaultValue={
											// 	customFees[i] !== undefined
											// 		? customFees[i].collectorsExempt
											// 			? '1'
											// 			: '0'
											// 		: '1'
											// }
										/>
									</GridItem>
									<GridItem>
										<SelectController
											control={control}
											name={`${i}.senderOrReceiver`}
											options={[
												{
													value: 0,
													label: 'sender',
												},
												{
													value: 1,
													label: 'receiver',
												},
											]}
											overrideStyles={selectorStyle}
											addonLeft={true}
											variant='unstyled'
											// defaultValue={
											// 	customFees[i] !== undefined
											// 		? customFees[i].amountDenominator
											// 			? customFees[i].net
											// 				? '0'
											// 				: '1'
											// 			: '0'
											// 		: '0'
											// }
										/>
									</GridItem>
									<GridItem>
										<FeeSelectController
											styles={selectorStyle}
											name={`${i}.moneda`}
											control={control}
											options={[
												{ label: 'HBAR', value: 'HBAR' },
												{
													label: t('feesManagement:tokensFeeOption:currentToken'),
													value: selectedStableCoin!.tokenId!.toString(),
												},
												{
													label: t('feesManagement:tokensFeeOption:customToken'),
													value: '',
												},
											]}
											onChangeAux={handleSelectFee}
										/>
									</GridItem>
									<GridItem>
										<Icon name='Trash' fontSize='22px' onClick={() => handleRemoveRow(i)} />
									</GridItem>
								</React.Fragment>
							);
						})}
					</SimpleGrid>
					<Flex justify='flex-end' pt={6} px={6} pb={6}>
						<Stack direction='row' spacing={6}>
							<Button variant='primary' /* onClick={handleUpdateTokenFees} */>
								{t('updateTokenFees.saveChangesButtonText')}
							</Button>
							<Button
								variant='primary'
								onClick={handleAddNewRow}
								isDisabled={customFees.length > 9}
							>
								{t('updateTokenFees.addRowButtonText')}
							</Button>
						</Stack>
					</Flex>
				</Flex>
			)}

			{selectedStableCoin && !selectedStableCoin.feeScheduleKey && <NoFeesManagement />}
		</BaseContainer>
	);
};

export default FeesManagement;
function handleRemoveRow(i: number): void {
	throw new Error('Function not implemented.');
}
