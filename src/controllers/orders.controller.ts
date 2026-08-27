import { createOrderSchema, orderIdParamSchema } from "@models/orders.model";
import { ValidationError } from "@app-types/app-error";
import { getAuthUser } from "@services/auth.service";
import {
   getAllOrders,
   getOrderById,
   getOrdersByUserId,
   cancelOrder,
   checkoutOrder,
} from "@services/orders.service";
import { asyncHandler } from "@lib/async-handler";
import type { Request, Response } from "express";

export const index = asyncHandler(async (req: Request, res: Response) => {
   const user = getAuthUser(req);

   const orders =
      user.role === "admin"
         ? await getAllOrders()
         : await getOrdersByUserId(user.userId);

   res.status(200).json({
      success: true,
      message: "Get all orders success",
      data: orders,
   });
});

export const show = asyncHandler(async (req: Request, res: Response) => {
   const result = orderIdParamSchema.safeParse(req.params);

   if (!result.success) {
      throw new ValidationError("Invalid order ID");
   }

   const user = getAuthUser(req);
   const order = await getOrderById(result.data.id, user.userId, user.role);

   res.status(200).json({
      success: true,
      message: "Get order by ID success",
      data: order,
   });
});

export const checkoutOrderHandler = asyncHandler(async (req: Request, res: Response) => {
   const result = createOrderSchema.safeParse(req.body);

   if (!result.success) {
      throw new ValidationError("Invalid order data");
   }

   const user = getAuthUser(req);
   console.log(result.data)
   await checkoutOrder(user.userId, result.data);

   res.status(201).json({
      success: true,
      message: "Checkout successful",
   });
});

export const cancelOrderHandler = asyncHandler(async (req: Request, res: Response) => {
   const result = orderIdParamSchema.safeParse(req.params);

   if (!result.success) {
      throw new ValidationError("Invalid order ID");
   }

   const user = getAuthUser(req);
   await cancelOrder(user.userId, result.data.id);

   res.status(200).json({
      success: true,
      message: "Order canceled successfully",
   });
});