import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";


const abc = async(username,password)=>{
    const res = await fetch("http://localhost:5000/login",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({username,password})
    })
    const data = await res.json()
    return data.user
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
            //    res = await abc(credentials.username,credentials.password)
               return {username: "bansi",password:"123"}
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