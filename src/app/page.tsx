"use client";

import { HackerScreen, useHackerScreenStore } from "./components/HackerScreen";

const Home = () => {
  const { isOpen, setIsOpen } = useHackerScreenStore();

  return (
    <>
      {isOpen && <HackerScreen onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Home;
