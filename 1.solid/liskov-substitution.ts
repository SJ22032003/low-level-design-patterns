/**
 The Liskov Substitution Principle (LSP) is one of the five SOLID principles of object-oriented design. It states that:

"Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program."

In other words, if a class B is a subclass of class A, then you should be able to replace A with B without breaking the behavior of the program. This ensures that the subclass adheres to the contract defined by the superclass.

 * */

// Example 1 BREAKING LSP
class InCorrentRectangle {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class InCorrectSquare extends InCorrentRectangle {
  constructor(size: number) {
    super(size, size);
  }

  setWidth(width: number): void {
    this.width = width;
    this.height = width; // Violation: Changing height as well
  }

  setHeight(height: number): void {
    this.height = height;
    this.width = height; // Violation: Changing width as well
  }
}

// Client code
function printArea(rectangle: InCorrentRectangle): void {
  rectangle.setWidth(4);
  rectangle.setHeight(5);
  console.log(`Area: ${rectangle.getArea()}`);
}

const incorrectRectangle = new InCorrentRectangle(10, 20);
printArea(incorrectRectangle); // Output: Area: 20 (correct)

const incorrectSquare = new InCorrectSquare(10);
printArea(incorrectSquare); // Output: Area: 25 (incorrect, violates LSP)


// ------------------------------------------------------------------- //


// Example 2 FIXING LSP
abstract class Shape {
	abstract getArea(): number;
}

class Rectangle implements Shape {
	protected w: number;
	protected h: number;
	constructor(width: number, height: number) {
		this.w = width;
		this.h = height;
	}

	set width(value: number) {
		this.w = value;
	}

	set height(value: number) {
		this.h = value;
	}

	getArea(): number {
	    return this.w * this.h;
	}

}

class Square implements Shape {
	private s: number;
	constructor (size: number) {
		this.s = size;
	}

	set size(size: number) {
		this.s = size;
	}

	getArea(): number {
	    return this.s * this.s;
	}

}

function getShapeArea(shape: Shape) {
	return shape.getArea();
}

const rectangle = new Rectangle(10, 20);
const square = new Square(10);

console.log("Correct Area of Rectangle", getShapeArea(rectangle));
console.log("Correct Area of Square", getShapeArea(square));
