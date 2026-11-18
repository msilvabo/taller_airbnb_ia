export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#0B0F17] px-4 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-white">
        Hola, bienvenido
      </h1>
      <span role="img" aria-label="Gato" className="text-[8rem] leading-none">
        🐱
      </span>
      <p className="text-lg text-slate-400">Un rincón simple para empezar.</p>
    </main>
  );
}
