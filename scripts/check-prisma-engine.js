const fs = require("fs");
const path = require("path");

const SOURCE_ENGINE = path.resolve(
  __dirname,
  "..",
  "app/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node",
);

if (fs.existsSync(SOURCE_ENGINE)) {
  console.log("Prisma query engine exists");
} else {
  console.warn("⚠️ Prisma query engine not found:", SOURCE_ENGINE);
}

const TARGET_DIR = path.resolve(__dirname, "..", ".next/server/chunks");
const TARGET_ENGINE = path.join(
  TARGET_DIR,
  "libquery_engine-rhel-openssl-3.0.x.so.node",
);

// Ensure directory exists
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

if (fs.existsSync(SOURCE_ENGINE)) {
  fs.copyFileSync(SOURCE_ENGINE, TARGET_ENGINE);
  console.log("Prisma query engine copied to .next/server/chunks");
} else {
  console.warn("⚠️ Prisma query engine not found:", SOURCE_ENGINE);
}

if (!fs.existsSync(TARGET_ENGINE)) {
  console.warn(`⚠️ Engine doesn't exists at ${TARGET_ENGINE}`);
}
