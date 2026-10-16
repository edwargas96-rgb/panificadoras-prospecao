"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("gerente@casaandina.demo");
  const [pass, setPass] = useState("demonstracao");

  const enter = (e: React.FormEvent) => {
    e.preventDefault();
    try { sessionStorage.setItem("casa-andina:admin", "1"); } catch {}
    router.push("/admin");
  };

  return (
    <div className="grid min-h-dvh place-items-center bg-ink px-4">
      <form onSubmit={enter} className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-[8px_8px_0_#c8a47a]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.jpg" alt="" className="mx-auto size-20 rounded-full border-2 border-ink object-cover" />
        <h1 className="mt-4 text-center font-display text-2xl">Painel Casa Andina</h1>
        <p className="mt-1 text-center text-sm text-mute">Acesso de demonstração</p>
        <label className="mt-6 block text-sm font-semibold">
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md border-2 border-ink px-3 py-2.5 font-normal" />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Senha
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="mt-1 w-full rounded-md border-2 border-ink px-3 py-2.5 font-normal" />
        </label>
        <button type="submit" className="btn btn-kraft mt-6 w-full">Entrar</button>
        <p className="mt-4 text-center text-xs text-mute">Dados preenchidos para a apresentação. Nenhuma informação real é usada.</p>
        <a href="/" className="mt-3 block text-center text-sm underline text-mute">← Voltar ao site</a>
      </form>
    </div>
  );
}
