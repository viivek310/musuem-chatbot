import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from '@/connection';
import User from '@/models/user'
import bcrypt from "bcrypt"





export const authoptions = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        return credentials
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider == "credentials") {
        return true
      }
    },
  },
})

export { authoptions as GET, authoptions as POST }