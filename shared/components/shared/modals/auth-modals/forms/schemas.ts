import { getProfile } from "@/app/actions";
import { z } from "zod";

export const passwordSchema = z.string().min(6, { message: 'Неверный пароль' });

export const loginFormSchema = z.object({
    email: z.string().email({ message: 'Введите корректную почту' }),
    password: passwordSchema
});

export const registerFormSchema = loginFormSchema.merge(
    z.object({
        fullName: z.string().min(2, { message: 'Неверный пароль' }),
        confirmPassword: passwordSchema
    })
)
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword']
    });

export const profileFormSchema = z
    .object({
        fullName: z.string().min(2, 'Введите имя'),
        email: z.string().email('Введите корректную почту'),
        password: z.string().min(6, 'Минимум 6 символов').or(z.literal('')),
        confirmPassword: z.string(),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

export type TFormLoginValues = z.infer<typeof loginFormSchema>;
export type TFormRegisterValues = z.infer<typeof registerFormSchema>;
export type TFormProfileValues = z.infer<typeof profileFormSchema>;
export type Profile = Awaited<ReturnType<typeof getProfile>>;
