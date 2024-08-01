import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../lib/axios";


export function RegisterPage() {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    

    async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            await api.post('/register', { name, email, password });
            navigate(`/`);
        } catch (error) {
            console.error("Registration failed", error);
        }
    }   

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-md w-full px-6 text-center space-y-10">
                <div className='flex flex-col items-center gap-3'>
                <img src="/logo.svg" alt="plann.er" />
                <p className="text-zinc-300 text-lg">Faça seu cadastro!</p> 
                </div>
                <form onSubmit={handleRegister} className="space-y-4">
                <input
                    type="name"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-900 rounded-lg text-zinc-400 placeholder-zinc-500 outline-none"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-900 rounded-lg text-zinc-400 placeholder-zinc-500 outline-none"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-900 rounded-lg text-zinc-400 placeholder-zinc-500 outline-none"
                />
                <div className="flex justify-between items-center">
                    <Button size="full" type="submit">
                    Criar conta
                    </Button>
                </div>
                </form>
            </div>
        </div>
    )
}