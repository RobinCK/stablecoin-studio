import { Heading, Stack, VStack } from '@chakra-ui/react';
import { BigDecimal } from 'hedera-stable-coin-sdk';
import type { Control, FieldValues, UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputController from '../../components/Form/InputController';
import InputNumberController from '../../components/Form/InputNumberController';
import { SelectController } from '../../components/Form/SelectController';
import { validateAmount, validateDecimalsString } from '../../utils/validationsHelper';

interface OptionalDetailsProps {
	control: Control<FieldValues>;
	form: UseFormReturn;
}

const OptionalDetails = (props: OptionalDetailsProps) => {
	const { control, form } = props;
	const { t } = useTranslation(['global', 'stableCoinCreation']);

	const supplyTypes = [
		{
			value: 0,
			label: t('stableCoinCreation:optionalDetails.infinite'),
		},
		{
			value: 1,
			label: t('stableCoinCreation:optionalDetails.finite'),
		},
	];

	const selectorStyle = {
		wrapper: {
			border: '1px',
			borderColor: 'brand.black',
			borderRadius: '8px',
			height: 'min',
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

	const isSupplyTypeFinite = form.getValues().supplyType?.value === 1;

	const initialSupply = useWatch({
		control,
		name: 'initialSupply',
	});
	const decimals = useWatch({
		control,
		name: 'decimals',
	});

	const handleResetMaxSupply = () => {
		const { maxSupply, initialSupply } = form.getValues();

		if (maxSupply && initialSupply >= maxSupply) form.setValue('maxSupply', initialSupply);
	};

	return (
		<VStack h='full' justify={'space-between'} pt='80px'>
			<Stack minW={400}>
				<Heading
					data-testid='title'
					fontSize='16px'
					fontWeight='600'
					mb={10}
					lineHeight='15.2px'
					textAlign={'left'}
				>
					{t('stableCoinCreation:optionalDetails.title')}
				</Heading>
				<Stack as='form' spacing={6}>
					<InputNumberController
						rules={{
							required: t(`global:validations.required`),
						}}
						isRequired
						control={control}
						name={'decimals'}
						label={t('stableCoinCreation:optionalDetails.decimals')}
						placeholder={t('stableCoinCreation:optionalDetails.placeholder', {
							placeholder: t('stableCoinCreation:optionalDetails.decimals'),
						})}
						maxValue={18}
						initialValue={6}
						decimalScale={0}
					/>
					<InputController
						rules={{
							required: t(`global:validations.required`),
							validate: {
								validNumber: (value: string) => {
									return validateAmount(value) || t('global:validations.invalidAmount');
								},
								validDecimals: (value: string) => {
									return (
										validateDecimalsString(value, decimals || 6) ||
										t('global:validations.decimalsValidation')
									);
								},
							},
						}}
						isRequired
						control={control}
						name={'initialSupply'}
						label={t('stableCoinCreation:optionalDetails.initialSupply')}
						placeholder={t('stableCoinCreation:optionalDetails.placeholder', {
							placeholder: t('stableCoinCreation:optionalDetails.initialSupply'),
						})}
						onChangeAux={handleResetMaxSupply}
					/>
					<SelectController
						control={control}
						name={'supplyType'}
						options={supplyTypes}
						label={t('stableCoinCreation:optionalDetails.typeSupply')}
						placeholder={t('stableCoinCreation:optionalDetails.typeSupplyPlaceholder')}
						overrideStyles={selectorStyle}
						addonLeft={true}
						variant='unstyled'
						defaultValue={'0'}
					/>
					{isSupplyTypeFinite && (
						<InputController
							rules={{
								required: t(`global:validations.required`),
								validate: {
									validNumber: (value: string) => {
										return validateAmount(value) || t('global:validations.invalidAmount');
									},
									validDecimals: (value: string) => {
										return (
											validateDecimalsString(value, decimals || 6) ||
											t('global:validations.decimalsValidation')
										);
									},
									quantityOverTotalSupply: (value: string) => {
										return (
											(initialSupply &&
												BigDecimal.fromString(initialSupply, decimals).isLowerOrEqualThan(
													BigDecimal.fromString(value, decimals),
												)) ||
											t('global:validations.overMaxSupply')
										);
									},
								},
							}}
							isRequired
							control={control}
							name={'maxSupply'}
							label={t('stableCoinCreation:optionalDetails.maxSupply')}
							placeholder={t('stableCoinCreation:optionalDetails.placeholder', {
								placeholder: t('stableCoinCreation:optionalDetails.maxSupply'),
							})}
						/>
					)}
				</Stack>
			</Stack>
		</VStack>
	);
};

export default OptionalDetails;
