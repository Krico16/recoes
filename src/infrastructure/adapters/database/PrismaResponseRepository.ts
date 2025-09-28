import { PrismaClient } from '../../../generated/prisma';
import { Response } from '../../../domain/entities/Response';
import { IResponseRepository } from '../../../shared/types/IResponseRepository';

/**
 * Prisma implementation of IResponseRepository.
 */
export class PrismaResponseRepository implements IResponseRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Response | null> {
    const responseData = await this.prisma.responses.findUnique({
      where: { id },
    });
    if (!responseData) return null;
    return Response.fromPersistence(responseData);
  }

  async findByUserId(userId: string): Promise<Response[]> {
    const responsesData = await this.prisma.responses.findMany({
      where: { userId },
    });
    return responsesData.map(data => Response.fromPersistence(data));
  }

  async save(response: Response): Promise<Response> {
    const responseData = await this.prisma.responses.upsert({
      where: { id: response.id },
      update: {
        userId: response.userId,
        questionId: response.questionId,
        optionId: response.optionId,
      },
      create: {
        id: response.id,
        userId: response.userId,
        questionId: response.questionId,
        optionId: response.optionId,
      },
    });
    return Response.fromPersistence(responseData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.responses.delete({
      where: { id },
    });
  }
}