import { triggerAsyncId } from "async_hooks";

export class Product {
  constructor(private id: string, private name: string) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }
}

export interface ProductInputDTO {
  name: string;
}
