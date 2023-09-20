import startDB from "@/lib/db"
import UserModel from "@/models/UserModel"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials
                await startDB()
                const user = await UserModel.findOne({ email })
                if (!user) throw Error("email/password mismatch")
                const passwordMatch = await user.comparePassword(password)
                if (!passwordMatch) throw Error("email/password mismatch")
                return ({
                    name: user.name,
                    email: user.email,
                    _id: user._id,
                })
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            await startDB()
            const User = await UserModel.findOne({ email: token.email }).select("_id image name")
            return ({ ...session, user: { ...session.user, _id: User._id, image: User.image, name: User.name } })
        },
        // async jwt({ token, user, session, account }) {
        //     // console.log({ user })
        //     if (user) {
        //         return ({ ...token, _id: user._id })
        //     }
        //     return token
        // },
        async signIn({ user, account, profile }) {
            if (account.provider === "google" || account.provider === "github") {
                try {
                    await startDB()
                    const userExist = await UserModel.findOne({ email: user.email })
                    if (!userExist) UserModel.create({ name: user.name, email: user.email, image: user.image, provider: account.provider })

                } catch (error) {
                    console.log(error)
                }
            }
            return user
        },

    },
    pages: {
        signIn: '/dashboard/auth'
    }
}

