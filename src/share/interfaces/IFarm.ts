/**
 * Interface representing a Farm entity
 * Contains basic farm information and identifier
 */
export interface IFarm {
  /** Unique identifier for the farm */
  id: number;
  /** Name of the farm */
  name: string;
  /** Physical address of the farm */
  address: string;
  /** Optional description of the farm */
  description?: string;
  /** Creation date of the farm record */
  createdAt?: string;
  /** Last update date of the farm record */
  updatedAt?: string;
}

/**
 * Interface for creating a new farm (without ID)
 */
export type CreateFarmDto = Omit<IFarm, 'id'>;

/**
 * Interface for updating an existing farm
 */
export type UpdateFarmDto = Partial<CreateFarmDto>;
