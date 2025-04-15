/**
 * Enumeration of pet types supported in the application
 */
export enum PetType {
  DOG = 'DOG',
  CAT = 'CAT',
}

/**
 * Interface representing a Pet entity
 */
export interface IPet {
  /** Unique identifier for the pet */
  id: number | null;
  /** ID of the farm that owns this pet */
  farmId: number | null;
  /** Number of times the pet needs to be fed per day */
  feedingsPerDay: number;
  /** Birth date of the pet */
  birthDate: Date;
  /** Type of the pet (dog or cat) */
  type: PetType;
  /** Name of the pet */
  name: string;
  /** Optional breed of the pet */
  breed?: string;
  /** Optional color of the pet */
  color?: string;
  /** Optional database state tracking (new, modified, deleted) */
  dbState?: string;
}

/**
 * Interface for dog-specific attributes
 */
export interface IDog extends IPet {
  /** Number of bite incidents for the dog */
  numberOfBites: number;
  /** Whether the dog has been trained */
  isTrained: boolean;
}

/**
 * Interface for cat-specific attributes
 */
export interface ICat extends IPet {
  /** Number of kittens this cat has had */
  numberOfKittens: number;
  /** Whether the cat is sterilized */
  isSterilized: boolean;
}

/**
 * Interface for creating a new pet (without ID)
 */
export type CreatePetDto = Omit<IPet, 'id'>;

/**
 * Interface for updating an existing pet
 */
export type UpdatePetDto = Partial<IPet>;

/**
 * Interface for filtering pets
 */
export interface PetFilters {
  /** Filter by pet type */
  type?: PetType;
  /** Filter by farm ID */
  farmId?: number;
  /** Filter by minimum age */
  minAge?: number;
  /** Filter by maximum age */
  maxAge?: number;
  /** Search text for pet name */
  nameSearch?: string;
  /** Whether to include pets without a farm */
  includeUnassigned?: boolean;
}
