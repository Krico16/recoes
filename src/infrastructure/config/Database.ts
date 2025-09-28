import { PrismaClient } from '../../generated/prisma';

/**
 * Database configuration and client instance.
 */
export class Database {
  private static instance: PrismaClient;

  /**
   * Gets the Prisma client instance.
   * @returns The Prisma client.
   */
  static getInstance(): PrismaClient {
    if (!Database.instance) {
      Database.instance = new PrismaClient();
    }
    return Database.instance;
  }
}