import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-50">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <p>Ops! Algo deu errado!</p>
        <h2 className="text-5xl font-bold mt-4">Página Não Encontrada!</h2>

        <Link to={'/'} className="text-indigo-300 bg-gray-50/20 py-1.5 px-3 rounded-md mt-4">Voltar para Home</Link>
    </div>
  )
}
