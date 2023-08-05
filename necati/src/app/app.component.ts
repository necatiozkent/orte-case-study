import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Products } from "./interfaces/products.interface";
import { ProductDetails } from "./interfaces/productDetails.interface";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"]
})
export class AppComponent {
	title = "necati";
	URL = "../assets/product.json";
	productList: Products;
	productArray: ProductDetails[] = [];
	cartArray: ProductDetails[] = [];
	totalPrice = 0;
	discountCheck = false;

	constructor(
    private httpClient: HttpClient
	) {
		this.productList = {
			products: [],
			total: "0"
		};
	}

	ngOnInit() {
		this.httpClient.get(this.URL).subscribe(data => {
			this.productList = data as Products;
			const list = this.productList.products[0];

			for (const key in list) {
				const obj: ProductDetails = list[key];
				obj.name = key;
				this.productArray.push(obj);
			}
		});
	}

	addToCart(event: ProductDetails): void {
		this.cartArray.push(event);

		if (this.discountCheck) {
			this.totalPrice = this.totalPrice + +(event.price / 100) * 80;
		} else {
			this.totalPrice = this.totalPrice + +event.price;
		}
	}

	remove(index: number): void {

		if (this.discountCheck) {
			this.totalPrice = this.totalPrice - +(this.cartArray[index].price / 100) * 80;
		} else {
			this.totalPrice = this.totalPrice - +this.cartArray[index].price;
		}

		this.cartArray.splice(index, 1);
	}

	calcDiscount() {
		if (!this.discountCheck) {
			this.totalPrice = (this.totalPrice / 100) * 80;
			this.discountCheck = true;
		} else {
			this.totalPrice = (this.totalPrice / 100) * 125;
			this.discountCheck = false;
		}
	}

	pay(): void {
		const body = {
			price: this.totalPrice,
			products: this.cartArray
		};

		this.httpClient.post("somewhere", body);

		this.cartArray = [];
		this.totalPrice = 0;
	}
}
