import { db } from "@/db";
import { kategoriArsip } from "@/db/schema";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createArsip } from "../actions";
import Link from "next/link";

export default async function CreateArsipPage() {
  const categories = await db.select().from(kategoriArsip);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Tambah Arsip Baru</h1>
        <p className="text-sm text-neutral-500 mt-1">Lengkapi informasi di bawah ini untuk menyimpan dokumen baru</p>
      </div>
      
      <div className="bg-white p-8 border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <form action={createArsip} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Nomor Surat <span className="text-danger">*</span></label>
              <Input name="nomorSurat" required placeholder="Contoh: 001/SK/2026" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Judul Arsip <span className="text-danger">*</span></label>
              <Input name="judul" required placeholder="Judul atau perihal surat" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-700">Kategori <span className="text-danger">*</span></label>
              <Select name="kategoriId" required>
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
              <Input type="date" name="tanggal" required className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-neutral-700">Deskripsi (Opsional)</label>
              <Input name="deskripsi" placeholder="Keterangan tambahan" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
          </div>
          
          <hr className="border-neutral-100" />

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-neutral-900">Dokumen Lampiran</h3>
            <div className="space-y-2 p-6 border-2 border-dashed border-neutral-200 rounded-xl bg-neutral-50/30 text-center hover:bg-neutral-50 transition-colors">
              <label className="text-sm font-medium text-neutral-600 block mb-2 cursor-pointer">
                Unggah File (PDF/Gambar) <span className="text-danger">*</span>
              </label>
              <Input type="file" name="file" accept=".pdf,image/*" required className="max-w-xs mx-auto text-sm file:bg-primary-50 file:text-primary-700 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-semibold hover:file:bg-primary-100 cursor-pointer" />
              <p className="text-xs text-neutral-400 mt-2">Ukuran maksimal 10MB</p>
            </div>
          </div>
          
          <div className="pt-6 flex gap-3 justify-end border-t border-neutral-100 mt-8">
            <Link href="/arsip" className={buttonVariants({ variant: "ghost", className: "h-11 px-6 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl" })}>Batal</Link>
            <Button type="submit" className="h-11 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/20">Simpan Arsip</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
