import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '../form-components';
import { AddressInput } from '../address-input';
import { Controller, useFormContext } from 'react-hook-form';

interface CheckoutAddressFormProps {
    className?: string
}

export const CheckoutAddressForm: React.FC<CheckoutAddressFormProps> = ({ className }) => {
    const {
        control
    } = useFormContext();

    return (
        <WhiteBlock title="3. Адрес доставки" className={className}>
            <div className="flex flex-col gap-5">
                <Controller
                    control={control}
                    name='address'
                    render={({ field, fieldState }) =>
                        <>
                            <AddressInput onChange={field.onChange} />
                        </>
                    }
                />

                <FormTextarea
                    name='comment'
                    rows={5}
                    className="text-base"
                    placeholder="Комментарий к заказу"
                />
            </div>
        </WhiteBlock>
    );
};