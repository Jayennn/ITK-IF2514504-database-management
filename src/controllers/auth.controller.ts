import { loginSchema, registerSchema } from "@models/auth.model";
import { getAuthUser, loginUser, registerUser } from "@services/auth.service";
import { ValidationError } from "@app-types/app-error";
import { asyncHandler } from "@lib/async-handler";
import type { Request, Response } from "express";

export const register = asyncHandler(async (req: Request, res: Response) => {
   const result = registerSchema.safeParse(req.body);

   if (!result.success) {
      throw new ValidationError("Validation failed");
   }

   await registerUser(result.data);

   res.status(201).json({
      success: true,
      message: "Register success",
   });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
   const result = loginSchema.safeParse(req.body);

   if (!result.success) {
      throw new ValidationError("Validation failed");
   }

   const data = await loginUser(result.data);

   res.status(200).json({
      success: true,
      message: "Login success",
      data,
   });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
   const user = getAuthUser(req);

   res.status(200).json({
      success: true,
      message: "Get profile success",
      data: user,
   });
});

// export const logout = asyncHandler(async (req: Request, res: Response) => {
//    lolllll
//    res.status(200).json({
//       success: true,
//       message: "Logout success",
//    });
// });
