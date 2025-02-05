interface ShapeProperties {
	color: string;
	x: number;
	y: number;
}


abstract class Shape {
	
	constructor(public properties: ShapeProperties) {}

	abstract clone(): Shape;

	public getProperty(): ShapeProperties {
		return this.properties as ShapeProperties;
	}

}

class Rectangle extends Shape {
	constructor(public properties: ShapeProperties, public width: number, public height: number) {
		super(properties);
	}

	clone(): Shape {
	    return new Rectangle({ ...this.properties }, this.width, this.height);
	}

}

class Circle extends Shape {
	constructor(public properties: ShapeProperties, public radius: number) {
		super(properties);
	}

	clone(): Shape {
	    return new Circle({ ...this.properties }, this.radius);
	}
}

function getShapeProperties(shape: Shape) {
	return shape.getProperty();
}

const rectangle1 = new Rectangle({ color: "red", x: 10, y: 20 }, 100, 200);
const rectangle2 = rectangle1.clone();



const circle1 = new Circle({ color: 'blue', x: 30, y: 40 }, 50);
const circle2 = circle1.clone();

console.log(circle1.getProperty(), circle2.getProperty());