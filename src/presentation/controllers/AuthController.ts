import { Elysia } from 'elysia';
import { RegisterUser } from '../../application/use-cases/RegisterUser';
import { LoginUser } from '../../application/use-cases/LoginUser';
import { PrismaUserRepository } from '../../infrastructure/adapters/database/PrismaUserRepository';
import { PrismaRoleRepository } from '../../infrastructure/adapters/database/PrismaRoleRepository';
import { Database } from '../../infrastructure/config/Database';
import { RegisterUserDTO, UserDTO } from '../dtos/UserDTOs';
import { LoginUserDTO, LoginResponseDTO } from '../dtos/AuthDTOs';

/**
 * Controller for authentication-related endpoints.
 */
export class AuthController {
  private registerUser: RegisterUser;
  private loginUser: LoginUser;

  constructor() {
    const prisma = Database.getInstance();
    const userRepo = new PrismaUserRepository(prisma);
    const roleRepo = new PrismaRoleRepository(prisma);

    this.registerUser = new RegisterUser(userRepo, roleRepo);
    this.loginUser = new LoginUser(userRepo);
  }

  /**
   * Registers routes for authentication.
   * @param app - The Elysia app instance.
   */
  registerRoutes(app: Elysia) {
    app.post('/auth/register', async ({ body }) => {
      try {
        const input: RegisterUserDTO = body as RegisterUserDTO;
        const result = await this.registerUser.execute(input);
        const userDTO: UserDTO = {
          id: result.user.id,
          documentNumber: result.user.documentNumber,
          fullName: result.user.fullName,
          email: result.user.email,
          roleId: result.user.roleId,
          createdAt: result.user.createdAt.toISOString(),
          updatedAt: result.user.updatedAt.toISOString(),
        };
        return { success: true, data: userDTO };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    });

    app.post('/auth/login', async ({ body }) => {
      try {
        const input: LoginUserDTO = body as LoginUserDTO;
        const result = await this.loginUser.execute(input);
        const responseDTO: LoginResponseDTO = {
          user: {
            id: result.user.id,
            documentNumber: result.user.documentNumber,
            fullName: result.user.fullName,
            email: result.user.email,
            roleId: result.user.roleId,
          },
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        };
        return { success: true, data: responseDTO };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    });
  }
}