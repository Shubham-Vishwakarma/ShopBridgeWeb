import { ItemPost } from "./item-post";

export interface OrderPost {
  customerId: number;
  items: ItemPost[];
}
