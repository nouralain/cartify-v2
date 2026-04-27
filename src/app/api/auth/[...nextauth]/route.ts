import { apiClient } from "@/lib/api-client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "youremail@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const response = await apiClient.signIn(
          credentials?.email ?? "",
          credentials?.password ?? "",
        );

        if (response.message === "success") {
          const user = {
            id: response.user.email,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            token: response.token,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        const response = await apiClient.signup(
          credentials?.name ?? "",
          credentials?.email ?? "",
          credentials?.password ?? "",
          credentials?.repassword ?? "",
          credentials?.phone ?? "",
        );
        if (response.message === "success") {
          const user = {
            id: response.user.email,
            email: response.user.email,
            name: response.user.name,
            role: response.user.role,
            token: response.token,
          };
          return user;
        } else {
          return null;
        }
      },
      credentials: {
        name: { label: "Name", type: "text" },
        email: {
          label: "Email",
          type: "email",
          placeholder: "youremail@example.com",
        },
        password: { label: "Password", type: "password" },
        repassword: { label: "Re-Password", type: "password" },
        phone: { label: "Phone", type: "tel" },
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser:"/auth/register"


  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.token = token.token as string;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.token = user.token;
      }
      
      return token;
    },
  },
});

export { handler as GET, handler as POST };
