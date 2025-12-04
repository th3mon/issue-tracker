const fs = require("fs");
const path = require("path");

const SOURCE_ENGINE = path.resolve(
  __dirname,
  "..",
  "app/generated/prisma/libquery_engine-rhel-openssl-3.0.x.so.node",
);

console.log(__dirname);
if (fs.existsSync(SOURCE_ENGINE)) {
  console.log("Prisma query engine exists");
} else {
  console.warn("⚠️ Prisma query engine not found:", SOURCE_ENGINE);
}
