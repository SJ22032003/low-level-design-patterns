/**
 Factory Design Pattern (Simple Explanation) 🚀
The Factory Pattern is used when creating objects without specifying their exact class. Instead of using new ClassName(), we use a factory function or class to create the object.

🔹 Why Use the Factory Pattern?
✅ Encapsulation – Hides object creation details.
✅ Flexibility – Can return different objects based on conditions.
✅ Better Maintainability – Easily extend by adding new types.
✅ Testability – Easier to mock the factory for testing.

 * */

// 1️⃣ Define a common interface for all Vehicles
interface Vehicle {
	drive(): void;
	clean(): void;
}

// 2️⃣ Concrete Vehicle Classes implementing the interface
class Car implements Vehicle {
	constructor() { console.log('creating new car') } // Logs when a car is created
	drive(): void {
		console.log('Car driving');
	}
	clean(): void {
		console.log('Car cleaning');
	}
}

class Truck implements Vehicle {
	drive(): void {
	    console.log('Truck driving');
	}
	clean(): void {
		console.log('Truck cleaning');
	}
}

class Bike implements Vehicle {
	drive(): void {
	    console.log('Bike driving');
	}
	clean(): void {
		console.log('Bike cleaning');
	}
}

// 3️⃣ Abstract Factory class that provides a blueprint for vehicle factories
abstract class VehicleFactory {

	// Stores the created vehicle instance (ensures only one instance per factory)
	private v: Vehicle | null = null;

	// Abstract method to be implemented by concrete factories
	abstract createVehicle(): Vehicle;

	// Getter to return the same vehicle instance (creates only if not already created)
	get vehicle(): Vehicle {
		if (!this.v) {
			this.v = this.createVehicle(); // Creates the vehicle only once
		}
		return this.v;
	}

	// Methods to interact with the vehicle
	driveVehicle() {
		this.vehicle.drive(); // Calls drive() on the stored vehicle instance
	}

	cleanVehicle() {
		this.vehicle.clean(); // Calls clean() on the stored vehicle instance
	}
}

// 4️⃣ Concrete Factories that create specific vehicle types
class CarFactory extends VehicleFactory {
	createVehicle(): Car {
	    return new Car(); // Creates a new Car instance
	}
}

class TruckFactory extends VehicleFactory {
	createVehicle(): Truck {
	    return new Truck(); // Creates a new Truck instance
	}
}

class BikeFactory extends VehicleFactory {
	createVehicle(): Bike {
	  	return new Bike(); // Creates a new Bike instance
	}
}

// 5️⃣ Functions that operate on any VehicleFactory instance
function vehicleToDrive(vehicle: VehicleFactory) {
	vehicle.driveVehicle(); // Calls driveVehicle() from the factory
}

function vehicleToClean(vehicle: VehicleFactory) {
	vehicle.cleanVehicle(); // Calls cleanVehicle() from the factory
}

// 6️⃣ Creating instances of different vehicle factories
const car = new CarFactory();
const truck = new TruckFactory();
const bike = new BikeFactory();

// 7️⃣ Using the factory to interact with the vehicles
vehicleToDrive(car);  // 🚗 "creating new car" (only once) + "Car driving"
vehicleToClean(car);  // 🧽 "Car cleaning"

vehicleToDrive(truck);  // 🚛 "Truck driving"
vehicleToClean(truck);  // 🧽 "Truck cleaning"

vehicleToDrive(bike);  // 🏍 "Bike driving"
vehicleToClean(bike);  // 🧽 "Bike cleaning"
