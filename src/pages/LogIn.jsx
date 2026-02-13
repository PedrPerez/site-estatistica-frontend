import { useState } from 'react';
import '../css/Login.css';

export default function LogIn() {
    const [utilizador, setUtilizador] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!utilizador || !password) {
            setError('Campos por preencher');
            return;
        }

        setError(''); // Limpa o erro se tudo estiver ok
        console.log('Login attempt:', { utilizador, password });
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                
                {/* O parágrafo existe sempre, apenas a classe muda */}
                <p className={`error ${error ? 'visible' : 'hidden'}`}>
                    {error || "Espaço reservado"}
                </p>
                
                <input
                    type="text"
                    placeholder="utilizador"
                    value={utilizador}
                    onChange={(e) => setUtilizador(e.target.value)}
                />
                
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}