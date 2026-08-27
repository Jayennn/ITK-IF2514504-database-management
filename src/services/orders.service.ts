import type { CreateOrderDto, Order, OrderWithDetails } from "@models/orders.model";
import { ForbiddenError, NotFoundError } from "@app-types/app-error";
import * as OrdersRepository from "@repositories/orders.repository";

export async function getAllOrders(): Promise<Order[]> {
   return await OrdersRepository.findAllOrders();
}

export async function getOrderById(id: number, requestingUserId: number, requestingUserRole: string): Promise<OrderWithDetails> {
   const order = await OrdersRepository.findOrderById(id);

   if (!order) {
      throw new NotFoundError("Order not found");
   }

   if (requestingUserRole === "customer" && order.user_id !== requestingUserId) {
      throw new ForbiddenError("Forbidden: you can only view your own orders");
   }

   return order;
}

export async function getOrdersByUserId(userId: number): Promise<Order[]> {
   return await OrdersRepository.findOrdersByUserId(userId);
}

export async function checkoutOrder(userId: number, data: CreateOrderDto): Promise<void> {
   await OrdersRepository.createOrderCheckout(userId, data);
}

export async function cancelOrder(userId: number, orderId: number): Promise<void> {
   await OrdersRepository.cancelOrderById(userId, orderId);
}