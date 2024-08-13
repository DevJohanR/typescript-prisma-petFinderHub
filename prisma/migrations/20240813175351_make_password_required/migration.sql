/*
  Warnings:

  - Made the column `password` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;

-- Asegúrate de que no haya valores NULL en la columna `password`
UPDATE "Usuario" SET "password" = 'default_password' WHERE "password" IS NULL;

CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "esVoluntario" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Usuario" ("email", "esVoluntario", "id", "nombre", "password") SELECT "email", "esVoluntario", "id", "nombre", "password" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
