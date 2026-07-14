"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Camera, XCircle } from "lucide-react";

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    let controls: any = null;

    if (videoRef.current) {
      codeReader
        .decodeFromVideoDevice(undefined, videoRef.current, (result, err) => {
          if (result) {
            const text = result.getText();
            // Expected URL format: http://localhost:3000/arsip/ID or just /arsip/ID
            // Let's extract the path or redirect directly if it's a valid URL for this app
            try {
              const url = new URL(text);
              if (url.pathname.startsWith("/arsip/")) {
                router.push(url.pathname);
              } else {
                setError("QR Code tidak valid untuk sistem arsip ini.");
              }
            } catch (e) {
              // If it's a relative path somehow
              if (text.startsWith("/arsip/")) {
                router.push(text);
              } else {
                setError("QR Code tidak valid.");
              }
            }
          }
        })
        .then((c) => (controls = c))
        .catch((e) => {
          console.error(e);
          setError("Gagal mengakses kamera. Pastikan izin kamera telah diberikan.");
        });
    }

    return () => {
      if (controls) {
        controls.stop();
      }
    };
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card className="border-neutral-200/60 shadow-xl shadow-primary-900/5 rounded-3xl overflow-hidden bg-white">
        <CardHeader className="text-center pb-6 pt-10 px-8 border-b border-neutral-100 bg-neutral-50/30">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600 mb-4 ring-8 ring-primary-50/50">
            <Camera className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900 tracking-tight">Pindai QR Code</CardTitle>
          <CardDescription className="text-[15px] text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
            Arahkan kamera ke label QR Code pada dokumen fisik untuk membuka rincian arsip secara instan.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 flex flex-col items-center">
          {error ? (
            <div className="text-center py-12 px-6 bg-danger/5 rounded-2xl w-full border border-danger/10">
              <XCircle className="mx-auto h-16 w-16 text-danger mb-4" />
              <h3 className="text-lg font-semibold text-danger mb-2">Peringatan</h3>
              <p className="text-sm text-danger/80 mb-6 max-w-xs mx-auto">{error}</p>
              <Button onClick={() => window.location.reload()} className="h-11 px-8 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white shadow-sm">
                Coba Lagi
              </Button>
            </div>
          ) : (
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-square bg-neutral-900 rounded-2xl overflow-hidden shadow-inner group">
              <video ref={videoRef} className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
              
              {/* Scanning Overlay UI */}
              <div className="absolute inset-0 z-10 flex flex-col">
                <div className="flex-1 bg-neutral-900/40 backdrop-blur-[2px]"></div>
                <div className="flex h-64 sm:h-72">
                  <div className="flex-1 bg-neutral-900/40 backdrop-blur-[2px]"></div>
                  <div className="w-64 sm:w-72 relative">
                    {/* Scanner Frame */}
                    <div className="absolute inset-0 border-2 border-primary-500/50 rounded-xl"></div>
                    
                    {/* Corner accents */}
                    <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-xl"></div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-xl"></div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-xl"></div>
                    
                    {/* Scanning animation line */}
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-primary-400 shadow-[0_0_15px_3px_rgba(96,165,250,0.5)] animate-[scan_2.5s_ease-in-out_infinite]"></div>
                  </div>
                  <div className="flex-1 bg-neutral-900/40 backdrop-blur-[2px]"></div>
                </div>
                <div className="flex-1 bg-neutral-900/40 backdrop-blur-[2px] flex items-end justify-center pb-6">
                  <p className="text-white/80 text-sm font-medium bg-neutral-900/60 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">Memindai...</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { transform: translateY(0); opacity: 0; }
          10%, 90% { opacity: 1; }
          50% { transform: translateY(16rem); opacity: 1; }
        }
        @media (min-width: 640px) {
          @keyframes scan {
            0%, 100% { transform: translateY(0); opacity: 0; }
            10%, 90% { opacity: 1; }
            50% { transform: translateY(18rem); opacity: 1; }
          }
        }
      `}} />
    </div>
  );
}
