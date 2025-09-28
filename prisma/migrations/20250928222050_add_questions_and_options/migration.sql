-- CreateEnum
CREATE TYPE "public"."QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'SINGLE_CHOICE', 'TRUE_FALSE');

-- CreateTable
CREATE TABLE "public"."Question" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "type" "public"."QuestionType" NOT NULL DEFAULT 'SINGLE_CHOICE',

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Options" (
    "id" UUID NOT NULL,
    "text" TEXT NOT NULL,
    "questionId" UUID NOT NULL,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Responses" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "questionId" UUID NOT NULL,
    "optionId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responses_userId_questionId_key" ON "public"."Responses"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "public"."Options" ADD CONSTRAINT "Options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Responses" ADD CONSTRAINT "Responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Responses" ADD CONSTRAINT "Responses_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Responses" ADD CONSTRAINT "Responses_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "public"."Options"("id") ON DELETE CASCADE ON UPDATE CASCADE;
