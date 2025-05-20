import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
    else alert('Connecté !')
  }

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-sm mx-auto">
      <input className="mb-2 p-2 w-full border" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="mb-2 p-2 w-full border" type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <button className="p-2 bg-blue-500 text-white w-full" type="submit">Connexion</button>
    </form>
  )
}