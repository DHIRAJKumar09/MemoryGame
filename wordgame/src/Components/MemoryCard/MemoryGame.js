import React, { useState, useEffect } from 'react';
import './memorygame.css';

const initialCards = [
  { id: 1, name: 'A' }, { id: 2, name: 'A' },
  { id: 3, name: 'B' }, { id: 4, name: 'B' },
  { id: 5, name: 'C' }, { id: 6, name: 'C' },
  { id: 7, name: 'D' }, { id: 8, name: 'D' },
  { id: 9, name: 'E' }, { id: 10, name: 'E' },
  { id: 11, name: 'F' }, { id: 12, name: 'F' },
];

const shuffleCards = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

const MemoryGame = () => {
  const [cards, setCards] = useState(shuffleCards([...initialCards]));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.name === secondCard.name) {
        setMatchedPairs([...matchedPairs, firstCard.name]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  const handleCardClick = (card) => {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedPairs.includes(card.name)) {
      setFlippedCards([...flippedCards, card]);
    }
  };

  const renderCard = (card) => {
    const isFlipped = flippedCards.includes(card) || matchedPairs.includes(card.name);
    return (
      <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={() => handleCardClick(card)}>
        <div className="card-front">
          {isFlipped ? card.name : ''}
        </div>
        <div className="card-back"></div>
      </div>
    );
  };

  const resetGame = () => {
    setCards(shuffleCards([...initialCards]));
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
  };

  return (
    <div className="memory-game">
      <h1>Memory Card Game</h1>
      <button onClick={resetGame}>Reset Game</button>
      <div className="game-board">
        {cards.map((card) => renderCard(card))}
      </div>
      <p>Moves: {moves}</p>
      {matchedPairs.length === initialCards.length / 2 && <p>Congratulations! You've matched all pairs!</p>}
    </div>
  );
};

export default MemoryGame;
