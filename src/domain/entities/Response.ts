/**
 * Domain entity representing a Response to a Question.
 */
export class Response {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly questionId: string,
    public readonly optionId: string,
    public readonly createdAt: Date
  ) {}

  /**
   * Creates a new Response instance.
   * @param props - The properties to create the response.
   * @returns A new Response instance.
   */
  static create(props: {
    id: string;
    userId: string;
    questionId: string;
    optionId: string;
  }): Response {
    const now = new Date();
    return new Response(props.id, props.userId, props.questionId, props.optionId, now);
  }

  /**
   * Reconstructs a Response from persistence data.
   * @param data - The data from the database.
   * @returns A Response instance.
   */
  static fromPersistence(data: {
    id: string;
    userId: string;
    questionId: string;
    optionId: string;
    createdAt: Date;
  }): Response {
    return new Response(data.id, data.userId, data.questionId, data.optionId, data.createdAt);
  }
}