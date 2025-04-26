/*
  Warnings:

  - You are about to drop the column `forgotPassworddToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `forgotPassworddTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "forgotPassworddToken",
DROP COLUMN "forgotPassworddTokenExpiry",
ADD COLUMN     "forgotPasswordToken" TEXT,
ADD COLUMN     "forgotPasswordTokenExpiry" TIMESTAMP(3);
