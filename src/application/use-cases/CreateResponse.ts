import { IResponseRepository } from '../../shared/types/IResponseRepository';
import { Response } from '../../domain/entities/Response';

/**
 * Use case for creating a response.
 */
export class CreateResponse {
  constructor(private responseRepository: IResponseRepository) {}

  async execute(props: {
    userId: string;
    questionId: string;
    optionId: string;
  }): Promise<Response> {
    const id = crypto.randomUUID(); // Assuming Node.js crypto
    const response = Response.create({ id, ...props });
    return await this.responseRepository.save(response);
  }
}