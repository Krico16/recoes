/**
 * Domain entity representing a User in the educational system.
 * Follows Clean Code principles and encapsulates user data and behavior.
 */
export class User {
  private constructor(
    public readonly id: string,
    public readonly documentNumber: string,
    public readonly fullName: string,
    public readonly email: string | null,
    public readonly passwordHash: string,
    public readonly roleId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  /**
   * Creates a new User instance.
   * @param props - The properties to create the user.
   * @returns A new User instance.
   */
  static create(props: {
    id: string;
    documentNumber: string;
    fullName: string;
    email: string | null;
    passwordHash: string;
    roleId: string;
  }): User {
    const now = new Date();
    return new User(
      props.id,
      props.documentNumber,
      props.fullName,
      props.email,
      props.passwordHash,
      props.roleId,
      now,
      now
    );
  }

  /**
   * Reconstructs a User from persistence data.
   * @param data - The data from the database.
   * @returns A User instance.
   */
  static fromPersistence(data: {
    id: string;
    documentNumber: string;
    fullName: string;
    email: string | null;
    passwordHash: string;
    roleId: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User(
      data.id,
      data.documentNumber,
      data.fullName,
      data.email,
      data.passwordHash,
      data.roleId,
      data.createdAt,
      data.updatedAt
    );
  }
}