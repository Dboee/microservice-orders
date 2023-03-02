import {
  ConsumerGroups,
  EventHubs,
  Listener,
  ITicketUpdatedEvent,
} from '@delight-system/microservice-common';
import { Ticket } from '../../models/ticket';
import { PartitionContext, ReceivedEventData } from '@azure/event-hubs';

export class TicketUpdatedListener extends Listener<ITicketUpdatedEvent> {
  readonly consumerGroup = ConsumerGroups.TicketUpdated;
  readonly eventHubName = EventHubs.Tickets;

  constructor() {
    super(EventHubs.Tickets, ConsumerGroups.TicketUpdated);
  }

  async onMessage(
    data: ITicketUpdatedEvent['data'],
    context: PartitionContext,
    event: ReceivedEventData
  ) {
    // console.log('updated-Data: ', data);
    // console.log('Event: ', event);
    // console.log('Context: ', context);

    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({
      title: data.title,
      price: data.price,
    });

    await ticket.save();
  }
}
