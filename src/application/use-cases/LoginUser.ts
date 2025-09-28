import { User } from '../../domain/entities/User';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { IUserRepository } from '../../shared/types/IUserRepository';
import { JWTService } from '../../infrastructure/adapters/web/JWTService';

/**
 * Input for logging in a user.
 */
export interface LoginUserInput {
  email: string;
  password: string;
}

/**
 * Output for logging in a user.
 */
export interface LoginUserOutput {
  user: User;
  accessToken: string;
  refreshToken: string;
}

/**
 * Use case for logging in a user.
 */
export class LoginUser {
  constructor(private userRepository: IUserRepository) {}

  /**
   * Executes the login user use case.
   * @param input - The input data.
   * @returns The output data.
   */
  async execute(input: LoginUserInput): Promise<LoginUserOutput> {
    // Find user by email
    const user = await this.userRepository.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await PasswordHasher.verify(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate tokens
    const accessToken = JWTService.signAccessToken({ userId: user.id, roleId: user.roleId });
    const refreshToken = JWTService.signRefreshToken({ userId: user.id });

    return { user, accessToken, refreshToken };
  }
}