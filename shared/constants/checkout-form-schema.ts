import z from "zod/v3";

export const CheckoutFormSchema = z.object({
    email: z.string().email('Неверный формат email'),
    age: z.number().min(18, 'Минимальный возраст — 18 лет'),
    firstName: z.string().min(2, 'Имя должно содержать не менее 2-х символов'),
    lastName: z.string().min(2, 'Фамилия должна содержать не менее 2-х символов'),
    phone: z
        .string()
        .regex(/^\+\d{1,3} \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Введите номер телефона полностью'),
    address: z.string().min(5, 'Адрес должен содержать не менее 2-х символов'),
    comment: z.string().optional()
});

export type CheckoutFormSchemaTypes = z.infer<typeof CheckoutFormSchema>;