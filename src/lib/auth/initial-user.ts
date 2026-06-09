import { auth } from "./auth.js";
import prisma from "../prisma.js";

interface InitialUserConfig {
  email: string;
  password: string;
  name: string;
  surname: string;
  role: string;
}

function getInitialUserConfig(): InitialUserConfig | null {
  const email = process.env.INITIAL_USER_EMAIL?.trim().toLowerCase();
  const password = process.env.INITIAL_USER_PASSWORD;

  if (!email && !password) {
    console.log("Initial user is not configured; skipping bootstrap");
    return null;
  }

  if (!email || !password) {
    throw new Error(
      "INITIAL_USER_EMAIL and INITIAL_USER_PASSWORD must be configured together"
    );
  }

  return {
    email,
    password,
    name: process.env.INITIAL_USER_NAME?.trim() || "Admin",
    surname: process.env.INITIAL_USER_SURNAME?.trim() || "",
    role: process.env.INITIAL_USER_ROLE?.trim() || "admin",
  };
}

export async function createInitialUser(): Promise<void> {
  const config = getInitialUserConfig();
  if (!config) {
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: config.email },
  });

  if (existingUser) {
    if (existingUser.role !== config.role) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { role: config.role },
      });
    }

    console.log(`Initial user already exists: ${config.email}`);
    return;
  }

  await auth.api.signUpEmail({
    body: {
      email: config.email,
      password: config.password,
      name: config.name,
      surname: config.surname,
    },
  });

  await prisma.user.update({
    where: { email: config.email },
    data: { role: config.role },
  });

  console.log(`Initial user created: ${config.email}`);
}
