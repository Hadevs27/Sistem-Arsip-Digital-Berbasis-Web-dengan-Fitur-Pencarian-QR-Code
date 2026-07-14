import { db } from "@/db";
import { arsip, kategoriArsip } from "@/db/schema";
import { eq, like, or, desc } from "drizzle-orm";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Search, Plus, QrCode } from "lucide-react";
import { Input } from "@/components/ui/input";

export default async function ArsipPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q || "";

  let query = db
    .select({
      id: arsip.id,
      nomorSurat: arsip.nomorSurat,
      judul: arsip.judul,
      tanggal: arsip.tanggal,
      kategori: kategoriArsip.nama,
    })
    .from(arsip)
    .leftJoin(kategoriArsip, eq(arsip.kategoriId, kategoriArsip.id))
    .orderBy(desc(arsip.createdAt));

  if (q) {
    query = query.where(
      or(
        like(arsip.judul, `%${q}%`),
        like(arsip.nomorSurat, `%${q}%`)
      )
    ) as any;
  }

  const data = await query;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Daftar Arsip</h1>
          <p className="text-sm text-neutral-500 mt-1">Kelola dan temukan dokumen arsip dengan mudah</p>
        </div>
        <Link href="/arsip/create" className={buttonVariants({ className: "bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-5 h-11 shadow-sm shadow-primary-500/20" })}>
          <Plus className="mr-2 h-5 w-5" /> Tambah Arsip
        </Link>
      </div>

      <div className="bg-white border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
          <form className="flex max-w-md gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input 
                name="q" 
                defaultValue={q} 
                placeholder="Cari nomor surat atau judul..." 
                className="pl-9 h-10 bg-white border-neutral-200 rounded-lg focus-visible:ring-primary-500"
              />
            </div>
            <Button type="submit" variant="secondary" className="h-10 rounded-lg bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-600 shadow-sm">
              Cari
            </Button>
          </form>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
              <TableHead className="font-semibold text-neutral-700 h-12">No. Surat</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12">Judul Arsip</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12">Kategori</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12">Tanggal</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-neutral-500 py-12">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center">
                      <Search className="h-6 w-6 text-neutral-400" />
                    </div>
                    <p>Data arsip tidak ditemukan.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((item) => (
                <TableRow key={item.id} className="hover:bg-primary-50/50 transition-colors border-neutral-100 group">
                  <TableCell className="font-medium text-neutral-900 py-4">{item.nomorSurat}</TableCell>
                  <TableCell className="text-neutral-600 py-4 max-w-[300px] truncate">{item.judul}</TableCell>
                  <TableCell className="py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                      {item.kategori}
                    </span>
                  </TableCell>
                  <TableCell className="text-neutral-500 py-4">{new Date(item.tanggal).toLocaleDateString('id-ID', { dateStyle: 'medium' })}</TableCell>
                  <TableCell className="text-right space-x-2 py-4">
                    <Link href={`/arsip/${item.id}`} className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-lg text-primary-700 border-primary-200 hover:bg-primary-50" })}>Detail</Link>
                    <Link href={`/arsip/${item.id}/edit`} className={buttonVariants({ variant: "ghost", size: "sm", className: "rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100" })}>Edit</Link>
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
