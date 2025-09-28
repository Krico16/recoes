import { Database } from './infrastructure/config/Database';
import { PrismaRoleRepository } from './infrastructure/adapters/database/PrismaRoleRepository';
import { PrismaPermissionRepository } from './infrastructure/adapters/database/PrismaPermissionRepository';
import { PrismaUserRepository } from './infrastructure/adapters/database/PrismaUserRepository';
import { PrismaQuestionRepository } from './infrastructure/adapters/database/PrismaQuestionRepository';
import { PrismaOptionRepository } from './infrastructure/adapters/database/PrismaOptionRepository';
import { Role } from './domain/entities/Role';
import { Permission } from './domain/entities/Permission';
import { User } from './domain/entities/User';
import { Question } from './domain/entities/Question';
import { Option } from './domain/entities/Option';
import { PasswordHasher } from './domain/services/PasswordHasher';

async function seed() {
  const prisma = Database.getInstance();
  const roleRepo = new PrismaRoleRepository(prisma);
  const permissionRepo = new PrismaPermissionRepository(prisma);
  const userRepo = new PrismaUserRepository(prisma);
  const questionRepo = new PrismaQuestionRepository(prisma);
  const optionRepo = new PrismaOptionRepository(prisma);

  // Create permissions
  const permissions = [
    Permission.create({ id: crypto.randomUUID(), name: 'create_user' }),
    Permission.create({ id: crypto.randomUUID(), name: 'view_user' }),
    Permission.create({ id: crypto.randomUUID(), name: 'edit_user' }),
    Permission.create({ id: crypto.randomUUID(), name: 'delete_user' }),
    Permission.create({ id: crypto.randomUUID(), name: 'create_course' }),
    Permission.create({ id: crypto.randomUUID(), name: 'view_course' }),
    Permission.create({ id: crypto.randomUUID(), name: 'edit_course' }),
  ];

  for (const perm of permissions) {
    await permissionRepo.save(perm);
  }

  // Create roles
  const adminRole = Role.create({ id: crypto.randomUUID(), name: 'admin' });
  const teacherRole = Role.create({ id: crypto.randomUUID(), name: 'teacher' });
  const studentRole = Role.create({ id: crypto.randomUUID(), name: 'student' });

  await roleRepo.save(adminRole);
  await roleRepo.save(teacherRole);
  await roleRepo.save(studentRole);

  // Get roles for users
  const adminRoleData = await roleRepo.findByName('admin');
  const teacherRoleData = await roleRepo.findByName('teacher');
  const studentRoleData = await roleRepo.findByName('student');

  if (!adminRoleData || !teacherRoleData || !studentRoleData) {
    throw new Error('Roles not found');
  }

  // Hash password
  const hashedPassword = await PasswordHasher.hash('password123');

  // Create users
  const users = [
    // 2 admins
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '12345678',
      fullName: 'Administrador Uno',
      email: 'admin1@example.com',
      passwordHash: hashedPassword,
      roleId: adminRoleData.id,
    }),
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '87654321',
      fullName: 'Administrador Dos',
      email: 'admin2@example.com',
      passwordHash: hashedPassword,
      roleId: adminRoleData.id,
    }),
    // 1 teacher
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '11223344',
      fullName: 'Profesor Juan Pérez',
      email: 'teacher@example.com',
      passwordHash: hashedPassword,
      roleId: teacherRoleData.id,
    }),
    // 5 students
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '11111111',
      fullName: 'Estudiante Ana García',
      email: 'student1@example.com',
      passwordHash: hashedPassword,
      roleId: studentRoleData.id,
    }),
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '22222222',
      fullName: 'Estudiante Carlos López',
      email: 'student2@example.com',
      passwordHash: hashedPassword,
      roleId: studentRoleData.id,
    }),
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '33333333',
      fullName: 'Estudiante María Rodríguez',
      email: 'student3@example.com',
      passwordHash: hashedPassword,
      roleId: studentRoleData.id,
    }),
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '44444444',
      fullName: 'Estudiante Pedro Martínez',
      email: 'student4@example.com',
      passwordHash: hashedPassword,
      roleId: studentRoleData.id,
    }),
    User.create({
      id: crypto.randomUUID(),
      documentNumber: '55555555',
      fullName: 'Estudiante Laura Sánchez',
      email: 'student5@example.com',
      passwordHash: hashedPassword,
      roleId: studentRoleData.id,
    }),
  ];

  for (const user of users) {
    await userRepo.save(user);
  }

  // Create questions and options
  const questionsData = [
    {
      text: '¿Cuál es la capital de España?',
      options: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'],
    },
    {
      text: '¿Cuánto es 2 + 2?',
      options: ['3', '4', '5', '6'],
    },
    {
      text: '¿Quién escribió "Don Quijote de la Mancha"?',
      options: ['Miguel de Cervantes', 'Federico García Lorca', 'Pablo Picasso', 'Salvador Dalí'],
    },
    {
      text: '¿Cuál es el río más largo del mundo?',
      options: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
    },
    {
      text: '¿En qué año llegó el hombre a la Luna?',
      options: ['1969', '1957', '1972', '1980'],
    },
  ];

  for (const qData of questionsData) {
    const question = Question.create({
      id: crypto.randomUUID(),
      text: qData.text,
      type: 'SINGLE_CHOICE',
    });
    const savedQuestion = await questionRepo.save(question);

    for (const optText of qData.options) {
      const option = Option.create({
        id: crypto.randomUUID(),
        text: optText,
        questionId: savedQuestion.id,
      });
      await optionRepo.save(option);
    }
  }

  console.log('Seeding completed');
}

seed().catch(console.error);