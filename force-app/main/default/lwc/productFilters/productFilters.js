import { LightningElement, wire } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";

// messageChannels
import { publish, MessageContext } from "lightning/messageService";
import FILTER_CHANNEL from "@salesforce/messageChannel/ProductFilterChannel__c";

// fields
import FAMILY_FIELD from "@salesforce/schema/Product2.Family";
import SIZES_FIELD from "@salesforce/schema/Product2.Sizes__c";
export default class ProductFilters extends LightningElement {
	families = [];
	minPrice;
	maxPrice;
	brand;
	size;

	@wire(getPicklistValues, {
		recordTypeId: "012000000000000AAA",
		fieldApiName: FAMILY_FIELD
	})
	familyPicklistValues;

	@wire(getPicklistValues, {
		recordTypeId: "012000000000000AAA",
		fieldApiName: SIZES_FIELD
	})
	sizesPicklistValues;

	@wire(MessageContext)
	messageContext;

	handleChange(event) {
		this[event.target.name] = event.detail.value;
		console.log(event.detail.value);
		this.publishChange();
	}

	publishChange() {
		const message = {
			filtersData: {
				families: this.families,
				minPrice: this.minPrice,
				maxPrice: this.maxPrice,
				size: this.size,
				brand: this.brand
			}
		};
		publish(this.messageContext, FILTER_CHANNEL, message);
	}
}
