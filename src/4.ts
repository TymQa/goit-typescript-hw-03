interface IKey {
  getSignature(): number;
}

class Key implements IKey {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  public getSignature(this: Key) {
    return this.signature;
  }
}

interface IPerson {
  getKey(): number;
}

class Person implements IPerson {
  constructor(private key: Key) {}

  public getKey(this: Person) {
    return this.key.getSignature();
  }
}

abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];

  constructor(protected key: Key) {}

  public comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    } else {
      throw new Error("Door is closed");
    }
  }

  public abstract openDoor(key: number): void;
}

class MyHouse extends House {
  public openDoor(key: number): void {
    if (key === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
