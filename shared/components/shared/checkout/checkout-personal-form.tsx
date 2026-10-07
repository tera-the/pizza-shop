import { WhiteBlock } from '../white-block';
import { FormInput } from '../form-components';
import { PHONE_MASK, phoneDispatch } from '@/lib/phone-mask';

interface CheckoutPersonalFormProps {
    className?: string;
}

export const CheckoutPersonalForm: React.FC<CheckoutPersonalFormProps> = ({ className }) => {
    return (
        <WhiteBlock title="2. Персональные данные" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput label="Имя" name="firstName" className="text-base" placeholder="Введите имя.." />
                <FormInput label="Фамилия" name="lastName" className="text-base" placeholder="Введите фамилию.." />
                <FormInput label="E-Mail" name="email" className="text-base" placeholder="E-Mail" />
                <FormInput
                    name="phone"
                    label="Телефон"
                    required
                    mask={PHONE_MASK}
                    dispatch={phoneDispatch}
                    inputMode="tel"
                    placeholder="+7 (___) ___-__-__"
                />
            </div>
        </WhiteBlock>
    );
};