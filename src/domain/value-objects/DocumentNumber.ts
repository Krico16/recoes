/**
 * Value object representing a Document Number.
 * Ensures document number format validation (e.g., alphanumeric, length).
 */
export class DocumentNumber {
  private constructor(public readonly value: string) {}

  /**
   * Creates a DocumentNumber instance if the value is valid.
   * @param value - The document number string.
   * @returns A DocumentNumber instance or throws an error.
   */
  static create(value: string): DocumentNumber {
    if (!DocumentNumber.isValid(value)) {
      throw new Error('Invalid document number format');
    }
    return new DocumentNumber(value.trim());
  }

  /**
   * Checks if the document number string is valid.
   * Assumes alphanumeric, 5-20 characters.
   * @param docNum - The document number string.
   * @returns True if valid, false otherwise.
   */
  private static isValid(docNum: string): boolean {
    const trimmed = docNum.trim();
    return /^[a-zA-Z0-9]{5,20}$/.test(trimmed);
  }

  /**
   * Returns the string representation of the document number.
   * @returns The document number value.
   */
  toString(): string {
    return this.value;
  }
}