import { z } from "zod"

export const emailSchema = z
  .string()
  .min(1, { message: "Email kiritilishi shart!" })
  .email({ message: "Iltimos, to'g'ri email manzilini kiriting" })

export const passwordSchema = z
  .string()
  .min(8, { message: "Parol kamida 8 ta belgidan iborat bo'lishi kerak" })

export const fullNameSchema = z
  .string()
  .min(2, { message: "Ism kamida 2 ta belgidan iborat bo'lishi kerak" })

export const nameSchema = z
  .string()
  .min(1, { message: "Nom/Ism kiritilishi shart!" })
  .trim()

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const registerSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export const clientSchema = z.object({
  name: nameSchema,
  email: z
    .string()
    .email({ message: "Noto'g'ri email manzili kiritildi!" })
    .or(z.literal("")),
  
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[0-9]+$/.test(val), {
      message: "Telefon raqami faqat raqamlardan iborat bo'lishi kerak (masalan: +998901234567)",
    }),

  company: z.string().optional(),
  date: z.string().optional(),
})

export const dealSchema = z.object({
  title: nameSchema,
  status: z.enum(["New", "In Progress", "Won", "Lost"]),
  date: z.string().optional(),
})

export const taskSchema = z.object({
  title: nameSchema,
  description: z.string().optional(),
  status: z.enum(["Todo", "In Progress", "Done"]),
  date: z.string().optional(),
})

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
export type ClientValues = z.infer<typeof clientSchema>
export type DealValues = z.infer<typeof dealSchema>
export type TaskValues = z.infer<typeof taskSchema>