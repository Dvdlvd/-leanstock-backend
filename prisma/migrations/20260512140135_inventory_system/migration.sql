/*
  Warnings:

  - Made the column `sku` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Product_tenantId_idx";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "lowStock" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "sku" SET NOT NULL;
