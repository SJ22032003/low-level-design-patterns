interface PersonRequirements {
  name: string;
  age: number;
  address: string;
  city: string;
  company: string;
  annualIncome: number;
}

class Person implements PersonRequirements {
  name: string = '';
  age: number = 0;
  address: string = '';
  city: string = '';
  company: string = '';
  annualIncome: number = 0;

  describe(): string {
    return `This person is ${this.name}, ${this.age} years old, lives in ${this.address}, works at ${this.company} and earns ${this.annualIncome} per year.`;
  }
}

// **Main Builder**
class PersonBuilder {
  private readonly person: Person;

  constructor() {
    this.person = new Person();
  }

  setName(name: string): this {
    this.person.name = name;
    return this;
  }

  setAge(age: number): this {
    this.person.age = age;
    return this;
  }

  get worksAt(): PersonWorkBuilder {
    return new PersonWorkBuilder(this, this.person);
  }

  get livesAt(): PersonAddressBuilder {
    return new PersonAddressBuilder(this, this.person);
  }

  build(): Person {
    return this.person;
  }
}

// **Facets (Sub-Builders)**
class PersonWorkBuilder {
  constructor(private builder: PersonBuilder, private person: Person) {}

  company(company: string): this {
    this.person.company = company;
    return this;
  }

  annualIncome(annualIncome: number): PersonBuilder {
    this.person.annualIncome = annualIncome;
    return this.builder; // Returns the main builder to continue chaining
  }
}

class PersonAddressBuilder {
  constructor(private builder: PersonBuilder, private person: Person) {}

  address(address: string): this {
    this.person.address = address;
    return this;
  }

  city(city: string): PersonBuilder {
    this.person.city = city;
    return this.builder; // Returns the main builder to continue chaining
  }
}

// **Usage**
const person = new PersonBuilder()
  .setName('Shobhit')
  .setAge(22)
  .worksAt.company('Atlassian').annualIncome(100000) // Returns main builder
  .livesAt.address('12 Main Street').city('San Francisco') // Returns main builder
  .build();

console.log(person.describe());
