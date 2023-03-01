import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { OrderCreatedPublisher } from '../../events/publishers/order-created-publisher';
import { Order, OrderStatus } from '../../models/order';
import { Ticket, ITicketDoc } from '../../models/ticket';

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  return ticket;
};

it('returns a 404 if the ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = await buildTicket();
  const order = Order.build({
    ticket,
    userId: '123',
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticket = await buildTicket();
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

// it('emits an order created event', async () => {
//   const ticket = await buildTicket();
//   await ticket.save();
//   await request(app)
//     .post('/api/orders')
//     .set('Cookie', global.signin())
//     .send({ ticketId: ticket.id })
//     .expect(201);

//   expect(new OrderCreatedPublisher().publish).toHaveBeenCalled();
// });
