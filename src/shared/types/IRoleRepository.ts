import { Role } from '../../domain/entities/Role';

/**
 * Port for Role repository operations.
 */
export interface IRoleRepository {
  /**
   * Finds a role by ID.
   * @param id - The role ID.
   * @returns The role or null if not found.
   */
  findById(id: string): Promise<Role | null>;

  /**
   * Finds a role by name.
   * @param name - The role name.
   * @returns The role or null if not found.
   */
  findByName(name: string): Promise<Role | null>;

  /**
   * Saves a role.
   * @param role - The role to save.
   * @returns The saved role.
   */
  save(role: Role): Promise<Role>;

  /**
   * Gets all roles.
   * @returns Array of roles.
   */
  findAll(): Promise<Role[]>;
}