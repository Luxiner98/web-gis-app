import dotenv from "dotenv";
import { execSync } from "node:child_process";
import fs from "node:fs";
import https from "node:https";

dotenv.config({ path: ".env" });

const baseUrl = process.env.VITE_API_BASE_URL;

if (!baseUrl) {
  console.error("Missing VITE_API_BASE_URL in .env");
  process.exit(1);
}

const swaggerUrl = `${baseUrl.replace(/\/$/, "")}/docs/swagger/?format=openapi`;
const swaggerFilePath = "swagger.json";
const clientDir = "src/api/client";

console.log(`Downloading Swagger file from: ${swaggerUrl}`);

const file = fs.createWriteStream(swaggerFilePath);

https
  .get(swaggerUrl, (response) => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download. Status: ${response.statusCode}`);
      process.exit(1);
    }

    response.pipe(file);

    file.on("finish", async () => {
      file.close();
      console.log("Swagger file downloaded.");

      try {
        if (fs.existsSync(clientDir)) {
          fs.rmSync(clientDir, { recursive: true, force: true });
          console.log("Old API client folder deleted.");
        }

        console.log("Generating API client...");
        execSync(
          `npx --yes sta generate --axios -r -p ${swaggerUrl} -o ${clientDir} --modular --disableStrictSSL --templates src/api/templates`,
          {
            stdio: "inherit",
          }
        );

        // Clean up
        fs.unlinkSync(swaggerFilePath);
        console.log("Swagger file deleted.");
        console.log("✅ API client generation complete!");
      } catch (err) {
        console.error("Error during generation:", err?.message ?? err);
      }
    });
  })
  .on("error", (err) => {
    fs.unlink(swaggerFilePath, () => {});
    console.error("Download error:", err.message);
  });
