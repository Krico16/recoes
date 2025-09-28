import { Question } from '../../domain/entities/Question';
import { Option } from '../../domain/entities/Option';

/**
 * Port for Question repository operations.
 */
export interface IQuestionRepository {
  /**
   * Finds a question by ID.
   * @param id - The question ID.
   * @returns The question or null if not found.
   */
  findById(id: string): Promise<Question | null>;

  /**
   * Finds all questions.
   * @returns An array of questions.
   */
  findAll(): Promise<Question[]>;

  /**
   * Finds all questions with their options.
   * @returns An array of questions with options.
   */
  findAllWithOptions(): Promise<{ question: Question; options: Option[] }[]>;

  /**
   * Saves a question.
   * @param question - The question to save.
   * @returns The saved question.
   */
  save(question: Question): Promise<Question>;

  /**
   * Deletes a question by ID.
   * @param id - The question ID.
   */
  delete(id: string): Promise<void>;
}