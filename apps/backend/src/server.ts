import "dotenv/config";
import app from "./app.js";
import { createInitialUser } from "./lib/auth/initial-user.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await createInitialUser();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Backend startup failed", error);
  process.exit(1);
});
