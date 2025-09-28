/**
 * Value object representing an Email address.
 * Ensures email format validation.
 */
export class Email {
  private constructor(public readonly value: string) {}

  /**
   * Creates an Email instance if the value is valid.
   * @param value - The email string.
   * @returns An Email instance or throws an error.
   */
  static create(value: string): Email {
    if (!Email.isValid(value)) {
      throw new Error('Invalid email format');
    }
    return new Email(value.toLowerCase().trim());
  }

  /**
   * Checks if the email string is valid.
   * @param email - The email string.
   * @returns True if valid, false otherwise.
   */
  private static isValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Returns the string representation of the email.
   * @returns The email value.
   */
  toString(): string {
    return this.value;
  }
}