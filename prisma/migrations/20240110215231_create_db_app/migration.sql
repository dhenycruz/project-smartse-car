-- CreateEnum
CREATE TYPE "Combustivel" AS ENUM ('Diesel', 'Gasolina', 'Alcool');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "potencia" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "portas" INTEGER NOT NULL,
    "ar" BOOLEAN NOT NULL DEFAULT false,
    "renavam" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "imgcar" TEXT NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Abastecimentos" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "tipoCombustivel" "Combustivel" NOT NULL DEFAULT 'Gasolina',
    "valorLitro" DECIMAL(9,2) NOT NULL,
    "litros" DECIMAL(9,1) NOT NULL,
    "valorTotal" DECIMAL(9,2) NOT NULL,
    "data" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Abastecimentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_renavam_key" ON "Cars"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "Cars_placa_key" ON "Cars"("placa");

-- AddForeignKey
ALTER TABLE "Abastecimentos" ADD CONSTRAINT "Abastecimentos_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
