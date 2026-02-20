-- AlterTable: Add new columns to Job
ALTER TABLE "Job" ADD COLUMN "location" TEXT;
ALTER TABLE "Job" ADD COLUMN "mode" TEXT;
ALTER TABLE "Job" ADD COLUMN "experienceLevel" TEXT;
ALTER TABLE "Job" ADD COLUMN "skills" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "Job" ADD COLUMN "salaryMin" INTEGER;
ALTER TABLE "Job" ADD COLUMN "salaryMax" INTEGER;
ALTER TABLE "Job" ADD COLUMN "salaryCurrency" TEXT;

-- AlterTable: Add new columns to Resume
ALTER TABLE "Resume" ADD COLUMN "template" TEXT NOT NULL DEFAULT 'classic';
ALTER TABLE "Resume" ADD COLUMN "themeColor" TEXT NOT NULL DEFAULT '#0284c7';
ALTER TABLE "Resume" ADD COLUMN "atsScore" INTEGER;
ALTER TABLE "Resume" ADD COLUMN "atsFeedback" JSONB;
ALTER TABLE "Resume" ADD COLUMN "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable: UserPreference
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roleKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferredLocations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferredMode" TEXT,
    "experienceLevel" TEXT,
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "minMatchScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
