/**
 * ✅ Prototype Pattern - Creational Design Pattern
 * 
 * 🔹 This pattern is used to create **clones** (copies) of objects 
 *    without relying on their concrete class.
 * 🔹 Instead of creating a new object from scratch, we **copy an existing object**.
 * 🔹 It allows for performance optimization when object creation is expensive.
 */

/**
 * 🔹 Interface defining the structure of user details.
 */
interface UserDetails {
	name: string;
	age: number;
	email: string;
}

/**
 * 🔹 Prototype Interface: Defines the contract for cloning objects.
 *    - `clone()`: Creates and returns a copy of the object.
 *    - `getUserDetails()`: Retrieves user details.
 */
interface Prototype {
	clone(): Prototype; // ✅ `this` ensures the return type is the same class instance.
	getUserDetails(): UserDetails;
	setEmail(email: string): void;
}

/**
 * ✅ ConcretePrototype Class: Implements the Prototype interface.
 *    - Stores `user` details and provides a cloning method.
 */
class ConcretePrototype implements Prototype {

	constructor(public user: UserDetails) {}

	/**
	 * ✅ Clones the current instance using `Object.create()`.
	 * ⚠️ WARNING: This creates a **shallow copy**.
	 *    - The `user` object is copied using `{ ...this.user }`, which avoids reference sharing.
	 *    - If `user` contained **nested objects**, they would still be **referenced**, not cloned.
	 */
	clone(): Prototype {
		const clone = Object.create(this);
		clone.user = { ...this.user }; // ✅ Creates a **shallow copy** of `user`
		return clone;
	}

	/**
	 * ✅ Returns the user details.
	 */
	getUserDetails(): UserDetails {
	    return this.user;
	}

	setEmail(email: string) {
		this.user.email = email;
	}

}

// ✅ Creating an instance of ConcretePrototype
const user1 = new ConcretePrototype({ name: "Shobhit", age: 22, email: "sj@gmail.com" });

// ✅ Cloning the user1 object
const user2 = user1.clone();

console.log(user1.getUserDetails(), user2.getUserDetails());
// Output: Both objects have the same user details

console.log(user1 === user2); // Output: false (They are different objects)

// ✅ Modifying the email of user2
user2.setEmail("alex@gmail.com");

console.log(user1.getUserDetails(), user2.getUserDetails());
// Output: user1's email remains "sj@gmail.com", user2's email is now "alex@gmail.com"
// ✅ Because we used `{ ...this.user }`, a **shallow copy** was created, not a deep copy.

