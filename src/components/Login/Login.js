import React, { useState } from 'react';
import './Login.css';
import Verification from '../Login_Verification/Verification';

// Componente funcional para a página de login
const Login = ({ onToggleView, onLoginSuccess }) => {
    // Estados para os atributos de entrada usando hooks
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    // Estado para o atributo de erro no login
    const [erroLogin, setErroLogin] = useState(false);

    // Função assíncrona para lidar com o envio do formulário de login
    const handleSubmit = async (event) => {
        // Previne o refresh da página
        event.preventDefault();

        try {
            // Averigua se o utilizador existe ou não
            const prom = await Verification(username, email);

            // Age caso o utilizador exista
            if (prom === 'UserExists') {
                handleSuccess();
            } else {
                // Define que existiu um erro no momento de login
                setErroLogin(true);

                // Limpa os Inputs
                setUsername('');
                setEmail('');
            }
        } catch (error) {
            if (error.message === 'UserExists' || error.message) {
                // Age caso o utilizador exista (uma eventualidade específica)
                handleSuccess();
            } else {
                // Define que existiu um erro no momento de Login
                setErroLogin(true);

                // Limpa os Inputs
                setUsername('');
                setEmail('');
            }
        }
    };

    // Função para lidar com o sucesso no login
    const handleSuccess = () => {
        onLoginSuccess();
    };

    // Função para lidar com o clique no link de registo
    const handleRegisterClick = () => {
        // Esconde a página de registo e mostra a página de registo
        onToggleView();
    };

    // Estrutura JSX da página de Login
    return (
        <div className="container">
            <div className="login-box">
                <>
                    {/* Exibe a mensagem de erro se o estado "erroLogin" for verdadeiro */}
                    {erroLogin && <div className="failure-box">Erro no Login!</div>}
                    <h2>Login</h2>
                    {/* Formulário de Login com manipulador de envio definido como a função handleSubmit */}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        {/* Campo de input para o nome de utilizador */}
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <label htmlFor="email">Email:</label>
                        {/* Campo de input para o email com uma parte estática "@ipt.pt" */}
                        <div className="email-input-container">
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                maxLength={10}
                            />
                            <span className="email-estático">@ipt.pt</span>
                        </div>
                        {/* Botão de submissão do formulário */}
                        <button type="submit">Login</button>
                        <p className = "register-link">
                            {/* Link para a página de registo com a função de clique definida como handleRegisterClick */}
                            Não tens conta?{' '}
                            <a href="#" onClick={handleRegisterClick}>
                                Regista-te aqui!
                            </a>
                        </p>
                    </form>
                </>
            </div>
        </div>
    );
};

// Exporta o componente para ser utilizado noutras partes da aplicação
export default Login;