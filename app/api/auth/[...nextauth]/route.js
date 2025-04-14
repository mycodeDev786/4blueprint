import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import TwitterProvider from "next-auth/providers/twitter";
import { authConfig } from "../../../utils/auth";

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
