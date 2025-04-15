import { IPet, PetType } from '../interfaces/IPet';

/**
 * Dog model class implementing the IPet interface
 * Represents a dog in the PetFarm application
 */
export class Dog implements IPet {
  /** Unique identifier */
  public id: number | null;
  /** Number of bite incidents this dog has had */
  public numberOfBites: number;
  /** Dog's name */
  public name: string;
  /** Birth date of the dog */
  public birthDate: Date;
  /** ID of the farm this dog belongs to */
  public farmId: number | null;
  /** Number of times per day this dog needs to be fed */
  public feedingsPerDay: number;
  /** Type of pet - always DOG for this class */
  public readonly type: PetType;
  /** The dog's breed */
  public breed?: string;
  /** Whether the dog has been trained */
  public isTrained: boolean;

  /**
   * Creates a new Dog instance with default values
   */
  constructor() {
    this.id = null;
    this.numberOfBites = 0;
    this.name = '';
    this.birthDate = new Date();
    this.farmId = null;
    this.feedingsPerDay = 3;
    this.type = PetType.DOG;
    this.isTrained = false;
  }

  /**
   * Calculate the age of the dog in years
   * @returns Age in years
   */
  public getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust age if birthday hasn't occurred yet this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  /**
   * Map legacy properties to the new property names for backward compatibility
   * This is needed during the transition period as we update the codebase
   */
  public get pocetUhriznuti(): number {
    return this.numberOfBites;
  }

  public set pocetUhriznuti(value: number) {
    this.numberOfBites = value;
  }

  public get datumNarodenia(): Date {
    return this.birthDate;
  }

  public set datumNarodenia(value: Date) {
    this.birthDate = value;
  }

  public get petOwnerId(): number | null {
    return this.farmId;
  }

  public set petOwnerId(value: number | null) {
    this.farmId = value;
  }

  public get pocetKrmeni(): number {
    return this.feedingsPerDay;
  }

  public set pocetKrmeni(value: number) {
    this.feedingsPerDay = value;
  }
}
