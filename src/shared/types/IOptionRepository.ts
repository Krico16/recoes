import { Option } from '../../domain/entities/Option';

/**
 * Port for Option repository operations.
 */
export interface IOptionRepository {
  /**
   * Finds an option by ID.
   * @param id - The option ID.
   * @returns The option or null if not found.
   */
  findById(id: string): Promise<Option | null>;

  /**
   * Finds all options for a question.
   * @param questionId - The question ID.
   * @returns An array of options.
   */
  findByQuestionId(questionId: string): Promise<Option[]>;

  /**
   * Saves an option.
   * @param option - The option to save.
   * @returns The saved option.
   */
  save(option: Option): Promise<Option>;

  /**
   * Deletes an option by ID.
   * @param id - The option ID.
   */
  delete(id: string): Promise<void>;
}