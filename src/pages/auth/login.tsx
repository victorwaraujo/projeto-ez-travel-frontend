import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../../lib/axios";

export function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
        const response = await api.post('/', { email, password } )
        console.log(response.data)
        if (response.data.participant) {
            // Redirecione para a tela de detalhes da viagem se o usuário for participante
            navigate(`/trips/${response.data.tripId}`);
        } else {
            // Continue na página de criar uma viagem se o usuário não for participante
            navigate(`/tripPage`);
        }
    } catch (error) {
        console.error("Login failed", error);
    }
    }
  

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-md w-full px-6 text-center space-y-10">
                <div className='flex flex-col items-center gap-3'>
                <img src="/logo.svg" alt="plann.er" />
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
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
                    <a href="#" className="text-sm text-zinc-400 underline">
                    Esqueceu a senha?
                    </a>
                    <Button type="submit">
                    Login
                    </Button>
                </div>
                </form>

                <p className="text-sm text-zinc-500">
                Não tem uma conta? <a className="text-zinc-300 underline cursor-pointer" onClick={() => navigate(`/register`)}>Cadastre-se</a>
                </p>
            </div>
        </div>
    )
}


