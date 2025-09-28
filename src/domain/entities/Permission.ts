/**
 * Domain entity representing a Permission in the system.
 * Permissions are assigned to roles.
 */
export class Permission {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  /**
   * Creates a new Permission instance.
   * @param props - The properties to create the permission.
   * @returns A new Permission instance.
   */
  static create(props: { id: string; name: string }): Permission {
    return new Permission(props.id, props.name);
  }

  /**
   * Reconstructs a Permission from persistence data.
   * @param data - The data from the database.
   * @returns A Permission instance.
   */
  static fromPersistence(data: { id: string; name: string }): Permission {
    return new Permission(data.id, data.name);
  }
}