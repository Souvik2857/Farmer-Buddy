import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '@/db/connectDB'
export const authoptions =NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks:{
    async signIn({user,email,account,profile,credentials}){
      if(account.provider==='google'){
        await connectDB()
        
      }
    }
  }
})
export {authoptions as GET,authoptions as POST}