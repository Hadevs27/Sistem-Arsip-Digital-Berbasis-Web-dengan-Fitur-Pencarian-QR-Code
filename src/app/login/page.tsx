"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { loginAction } from "./actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Memproses..." : "Masuk"}
    </Button>
  );
}

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  async function action(formData: FormData) {
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary-700 via-primary-600 to-primary-900 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-b from-white/10 to-transparent rounded-full blur-3xl transform rotate-12"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <Card className="w-full max-w-[400px] border-white/20 bg-white/95 backdrop-blur-xl shadow-2xl shadow-primary-900/50 rounded-2xl relative z-10">
        <CardHeader className="space-y-3 pb-6 pt-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 15h6"/><path d="M3 18h6"/><path d="M14 15h.01"/><path d="M14 18h.01"/></svg>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold text-neutral-900 tracking-tight">Arsip Digital</CardTitle>
            <CardDescription className="text-neutral-500 text-[15px]">Kantor Kecamatan Balaraja</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form action={action} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-neutral-700">Username</label>
              <Input id="username" name="username" type="text" required placeholder="Masukkan username Anda" className="h-12 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-neutral-700">Password</label>
              <Input id="password" name="password" type="password" required placeholder="••••••••" className="h-12 bg-neutral-50/50 border-neutral-200 focus-visible:ring-primary-500" />
            </div>
            {error && <div className="p-3 bg-danger/10 text-danger text-sm font-medium rounded-lg">{error}</div>}
            <div className="pt-2">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
