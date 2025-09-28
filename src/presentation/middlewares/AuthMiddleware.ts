import { Elysia } from 'elysia';
import { JWTService } from '../../infrastructure/adapters/web/JWTService';

/**
 * Middleware for authentication.
 */
export class AuthMiddleware {
  /**
   * Registers authentication middleware.
   * @param app - The Elysia app instance.
   */
  static register(app: Elysia) {
    app.derive(async ({ headers }) => {
      const authHeader = headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { user: null };
      }
      const token = authHeader.substring(7);
      try {
        const decoded = JWTService.verifyAccessToken(token);
        return { user: decoded };
      } catch (error) {
        return { user: null };
      }
    });
  }
}