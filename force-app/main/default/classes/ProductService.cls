public with sharing class ProductService {
	@AuraEnabled(cacheable=true)
	public static List<Product2> getProducts(String name) {
		String nameLike = '%' + name + '%';
		return [
			SELECT Name, ImageUrl__c, Display_Price__c
			FROM Product2
			WHERE Name LIKE :nameLike
		];
	}
}
