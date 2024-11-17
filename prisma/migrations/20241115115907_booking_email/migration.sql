/*
  Warnings:

  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "summary" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'Please join the meeting on the scheduled time',
ALTER COLUMN "location" DROP NOT NULL;
