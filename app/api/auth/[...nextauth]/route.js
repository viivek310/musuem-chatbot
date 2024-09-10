import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authoptions = NextAuth({
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Replace with your Flask API endpoint
                const res = await fetch("http://localhost:5000/login", {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        username: credentials.username,
                        password: credentials.password,
                    })
                });
                
                const data = await res.json();
                
                // If login is successful, return user data
                if (res.ok && data?.user) {
                    return data.user;
                }
                
                // Return null if authentication fails
                return null;
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider === "credentials") {
                return true;
            }
            return false;
        },
    },
});

export { authoptions as GET, authoptions as POST };
