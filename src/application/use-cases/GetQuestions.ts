import { IQuestionRepository } from '../../shared/types/IQuestionRepository';
import { Question } from '../../domain/entities/Question';
import { Option } from '../../domain/entities/Option';

/**
 * Use case for getting all questions with options.
 */
export class GetQuestions {
  constructor(private questionRepository: IQuestionRepository) {}

  async execute(): Promise<{ question: Question; options: Option[] }[]> {
    return await this.questionRepository.findAllWithOptions();
  }
}