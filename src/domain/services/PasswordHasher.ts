import bcrypt from 'bcrypt';

/**
 * Domain service for password hashing and verification.
 */
export class PasswordHasher {
  private static readonly SALT_ROUNDS = 10;

  /**
   * Hashes a plain password.
   * @param password - The plain password.
   * @returns The hashed password.
   */
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Verifies a plain password against a hash.
   * @param password - The plain password.
   * @param hash - The hashed password.
   * @returns True if matches, false otherwise.
   */
  static async verify(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}