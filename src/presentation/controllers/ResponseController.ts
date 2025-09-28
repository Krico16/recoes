import { Elysia } from 'elysia';
import { CreateResponse } from '../../application/use-cases/CreateResponse';
import { PrismaResponseRepository } from '../../infrastructure/adapters/database/PrismaResponseRepository';
import { Database } from '../../infrastructure/config/Database';
import { CreateResponseDTO, ResponseDTO } from '../dtos/QuestionDTOs';

/**
 * Controller for response-related endpoints.
 */
export class ResponseController {
  private createResponse: CreateResponse;

  constructor() {
    const prisma = Database.getInstance();
    const responseRepo = new PrismaResponseRepository(prisma);

    this.createResponse = new CreateResponse(responseRepo);
  }

  /**
   * Registers routes for responses.
   * @param app - The Elysia app instance.
   */
  registerRoutes(app: Elysia) {
    app
      .derive(async ({ headers }) => {
        const authHeader = headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return { user: null };
        }
        const token = authHeader.substring(7);
        try {
          const { JWTService } = await import('../../infrastructure/adapters/web/JWTService');
          const decoded = JWTService.verifyAccessToken(token);
          return { user: decoded };
        } catch (error) {
          return { user: null };
        }
      })
      .post('/responses', async ({ body, user }) => {
        if (!user) {
          return { success: false, error: 'Unauthorized' };
        }
        try {
          const input: CreateResponseDTO = body as CreateResponseDTO;
          const response = await this.createResponse.execute({
            userId: user.id,
            questionId: input.questionId,
            optionId: input.optionId,
          });
          const responseDTO: ResponseDTO = {
            id: response.id,
            userId: response.userId,
            questionId: response.questionId,
            optionId: response.optionId,
            createdAt: response.createdAt.toISOString(),
          };
          return { success: true, data: responseDTO };
        } catch (error) {
          return { success: false, error: (error as Error).message };
        }
      });
  }
}