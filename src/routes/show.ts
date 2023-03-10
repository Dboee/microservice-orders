// Get details of a specific order
import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  UnauthorizedError,
} from '@delight-system/microservice-common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
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

    res.send(order);
  }
);

export { router as showOrderRouter };
