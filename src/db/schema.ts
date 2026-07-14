import { pgTable, text, timestamp, uuid, varchar, integer, pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['ADMIN', 'PEGAWAI']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  username: varchar('username', { length: 100 }).unique().notNull(),
  password: text('password').notNull(),
  role: roleEnum('role').default('PEGAWAI').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const kategoriArsip = pgTable('kategori_arsip', {
  id: uuid('id').defaultRandom().primaryKey(),
  nama: varchar('nama', { length: 255 }).notNull(),
  deskripsi: text('deskripsi'),
});

export const arsip = pgTable('arsip', {
  id: uuid('id').defaultRandom().primaryKey(),
  nomorSurat: varchar('nomor_surat', { length: 100 }).unique().notNull(),
  judul: varchar('judul', { length: 255 }).notNull(),
  kategoriId: uuid('kategori_id').references(() => kategoriArsip.id).notNull(),
  tanggal: timestamp('tanggal', { mode: 'date' }).notNull(),
  deskripsi: text('deskripsi'),
  fileUrl: text('file_url').notNull(),
  qrCodeUrl: text('qr_code_url'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const logAktivitas = pgTable('log_aktivitas', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  aksi: text('aksi').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
