import mongoose from 'mongoose';
import { OrderStatus } from '@delight-system/microservice-common';
import { ITicketDoc as TicketDoc } from './ticket';

// An interface that describes what it takes to create a user
interface IOrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

// An interface that describes what the whole collection of users looks like
// And methods that can be called on the collection of users
interface IOrderModel extends mongoose.Model<IOrderAttrs> {
  build(attrs: IOrderAttrs): IOrderDoc;
}

// An interface that describes the properties a user document has
interface IOrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

// This is a mongoose model, and has nothing to do with typescript
// You can tell the difference because the type is Capitalized
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    // This is a mongoose option that tells it to use the toJSON method
    // when converting the document to JSON to send to the client
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// This makes sure that the user is created with the correct properties
// and that the properties are of the correct type
// it is a static method, so it is called on the model itself
orderSchema.statics.build = (attrs: IOrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<IOrderDoc, IOrderModel>('Order', orderSchema);

export { Order, OrderStatus };
