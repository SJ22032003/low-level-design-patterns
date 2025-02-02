/**
 * Dependency Inversion Principle (DIP) Example
 * 
 * DIP states that:
 * 1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
 * 2. Abstractions should not depend on details. Details should depend on abstractions.
 * 
 * In this example:
 * - `NotificationService` is the high-level module.
 * - `EmailService` and `SMSService` are low-level modules.
 * - `MessageService` is the abstraction (interface) that both depend on.
 */

// Step 1: Define the Abstraction (Interface)
// This interface acts as a contract for all message services.
interface MessageService {
  sendMessage(message: string): void;
}

// Step 2: Create Low-Level Modules (Concrete Implementations)
// These classes implement the `MessageService` interface.

/**
 * EmailService: Sends messages via email.
 */
class EmailService implements MessageService {
  email: string;

  // Constructor to initialize the email address.
  constructor(email: string) {
    this.email = email;
  }

  // Implementation of the `sendMessage` method for email.
  sendMessage(message: string): void {
    console.log(`Sending email to ${this.email}: ${message}`);
  }
}

/**
 * SMSService: Sends messages via SMS.
 */
class SMSService implements MessageService {
  phone: string;

  // Constructor to initialize the phone number.
  constructor(phone: string) {
    this.phone = phone;
  }

  // Implementation of the `sendMessage` method for SMS.
  sendMessage(message: string): void {
    console.log(`Sending SMS to ${this.phone}: ${message}`);
  }
}

// Step 3: Create the High-Level Module
// This class depends on the `MessageService` abstraction, not on specific implementations.

/**
 * NotificationService: Sends notifications using a message service.
 * It depends on the `MessageService` interface, adhering to DIP.
 */
class NotificationService {
  // Dependency is injected via the constructor.
  constructor(private readonly messageService: MessageService) {}

  // Method to send a notification using the injected message service.
  sendNotification(message: string) {
    this.messageService.sendMessage(message);
  }
}

// Step 4: Use Dependency Injection to Pass the Dependency
// Here, we inject the concrete implementations (`EmailService` and `SMSService`) into `NotificationService`.

// Create instances of the low-level modules.
const emailService = new EmailService('shobhitjaryal@email.com');
const smsService = new SMSService('90000-90000');

// Inject `EmailService` into `NotificationService`.
const notificationServiceToEmail = new NotificationService(emailService);
notificationServiceToEmail.sendNotification('Sending mail to email');

// Inject `SMSService` into `NotificationService`.
const notificationServiceToSMS = new NotificationService(smsService);
notificationServiceToSMS.sendNotification('Sending message to phone');