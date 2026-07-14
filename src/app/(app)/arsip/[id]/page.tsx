import { db } from "@/db";
import { arsip, kategoriArsip, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ArrowLeft, Trash, Edit } from "lucide-react";
import { deleteArsip } from "../actions";

export default async function ArsipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [data] = await db
    .select({
      id: arsip.id,
      nomorSurat: arsip.nomorSurat,
      judul: arsip.judul,
      tanggal: arsip.tanggal,
      deskripsi: arsip.deskripsi,
      fileUrl: arsip.fileUrl,
      qrCodeUrl: arsip.qrCodeUrl,
      createdAt: arsip.createdAt,
      kategori: kategoriArsip.nama,
      createdBy: users.nama,
    })
    .from(arsip)
    .leftJoin(kategoriArsip, eq(arsip.kategoriId, kategoriArsip.id))
    .leftJoin(users, eq(arsip.createdBy, users.id))
    .where(eq(arsip.id, id));

  if (!data) return notFound();

  // Full URL for the QR Code
  const appUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const qrFullUrl = `${appUrl}${data.qrCodeUrl}`;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm mb-6">
        <div className="flex items-center gap-4">
          <Link href="/arsip" className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900" })}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Detail Arsip</h1>
            <p className="text-sm text-neutral-500 mt-1">{data.nomorSurat}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`/arsip/${data.id}/edit`} className={buttonVariants({ variant: "outline", className: "h-11 rounded-xl text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900" })}>
            <Edit className="h-4 w-4 mr-2" /> Edit Arsip
          </Link>
          <form action={async () => {
            "use server";
            await deleteArsip(data.id);
          }}>
            <Button variant="destructive" type="submit" className="h-11 rounded-xl bg-danger hover:bg-danger/90 shadow-sm shadow-danger/20">
              <Trash className="h-4 w-4 mr-2" /> Hapus
            </Button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 pb-4">
              <CardTitle className="text-lg text-neutral-900">Informasi Metadata</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Nomor Surat</p>
                  <p className="font-medium text-neutral-900 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-100">{data.nomorSurat}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Kategori</p>
                  <p className="font-medium text-neutral-900"><span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 ring-1 ring-inset ring-primary-700/10">{data.kategori}</span></p>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Judul / Perihal</p>
                  <p className="font-semibold text-lg text-neutral-900">{data.judul}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Tanggal Surat</p>
                  <p className="font-medium text-neutral-800">{new Date(data.tanggal).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Ditambahkan Oleh</p>
                  <p className="font-medium text-neutral-800">{data.createdBy} <span className="text-neutral-400 text-sm font-normal">({new Date(data.createdAt).toLocaleDateString('id-ID')})</span></p>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Deskripsi</p>
                  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 text-neutral-700 text-sm leading-relaxed">
                    {data.deskripsi || "Tidak ada keterangan tambahan."}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-neutral-900">Pratinjau Dokumen</CardTitle>
              <a href={data.fileUrl} target="_blank" download className={buttonVariants({ variant: "outline", size: "sm", className: "rounded-lg" })}>
                <Download className="h-4 w-4 mr-2" /> Unduh Dokumen
              </a>
            </CardHeader>
            <CardContent className="p-0 bg-neutral-100/50">
              <div className="p-4 md:p-6">
                {data.fileUrl.endsWith('.pdf') ? (
                  <iframe src={data.fileUrl} className="w-full h-[600px] border border-neutral-200 rounded-xl bg-white shadow-sm" />
                ) : (
                  <img src={data.fileUrl} alt={data.judul} className="w-full h-auto rounded-xl border border-neutral-200 shadow-sm bg-white" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-neutral-200/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-2xl overflow-hidden bg-gradient-to-b from-white to-neutral-50/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-center text-neutral-900">QR Code Label</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6 pt-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary-400 to-accent-400 rounded-2xl blur opacity-20 pointer-events-none"></div>
                <div className="relative">
                  <QRCodeSVG value={qrFullUrl} size={220} level="H" includeMargin={false} />
                </div>
              </div>
              <p className="text-sm text-center text-neutral-500 px-4 leading-relaxed">
                Tempelkan QR Code ini pada dokumen fisik untuk memudahkan pelacakan ke sistem digital.
              </p>
              <a href={`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><use href="${qrFullUrl}"/></svg>`} download={`QR-${data.nomorSurat.replace(/\//g, '-')}.svg`} target="_blank" className={buttonVariants({ variant: "default", className: "w-full h-12 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800" })}>
                Unduh QR Code SVG
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
