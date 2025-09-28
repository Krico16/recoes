/**
 * DTO for logging in a user.
 */
export interface LoginUserDTO {
  email: string;
  password: string;
}

/**
 * DTO for login response.
 */
export interface LoginResponseDTO {
  user: {
    id: string;
    documentNumber: string;
    fullName: string;
    email: string | null;
    roleId: string;
  };
  accessToken: string;
  refreshToken: string;
}