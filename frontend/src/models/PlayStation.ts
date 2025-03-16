import { Product } from "./Product";
import { ProductType } from "./ProductType";

export class PlayStation extends Product {
  constructor(title: string, imageUrl: string, basePrice: number) {
    super(title, imageUrl, basePrice, ProductType.PlayStation);
  }
}
