import { User } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/Email';
import { DocumentNumber } from '../../domain/value-objects/DocumentNumber';
import { PasswordHasher } from '../../domain/services/PasswordHasher';
import { IUserRepository } from '../../shared/types/IUserRepository';
import { IRoleRepository } from '../../shared/types/IRoleRepository';

/**
 * Input for registering a user.
 */
export interface RegisterUserInput {
  documentNumber: string;
  fullName: string;
  email: string;
  password: string;
  roleName: string;
}

/**
 * Output for registering a user.
 */
export interface RegisterUserOutput {
  user: User;
}

/**
 * Use case for registering a new user.
 */
export class RegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository
  ) {}

  /**
   * Executes the register user use case.
   * @param input - The input data.
   * @returns The output data.
   */
  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    // Validate input
    const documentNumber = DocumentNumber.create(input.documentNumber);
    const email = Email.create(input.email);

    // Check if user already exists
    const existingUser = await this.userRepository.findByDocumentNumber(documentNumber.toString());
    if (existingUser) {
      throw new Error('User with this document number already exists');
    }

    const existingEmail = await this.userRepository.findByEmail(email.toString());
    if (existingEmail) {
      throw new Error('User with this email already exists');
    }

    // Find role
    const role = await this.roleRepository.findByName(input.roleName);
    if (!role) {
      throw new Error('Role not found');
    }

    // Hash password
    const passwordHash = await PasswordHasher.hash(input.password);

    // Create user
    const user = User.create({
      id: crypto.randomUUID(), // Assuming Node.js crypto
      documentNumber: documentNumber.toString(),
      fullName: input.fullName,
      email: email.toString(),
      passwordHash,
      roleId: role.id,
    });

    // Save user
    const savedUser = await this.userRepository.save(user);

    return { user: savedUser };
  }
}