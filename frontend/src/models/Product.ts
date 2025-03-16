import { ProductType } from "./ProductType";

// 1.25 and 0.10 set as default variables if it fails to retrieve from .env file to avoid downtime
const TAX_RATE = parseFloat(process.env.REACT_APP_TAX_RATE || "1.25");
const DISCOUNT_RATE = parseFloat(process.env.REACT_APP_DISCOUNT_RATE || "0.10");

export class Product {
  public title: string;
  public imageUrl: string;
  public basePrice: number;
  public taxRate: number = TAX_RATE;
  public discountRate: number = DISCOUNT_RATE; // Updated to 10%
  public productType: ProductType;

  constructor(title: string, imageUrl: string, basePrice: number, productType: ProductType) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.basePrice = basePrice;
    this.productType = productType;
  }

  public getPrice(): number {
    return (this.basePrice * (1 - this.discountRate)) * this.taxRate;
  }

  public getPriceWithoutTaxes(): number {
    return this.basePrice * (1 - this.discountRate);
  }
}
