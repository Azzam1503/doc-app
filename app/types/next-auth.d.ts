import NextAuth from "next-auth";

declare module "next-auth"{
    interface User{
        id: string;
        hey: string;
    }

    interface JWT {
        id?: string;
        hey?: string;
    }

    interface Session{
        user: USER & {
            id?: string;
            hey?: string;
        }
    }
}