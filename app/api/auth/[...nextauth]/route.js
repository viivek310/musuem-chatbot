import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Call your Flask backend to authenticate the user
        const res = await fetch('api/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });

        const user = await res.json();

        // if (res.ok && user) {
          // Return the user object if authentication is successful
          return user;
        // } else {
          // Return null if authentication fails
        //   return null;
        // }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // Use JWT for sessions
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};

export default NextAuth(authOptions);
