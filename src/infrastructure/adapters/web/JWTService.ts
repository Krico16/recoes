import jwt from 'jsonwebtoken';

/**
 * Service for JWT token operations.
 */
export class JWTService {
  private static accessSecret = Bun.env.JWT_ACCESS_SECRET || 'access_secret';
  private static refreshSecret = Bun.env.JWT_REFRESH_SECRET || 'refresh_secret';
  private static accessExpiresIn = '15m';
  private static refreshExpiresIn = '7d';

  /**
   * Signs an access token.
   * @param payload - The payload to sign.
   * @returns The signed access token.
   */
  static signAccessToken(payload: object): string {
    return jwt.sign(payload, this.accessSecret, { expiresIn: this.accessExpiresIn } as any);
  }

  /**
   * Signs a refresh token.
   * @param payload - The payload to sign.
   * @returns The signed refresh token.
   */
  static signRefreshToken(payload: object): string {
    return jwt.sign(payload, this.refreshSecret, { expiresIn: this.refreshExpiresIn } as any);
  }

  /**
   * Verifies an access token.
   * @param token - The token to verify.
   * @returns The decoded payload.
   */
  static verifyAccessToken(token: string): any {
    return jwt.verify(token, this.accessSecret);
  }

  /**
   * Verifies a refresh token.
   * @param token - The token to verify.
   * @returns The decoded payload.
   */
  static verifyRefreshToken(token: string): any {
    return jwt.verify(token, this.refreshSecret);
  }
}