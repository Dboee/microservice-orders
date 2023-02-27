import {
  Publisher,
  IOrderCreatedEvent,
  ConsumerGroups,
  EventHubs,
} from '@delight-system/microservice-common';

export class OrderCreatedPublisher extends Publisher<IOrderCreatedEvent> {
  eventHubName: EventHubs.Orders;
  readonly consumerGroup = ConsumerGroups.OrderCreated;

  constructor() {
    const eventHubName = EventHubs.Orders;
    const consumerGroup = ConsumerGroups.OrderCreated;
    super(eventHubName, consumerGroup);
    this.eventHubName = eventHubName;
  }
}
