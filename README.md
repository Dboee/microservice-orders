# microservice-orders

| Route           | Method | Body                | Purpose                                                          |
| --------------- | ------ | ------------------- | ---------------------------------------------------------------- |
| /api/orders     | GET    | -                   | Retrieve all active orders for the given user making the request |
| /api/orders/:id | GET    | -                   | Get details about a spesific order                               |
| /api/orders     | POST   | {ticketId: string } | Create an order to purchase the specified ticket                 |
| /api/orders/:id | DELETE |                     | Cancel the order                                                 |
