import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: "postgresql://postgres:12345@localhost:5432/propfirm_db",
  },
  migrate: {
    async adapter() {
      const { PrismaPg } = await import("@prisma/adapter-pg");
      const connectionString = "postgresql://postgres:12345@localhost:5432/propfirm_db";
      return new PrismaPg({ connectionString });
    },
  },
});