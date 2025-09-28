import { PrismaClient } from '../../../generated/prisma';
import { Question } from '../../../domain/entities/Question';
import { Option } from '../../../domain/entities/Option';
import { IQuestionRepository } from '../../../shared/types/IQuestionRepository';

/**
 * Prisma implementation of IQuestionRepository.
 */
export class PrismaQuestionRepository implements IQuestionRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Question | null> {
    const questionData = await this.prisma.question.findUnique({
      where: { id },
    });
    if (!questionData) return null;
    return Question.fromPersistence(questionData);
  }

  async findAll(): Promise<Question[]> {
    const questionsData = await this.prisma.question.findMany();
    return questionsData.map(data => Question.fromPersistence(data));
  }

  async findAllWithOptions(): Promise<{ question: Question; options: Option[] }[]> {
    const questionsData = await this.prisma.question.findMany({
      include: { options: true },
    });
    return questionsData.map(data => ({
      question: Question.fromPersistence(data),
      options: data.options.map(opt => Option.fromPersistence(opt)),
    }));
  }

  async save(question: Question): Promise<Question> {
    const questionData = await this.prisma.question.upsert({
      where: { id: question.id },
      update: {
        text: question.text,
        type: question.type,
      },
      create: {
        id: question.id,
        text: question.text,
        type: question.type,
      },
    });
    return Question.fromPersistence(questionData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.question.delete({
      where: { id },
    });
  }
}