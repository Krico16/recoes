import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { AuthController } from "./presentation/controllers/AuthController";
import { QuestionController } from "./presentation/controllers/QuestionController";
import { ResponseController } from "./presentation/controllers/ResponseController";
import { AuthMiddleware } from "./presentation/middlewares/AuthMiddleware";

const app = new Elysia()
  .use(swagger())
  .get("/", () => "Welcome to Educational Backend API - Hexagonal Architecture");

// Register middlewares
AuthMiddleware.register(app);

// Register controllers
const authController = new AuthController();
authController.registerRoutes(app);

const questionController = new QuestionController();
questionController.registerRoutes(app);

const responseController = new ResponseController();
responseController.registerRoutes(app);

// Protected route example
app.get("/protected", async ({ headers }) => {
  const authHeader = headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: "Unauthorized" };
  }
  const token = authHeader.substring(7);
  try {
    const { JWTService } = await import('./infrastructure/adapters/web/JWTService');
    const decoded = JWTService.verifyAccessToken(token);
    return { message: "Protected resource", user: decoded };
  } catch (error) {
    return { error: "Invalid token" };
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export default app;
