import { Product } from "./Product";
import { ProductType } from "./ProductType";

export class SSD extends Product {
  constructor(title: string, imageUrl: string, basePrice: number) {
    super(title, imageUrl, basePrice, ProductType.SSD);
  }
}
