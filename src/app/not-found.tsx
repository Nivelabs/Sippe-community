import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-extrabold text-[#09090b] mb-2" style={{ fontFamily: 'var(--font-jakarta)' }}>
            404
          </h1>
          <h2 className="text-3xl font-bold text-foreground mb-4" style={{ fontFamily: 'var(--font-jakarta)' }}>
            Página não encontrada
          </h2>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#09090b] text-white rounded-full font-semibold hover:bg-brand-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Ir para o início
          </Link>
          <Link
            href="/discover"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-border text-foreground rounded-full font-semibold hover:bg-muted transition-colors"
          >
            <Search className="w-4 h-4" />
            Explorar comunidades
          </Link>
        </div>
      </div>
    </div>
  );
}
