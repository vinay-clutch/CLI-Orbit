import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";
import { deviceAuthorization } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  baseURL: "http://localhost:3005",
  basePath: "/api/auth",
  trustedOrigins: ["http://localhost:3000"],
  plugins: [
    deviceAuthorization({
      // Optional configuration
      expiresIn: "30m", // Device code expiration time
      interval: "5s", // Minimum polling interval
      
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: { 
     github: { 
       clientId: process.env.GITHUB_CLIENT_ID || "dummy", 
       clientSecret: process.env.GITHUB_CLIENT_SECRET || "dummy", 
     }, 
   },
  

    logger: {
        level: "debug"
    }
});
