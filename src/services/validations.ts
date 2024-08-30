import { z } from 'zod';

export const LoginEmailSchema = z.object({
  email: z.string().email("L'email est invalide"),
});
export const LoginPasswordSchema = z.object({
  password: z
    .string()
    .min(4, { message: 'Le mot de passe doit contenir au moins 4 caractères' }),
});

export const LoginPhoneSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^(?:\+(228)?\s?|0)(9[0-9]{1}|2[2-5]{1}|9[5-7]{1}|7[0-9]{1})[0-9]{6}$/,
      'Le numéro de téléphone doit être Togocom ou Moov',
    ),
});
export const RegisterSchema = z
  .object({
    firstName: z.string().min(2, { message: 'Le prénom est obligatoire' }),
    lastName: z.string().min(2, { message: 'Le nom est obligatoire' }),
    email: z.string().email({ message: "L'email est invalide" }),
    password: z.string().min(4, {
      message: 'Le mot de passe doit contenir au moins 4 caractères',
    }),
    // TODO: Rendre la validation de tel dinamique
    phoneNumber: z
      .string()
      .regex(
        /^(?:\+(228)?\s?|0)(9[0-9]{1}|2[2-5]{1}|9[5-7]{1}|7[0-9]{1})[0-9]{6}$/,
        'Le numéro de téléphone doit être Togocom ou Moov',
      ),
    confirmPassword: z.string().min(4, {
      message:
        'La confirmation du mot de passe doit contenir au moins 4 caractères',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'], // path of error
  });
export const OtpSchema = z.object({
  otp: z.string().min(6, { message: "L'otp doit contenir 6 caractères" }),
});

export const PasswordResetSchema = z
  .object({
    password: z.string().min(4, {
      message: 'Le mot de passe doit contenir au moins 4 caractères',
    }),
    confirmPassword: z.string().min(4, {
      message:
        'La confirmation du mot de passe doit contenir au moins 4 caractères',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'], // path of error
  });

export type RegisterFormValues = z.infer<typeof RegisterSchema>;
export type PasswordResetFormValues = z.infer<typeof PasswordResetSchema>;
export type OtpFormValues = z.infer<typeof OtpSchema>;

export type LoginPhoneFormValues = z.infer<typeof LoginPhoneSchema>;

export type LoginPasswordFormValues = z.infer<typeof LoginPasswordSchema>;

export type LoginEmailFormValues = z.infer<typeof LoginEmailSchema>;

export type Identify = {
  identify: string;
};

export type FormValues = {
  [key: string]: string;
};

export interface Order {
  country: string;
  employee_payment: number;
  is_depot: string;
  bookmaker_identifiant: number;
  transaction_id: string;
  montant: number;
  code_parainage: string;
  state: 'INCOMPLET' | 'COMMING' | 'CONFIRMED' | 'CANCELLED';
}
