CREATE TYPE "public"."role" AS ENUM('ADMIN', 'PEGAWAI', 'PIMPINAN');--> statement-breakpoint
CREATE TABLE "arsip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nomor_surat" varchar(100) NOT NULL,
	"judul" varchar(255) NOT NULL,
	"kategori_id" uuid NOT NULL,
	"tanggal" timestamp NOT NULL,
	"deskripsi" text,
	"file_url" text NOT NULL,
	"qr_code_url" text,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "arsip_nomor_surat_unique" UNIQUE("nomor_surat")
);
--> statement-breakpoint
CREATE TABLE "kategori_arsip" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama" varchar(255) NOT NULL,
	"deskripsi" text
);
--> statement-breakpoint
CREATE TABLE "log_aktivitas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"aksi" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nama" varchar(255) NOT NULL,
	"username" varchar(100) NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'PEGAWAI' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "arsip" ADD CONSTRAINT "arsip_kategori_id_kategori_arsip_id_fk" FOREIGN KEY ("kategori_id") REFERENCES "public"."kategori_arsip"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "arsip" ADD CONSTRAINT "arsip_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log_aktivitas" ADD CONSTRAINT "log_aktivitas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;