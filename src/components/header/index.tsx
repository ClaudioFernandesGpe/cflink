import { signOut } from 'firebase/auth'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { auth } from '../../services/firebaseConnection'

export function Header() {
    async function handleLogout() {
        await signOut(auth);
    }


  return (
    <header className='w-full max-w-2xl mt-5 px-2'>
        <nav className='w-full bg-gray-100 h-12 flex items-center justify-between px-4 rounded font-medium'>
            <div className='flex gap-4'>
                <Link className='text-gray-900 hover:text-red-600' to={'/'}>Home</Link>
                <Link className='text-gray-900 hover:text-red-600' to={'/admin'}>Links</Link>
                <Link className='text-gray-900 hover:text-red-600' to={'/admin/social'}>Redes Sociais</Link>
            </div>
            <button onClick={handleLogout} className='cursor-pointer'><BiLogOut size={28} color='#db2629'/></button>
        </nav>
    </header>
  )
}
