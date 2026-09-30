import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDb from '@/db/connectDb'

await connectDb()

const authOptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        const existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
          const newUser = new User({
            name: user.name,
            email: user.email,
            profilePic: user.image,
            username: user.name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000000),
          })
          await newUser.save()
        }
        return true; // Allow sign-in
      }
    },
    async session({ session, token, user }) {
      const existingUser = await User.findOne({ email: session.user.email })
      session.user.username = existingUser.username
      return session
    }
  }
})

export { authOptions as GET, authOptions as POST }