import React, { useState, useEffect } from 'react';
import './PagPrincipal.css';

// Componente funcional para a página principal
const PagPrincipal = ({ onLogout }) => {
  // Estado da Informação das Personagens
  const [characters, setCharacters] = useState([]);

  // Estados dos Filtros
  const [nameFilter, setNameFilter] = useState('');
  const [elementFilter, setElementFilter] = useState('');
  const [rarityFilter, setRarityFilter] = useState('');
  const [battleStyleFilter, setBattleStyleFilter] = useState('');
  const [hoveredCharacter, setHoveredCharacter] = useState(null);

  // Realiza o Fetch à API das personagens
  useEffect(() => {
    fetch('https://api.sheety.co/93e8e54c5fe88a74ad6071399fbec7b5/iw/character')
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.character);
      })
      .catch((error) => {
        console.error('Erro ao carregar as personagens:', error);
      });
  }, []);

  // Filtra as personagens de acordo com os critérios inseridos pelo utilizador
  const filteredCharacters = Array.isArray(characters) ? characters.filter(character =>
    character.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    character.element.toLowerCase().includes(elementFilter.toLowerCase()) &&
    character.rarity.toLowerCase().includes(rarityFilter.toLowerCase()) &&
    character.battleStyle.toLowerCase().includes(battleStyleFilter.toLowerCase())
  ) : [];


  // Mostra um pequeno tooltip da personagem onde o mouse se encontra sobre
  const CharacterTooltip = ({ character }) => {
    // Aplica o CSS default da tooltip caso algum dos filtros esteja preenchido
    if (nameFilter !== '' || elementFilter !== '' || rarityFilter !== '' || battleStyleFilter !== '') {
      return (
        <div className="character-tooltip">
          <p>{`Elemento: ${character.element}`}</p>
          <p>{`Fraqueza: ${character.weakness}`}</p>
          <p>{`Raridade: ${character.rarity}`}</p>
          <p>{`Battle Style: ${character.battleStyle}`}</p>
          <p>{`Zenkai: ${character.zenkai}`}</p>
          <p>{`Tag: ${character.tag}`}</p>
          <p>{`Saga: ${character.episode}`}</p>
        </div>
      );
    }

    // Averigua se o id da personagem é acima de 40
    const Acima40 = character.id > 40;

    // Determina qual será o CSS a ser utilizado
    const classCss = `character-tooltip ${Acima40 ? 'acima-40' : ''}`;

    // Retorna o Tooltip correspondente
    return (
      <div className={classCss}>
        <p>{`Elemento: ${character.element}`}</p>
        <p>{`Fraqueza: ${character.weakness}`}</p>
        <p>{`Raridade: ${character.rarity}`}</p>
        <p>{`Battle Style: ${character.battleStyle}`}</p>
        <p>{`Zenkai: ${character.zenkai}`}</p>
        <p>{`Tag: ${character.tag}`}</p>
        <p>{`Saga: ${character.episode}`}</p>
      </div>
    );
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    // Espera 1 segundo e volta à página de Login
    setTimeout(() => {
      onLogout();
    }, 1000);
  }

  // Estrutura JSX da Página Principal
  return (
    <div className="container-principal">
      {/* Barra de Topo */}
      <div className="top-bar">
        <div className="filter">
          <input
            className="filter-input"
            type="text"
            placeholder="Nome"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <input
            className="filter-input"
            type="text"
            placeholder="Elemento"
            value={elementFilter}
            onChange={(e) => setElementFilter(e.target.value)}
          />
          <input
            className="filter-input"
            type="text"
            placeholder="Raridade"
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
          />
          <input
            className="filter-input"
            type="text"
            placeholder="Estilo de Batalha"
            value={battleStyleFilter}
            onChange={(e) => setBattleStyleFilter(e.target.value)}
          />
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Caixas das Personagens */}
      <div className="character-container">
        {filteredCharacters.map(character => (
          <div key={character.id} className="character-box" onMouseOver={() => setHoveredCharacter(character)} onMouseOut={() => setHoveredCharacter(null)}>
            <img src={character.image}
              className="character-image" />
            <p>{character.name}</p>
            {/*Tooltip da Personagem*/}
            {hoveredCharacter === character && <CharacterTooltip character={character} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagPrincipal;