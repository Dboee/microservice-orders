// Cancel an order

import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  UnauthorizedError,
} from '@delight-system/microservice-common';
import { Order, OrderStatus } from '../models/order';

import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId).populate('ticket');

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new UnauthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    try {
      new OrderCancelledPublisher().publish({
        id: order.id,
        ticket: {
          id: order.ticket.id,
        },
      });
    } catch (err) {
      console.error(err);
    }

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
