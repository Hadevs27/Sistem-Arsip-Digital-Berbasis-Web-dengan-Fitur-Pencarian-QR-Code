"use server";

import { db } from "@/db";
import { arsip, logAktivitas } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { auth } from "@/auth";
import crypto from "crypto";

export async function createArsip(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const nomorSurat = formData.get("nomorSurat") as string;
  const judul = formData.get("judul") as string;
  const kategoriId = formData.get("kategoriId") as string;
  const tanggal = formData.get("tanggal") as string;
  const deskripsi = formData.get("deskripsi") as string;
  const file = formData.get("file") as File;

  let fileUrl = "";

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Ensure upload dir exists
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {}

    const uniqueName = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);
    fileUrl = `/uploads/${uniqueName}`;
  }

  // Insert to DB
  const [newArsip] = await db.insert(arsip).values({
    nomorSurat,
    judul,
    kategoriId,
    tanggal: new Date(tanggal),
    deskripsi,
    fileUrl,
    createdBy: session.user.id,
  }).returning();

  // Generate QR Code URL mapping
  const qrUrl = `/arsip/${newArsip.id}`;
  await db.update(arsip).set({ qrCodeUrl: qrUrl }).where(eq(arsip.id, newArsip.id));

  // Log activity
  await db.insert(logAktivitas).values({
    userId: session.user.id,
    aksi: `Menambahkan arsip baru: ${nomorSurat} - ${judul}`,
  });

  revalidatePath("/arsip");
  revalidatePath("/dashboard");
  redirect(`/arsip/${newArsip.id}`);
}

export async function deleteArsip(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const [deleted] = await db.delete(arsip).where(eq(arsip.id, id)).returning();
  
  if (deleted) {
    await db.insert(logAktivitas).values({
      userId: session.user.id,
      aksi: `Menghapus arsip: ${deleted.nomorSurat}`,
    });
  }

  revalidatePath("/arsip");
  revalidatePath("/dashboard");
  redirect("/arsip");
}
