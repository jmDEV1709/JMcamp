import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center text-center">
      <div>
        <p className="text-7xl font-black text-blue-500">
          404
        </p>

        <h1 className="mt-4 text-2xl font-black">
          Página não encontrada
        </h1>

        <Link
          to="/"
          className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  );
}