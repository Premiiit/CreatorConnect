import connectDB from '@/db/connectDB';
import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import User from '@/models/nonameUser'; 
import Payment from '@/models/Payment';

const authoptions = NextAuth({
  providers: [
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        scope: "read:user user:email"
      })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == "github"){
        // console.log('GitHub Profile:', profile);
        user.email = profile.email
        // if (!email) {
        //   console.error('Email is undefined');
        //   return false; // Prevent sign-in if email is missing
        // }
        await connectDB()
        const currentUser = await User.findOne({email: profile.email})
        if(!currentUser){
          console.log("new user")
          const newUser = await User.create({
            email: profile.email,
            username: profile.email.split("@")[0],
          })
          await newUser.save()
        }
        return true
      }
    },
    async session({session, user, token}){
      const dbUser = await User.findOne({email: session.user.email})
      session.user.name = dbUser.username
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export {authoptions as GET, authoptions as POST}