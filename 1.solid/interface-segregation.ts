/**
Interface Segregation Principle (ISP)
The Interface Segregation Principle (ISP) is one of the five SOLID principles of object-oriented design. It states that:

"Clients should not be forced to depend on interfaces they do not use."

In simpler terms, ISP encourages creating small, specific interfaces instead of large, general-purpose ones. This ensures that classes only need to implement the methods that are relevant to them, making the system more modular, maintainable, and easier to understand.
 * */

// EXPLAIN 1 BREAKING ISP
/**
 * LETS SUPPOSE YOU HAVE 2 PRINTERS
 * ONE IS MORDERN PRINTER THAT CAN PRINT, FAX, SCAN
 * ANOTHER ONE OLD AND CAN ONLY PRINT
 * BREAKING ISP WOULD MEAN CREATING SINGLE IMPLEMENTATION WITH ALL THESE FUNCTIONS TO BOTH MORDERN AND OLD PRINTER
 * */

abstract class InCorrectPrinter {
	abstract print(): void;
	abstract fax(): void;
	abstract scan(): void;
}

class IncorrectMordernPrinter implements InCorrectPrinter {
	print(): void {
		console.log('Print');
	}

	fax(): void {
		console.log('Fax');
	}

	scan(): void {
		console.log('Scan');
	}
}

class IncorrectOldPrinter implements InCorrectPrinter {
	print(): void {
		console.log('Print');
	}

	// does not support fax
	fax(): void {
		throw new Error('Not Supported');
	}

	// does not support scan
	scan(): void {
		throw new Error('Not Supported');
	}
}


// ---------------------------------------------------------------- //

// EXPLAIN 2 FOLLOWING ISP

abstract class Print {
	abstract print(): void;
}
abstract class Scan {
	abstract scan(): void;
}
abstract class Fax {
	abstract fax(): void;
}

// Now we can create separate interfaces for each functionality
class MorderPrinter implements Print, Scan, Fax {
	print(): void {
		console.log('Print');
	}

	fax(): void {
		console.log('Fax');
	}

	scan(): void {
		console.log('Scan');
	}
}

// Old printer only implements the Print interface
class OldPrinter implements Print {
	print(): void {
		console.log('Print');
	}
}


/**
 * 1. Avoid massive and fat interfaces that contain more methods than the implementing classes need.
 * 
 * 2. Split large interfaces into smaller, more specific ones that are tailored to the needs of the implementing classes.
 * */