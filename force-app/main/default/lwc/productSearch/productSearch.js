import { LightningElement, wire, track } from "lwc";

// messageChannels
import {
	subscribe,
	unsubscribe,
	MessageContext
} from "lightning/messageService";
import FILTER_CHANNEL from "@salesforce/messageChannel/ProductFilterChannel__c";

// apex
import getProducts from "@salesforce/apex/ProductService.getProducts";

export default class ProductSearch extends LightningElement {
	searchKey = "";
	subscription = null;
	receivedMessage;
	
	@track filtersData = {};
	
	@wire(getProducts, { name: "$searchKey", filtersData: "$filtersData" })
	wiredProducts;

	@wire(MessageContext)
	messageContext;

	connectedCallback() {
		this.subscribeMC();
	}

	disconnectedCallback() {
		this.unsubscribeMC();
	}

	handleSearch(event) {
		this.searchKey = event.detail.searchKey;
	}

	subscribeMC() {
		if (this.subscription) {
			return;
		}
		this.subscription = subscribe(
			this.messageContext,
			FILTER_CHANNEL,
			(message) => {
				console.log("message " + JSON.stringify(message));
				this.filtersData = message.filtersData;
			}
		);
	}

	unsubscribeMC() {
		unsubscribe(this.subscription);
		this.subscription = null;
	}
}
