import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header";
import Input from "../../components/input";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export function Social() {
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [github, setGithub] = useState('');

  useEffect(() => {
    function loadLinks() {
      const docRef = doc(db, "socialmedia", "link");
      getDoc(docRef)
      .then((snapshot) => {
        if(snapshot.data() !== undefined) {
          setFacebook(snapshot.data()?.facebook);
          setInstagram(snapshot.data()?.instagram);
          setGithub(snapshot.data()?.github);
        }

        console.log(snapshot.data());
      })
    }

    loadLinks();
  }, [])

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    setDoc(doc(db, "socialmedia", 'link'), {
      facebook: facebook,
      instagram: instagram,
      github: github,
    })
    .then(() => {
      console.log('CADASTRADO COM SUCESSO!');
    })
    .catch((error) => {
      console.log('ERRO AO CADASTRAR' + error);
    })
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-2">
    <Header />
    <h1 className="text-4xl text-gray-50 font-semibold mt-8 mb-4">Minhas Redes Sociais</h1>

    <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">
      <label className="text-gray-50 mb-1">Link do Facebook</label>
      <Input
      type="url"
      placeholder="Link do facebook..."
      name="facebook"
      value={facebook}
      onChange={(e) => setFacebook(e.target.value)}
      />

      <label className="text-gray-50 mb-1">Link do Instagram</label>
      <Input
      type="url"
      placeholder="Link do instagram..."
      name="instagram"
      value={instagram}
      onChange={(e) => setInstagram(e.target.value)}
      />

      <label className="text-gray-50 mb-1">Link do Github</label>
      <Input
      type="url"
      placeholder="Link do github..."
      name="github"
      value={github}
      onChange={(e) => setGithub(e.target.value)}
      />
      <button 
      type="submit"
      className="mb-7 bg-indigo-600 hover:bg-indigo-500 h-9 rounded-md font-medium text-gray-50 cursor-pointer gap-4 flex items-center justify-center">
            Cadastrar
      </button>
    </form>
    </div>
  )
}
