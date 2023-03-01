import {
  ConsumerGroups,
  EventHubs,
  Listener,
  ITicketCreatedEvent,
} from '@delight-system/microservice-common';

import { Ticket } from '../../models/ticket';

import { PartitionContext, ReceivedEventData } from '@azure/event-hubs';

export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
  readonly eventHubName = EventHubs.Tickets;
  readonly consumerGroup = ConsumerGroups.TicketCreated;

  constructor() {
    super(EventHubs.Tickets, ConsumerGroups.TicketCreated);
  }

  async onMessage(
    data: ITicketCreatedEvent['data'],
    context: PartitionContext,
    event: ReceivedEventData
  ) {
    console.log('created-Data: ', data);
    // console.log('Event: ', event);
    // console.log('Event context: ', context);

    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();
  }
}
