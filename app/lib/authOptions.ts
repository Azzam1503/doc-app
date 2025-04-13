import CredentialsProvider  from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { client } from './db';
import {PrismaAdapter} from '@next-auth/prisma-adapter'; 
import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';

const AuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Login with email",
            credentials:{
                email: {label: "email", type: "text", placeholder: "johndoe@email.com"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials): Promise<any> {
                if (!credentials?.email || !credentials?.password) return null;
                const {email, password} = credentials;
                if(!credentials?.email || !credentials?.password) return null;

                console.log(email, password);

                const user = await client.user.findFirst({
                    where: {
                        email,
                    }
                });

                if(!user) return null;
                if(user.password){
                    const comparePassword = bcrypt.compareSync(password, user.password);
                    if(!comparePassword) return null;
                }

                // console.log(user);
                
                return {
                    id: user.id + "",
                    name: user.name,
                    email: user.email,
                    new: "new"
                };
            }
    }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })],
    pages:{
        signIn: "/signin",
    },
    adapter: PrismaAdapter(client),
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt({token, user}){
            console.log("jwt", token, user);
            // console.log(user);
            if(user){
                token.id = user.id;
                token.hey = "hemlo"
            }
            return token;
        },
        async session({session, user, token}){
            console.log("session", session, user, token);
            if(session.user){
                session.user.id = token.id;
                session.user.hey = token.hey;
            }
            return session;
        }
    }
};

export default AuthOptions;