import { db } from "@/db";
import { users } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createUser, deleteUser } from "./actions";

export default async function AdminUsersPage() {
  const data = await db.select().from(users);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-neutral-200/60 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Manajemen Pengguna</h1>
          <p className="text-sm text-neutral-500 mt-1">Kelola akun dan peran pengguna sistem</p>
        </div>
      </div>
      
      <div className="bg-white p-6 border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <h2 className="text-lg font-semibold mb-4 text-neutral-900">Tambah Pengguna Baru</h2>
        <form action={createUser} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-2 lg:col-span-1">
            <label className="text-sm font-semibold text-neutral-700">Nama Lengkap <span className="text-danger">*</span></label>
            <Input name="nama" required placeholder="John Doe" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
          </div>
          <div className="space-y-2 lg:col-span-1">
            <label className="text-sm font-semibold text-neutral-700">Username <span className="text-danger">*</span></label>
            <Input name="username" required placeholder="johndoe" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
          </div>
          <div className="space-y-2 lg:col-span-1">
            <label className="text-sm font-semibold text-neutral-700">Password <span className="text-danger">*</span></label>
            <Input name="password" type="password" required placeholder="Min 6 karakter" className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
          </div>
          <div className="space-y-2 lg:col-span-1">
            <label className="text-sm font-semibold text-neutral-700">Role <span className="text-danger">*</span></label>
            <Select name="role" required defaultValue="PEGAWAI">
              <SelectTrigger className="h-11 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500">
                <SelectValue placeholder="Pilih Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PEGAWAI">Pegawai</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="lg:col-span-1">
            <Button type="submit" className="h-11 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-sm shadow-primary-500/20 w-full">Simpan</Button>
          </div>
        </form>
      </div>

      <div className="bg-white border border-neutral-200/60 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-neutral-50/80 hover:bg-neutral-50/80">
              <TableHead className="font-semibold text-neutral-700 h-12">Nama</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12">Username</TableHead>
              <TableHead className="font-semibold text-neutral-700 h-12">Role</TableHead>
              <TableHead className="w-[100px] font-semibold text-neutral-700 h-12 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-neutral-500 py-8">Tidak ada data pengguna.</TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user.id} className="hover:bg-primary-50/50 transition-colors border-neutral-100 group">
                  <TableCell className="font-medium text-neutral-900 py-4">{user.nama}</TableCell>
                  <TableCell className="text-neutral-600 py-4">{user.username}</TableCell>
                  <TableCell className="py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      user.role === 'ADMIN' ? 'bg-danger/10 text-danger ring-danger/20' :
                      'bg-primary-50 text-primary-700 ring-primary-700/20'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <form action={async () => {
                      "use server";
                      await deleteUser(user.id);
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
