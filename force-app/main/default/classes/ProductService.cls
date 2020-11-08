public with sharing class ProductService {
	@AuraEnabled(cacheable=true)
	public static List<Product2> getProducts(
		String name,
		FilterWrapper filtersData
	) {
		String nameLike = '%' + name + '%';

		String query = 'SELECT Name, ImageUrl__c, Display_Price__c FROM Product2 WHERE Name like :nameLike';

		System.debug('name ' + name);
		System.debug('filtersData ' + filtersData);
		if (filtersData != null) {
			if (
				filtersData.families != null &&
				filtersData.families.size() > 0
			) {
				String[] families = filtersData.families;
				query += ' AND Family IN :families';
			}
			if (filtersData.minPrice != null) {
				Decimal minPrice = filtersData.minPrice;
				query += ' AND Display_Price__c >= :minPrice';
			}
			if (filtersData.maxPrice != null) {
				Decimal maxPrice = filtersData.maxPrice;
				query += ' AND Display_Price__c <= :maxPrice';
			}
			if (String.isNotBlank(filtersData.brand)) {
				String brand = filtersData.brand;
				query += ' AND Brand__c = :brand';
			}
			if (String.isNotBlank(filtersData.brand)) {
				String size = filtersData.size;
				query += ' AND Sizes__c = :size';
			}
		}
		return (Product2[]) Database.query(query);
	}

	public class FilterWrapper {
		@AuraEnabled
		public String[] families { get; set; }

		@AuraEnabled
		public Decimal minPrice { get; set; }

		@AuraEnabled
		public Decimal maxPrice { get; set; }

		@AuraEnabled
		public String brand { get; set; }

		@AuraEnabled
		public String size { get; set; }
	}
}