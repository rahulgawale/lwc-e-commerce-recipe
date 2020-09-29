import { LightningElement, wire } from "lwc";
import getProducts from "@salesforce/apex/ProductService.getProducts";
export default class ProductSearch extends LightningElement {
	searchKey;
	handleSearch(event) {
		this.searchKey = event.detail.searchKey;
	}

	@wire(getProducts, { name: "$searchKey" })
	wiredProducts;
}
