import { Permission } from '../../domain/entities/Permission';

/**
 * Port for Permission repository operations.
 */
export interface IPermissionRepository {
  /**
   * Finds a permission by ID.
   * @param id - The permission ID.
   * @returns The permission or null if not found.
   */
  findById(id: string): Promise<Permission | null>;

  /**
   * Finds a permission by name.
   * @param name - The permission name.
   * @returns The permission or null if not found.
   */
  findByName(name: string): Promise<Permission | null>;

  /**
   * Saves a permission.
   * @param permission - The permission to save.
   * @returns The saved permission.
   */
  save(permission: Permission): Promise<Permission>;

  /**
   * Gets all permissions.
   * @returns Array of permissions.
   */
  findAll(): Promise<Permission[]>;
}