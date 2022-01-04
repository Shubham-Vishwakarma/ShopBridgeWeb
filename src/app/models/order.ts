import { Item } from "./item";

export interface Order {
  orderId: number,
  orderDate: Date,
  items: Item[]
}
