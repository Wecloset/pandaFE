import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import client from "../../../lib/client";
import createHashedPassword from "../../../lib/hash";

interface Credentials {
  email: string;
  password: string;
  nickname: string;
}

export default NextAuth({
  session: {
    strategy: "jwt", // 기본설정도 true지만 명시적으로 설정함. (로그인 성공시 쿠키에 jwt토큰 생성 확인)
    maxAge: 3 * 60 * 60, // 3 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // @ts-ignore
      async authorize(credentials: Credentials) {
        const { email, password, nickname } = credentials;
        const CheckUser = await client.user.findMany({
          where: {
            email,
            password,
          },
        });
        if (CheckUser.length === 0) {
          throw new Error("유저 정보를 찾을 수 없습니다.");
        } else {
          return { email, nickname };
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      const myString: string = email?.toString() || "";
      const existGoogle = await client.user.findMany({
        where: {
          email: myString,
        },
      });
      if (existGoogle.length === 0) {
        await client.user.create({
          data: {
            email: myString,
            password: createHashedPassword(user.id),
          },
        });
      }
      return true;
    },
  },
});
