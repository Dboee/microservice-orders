import {
  Publisher,
  IOrderCancelledEvent,
  ConsumerGroups,
  EventHubs,
} from '@delight-system/microservice-common';

export class OrderCancelledPublisher extends Publisher<IOrderCancelledEvent> {
  eventHubName: EventHubs.Orders;
  readonly consumerGroup = ConsumerGroups.OrderCancelled;

  constructor() {
    const eventHubName = EventHubs.Orders;
    const consumerGroup = ConsumerGroups.OrderCancelled;
    super(eventHubName, consumerGroup);
    this.eventHubName = eventHubName;
  }
}
