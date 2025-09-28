import { IOptionRepository } from '../../shared/types/IOptionRepository';
import { Option } from '../../domain/entities/Option';

/**
 * Use case for getting options by question ID.
 */
export class GetOptions {
  constructor(private optionRepository: IOptionRepository) {}

  async execute(questionId: string): Promise<Option[]> {
    return await this.optionRepository.findByQuestionId(questionId);
  }
}