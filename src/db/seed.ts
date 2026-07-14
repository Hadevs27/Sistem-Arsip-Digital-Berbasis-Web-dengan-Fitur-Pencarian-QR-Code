import "dotenv/config";
import { db } from "./index";
import { eq } from "drizzle-orm";
import { users, kategoriArsip, arsip } from "./schema";
import { hashPassword } from "../lib/auth-utils";

async function main() {
  console.log("Mereset dan mengisi data dummy...");

  // Hapus data arsip dan kategori jika perlu (opsional, karena ini seed awal, bisa kita tambah saja atau abaikan jika constraint error)
  // Tapi untuk mempermudah, kita akan menambahkan dengan try-catch agar tidak error kalau duplicate unique key (nomor_surat, username).

  const hashedPasswordAdmin = await hashPassword("admin123");
  const hashedPasswordPegawai = await hashPassword("pegawai123");

  // 1. Seed Users
  const adminRes = await db.insert(users).values({
    nama: "Administrator",
    username: "admin",
    password: hashedPasswordAdmin,
    role: "ADMIN",
  }).onConflictDoNothing().returning();

  const pegawaiRes = await db.insert(users).values({
    nama: "Andi Pegawai",
    username: "pegawai",
    password: hashedPasswordPegawai,
    role: "PEGAWAI",
  }).onConflictDoNothing().returning();

  // Dapatkan ID pengguna (jika sudah ada, kita harus query)
  const allUsers = await db.select().from(users);
  const adminId = allUsers.find(u => u.username === "admin")?.id;
  const pegawaiId = allUsers.find(u => u.username === "pegawai")?.id;

  if (!adminId || !pegawaiId) {
    throw new Error("Gagal mengambil ID user");
  }

  // 2. Seed Kategori
  await db.insert(kategoriArsip).values([
    { nama: "Surat Masuk", deskripsi: "Arsip surat yang masuk dari instansi luar" },
    { nama: "Surat Keluar", deskripsi: "Arsip surat yang dikirim keluar" },
    { nama: "Surat Keputusan", deskripsi: "SK Camat atau pejabat berwenang" }
  ]).onConflictDoNothing();

  const allKategori = await db.select().from(kategoriArsip);
  const katMasuk = allKategori.find(k => k.nama === "Surat Masuk")?.id;
  const katKeluar = allKategori.find(k => k.nama === "Surat Keluar")?.id;
  
  if (!katMasuk || !katKeluar) {
    throw new Error("Gagal mengambil kategori ID");
  }

  // 3. Seed Arsip Dummy
  const dummyArsip = [
    {
      nomorSurat: "001/SM/2026",
      judul: "Undangan Rapat Koordinasi Tingkat Kabupaten",
      kategoriId: katMasuk,
      tanggal: new Date("2026-07-10"),
      deskripsi: "Undangan rapat dari bupati",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdBy: adminId,
    },
    {
      nomorSurat: "002/SK/2026",
      judul: "Pemberitahuan Kegiatan Kerja Bakti",
      kategoriId: katKeluar,
      tanggal: new Date("2026-07-12"),
      deskripsi: "Surat pemberitahuan ke desa-desa",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      createdBy: pegawaiId,
    }
  ];

  for (const item of dummyArsip) {
    // Generate QR (We usually do this via action, but we'll mock the URL here)
    const result = await db.insert(arsip).values(item).onConflictDoNothing().returning();
    if (result.length > 0) {
      await db.update(arsip).set({ qrCodeUrl: `/arsip/${result[0].id}` }).where(eq(arsip.id, result[0].id));
    }
  }

  console.log("Seed complete! Users created: admin (admin123), pegawai (pegawai123). Arsip dummy inserted.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
