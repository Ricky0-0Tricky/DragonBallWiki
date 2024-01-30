import React, { useState } from 'react';
import './Registo.css';
import Registo_Execute from '../Registo_Execute/Registo_Execute';
import Verification from '../Login_Verification/Verification';

// Componente funcional para a página de registo
const Registo = ({ onToggleView }) => {
    // Estados para o nome de utilizador (username) e email usando hooks
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    // Estados para as mensagens de sucesso ou falhanço
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    // Função assíncrona para lidar com o envio do formulário de registo
    const handleSubmit = async (event) => {
        // Previne o refresh da página
        event.preventDefault();

        try {
            // Verifica se o utilizador já existe na API (previne utilizadores duplicados)
            const reg_existe = await Verification(username, email);

            // Verifica se foi possível realizar o registo do utilizador
            const val = await Registo_Execute(username, email);

            // Se o utilizador não existe e os dados inseridos são válidos, continua com o registo
            if (reg_existe === "UserNotFound" && val === true) {
                setSuccess(true);

                // Define um temporizador para esconder a mensagem de sucesso após 3 segundos e mudar para a página de login
                setTimeout(() => {
                    setSuccess(false);
                    onToggleView();
                }, 3000);
            } else {
                // Se o utilizador já existe ou os dados inseridos não são válidos, não continua com o registo
                setFailure(true);

                // Define um temporizador para esconder a mensagem de falha após 5 segundos 
                setTimeout(() => {
                    setFailure(false);
                }, 5000);

                // Limpa os Inputs
                setUsername('');
                setEmail('');
            }
        } catch (error) {
            // Eventualidade de erro durante o processo
            setFailure(true);

            // Define um temporizador para esconder a mensagem de falha após 5 segundos
            setTimeout(() => {
                setFailure(false);
            }, 5000);

            // Limpa os Inputs
            setUsername('');
            setEmail('');
        }
    };

    // Função para lidar com o clique no link de login
    const handleLoginClick = () => {
        // Altera para a página de login
        onToggleView();
    };

    // Estrutura JSX da página de Registo
    return (
        <div className="container">
            <div className="login-box">
                {/* Exibe a mensagem de sucesso se o estado "success" for verdadeiro */}
                {success && <div className="success-box">Registo sucedido!</div>}
                {/* Exibe a mensagem de falhanço se o estado "failure" for verdadeiro */}
                {failure && <div className="failure-box">Registo falhado, tente novamente.</div>}
                <h2>Registo</h2>
                {/* Formulário de registo com manipulador de envio definido como a função handleSubmit */}
                <form onSubmit={handleSubmit} className="registration-form">
                    <label htmlFor="username">Username:</label>
                    {/* Campo de input para o nome de utilizador */}
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="email">Email:</label>
                    {/* Campo de input para o email com o domínio estático "@ipt.pt" */}
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
                    <button type="submit">Registar</button>
                    <p className = "login-link">
                        {/* Link para a página de login com a função de clique definida como handleLoginClick */}
                        Já tens conta?{' '}
                        <a href="#" onClick={handleLoginClick}>
                            Faz Login aqui!
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

// Exporta o componente para ser utilizado noutras partes da aplicação
export default Registo;