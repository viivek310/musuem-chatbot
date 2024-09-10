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
        // try {
        //   const user = await User.findOne({ username: credentials.username })
        //   if (!user) {
        //     throw new Error("Incorrect Username")
        //   }
        //   const isCorrect = await bcrypt.compare(credentials.password, user.password)
        //   if (isCorrect) {
        //     return user
        //   } else {
        //     throw new Error("Incorrect credentials")
        //   }
        // } catch (error) {
        //   throw new Error(error)
        // }
        const res = await fetch("http://localhost:5000/login",{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({username:credentials.username})
        })
        const data = await res.json()
        if(data.user){
            return data.user
        }else{
            throw new Error(data.err)
        }


      }
    })
  ],

})

export { authoptions as GET, authoptions as POST }