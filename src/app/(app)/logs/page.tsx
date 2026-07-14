import { db } from "@/db";
import { logAktivitas, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function LogsPage() {
  const data = await db
    .select({
      id: logAktivitas.id,
      aksi: logAktivitas.aksi,
      createdAt: logAktivitas.createdAt,
      userName: users.nama,
    })
    .from(logAktivitas)
    .leftJoin(users, eq(logAktivitas.userId, users.id))
    .orderBy(desc(logAktivitas.createdAt))
    .limit(100); // Tampilkan 100 log terakhir

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Log Aktivitas</h1>
          <p className="text-sm text-neutral-500 mt-1">Pantau seluruh riwayat perubahan dan aktivitas sistem</p>
        </div>
      </div>
      
      <div className="bg-white border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
              <TableHead className="font-semibold text-neutral-700 h-12 w-[200px]">Waktu</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12 w-[250px]">Pengguna</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12">Aktivitas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-neutral-500 py-8">
                  Tidak ada log aktivitas.
                </TableCell>
              </TableRow>
            ) : (
              data.map((log) => (
                <TableRow key={log.id} className="hover:bg-primary-50/50 transition-colors border-neutral-100 group">
                  <TableCell className="whitespace-nowrap text-neutral-500 py-4">
                    {new Date(log.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                  </TableCell>
                  <TableCell className="font-medium text-neutral-900 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs uppercase">
                        {(log.userName || "U").substring(0, 2)}
                      </div>
                      {log.userName || "Unknown"}
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-700 py-4">{log.aksi}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
