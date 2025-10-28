import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export default function Input(props: InputProps) {
  return (
    <div>
        <input 
        className="bg-zinc-700 rounded-md px-2 h-9 outline-0 border-0 text-white mb-3 w-full" 
        {...props}  
        />
    </div>
  )
}
