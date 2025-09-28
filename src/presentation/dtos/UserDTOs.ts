/**
 * DTO for registering a user.
 */
export interface RegisterUserDTO {
  documentNumber: string;
  fullName: string;
  email: string;
  password: string;
  roleName: string;
}

/**
 * DTO for user response.
 */
export interface UserDTO {
  id: string;
  documentNumber: string;
  fullName: string;
  email: string | null;
  roleId: string;
  createdAt: string;
  updatedAt: string;
}