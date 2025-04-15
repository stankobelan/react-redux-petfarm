import { IPet, PetType } from '../interfaces/IPet';

/**
 * Cat model class implementing the IPet interface
 * Represents a cat in the PetFarm application
 */
export class Cat implements IPet {
  /** Unique identifier */
  public id: number | null;
  /** Number of kittens this cat has had */
  public numberOfKittens: number;
  /** Cat's name */
  public name: string;
  /** Birth date of the cat */
  public birthDate: Date;
  /** Database state tracking (e.g., new, modified, deleted) */
  public dbState: string;
  /** ID of the farm this cat belongs to */
  public farmId: number | null;
  /** Number of times per day this cat needs to be fed */
  public feedingsPerDay: number;
  /** Type of pet - always CAT for this class */
  public readonly type: PetType;
  /** Whether the cat is sterilized */
  public isSterilized: boolean;
  /** The cat's color */
  public color?: string;

  /**
   * Creates a new Cat instance with default values
   */
  constructor() {
    this.id = null;
    this.numberOfKittens = 0;
    this.name = '';
    this.birthDate = new Date();
    this.dbState = '';
    this.farmId = null;
    this.feedingsPerDay = 2;
    this.type = PetType.CAT;
    this.isSterilized = false;
  }

  /**
   * Calculate the age of the cat in years
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
  public get pocetMaciatok(): number {
    return this.numberOfKittens;
  }

  public set pocetMaciatok(value: number) {
    this.numberOfKittens = value;
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
