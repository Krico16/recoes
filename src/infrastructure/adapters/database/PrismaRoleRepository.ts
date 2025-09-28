import { PrismaClient } from '../../../generated/prisma';
import { Role } from '../../../domain/entities/Role';
import { IRoleRepository } from '../../../shared/types/IRoleRepository';

/**
 * Prisma implementation of IRoleRepository.
 */
export class PrismaRoleRepository implements IRoleRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Role | null> {
    const roleData = await this.prisma.role.findUnique({
      where: { id },
    });
    if (!roleData) return null;
    return Role.fromPersistence(roleData);
  }

  async findByName(name: string): Promise<Role | null> {
    const roleData = await this.prisma.role.findUnique({
      where: { name },
    });
    if (!roleData) return null;
    return Role.fromPersistence(roleData);
  }

  async save(role: Role): Promise<Role> {
    const roleData = await this.prisma.role.upsert({
      where: { id: role.id },
      update: { name: role.name },
      create: { id: role.id, name: role.name },
    });
    return Role.fromPersistence(roleData);
  }

  async findAll(): Promise<Role[]> {
    const rolesData = await this.prisma.role.findMany();
    return rolesData.map(Role.fromPersistence);
  }
}