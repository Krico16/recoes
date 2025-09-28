import { User } from '../../domain/entities/User';

/**
 * Port for User repository operations.
 */
export interface IUserRepository {
  /**
   * Finds a user by ID.
   * @param id - The user ID.
   * @returns The user or null if not found.
   */
  findById(id: string): Promise<User | null>;

  /**
   * Finds a user by document number.
   * @param documentNumber - The document number.
   * @returns The user or null if not found.
   */
  findByDocumentNumber(documentNumber: string): Promise<User | null>;

  /**
   * Finds a user by email.
   * @param email - The email.
   * @returns The user or null if not found.
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Saves a user.
   * @param user - The user to save.
   * @returns The saved user.
   */
  save(user: User): Promise<User>;

  /**
   * Deletes a user by ID.
   * @param id - The user ID.
   */
  delete(id: string): Promise<void>;
}