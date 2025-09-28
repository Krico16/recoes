import { Elysia } from 'elysia';
import { GetQuestions } from '../../application/use-cases/GetQuestions';
import { GetOptions } from '../../application/use-cases/GetOptions';
import { PrismaQuestionRepository } from '../../infrastructure/adapters/database/PrismaQuestionRepository';
import { PrismaOptionRepository } from '../../infrastructure/adapters/database/PrismaOptionRepository';
import { Database } from '../../infrastructure/config/Database';
import { QuestionDTO, OptionDTO, QuestionWithOptionsDTO } from '../dtos/QuestionDTOs';

/**
 * Controller for question-related endpoints.
 */
export class QuestionController {
  private getQuestions: GetQuestions;
  private getOptions: GetOptions;

  constructor() {
    const prisma = Database.getInstance();
    const questionRepo = new PrismaQuestionRepository(prisma);
    const optionRepo = new PrismaOptionRepository(prisma);

    this.getQuestions = new GetQuestions(questionRepo);
    this.getOptions = new GetOptions(optionRepo);
  }

  /**
   * Registers routes for questions.
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
      .get('/questions', async ({ user }) => {
        if (!user) {
          return { success: false, error: 'Unauthorized' };
        }
        try {
          const questions = await this.getQuestions.execute();
          const questionDTOs: QuestionWithOptionsDTO[] = questions.map(q => ({
            id: q.question.id,
            text: q.question.text,
            type: q.question.type,
            options: q.options.map(o => ({
              id: o.id,
              text: o.text,
              questionId: o.questionId,
            })),
          }));
          return { success: true, data: questionDTOs };
        } catch (error) {
          return { success: false, error: (error as Error).message };
        }
      })
      .get('/questions/:id/options', async ({ params, user }) => {
        if (!user) {
          return { success: false, error: 'Unauthorized' };
        }
        try {
          const options = await this.getOptions.execute(params.id);
          const optionDTOs: OptionDTO[] = options.map(o => ({
            id: o.id,
            text: o.text,
            questionId: o.questionId,
          }));
          return { success: true, data: optionDTOs };
        } catch (error) {
          return { success: false, error: (error as Error).message };
        }
      });
  }
}