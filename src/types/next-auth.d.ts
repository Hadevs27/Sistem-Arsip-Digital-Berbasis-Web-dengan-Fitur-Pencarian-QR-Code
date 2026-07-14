import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      role: 'ADMIN' | 'PEGAWAI' | 'PIMPINAN';
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    role: 'ADMIN' | 'PEGAWAI' | 'PIMPINAN';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    role: 'ADMIN' | 'PEGAWAI' | 'PIMPINAN';
  }
}
