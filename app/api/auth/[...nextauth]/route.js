import NextAuth from 'next-auth'
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
       
       try{
        const res = await fetch("http://localhost:5000/login",{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
              })
        })
        const data = await res.json()
        console.log("auth",data)
        if (res.ok && data.user) {
            return data.user; 
          } else {
            throw new Error("error");
             
          }


       }catch(Error){
            console.log(Error)
       }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL 
})

export { authoptions as GET, authoptions as POST }