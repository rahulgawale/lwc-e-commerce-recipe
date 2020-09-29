import { LightningElement } from "lwc";
export default class ProductSearchForm extends LightningElement {
	handleSearchKeyChange(event) {
		this.dispatchEvent(
			new CustomEvent("search", {
				detail: { searchKey: event.target.value }
			})
		);
	}
}
