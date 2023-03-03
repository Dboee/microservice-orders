import { Ticket } from '../../../models/ticket';
import { TicketCreatedListener } from '../ticket-created-listener';
import { ITicketCreatedEvent } from '@delight-system/microservice-common';
import mongoose from 'mongoose';
import { PartitionContext, ReceivedEventData } from '@azure/event-hubs';

const setup = async () => {
  // Create an instance of the listener
  const listener = new TicketCreatedListener();

  // Create a fake data event
  const data: ITicketCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
  };

  // Create a fake message object
  const event: any = {
    body: data,
    properties: {},
  };

  // Create a fake context object
  const context: any = {
    updateCheckpoint: jest.fn(),
  };

  return { listener, data, event, context };
};

it('creates and saves a ticket', async () => {
  const { listener, data, event, context } = await setup();

  // Call the onMessage function with the data object + message object
  await listener.onMessage(data, context, event);

  // Write assertions to make sure a ticket was created!
  expect(context.updateCheckpoint).toHaveBeenCalled();
});

it.todo('acks the message');
