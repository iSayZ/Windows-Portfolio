import React, { useState } from 'react';

export const Calculator = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // Fonction pour gérer les clics sur les chiffres et les opérateurs
  const handleButtonClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
  };

  // Fonction pour évaluer l'expression mathématique
  const handleEvaluate = () => {
    try {
      setOutput(eval(input)); // attention, eval peut être dangereux si mal utilisé
    } catch (error) {
      setOutput('Erreur');
    }
  };

  // Fonction pour effacer l'entrée
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="p-4 bg-blue-500">
      <h2 className="text-xl font-bold mb-4">Calculatrice</h2>

      <div className="mb-4">
        {/* Affichage de l'entrée et du résultat */}
        <div className="border p-2 mb-2 text-right">{input || '0'}</div>
        <div className="border p-2 text-right">{output}</div>
      </div>

      {/* Disposition des boutons */}
      <div className="grid grid-cols-4 gap-2">
        <button className="border-2 p-2" onClick={() => handleButtonClick('1')}>
          1
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('2')}>
          2
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('3')}>
          3
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('+')}>
          +
        </button>

        <button className="border-2 p-2" onClick={() => handleButtonClick('4')}>
          4
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('5')}>
          5
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('6')}>
          6
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('-')}>
          -
        </button>

        <button className="border-2 p-2" onClick={() => handleButtonClick('7')}>
          7
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('8')}>
          8
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('9')}>
          9
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('*')}>
          *
        </button>

        <button className="border-2 p-2" onClick={() => handleButtonClick('0')}>
          0
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('.')}>
          .
        </button>
        <button className="border-2 p-2" onClick={handleEvaluate}>
          =
        </button>
        <button className="border-2 p-2" onClick={() => handleButtonClick('/')}>
          /
        </button>
      </div>

      <div className="mt-4">
        <button className="border-2 p-2 w-full" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};
