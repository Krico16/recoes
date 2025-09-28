/**
 * Domain entity representing a Role in the system.
 * Roles define permissions for users.
 */
export class Role {
  private constructor(
    public readonly id: string,
    public readonly name: string
  ) {}

  /**
   * Creates a new Role instance.
   * @param props - The properties to create the role.
   * @returns A new Role instance.
   */
  static create(props: { id: string; name: string }): Role {
    return new Role(props.id, props.name);
  }

  /**
   * Reconstructs a Role from persistence data.
   * @param data - The data from the database.
   * @returns A Role instance.
   */
  static fromPersistence(data: { id: string; name: string }): Role {
    return new Role(data.id, data.name);
  }
}