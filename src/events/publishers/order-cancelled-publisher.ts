import {
  Publisher,
  IOrderCancelledEvent,
  ConsumerGroups,
  EventHubs,
} from '@delight-system/microservice-common';

export class OrderCancelledPublisher extends Publisher<IOrderCancelledEvent> {
  readonly eventHubName: EventHubs.Orders = EventHubs.Orders;
  readonly consumerGroup = ConsumerGroups.OrderCancelled;

  constructor() {
    super(EventHubs.Orders, ConsumerGroups.OrderCancelled);
  }
}
