/**
The Builder Design Pattern is a creational design pattern that separates the 
construction of a complex object from its representation. It allows you to 
create an object step-by-step, providing flexibility and control over the 
construction process. This pattern is particularly useful when:

The object has many optional parameters or configurations.

The construction process is complex or involves multiple steps.

You want to create different representations of the same object.

 * */

// Defining an interface for House requirements
interface HouseRequirements {
	roof: 'pointed' | 'flat'; // Type of roof
	door: 'single' | 'double'; // Type of door
	material: 'brick' | 'wood'; // Material of the house 
	stories: number; // Number of stories in the house
}

// House class implementing the HouseRequirements interface
class House implements HouseRequirements {
	roof: 'pointed' | 'flat';
	door: 'single' | 'double';
	material: 'brick' | 'wood';
	stories: number;

	// Constructor accepts a HouseBuilder instance to set properties
	constructor(private readonly builder: HouseBuilder) {
		this.roof = builder.roof;
		this.door = builder.door;
		this.material = builder.material;
		this.stories = builder.stories;
	}

	// Method to describe the house
	describe(): string {
		return `This house has a ${this.roof} roof, ${this.door} door, ${this.material} material and ${this.stories} stories`;
	}
}

// Interface for builder functions to set properties step by step
interface HouseBuilderFunctions {
	setRoof(roof: 'pointed' | 'flat'): HouseBuilder;
	setDoor(door: 'single' | 'double'): HouseBuilder;
	setMaterial(material: 'brick' | 'wood'): HouseBuilder;
	setStories(stories: number): HouseBuilder;
	build(): House;
}

// Builder class for constructing a House step by step
class HouseBuilder implements HouseRequirements, HouseBuilderFunctions {
	// Default values
	roof: 'pointed' | 'flat' = 'pointed';
	door: 'single' | 'double' = 'single';
	material: 'brick' | 'wood' = 'brick';
	stories: number = 1;

	// Methods to update each property and return the builder instance for chaining
	setRoof(roof: 'pointed' | 'flat'): HouseBuilder {
		this.roof = roof;
		return this;
	}

	setDoor(door: 'single' | 'double'): HouseBuilder {
		this.door = door;
		return this;
	}

	setMaterial(material: 'brick' | 'wood'): HouseBuilder {
		this.material = material;
		return this;
	}

	setStories(stories: number): HouseBuilder {
		this.stories = stories;
		return this;
	}

	// Final method to build the house
	build(): House {
		return new House(this);
	}
}

// Creating a house using the builder pattern with method chaining
const houseToCreate = new HouseBuilder()
	.setRoof('pointed')
	.setDoor('double')
	.setMaterial('wood')
	.setStories(2);

const house = houseToCreate.build();

// Output the house description
console.log(house.describe()); // "This house has a pointed roof, double door, wood material and 2 stories"

// Director class to predefine house-building logic
class HouseDirector {
	constructor(private readonly builder: HouseBuilder) {}

	// Method to create a predefined 2-story wooden house
	create2StoryWoodenHouse(): House {
		return this.builder
			.setRoof('pointed')
			.setDoor('double')
			.setMaterial('wood')
			.setStories(2)
			.build();
	}

	// Method to create a predefined 1-story brick house
	create1StoryBrickHouse(): House {
		return this.builder
			.setRoof('flat')
			.setDoor('single')
			.setMaterial('brick')
			.setStories(1)
			.build();
	}

	// Method to create a predefined 3-story brick house
	create3StoryBrickHouse(): House {
		return this.builder
			.setRoof('flat')
			.setDoor('single')
			.setMaterial('brick')
			.setStories(3)
			.build();
	}
}

// Using the director to create a predefined 1-story brick house
const my1StoryWoodenHouse = new HouseDirector(new HouseBuilder()).create1StoryBrickHouse();

console.log(my1StoryWoodenHouse.describe()); // "This house has a flat roof, single door, brick material and 1 stories"
