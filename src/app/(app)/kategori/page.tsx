import { db } from "@/db";
import { kategoriArsip } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createKategori, deleteKategori } from "./actions";

export default async function KategoriPage() {
  const data = await db.select().from(kategoriArsip);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Manajemen Kategori Arsip</h1>
          <p className="text-sm text-neutral-500 mt-1">Klasifikasikan dokumen arsip agar lebih tertata</p>
        </div>
      </div>
      
      <div className="bg-white p-6 border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h2 className="text-lg font-semibold mb-4 text-neutral-900">Tambah Kategori Baru</h2>
        <form action={createKategori} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="space-y-2 flex-1 w-full">
            <label className="text-sm font-semibold text-neutral-700">Nama Kategori <span className="text-danger">*</span></label>
            <Input name="nama" required placeholder="Contoh: Surat Keputusan" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
          </div>
          <div className="space-y-2 flex-1 w-full">
            <label className="text-sm font-semibold text-neutral-700">Deskripsi</label>
            <Input name="deskripsi" placeholder="Keterangan singkat" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
          </div>
          <Button type="submit" className="h-11 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/20 w-full sm:w-auto">Simpan</Button>
        </form>
      </div>

      <div className="bg-white border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
              <TableHead className="font-semibold text-neutral-700 h-12">Nama Kategori</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12">Deskripsi</TableHead>
              <TableHead className="w-[100px] font-semibold text-neutral-700 h-12 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-neutral-500 py-8">Tidak ada kategori arsip yang tersedia.</TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className="hover:bg-primary-50/50 transition-colors border-neutral-100 group">
                  <TableCell className="font-medium text-neutral-900 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {item.nama}
                    </span>
                  </TableCell>
                  <TableCell className="text-neutral-600 py-4">{item.deskripsi || "-"}</TableCell>
                  <TableCell className="text-right py-4">
                    <form action={async () => {
                      "use server";
                      await deleteKategori(item.id);
                    }}>
                      <Button variant="ghost" size="sm" type="submit" className="text-danger hover:text-danger hover:bg-danger/10 rounded-lg">Hapus</Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
