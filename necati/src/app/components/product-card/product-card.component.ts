import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ProductDetails } from "src/app/interfaces/productDetails.interface";

@Component({
	selector: "product-card",
	templateUrl: "./product-card.component.html",
	styleUrls: ["./product-card.component.scss"]
})
export class ProductCardComponent {
    
  @Input() product!: ProductDetails;
  @Output() sendProduct = new EventEmitter<ProductDetails>();

  addToCart(): void {
  	this.sendProduct.emit(this.product);
  }
}
