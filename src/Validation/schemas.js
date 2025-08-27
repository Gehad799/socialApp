import * as z from "zod";
const imageValidation = z
  .any()
  .refine(
    (files) => !files || !files[0] || files[0].size <= 4 * 1024 * 1024,
    { message: "Image size must be less than 4MB" }
  )
  .refine(
    (files) =>
      !files ||
      !files[0] ||
      ["image/jpeg", "image/png", "image/jpg"].includes(files[0].type),
    { message: "File must be a JPEG or PNG file" }
  )
  .optional();

export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    name: z
      .string({ message: "name is required" })
      .min(2, { message: "name must be at least 2 characters" }),
    password: z
      .string({ message: "password is required" })
      .min(8, {
        message: "password must be at least 8 characters",
      })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    rePassword: z
      .string({ message: "password is required" })
      .min(8, {
        message: "password must be at least 8 characters",
      })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
        message:
          "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),

    dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: "Invalid date format, must be YYYY-MM-DD",
    }),
    gender: z.literal(["male", "female"], {
      message: "gender is required",
    }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z
    .string({ message: "password is required" })
    .min(8, {
      message: "password must be at least 8 characters",
    })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export const postSchema = z.object({
  body: z.string().min(3, { message: "post must be at least 3 characters" }),
  image: imageValidation,
});

export const commentSchema = z.object({
  content: z
    .string()
    .min(2, { message: "comment must be at least 2 characters" }),
});

export const changePasswordSchema = z.object({
  password: z
    .string({ message: "password is required" })
    .min(8, {
      message: "password must be at least 8 characters",
    })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  newPassword: z
    .string({ message: "password is required" })
    .min(8, {
      message: "password must be at least 8 characters",
    })
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

export const editImageSchema = z.object({
  photo: imageValidation,
});
