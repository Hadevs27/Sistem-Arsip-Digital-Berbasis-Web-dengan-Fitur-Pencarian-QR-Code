import { db } from "@/db";
import { arsip, logAktivitas } from "@/db/schema";
import { count, eq, desc, sql } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Inbox, Send, Activity, Plus, QrCode, Search } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default async function DashboardPage() {
  const totalArsipCount = await db.select({ value: count() }).from(arsip);
  // Assuming "Surat Masuk" and "Surat Keluar" are categories, but since we don't know the exact UUID,
  // we'll just query by title/category name conceptually or leave placeholder for now.
  // Actually, we can just fetch all and group, or add simple metrics.
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const arsipHariIniCount = await db.select({ value: count() })
    .from(arsip)
    .where(sql`${arsip.createdAt} >= ${today}`);

  const recentLogs = await db.select()
    .from(logAktivitas)
    .orderBy(desc(logAktivitas.createdAt))
    .limit(5);

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="relative rounded-2xl bg-gradient-to-r from-primary-700 to-primary-500 p-8 text-white overflow-hidden shadow-lg shadow-primary-500/20">
        <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Selamat Datang di Arsip Digital</h1>
            <p className="text-primary-100 max-w-xl">Kelola arsip kecamatan dengan lebih cepat, aman, dan tertata menggunakan pemindaian QR Code cerdas.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/arsip/create" className={buttonVariants({ variant: "secondary", className: "shadow-sm" })}>
              <Plus className="mr-2 h-4 w-4" /> Tambah Arsip
            </Link>
            <Link href="/scan" className={buttonVariants({ className: "bg-white/20 text-white hover:bg-white/30 border-none shadow-sm" })}>
              <QrCode className="mr-2 h-4 w-4" /> Scan QR
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none bg-gradient-to-br from-primary-50 to-primary-100/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-primary-700">Total Arsip</CardTitle>
            <div className="rounded-full bg-primary-200/50 p-2">
              <FileText className="h-5 w-5 text-primary-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary-900">{totalArsipCount[0].value}</div>
            <p className="text-xs font-medium text-primary-600 mt-1">Dokumen tersimpan</p>
          </CardContent>
        </Card>
        
        <Card className="border-none bg-gradient-to-br from-secondary-50 to-secondary-100/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-secondary-700">Arsip Hari Ini</CardTitle>
            <div className="rounded-full bg-secondary-200/50 p-2">
              <Activity className="h-5 w-5 text-secondary-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-secondary-900">{arsipHariIniCount[0].value}</div>
            <p className="text-xs font-medium text-secondary-600 mt-1">Ditambahkan hari ini</p>
          </CardContent>
        </Card>

        {/* Placeholders for Surat Masuk / Keluar */}
        <Card className="border-none bg-gradient-to-br from-accent-50 to-accent-100/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-accent-700">Surat Masuk</CardTitle>
            <div className="rounded-full bg-accent-200/50 p-2">
              <Inbox className="h-5 w-5 text-accent-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-accent-900">-</div>
            <p className="text-xs font-medium text-accent-600 mt-1">Sesuai kategori</p>
          </CardContent>
        </Card>

        <Card className="border-none bg-gradient-to-br from-orange-50 to-orange-100/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-orange-700">Surat Keluar</CardTitle>
            <div className="rounded-full bg-orange-200/50 p-2">
              <Send className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-900">-</div>
            <p className="text-xs font-medium text-orange-600 mt-1">Sesuai kategori</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Recent Activity */}
        <Card className="md:col-span-2 border-neutral-200/60 shadow-sm">
          <CardHeader className="border-b border-neutral-100 pb-4 bg-neutral-50/50 rounded-t-xl">
            <CardTitle className="text-lg">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {recentLogs.length > 0 ? (
              <div className="space-y-6">
                {recentLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4">
                    <div className="mt-1 flex h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-neutral-800 leading-none">{log.aksi}</p>
                      <p className="text-xs text-neutral-500">{new Date(log.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Belum ada aktivitas.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Panel */}
        <Card className="border-neutral-200/60 shadow-sm">
          <CardHeader className="border-b border-neutral-100 pb-4 bg-neutral-50/50 rounded-t-xl">
            <CardTitle className="text-lg">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-3">
            <Link href="/arsip" className={buttonVariants({ variant: "outline", className: "w-full justify-start h-12 text-neutral-600" })}>
              <Search className="mr-3 h-5 w-5 text-neutral-400" /> Cari Arsip
            </Link>
            <Link href="/kategori" className={buttonVariants({ variant: "outline", className: "w-full justify-start h-12 text-neutral-600" })}>
              <FileText className="mr-3 h-5 w-5 text-neutral-400" /> Kelola Kategori
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
