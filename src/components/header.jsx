import { useState, useEffect } from 'react';
import { motion, useAnimation } from "framer-motion";
import SpinningRock from './SpinningRock';
import { FiMenu, FiX } from 'react-icons/fi';

const loader = "/loader_folder/loader.png";

const Header = () => {
  const blocControls = useAnimation();
  const koparkaControls = useAnimation();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    async function animateSequence() {
      await blocControls.start({ x: 0, transition: { duration: 5 } });
      await new Promise(res => setTimeout(res, 500));
      await koparkaControls.start({ x: -300, opacity: 0, transition: { duration: 5 } });
    }

    animateSequence();
  }, []);

  const navItems = ["O nas", "Nasze Produkty", "Nasze Usługi", "Kontakt","Mapa"];

  return (
    <header className="w-full z-20 m-4">
      <div className="relative px-4 py-4">
        <div className="flex flex-col justify-center items-center relative h-20 space-y-[0%]">

          {/* 🚜 + Logo razem jako jeden blok */}
          <motion.div
            animate={blocControls}
            initial={{ x: -300 }}
            className="flex flex-row space-x-[-10%]"
          >
            {/* 🚜 Koparka */}
            <motion.div animate={koparkaControls} initial={{ x: 0, opacity: 1 }}>
              <img src={loader} alt="Loader" className="h-20 w-20" />
            </motion.div>

            {/* 🪪 Logo */}
            <div className="flex flex-row space-x-2 items-start px-4 py-2 text-white">
              <div className="w-10 h-10 flex items-center justify-center">
                <SpinningRock />
              </div>
              <h1 className="text-2xl font-bold hover:drop-shadow-[2px_2px_2px_cyan]">
                Żwirownia
              </h1>
            </div>
          </motion.div>

          {/* Nawigacja desktop */}
          <nav id="navbar" className="md:flex hidden space-x-10 mt-14">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative z-20 text-white backdrop-blur-lg bg-white/10 hover:bg-white/20 hover:text-blue-400 transition-all duration-300 rounded-lg px-3 py-2 group"
                href={`#${item.replace(/\s/g, '').toLowerCase()}`} // np. #onas
              >
                {item}
                <span className="absolute bottom-0.5 left-0.5 w-0 group-hover:w-[calc(100%-8px)] h-0.5 bg-cyan-500 transition-all duration-300 rounded-full"></span>
              </motion.a>
            ))}
          </nav>

          {/* Nawigacja mobilna (toggle button) */}
          <div className="md:hidden absolute top-0 right-4 z-30">
            <motion.button whileTap={{ scale: 0.7 }} className="text-gray-300" onClick={toggleMenu}>
              {isOpen ? <FiX className="h-10 w-10" /> : <FiMenu className="h-10 w-10 " />}
            </motion.button>
          </div>

        </div>
      </div>

      {/* Mobilne menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden fixed top-0 left-0 right-0 bg-black/90 text-white z-20 backdrop-blur-sm px-8 py-6 rounded-b-xl shadow-md ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <nav className="flex flex-col space-y-6">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              onClick={() => setIsOpen(false)}
              className="text-lg text-center hover:text-blue-400 transition-all duration-200"
              href={`#${item.replace(/\s/g, '').toLowerCase()}`}
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </header>
  );
};

export default Header;
