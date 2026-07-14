"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { hashPassword } from "@/lib/auth-utils";

export async function createUser(formData: FormData) {
  const nama = formData.get("nama") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "ADMIN" | "PEGAWAI" | "PIMPINAN";

  if (!nama || !username || !password || !role) throw new Error("Semua field wajib diisi");

  const hashedPassword = await hashPassword(password);

  await db.insert(users).values({ 
    nama, 
    username, 
    password: hashedPassword, 
    role 
  });
  
  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  await db.delete(users).where(eq(users.id, id));
  revalidatePath("/admin/users");
}
