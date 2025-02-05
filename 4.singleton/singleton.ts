/**
 * Singleton Pattern is a creational design pattern that ensures a class has only **one instance** 
 * and provides a global access point to that instance.
 *
 * 🔹 Key Features:
 *   - **Private Constructor:** Prevents direct instantiation.
 *   - **Static Instance Property:** Stores the single instance.
 *   - **Static Getter Method (`getInstance`):** Ensures only one instance is created and reused.
 *   - **Global Access:** Any part of the program can access this instance.
 */

class Singleton {
  // Holds the single instance of the class
  private static instance: Singleton;
  
  // Stores a shared value for demonstration purposes
  private static _value: number;

  /**
   * ❌ Private constructor prevents direct instantiation.
   * ✅ This forces the use of `getInstance()` to obtain the instance.
   */
  private constructor() {}

  /**
   * ✅ Static method to get the **single instance** of the class.
   * ✅ If the instance doesn't exist, it creates one.
   * ✅ Ensures that only one instance is shared globally.
   */
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  /**
   * ✅ Setter for `_value`
   * ✅ Stores a shared value that persists across the entire application.
   */
  set value(value: number) {
    Singleton._value = value;
  }

  /**
   * ✅ Getter for `_value`
   * ✅ Retrieves the stored value from the single instance.
   */
  get value(): number {
    return Singleton._value;
  }
}

// ✅ Getting the single instance of the Singleton class
const single1 = Singleton.getInstance();
single1.value = 20; // Setting a shared value

const single2 = Singleton.getInstance(); // Retrieving the same instance

// ✅ Output: Both instances return the same value because they reference the same object
console.log(single1.value, single2.value); // Output: 20 20

/**
 * 🔹 Why does `single2.value` return `20`?
 *    - Both `single1` and `single2` point to the same **Singleton instance**.
 *    - Changing `value` in `single1` affects `single2` because they share the same instance.
 *
 * ✅ This ensures that only one instance exists throughout the application.
 */
