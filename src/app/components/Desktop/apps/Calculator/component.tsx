import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { useCalculator } from './hooks/useCalculator';

export const Calculator: React.FC = () => {
  const { state, handlers } = useCalculator();
  
  return (
    <div className="flex flex-col h-full bg-secondary-bg text-foreground p-4">
      {/* Display */}
      <div className="flex flex-col items-end mb-4">
        <div className="text-sm text-gray-500 h-6">{state.memory}</div>
        <div className="text-4xl font-light">{state.display}</div>
      </div>

      {/* Calculator buttons */}
      <div className="grid grid-cols-4 gap-1 flex-grow">
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm" onClick={handlers.handlePercent}>%</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm" onClick={handlers.clearEntry}>CE</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm" onClick={handlers.clear}>C</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm flex items-center justify-center" onClick={handlers.clearEntry}>
          <RefreshCcw size={16} />
        </button>

        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm">1/x</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm">x²</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm">√x</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-sm" onClick={() => handlers.handleOperator('/')}>/</button>

        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('7')}>7</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('8')}>8</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('9')}>9</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-xl" onClick={() => handlers.handleOperator('*')}>×</button>

        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('4')}>4</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('5')}>5</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('6')}>6</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-xl" onClick={() => handlers.handleOperator('-')}>−</button>

        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('1')}>1</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('2')}>2</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('3')}>3</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4 text-xl" onClick={() => handlers.handleOperator('+')}>+</button>

        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={handlers.toggleSign}>+/-</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={() => handlers.handleNumber('0')}>0</button>
        <button className="bg-black/10 hover:bg-black/20 rounded p-4" onClick={handlers.handleDecimal}>,</button>
        <button className="bg-blue-600 hover:bg-blue-700 rounded p-4 text-xl" onClick={handlers.calculate}>=</button>
      </div>
    </div>
  );
};