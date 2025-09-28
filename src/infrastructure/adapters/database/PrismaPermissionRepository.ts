import { PrismaClient } from '../../../generated/prisma';
import { Permission } from '../../../domain/entities/Permission';
import { IPermissionRepository } from '../../../shared/types/IPermissionRepository';

/**
 * Prisma implementation of IPermissionRepository.
 */
export class PrismaPermissionRepository implements IPermissionRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Permission | null> {
    const permissionData = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (!permissionData) return null;
    return Permission.fromPersistence(permissionData);
  }

  async findByName(name: string): Promise<Permission | null> {
    const permissionData = await this.prisma.permission.findUnique({
      where: { name },
    });
    if (!permissionData) return null;
    return Permission.fromPersistence(permissionData);
  }

  async save(permission: Permission): Promise<Permission> {
    const permissionData = await this.prisma.permission.upsert({
      where: { id: permission.id },
      update: { name: permission.name },
      create: { id: permission.id, name: permission.name },
    });
    return Permission.fromPersistence(permissionData);
  }

  async findAll(): Promise<Permission[]> {
    const permissionsData = await this.prisma.permission.findMany();
    return permissionsData.map(Permission.fromPersistence);
  }
}