import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";


const abc = async()=>{
    const res = await fetch("/http://localhost:5000/login",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({a: 1, b: 2})
    })
    console.log(abc)
}


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
                // 
                abc()
                return {user:"jejldjsld"}
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