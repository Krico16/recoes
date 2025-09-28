/**
 * Domain entity representing a Question in the educational system.
 */
export type QuestionType = 'MULTIPLE_CHOICE' | 'SINGLE_CHOICE' | 'TRUE_FALSE';

export class Question {
  private constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly type: QuestionType
  ) {}

  /**
   * Creates a new Question instance.
   * @param props - The properties to create the question.
   * @returns A new Question instance.
   */
  static create(props: {
    id: string;
    text: string;
    type: QuestionType;
  }): Question {
    return new Question(props.id, props.text, props.type);
  }

  /**
   * Reconstructs a Question from persistence data.
   * @param data - The data from the database.
   * @returns A Question instance.
   */
  static fromPersistence(data: {
    id: string;
    text: string;
    type: QuestionType;
  }): Question {
    return new Question(data.id, data.text, data.type);
  }
}