import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: 'ADMIN' | 'PEGAWAI';
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    role: 'ADMIN' | 'PEGAWAI';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: 'ADMIN' | 'PEGAWAI';
  }
}
