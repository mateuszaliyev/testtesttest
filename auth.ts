import NextAuth, {DefaultSession} from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getUserById } from "./data/user";
import { getRole } from "./data/employments";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      console.log(JSON.stringify(token));
      console.log(JSON.stringify(session));
      
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
    
        session.user.role = token.role

        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
    
      console.log(session);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
    
      const existingUser = await getUserById(Number(token.sub));
      if (!existingUser) return token;
    
      const role = await getRole(existingUser.id);
    
      token.role = role;

      token.firstName = existingUser.first_name || "";
      token.lastName = existingUser.last_name || "";
    
      return token;
    },
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
