# Educational Backend API - Hexagonal Architecture

A backend project for an educational platform built with BunJS, ElysiaJS, TypeScript, PostgreSQL, and JWT authentication, following Hexagonal Architecture and Clean Code principles.

## Features

- User management with UUID, document number, full name, and email
- Role-based authentication and permissions (Admin, Teacher, Student)
- JWT-based authentication with refresh tokens
- Question and answer system with multiple choice questions
- Response tracking for users
- Modular architecture using Hexagonal Architecture (Ports and Adapters)
- Prisma ORM for database operations
- Docker containerization for database and application
- Seeding with sample data (2 admins, 1 teacher, 5 students, 5 questions with 4 options each)

## Tech Stack

- **Runtime**: BunJS
- **Framework**: ElysiaJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma
- **Authentication**: JWT with bcrypt for password hashing
- **Containerization**: Docker and Docker Compose
- **Architecture**: Hexagonal Architecture (Clean Architecture)

## Project Structure

```
src/
├── domain/
│   ├── entities/          # User, Role, Permission, Question, Option, Response
│   ├── value-objects/     # Email, DocumentNumber
│   └── services/          # PasswordHasher
├── application/
│   └── use-cases/         # RegisterUser, LoginUser, GetQuestions, CreateResponse
├── infrastructure/
│   ├── adapters/
│   │   ├── database/      # Prisma repositories for all entities
│   │   └── web/           # JWTService
│   └── config/            # Database connection
├── presentation/
│   ├── controllers/       # AuthController, QuestionController, ResponseController
│   ├── middlewares/       # AuthMiddleware
│   └── dtos/              # UserDTOs, AuthDTOs, QuestionDTOs
├── shared/
│   ├── types/             # Repository interfaces
│   ├── utils/
│   └── errors/
├── generated/             # Prisma client
├── index.ts               # Application entry point
└── seed.ts                # Database seeding script
```

## Prerequisites

- BunJS (latest version)
- Docker and Docker Compose
- PostgreSQL (handled by Docker)

## Setup

### Using Docker (Recommended)

1. Clone the repository and navigate to the project directory.
2. Start the services with Docker Compose:
   ```
   docker-compose up --build
   ```
   This will:
   - Start PostgreSQL database
   - Build and run the backend application
   - Apply database migrations
   - Seed the database with sample data
   - Start the server on http://localhost:3000

### Manual Setup

1. Install dependencies:
   ```
   bun install
   ```

2. Start the database:
   ```
   docker-compose up -d postgres
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` if necessary

4. Run database migrations:
   ```
   npx prisma migrate dev --name init
   ```

5. Generate Prisma client:
   ```
   npx prisma generate
   ```

6. Seed the database:
   ```
   bun run seed
   ```

7. Start the development server:
   ```
   bun run dev
   ```

The API will be available at http://localhost:3000

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get JWT tokens

### Questions
- `GET /questions` - Get all questions with options
- `GET /questions/:id` - Get a specific question

### Responses
- `POST /responses` - Submit a response to a question
- `GET /responses/user/:userId` - Get responses for a user

### Protected Routes
- `GET /protected` - Example protected route (requires authentication)

## Sample Data

The seeding script creates:
- **Roles**: Admin, Teacher, Student
- **Permissions**: Various permissions assigned to roles
- **Users**:
  - 2 Admins (admin1@example.com, admin2@example.com)
  - 1 Teacher (teacher@example.com)
  - 5 Students (student1@example.com to student5@example.com)
- **Questions**: 5 multiple-choice questions in Spanish with 4 options each

All users have password: `password123`

## Development

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run seed` - Run database seeding

## Database

- View database with Prisma Studio: `npx prisma studio`
- Reset database: `npx prisma migrate reset`
- Apply migrations: `npx prisma migrate deploy`

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for JWT signing
- `JWT_REFRESH_SECRET` - Secret for refresh token signing

## Contributing

1. Follow the Hexagonal Architecture principles
2. Write tests for new features
3. Update documentation as needed
4. Use TypeScript strictly

## License

This project is licensed under the MIT License.