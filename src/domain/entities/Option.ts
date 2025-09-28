/**
 * Domain entity representing an Option for a Question.
 */
export class Option {
  private constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly questionId: string
  ) {}

  /**
   * Creates a new Option instance.
   * @param props - The properties to create the option.
   * @returns A new Option instance.
   */
  static create(props: {
    id: string;
    text: string;
    questionId: string;
  }): Option {
    return new Option(props.id, props.text, props.questionId);
  }

  /**
   * Reconstructs an Option from persistence data.
   * @param data - The data from the database.
   * @returns An Option instance.
   */
  static fromPersistence(data: {
    id: string;
    text: string;
    questionId: string;
  }): Option {
    return new Option(data.id, data.text, data.questionId);
  }
}