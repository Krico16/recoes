import { Response } from '../../domain/entities/Response';

/**
 * Port for Response repository operations.
 */
export interface IResponseRepository {
  /**
   * Finds a response by ID.
   * @param id - The response ID.
   * @returns The response or null if not found.
   */
  findById(id: string): Promise<Response | null>;

  /**
   * Finds responses by user ID.
   * @param userId - The user ID.
   * @returns An array of responses.
   */
  findByUserId(userId: string): Promise<Response[]>;

  /**
   * Saves a response.
   * @param response - The response to save.
   * @returns The saved response.
   */
  save(response: Response): Promise<Response>;

  /**
   * Deletes a response by ID.
   * @param id - The response ID.
   */
  delete(id: string): Promise<void>;
}