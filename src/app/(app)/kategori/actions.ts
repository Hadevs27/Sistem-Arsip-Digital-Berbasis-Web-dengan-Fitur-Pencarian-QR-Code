"use server";

import { db } from "@/db";
import { kategoriArsip } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createKategori(formData: FormData) {
  const nama = formData.get("nama") as string;
  const deskripsi = formData.get("deskripsi") as string;

  if (!nama) throw new Error("Nama kategori wajib diisi");

  await db.insert(kategoriArsip).values({ nama, deskripsi });
  revalidatePath("/kategori");
}

export async function deleteKategori(id: string) {
  await db.delete(kategoriArsip).where(eq(kategoriArsip.id, id));
  revalidatePath("/kategori");
}
