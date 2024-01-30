import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import Registo from './components/Registo/Registo';
import PagPrincipal from './components/PagPrincipal/PagPrincipal';
import Verification from './components/Login_Verification/Verification';

// O componente "App" é o componente principal, sendo este o responsável pelo controlo da visualização dos mesmos
const App = () => {
  // Estado para controlar se o utilizador está autenticado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estados para controlar a exibição dos componentes Login e PagPrincipal
  const [showLogin, setShowLogin] = useState(true);
  const [showPagPrincipal, setShowPagPrincipal] = useState(false);

  // Função para alternar entre os modos de visualização (Login e Registo)
  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  // Função chamada em caso de sucesso no Login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowPagPrincipal(true);
    setShowLogin(false);
  };

  // Função para efetuar Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(true);
  };

  // Hook 'useEffect' para verificar se o utilizador está autenticado ao carregar a página
  useEffect(() => {
    // Verifica o estado armazenado localmente
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    const storedEmail = localStorage.getItem('email');

    if (storedLoggedInStatus === 'true' && storedEmail) {
      // Verifica a autenticação utilizando a função de verificação
      Verification(storedEmail, storedEmail)
        .then(() => {
          // Se for autenticado com sucesso, atualiza os estados
          setIsLoggedIn(true);
          setTimeout(() => {
            setShowPagPrincipal(true);
          }, 3000); // Aguarda 3 segundos antes de mostrar a página principal
        })
        .catch(error => {
          console.error('Erro na autenticação do user:', error);
          handleLogout(); // Em caso de erro, efetua o Logout
        });
    }
  }, []);

  // Código da página
  return (
    <div>
      {isLoggedIn ? (
        // Se o utilizador estiver autenticado, mostrar a página principal ou null
        <>
          {showPagPrincipal ? (
            <PagPrincipal onLogout={handleLogout} />
          ) : null}
          <div className="green-line-bottom">
            <p className="green-line-bottom-text">Site desenvolvido por: Ricardo Gonçalves e Bruno Alves</p>
          </div>
        </>
      ) : (
        // Se o utilizador não estiver autenticado, mostrar o componente Login ou Registo
        <>
          <div className="green-line"></div>
          {showLogin ? (
            <Login onToggleView={handleToggleView} onLoginSuccess={handleLoginSuccess} />
          ) : (
            <Registo onToggleView={handleToggleView} />
          )}
          <div className="green-line">
            <p className="green-line-bottom-text">Site desenvolvido por: Ricardo Gonçalves e Bruno Alves</p>
          </div>
        </>
      )}
    </div>
  );
};

export default App;