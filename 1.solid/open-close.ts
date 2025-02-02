// OPEN-CLOSE PRINCIPLE
// OPEN for extension, CLOSE for modification
// THIS MEANS THAT THE CLASS SHOULD BE OPEN FOR EXTENSION BUT CLOSED FOR MODIFICATION
// BY EXTENSION, WE MEAN THAT WE SHOULD BE ABLE TO ADD NEW FUNCTIONALITY TO THE CLASS WITHOUT CHANGING THE EXISTING CODE
// BY MODIFICATION, WE MEAN THAT WE SHOULD NOT CHANGE THE EXISTING CODE TO ADD NEW FUNCTIONALITY

const colors = Object.freeze({
	red: 'red',
	green: 'green',
	blue: 'blue'
});

const sizes = Object.freeze({
	small: 'small',
	medium: 'medium',
	large: 'large'
});

class Product {

	name: string;
	color: keyof typeof colors;
	size: keyof typeof sizes;

	constructor(name: string, color: keyof typeof colors, size: keyof typeof sizes) {
		this.name = name;
		this.color = color;
		this.size = size;
	}
}

const tShirt = new Product('red lg tshirt', colors.red, sizes.large);
const tShirt2 = new Product('green sm tshirt', colors.green, sizes.small);
const tShirt3 = new Product('blue md tshirt', colors.blue, sizes.medium);
const tShirt4 = new Product('blue lg tshirt', colors.blue, sizes.large);

const products: Product[] = [tShirt, tShirt2, tShirt3, tShirt4];

// NOW WE DON'T WANT TO CREATE A CLASS THAT WILL HAVE ALL TYPES OF FILTERS
// BASED ON ALL THE FILTERING CRITERIA
// INSTEAD WE WILL CREATE CLASSES THAT WILL HAVE A METHOD THAT WILL FILTER THE PRODUCTS BASED ON SPECIFIC CRITERIA

// SPECIFICATION PATTERN

// WE WILL CREATE A CLASS THAT WILL HAVE A METHOD THAT WILL FILTER THE PRODUCTS BASED ON SPECIFIC CRITERIA
abstract class Specification {
	abstract isSatisfied(item: Product): boolean;
}

class ColorSpecification implements Specification {
	color: keyof typeof colors;

	constructor(color: keyof typeof colors) {
		this.color = color;
	}

	isSatisfied(item: Product) {
		return item.color === this.color;
	}

}

class SizeSpecification implements Specification {
	size: keyof typeof sizes;

	constructor(size: keyof typeof sizes) {
		this.size = size;
	}

	isSatisfied(item: Product) {
		return item.size === this.size;
	}
}

// NOW WE WILL CREATE A CLASS THAT WILL FILTER THE PRODUCTS BASED ON SPECIFIC CRITERIA
class BetterFilter {
	constructor() {}

	filter(items: Product[], spec: Specification) {
		return items.filter(item => spec.isSatisfied(item));
	}

}

const betterFilter = new BetterFilter();

console.log('Green products:');
for (const product of betterFilter.filter(products, new ColorSpecification(colors.green))) {
	console.log(` - ${product.name} is green`);
}


// BUT WHAT IF WE WANT TO FILTER PRODUCTS BASED ON MULTIPLE CRITERIA
// WE WILL CREATE A CLASS THAT WILL COMBINE THOSE SPECIFICATIONS

class AndSpecification implements Specification {
	specs: Specification[];

	constructor(...specs: Specification[]) {
		this.specs = specs;
	}

	isSatisfied(item: Product) {
		return this.specs.every(spec => spec.isSatisfied(item));
	}
}

class OrSpecification implements Specification {
	specs: Specification[];

	constructor(...specs: Specification[]) {
		this.specs = specs;
	}

	isSatisfied(item: Product) {
		return this.specs.some(spec => spec.isSatisfied(item));
	}
}

// NOW IF WE WANT A SHIRT THAT IS COLOR "BLUE" AND SIZE IS "LARGE"
/** const andSpecification = new AndSpecification(
 		new ColorSpecification(colors.blue),
 		new SizeSpecification(sizes.large)
 	)
*/ 

for(const product of betterFilter.filter(products, new AndSpecification(
	new ColorSpecification(colors.blue),
	new SizeSpecification(sizes.large)
	))) {
	console.log(` - ${product.name} is blue and large`);
}

// NOW IF WE WANT A SHIRT THAT IS COLOR "BLUE" OR SIZE IS "LARGE"
/** const orSpecification = new OrSpecification(
 		new ColorSpecification(colors.blue),
 		new SizeSpecification(sizes.large)
 	)
*/

for(const product of betterFilter.filter(products, new OrSpecification(
	new ColorSpecification(colors.blue),
	new SizeSpecification(sizes.large)
	))) {
	console.log(` - ${product.name} is blue or large`);
}

// NOW WE CAN ADD NEW SPECIFICATIONS WITHOUT CHANGING THE EXISTING CODE