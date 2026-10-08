import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { connectDB } from '@/db/connectDB'
import { userinfo } from '@/models/User'
export const authoptions ={
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks:{
    async signIn({user,email,account,profile,credentials}){
      if(account.provider==='google'){
        await connectDB()
        const currentUser=await userinfo.findOne({email:user.email})
       if(!currentUser){
        const saveUser=await userinfo.create({
          username:user.email.split('@')[0],
          email:user.email
        })
       }
       return true;
      }
    },
    async session({session,token,user}){
      const dbUser=await userinfo.findOne({email:session.user.email})
      session.user.email=dbUser.email
      session.user.id=dbUser._id.toString()
      session.isAdmin=dbUser.isAdmin
      return session
    }
  }
}
const handler = NextAuth(authoptions);
export { handler as GET, handler as POST }