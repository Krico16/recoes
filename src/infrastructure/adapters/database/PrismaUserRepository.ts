import { PrismaClient } from '../../../generated/prisma';
import { User } from '../../../domain/entities/User';
import { IUserRepository } from '../../../shared/types/IUserRepository';

/**
 * Prisma implementation of IUserRepository.
 */
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!userData) return null;
    return User.fromPersistence(userData);
  }

  async findByDocumentNumber(documentNumber: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { documentNumber },
    });
    if (!userData) return null;
    return User.fromPersistence(userData);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!userData) return null;
    return User.fromPersistence(userData);
  }

  async save(user: User): Promise<User> {
    const userData = await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        documentNumber: user.documentNumber,
        fullName: user.fullName,
        email: user.email,
        passwordHash: user.passwordHash,
        roleId: user.roleId,
        updatedAt: new Date(),
      },
      create: {
        id: user.id,
        documentNumber: user.documentNumber,
        fullName: user.fullName,
        email: user.email,
        passwordHash: user.passwordHash,
        roleId: user.roleId,
      },
    });
    return User.fromPersistence(userData);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}