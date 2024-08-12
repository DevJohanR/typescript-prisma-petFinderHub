-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN "password" TEXT;

-- CreateTable
CREATE TABLE "Mascota" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "duenoId" INTEGER NOT NULL,
    "veterinarioId" INTEGER NOT NULL,
    CONSTRAINT "Mascota_duenoId_fkey" FOREIGN KEY ("duenoId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Mascota_veterinarioId_fkey" FOREIGN KEY ("veterinarioId") REFERENCES "Veterinario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Veterinario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "clinica" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Campana" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT false,
    "mascotaId" INTEGER NOT NULL,
    CONSTRAINT "Campana_mascotaId_fkey" FOREIGN KEY ("mascotaId") REFERENCES "Mascota" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VoluntarioEnCampana" (
    "voluntarioId" INTEGER NOT NULL,
    "campanaId" INTEGER NOT NULL,

    PRIMARY KEY ("voluntarioId", "campanaId"),
    CONSTRAINT "VoluntarioEnCampana_voluntarioId_fkey" FOREIGN KEY ("voluntarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "VoluntarioEnCampana_campanaId_fkey" FOREIGN KEY ("campanaId") REFERENCES "Campana" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Campana_mascotaId_key" ON "Campana"("mascotaId");
