import { useState, KeyboardEvent, useRef } from 'react';
import { TerminalState, TerminalLine } from '../types';

export const useTerminal = () => {
  const ASCII_ART = `
██╗    ██╗███████╗██╗      ██████╗ ██████╗ ███╗   ███╗███████╗    ██╗
██║    ██║██╔════╝██║     ██╔════╝██╔═══██╗████╗ ████║██╔════╝    ██║
██║ █╗ ██║█████╗  ██║     ██║     ██║   ██║██╔████╔██║█████╗      ██║
██║███╗██║██╔══╝  ██║     ██║     ██║   ██║██║╚██╔╝██║██╔══╝      ╚═╝
╚███╔███╔╝███████╗███████╗╚██████╗╚██████╔╝██║ ╚═╝ ██║███████╗    ██╗
 ╚══╝╚══╝ ╚══════╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝    ╚═╝
 `;

  const matrixInterval = useRef<NodeJS.Timeout | null>(null);

  const [state, setState] = useState<TerminalState>({
    history: [
      { content: ASCII_ART, type: 'output' },
      {
        content:
          'Welcome to the portfolio terminal! Type "help" for available commands.',
        type: 'output',
      },
    ],
    currentCommand: '',
    isMatrixMode: false,
    isBSODMode: false,
  });

  const easterEggs: Record<string, string> = {
    mario: 'Its me, Mario! 🍄',
    konami: '↑↑↓↓←→←→BA - Cheat code activated! 🎮',
    matrix: 'Wake up, Neo... ⏰',
    '42': 'The Answer to the Ultimate Question of Life, the Universe, and Everything 🌌',
    'hack-the-matrix':
      'Initiating Matrix protocol...\nHacking the mainframe...\nAccess granted!',
    crash: `
😱 SYSTEM ERROR - Your portfolio has encountered a burst of creativity

Error Code: 0xCAFE_BABE
Module: windows-portfolio.js
Description: Too much awesomeness detected.

* Press any key or type 'reboot' to restart the system
* Type 'help' if you need assistance
* Close browser if all else fails (not recommended)

Technical Information:
STOP: 0x00000BAD (0xC0FFEE, 0xDEAD, 0xBEEF, 0x0BAD)

Collecting error information...
Checking for solution...
Just kidding, this is just an easter egg! 
`,
  };

  const startMatrixEffect = () => {
    if (matrixInterval.current) {
      clearInterval(matrixInterval.current);
    }

    setState((prev) => ({
      ...prev,
      isMatrixMode: true,
      history: [
        ...prev.history,
        { content: easterEggs['hack-the-matrix'], type: 'matrix' },
      ],
    }));

    let count = 0;
    matrixInterval.current = setInterval(() => {
      setState((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          { content: generateMatrixRain(), type: 'matrix' },
        ],
      }));

      count++;
      if (count >= 5) {
        if (matrixInterval.current) {
          clearInterval(matrixInterval.current);
        }
      }
    }, 800);
  };

  const generateMatrixRain = () => {
    const chars = '01';
    let rain = '';
    for (let i = 0; i < 5; i++) {
      const length = Math.floor(Math.random() * 15) + 5;
      const line = Array(length)
        .fill(0)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('');
      rain += line + '\n';
    }
    return rain;
  };

  const startBSODEffect = () => {
    setState((prev) => ({
      ...prev,
      isBSODMode: true,
      history: [
        ...prev.history,
        { content: easterEggs['crash'], type: 'bsod' },
      ],
    }));
  };

  const rebootSystem = () => {
    setState((prev) => ({
      ...prev,
      history: [
        ...prev.history,
        { content: 'Rebooting system...', type: 'output' },
        { content: 'Loading portfolio components...', type: 'output' },
        { content: 'System restored successfully!', type: 'output' },
      ],
      isBSODMode: false,
    }));
  };

  const commands: Record<string, (args: string[]) => string> = {
    help: () =>
      `Available commands:

help      - Show this help message
clear     - Clear terminal
echo      - Display text
date      - Show current date
whoami    - Display current user
ls        - List directory contents
cd [dir]  - Change directory (simulation)
cat [file]- Show file content (simulation)

Try some special commands for surprises! 🎁`,

    clear: () => {
      setState((prev) => ({
        ...prev,
        history: [],
        isMatrixMode: false,
        isBSODMode: false,
      }));
      return '';
    },

    echo: (args) => args.join(' '),
    date: () => new Date().toLocaleString(),
    whoami: () => 'alexis@portfolio',

    ls: () =>
      `Documents/
Pictures/
Projects/
portfolio.txt
readme.md`,

    cat: (args) => {
      switch (args[0]) {
        case 'readme.md':
          return 'Welcome to my portfolio! Feel free to explore.';
        case 'portfolio.txt':
          return 'Frontend Developer passionate about React and TypeScript';
        default:
          return `cat: ${args[0]}: No such file or directory`;
      }
    },

    cd: (args) => {
      const validDirs = ['Documents', 'Pictures', 'Projects'];
      return validDirs.includes(args[0])
        ? `Changed directory to ${args[0]}`
        : `cd: ${args[0]}: No such directory`;
    },

    reboot: () => {
      if (state.isBSODMode) {
        rebootSystem();
      }
      return '';
    },
  };

  const executeCommand = (commandLine: string) => {
    const args = commandLine.trim().split(' ');
    const command = args[0].toLowerCase();

    setState((prev) => ({
      ...prev,
      history: [...prev.history, { content: commandLine, type: 'input' }],
    }));

    if (command === 'hack-the-matrix') {
      startMatrixEffect();
      return;
    }

    if (command === 'crash') {
      startBSODEffect();
      return;
    }

    if (command === 'reboot' && state.isBSODMode) {
      rebootSystem();
      return;
    }

    if (easterEggs[command]) {
      setState((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          { content: easterEggs[command], type: 'output' },
        ],
      }));
      return;
    }

    if (commands[command]) {
      const output = commands[command](args.slice(1));
      if (output) {
        setState((prev) => ({
          ...prev,
          history: [...prev.history, { content: output, type: 'output' }],
        }));
      }
    } else {
      setState((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          {
            content: `Command not found: ${command}. Type 'help' for available commands.`,
            type: 'error',
          },
        ],
      }));
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && state.currentCommand.trim()) {
      executeCommand(state.currentCommand);
      setState((prev) => ({ ...prev, currentCommand: '' }));
    }
  };

  const handleInputChange = (value: string) => {
    setState((prev) => ({ ...prev, currentCommand: value }));
  };

  return {
    state,
    handlers: {
      handleKeyDown,
      handleInputChange,
    },
  };
};
