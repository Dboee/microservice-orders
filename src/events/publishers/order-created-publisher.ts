import {
  Publisher,
  IOrderCreatedEvent,
  ConsumerGroups,
  EventHubs,
} from '@delight-system/microservice-common';

export class OrderCreatedPublisher extends Publisher<IOrderCreatedEvent> {
  readonly eventHubName: EventHubs.Orders = EventHubs.Orders;
  readonly consumerGroup = ConsumerGroups.OrderCreated;

  constructor() {
    super(EventHubs.Orders, ConsumerGroups.OrderCreated);
  }
}
