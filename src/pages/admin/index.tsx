import { useEffect, useState, type FormEvent } from "react";
import { Header } from "../../components/header";
import Input from "../../components/input";
import { FiTrash2 } from "react-icons/fi";

import { db } from '../../services/firebaseConnection'
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore'


interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [backgroundColorInput, setBackgroundColorInput] = useState('#e1e1e1');
  const [textColorInput, setTextColorInput] = useState('#121212')

  const [links, setLinks] = useState<LinksProps[]>([]);

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let lista = [] as LinksProps[];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color
        });
      });

      setLinks(lista);

    });

    return ()=> {
      unsub();
    };

  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    
    if (nameInput === '' || urlInput === '') {
      alert('Prencha todos os campos!')
      return;
    }

    await addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      color: textColorInput,
      created: new Date()
    })
    .then (() => {
      setNameInput("")
      setUrlInput("")
      console.log("CADASTRADO COM SUCESSO!");
    })
    .catch ((error) => {
      console.log("ERRO AO CADASTRAR NO BANCO DE DADOS" + error);
    });
  };

  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  };

  return (
    <div className="flex flex-col items-center min-h-screen pb-7 px-3">
        <Header/>

        <form className="w-full max-w-xl mt-8 px-2 flex flex-col" onSubmit={handleRegister}>
          <label className="text-white text-base pb-2">Nome do link</label>
          <Input
          type="text"
          placeholder="Nome do link..."
          name="linkName"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          />

          <label className="text-white text-base pb-2">Url do link</label>
          <Input
          type="url"
          placeholder="Url do link..."
          name="linkUrl"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          />

          <section className="flex my-4 gap-5">
            <div className="flex gap-1.5 items-baseline">
              <label className="text-white text-base pb-2">Fundo do link</label>
              <input 
              type="color" 
              name="backgroundColorLink" 
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
              className="h-8 w-8"
              />
            </div>

            <div className="flex gap-1.5 items-baseline">
              <label className="text-white text-base pb-2">Texto do link</label>
              <input 
              type="color" 
              name="textColorLink" 
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
              className="h-8 w-8"
              />
            </div>
          </section>

          {nameInput !== '' && (
          <div className="flex flex-col items-center justify-start mb-7 p-2 border border-gray-100/25 rounded-md">
            <label className="text-white text-base font-medium pb-3">Preview do link:</label>
            <article
            className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 px-1 py-3 rounded"
            style={{marginBottom: '8px', marginTop: '8px', backgroundColor: backgroundColorInput}}
            >
              <p className="font-medium" style={{color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
          )}

          <button 
          type="submit"
          className="mb-7 bg-indigo-600 hover:bg-indigo-500 h-9 rounded-md font-medium text-gray-50 cursor-pointer gap-4 flex items-center justify-center">
            Cadastrar
          </button>
        </form>

        <h2 className="font-bold text-gray-50 mb-4">Meus Links</h2>

        {links.map((link) => (
          <article 
          key={link.id}
          className="w-11/12 max-w-xl flex items-center justify-between rounded-md px-2 py-3 mb-2 select-none"
          style={{backgroundColor: link.bg, color: link.color}}
          >
            <p>{link.name}</p>
            <div>
              <button 
              onClick={()=> handleDeleteLink(link.id)}
              className="border border-dashed bg-neutral-900 p-1 rounded cursor-pointer">
                <FiTrash2 size={20} color="#f2f2f2" />
              </button>
            </div>
          </article>
        ))}
    </div>
  )
}
