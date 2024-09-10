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
                    const res = fetch("http://localhost:5000/login",{
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({res:"hello"})
                    })
    
                    const data = await res.json()
                    return data.user
                }catch(error){
                    console.log(error)
                    throw new Error("erororor")
                }
                // console.log(data)

                // const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

                // // if (user) {
                // //   // Any object returned will be saved in `user` property of the JWT
                //   return user
                // } else {
                //   // If you return null or false then the credentials will be rejected
                //   return null
                //   // You can also Reject this callback with an Error or with a URL:
                //   // throw new Error('error message') // Redirect to error page
                //   // throw '/path/to/redirect'        // Redirect to a URL
                // }

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