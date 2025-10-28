import { useEffect, useState } from "react";
import { Social } from "../../components/socialmedia";
import { FaFacebook, FaInstagram, FaGithub} from 'react-icons/fa'
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

interface LinksProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps{
  facebook: string;
  instagram: string;
  github: string;
}

export function Home() {
  const [links, setLinks] = useState<LinksProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef)
      .then((snapshot) => {
        let linksList = [] as LinksProps[];

        snapshot.forEach((doc) => {
          linksList.push({
            id: doc.id,
            name: doc.data().name,
            url: doc.data().url,
            bg: doc.data().bg,
            color: doc.data().color,
          })
        })
        setLinks(linksList);
      })
    };

    loadLinks();
  },[]);

  useEffect(() => {
    function loadSocialLinks() {
      const socialRef = doc(db, "socialmedia", "link");
        getDoc(socialRef)
        .then((snapshot) => {
          if(snapshot !== undefined) {
            setSocialLinks({
              facebook: snapshot.data()?.facebook,
              instagram: snapshot.data()?.instagram,
              github: snapshot.data()?.github
            });
          }
        });
    };

    loadSocialLinks();

  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen py-4 items-center justify-center">
        <h1 className="text-3xl md:text-4xl text-white font-bold mt-20">Cláudio Fernandes</h1>

        <span className="text-gray-50 mb-5 mt-3">
          Veja meus links! &#128071;
        </span>

        <main className="flex flex-col w-11/12 max-w-xl text-center">
          {links.map((link) => (
            <section 
            style={{backgroundColor: link.bg}}
            key={link.id}
            className="bg-white mb-4 py-2 rounded-lg select-none transition-transform hover:scale-105">
              <a href={link.url} target="_blank">
                <p style={{color: link.color}} className="text-base md:text-lg font-semibold">{link.name}</p>
              </a>
            </section>
          ))}
        </main>

        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className="flex justify-center gap-3 my-4">
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={36} color='#fff' />
            </Social>

            <Social url={socialLinks?.instagram}>
              <FaInstagram size={36} color='#fff' />
            </Social>

            <Social url={socialLinks?.github}>
              <FaGithub size={36} color='#fff' />
            </Social>
          </footer>
        )}
    </div>
  )
}
