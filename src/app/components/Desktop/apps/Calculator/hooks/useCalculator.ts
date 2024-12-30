import { useState } from 'react';
import { CalculatorState } from '../types';

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    memory: '',
    isNewNumber: true
  });

  const handleNumber = (num: string) => {
    setState(prev => ({
      ...prev,
      display: prev.isNewNumber ? num : (prev.display === '0' ? num : prev.display + num),
      isNewNumber: false
    }));
  };

  const handleOperator = (op: string) => {
    if (state.memory && !state.isNewNumber) {
      calculate();
    }
    setState(prev => ({
      ...prev,
      memory: prev.display + ' ' + op + ' ',
      isNewNumber: true
    }));
  };

  const calculate = () => {
    try {
      const result = eval(state.memory + state.display);
      setState({
        display: String(result),
        memory: '',
        isNewNumber: true
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        display: 'Error'
      }));
    }
  };

  const clear = () => {
    setState({
      display: '0',
      memory: '',
      isNewNumber: true
    });
  };

  const clearEntry = () => {
    setState(prev => ({
      ...prev,
      display: '0',
      isNewNumber: true
    }));
  };

  const toggleSign = () => {
    setState(prev => ({
      ...prev,
      display: String(-parseFloat(prev.display))
    }));
  };

  const handlePercent = () => {
    setState(prev => {
      if (prev.memory) {
        const baseNumber = parseFloat(prev.memory);
        const percentage = (baseNumber * parseFloat(prev.display)) / 100;
        return {
          ...prev,
          display: String(percentage),
          isNewNumber: true
        };
      }
      return {
        ...prev,
        display: String(parseFloat(prev.display) / 100),
        isNewNumber: true
      };
    });
  };

  const handleDecimal = () => {
    setState(prev => {
      if (prev.isNewNumber) {
        return {
          ...prev,
          display: '0.',
          isNewNumber: false
        };
      }
      if (!prev.display.includes('.')) {
        return {
          ...prev,
          display: prev.display + '.'
        };
      }
      return prev;
    });
  };

  return {
    state,
    handlers: {
      handleNumber,
      handleOperator,
      calculate,
      clear,
      clearEntry,
      toggleSign,
      handlePercent,
      handleDecimal
    }
  };
};