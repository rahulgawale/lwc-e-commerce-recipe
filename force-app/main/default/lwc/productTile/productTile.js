import { LightningElement } from "lwc";

export default class ProductTile extends LightningElement {
	/* 
		To show the image, upload your image a file,
		copy a version id of that file and replace it with 0682w000003WjJ6
	*/

	// these all are private properties which can't be accessed by other component.
	imageUrl = "/sfc/servlet.shepherd/version/download/0682w000003WjJ6";
	productName = "Salesforce Golden Hoody T-shirt";
	price = 100;
	description =
		"<b>Welcome to LWC Live code session!</b> <i>I love pasta!!</i><br/> This is the blah blah blah blah!!!!";

	quantity = 1;

	handleClick() {
		console.log("Yae!!! Button Clicked!!");
	}

	handleChange(event) {
		this.quantity = event.target.value;
		console.log("Yae!!! We got new qty!!");
	}

	/* 
		getter to get the backgroundStyle to show image as a background.
		this is reactive and called every time the imageUrl is changed.
	*/
	get backgroundStyle() {
		return `background-image:url(${this.imageUrl})`;
	}
}
