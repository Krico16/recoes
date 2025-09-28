import { PrismaClient } from '../../../generated/prisma';
import { Option } from '../../../domain/entities/Option';
import { IOptionRepository } from '../../../shared/types/IOptionRepository';

/**
 * Prisma implementation of IOptionRepository.
 */
export class PrismaOptionRepository implements IOptionRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Option | null> {
    const optionData = await this.prisma.options.findUnique({
      where: { id },
    });
    if (!optionData) return null;
    return Option.fromPersistence(optionData);
  }

  async findByQuestionId(questionId: string): Promise<Option[]> {
    const optionsData = await this.prisma.options.findMany({
      where: { questionId },
    });
    return optionsData.map(data => Option.fromPersistence(data));
  }

  async save(option: Option): Promise<Option> {
    const optionData = await this.prisma.options.upsert({
      where: { id: option.id },
      update: {
        text: option.text,
        questionId: option.questionId,
      },
      create: {
        id: option.id,
        text: option.text,
        questionId: option.questionId,
      },
    });
    return Option.fromPersistence(optionData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.options.delete({
      where: { id },
    });
  }
}