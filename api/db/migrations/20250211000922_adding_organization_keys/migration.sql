-- CreateTable
CREATE TABLE "OrganizationApiKey" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "label" TEXT,
    "encryptedKey" TEXT NOT NULL,
    "keyIv" TEXT NOT NULL,
    "keyTag" TEXT NOT NULL,
    "keySalt" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrganizationApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OrganizationApiKey_provider_idx" ON "OrganizationApiKey"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "OrganizationApiKey_organizationId_provider_key" ON "OrganizationApiKey"("organizationId", "provider");

-- AddForeignKey
ALTER TABLE "OrganizationApiKey" ADD CONSTRAINT "OrganizationApiKey_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
