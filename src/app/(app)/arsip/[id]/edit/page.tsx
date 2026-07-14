import { db } from "@/db";
import { arsip, kategoriArsip } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { logAktivitas } from "@/db/schema";

export default async function EditArsipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [data] = await db.select().from(arsip).where(eq(arsip.id, id));
  if (!data) return notFound();

  const categories = await db.select().from(kategoriArsip);

  async function updateArsip(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const judul = formData.get("judul") as string;
    const kategoriId = formData.get("kategoriId") as string;
    const tanggal = formData.get("tanggal") as string;
    const deskripsi = formData.get("deskripsi") as string;

    await db.update(arsip).set({
      judul,
      kategoriId,
      tanggal: new Date(tanggal),
      deskripsi,
    }).where(eq(arsip.id, id));

    await db.insert(logAktivitas).values({
      userId: session.user.id,
      aksi: `Mengubah arsip: ${data.nomorSurat}`,
    });

    revalidatePath("/arsip");
    revalidatePath(`/arsip/${id}`);
    redirect(`/arsip/${id}`);
  }

  // Format date for input default value (YYYY-MM-DD)
  const dateFormatted = data.tanggal ? new Date(data.tanggal).toISOString().split('T')[0] : "";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Edit Arsip</h1>
        <p className="text-sm text-neutral-500 mt-1">Ubah metadata dokumen sesuai kebutuhan</p>
      </div>
      
      <div className="bg-white p-8 border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <form action={updateArsip} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Nomor Surat (Tidak bisa diubah)</label>
              <Input name="nomorSurat" defaultValue={data.nomorSurat} disabled className="h-11 bg-neutral-100 border-neutral-200 text-neutral-500" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Judul Arsip <span className="text-danger">*</span></label>
              <Input name="judul" defaultValue={data.judul} required className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Kategori <span className="text-danger">*</span></label>
              <Select name="kategoriId" defaultValue={data.kategoriId} required>
                <SelectTrigger className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.nama}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Tanggal Surat <span className="text-danger">*</span></label>
              <Input type="date" name="tanggal" defaultValue={dateFormatted} required className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-neutral-700">Deskripsi</label>
              <Input name="deskripsi" defaultValue={data.deskripsi || ""} className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
          </div>
          
          <div className="pt-6 flex gap-3 justify-end border-t border-neutral-100 mt-8">
            <Link href={`/arsip/${id}`} className={buttonVariants({ variant: "ghost", className: "h-11 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl" })}>Batal</Link>
            <Button type="submit" className="h-11 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/20">Simpan Perubahan</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
