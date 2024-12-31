export interface TerminalLine {
    content: string;
    type: 'input' | 'output' | 'error' | 'matrix' | 'bsod';
  }
  
  export interface TerminalState {
    history: TerminalLine[];
    currentCommand: string;
    isMatrixMode: boolean;
    isBSODMode: boolean;
  }