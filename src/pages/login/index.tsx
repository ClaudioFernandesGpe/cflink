import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { useState, type FormEvent } from "react";

import { auth } from '../../services/firebaseConnection';
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha todos os campos!');
      return;
    };

    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      navigate('/admin', {replace: true});
    })
    .catch((error) => {console.log(error)});
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <Link to={'/'}>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-7">CF<span className="text-5xl md:text-6xl font-semibold bg-linear-to-r from-yellow-600 to-orange-400 bg-clip-text text-transparent">Links</span></h1>
      </Link>

      <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-4">
        <Input
          placeholder="seuemail@mail.com"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="********"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="h-9 bg-indigo-600 hover:bg-indigo-500 text-white font-medium border-0 text-lg rounded-md cursor-pointer">
          Acessar
        </button>
      </form>
    </div>
  )
}
