import { Box, ChakraProvider } from '@chakra-ui/react';
import './App.css';
import '../src/theme/styles.css';

import theme from '../src/theme';
import RegularHeader from './sections/RegularHeader';
import Hero from './sections/Hero';
import Specials from './sections/Specials';
import Testimonials from './sections/Testimonials';
import About from './sections/About';
import Footer from './sections/Footer'
import MobileFixedNav from './sections/MobileFixedNav';
import StickyReservationButton from './components/Buttons/StickyReservationButton';
import TableReservation from './sections/TableReservation.js';
import { useEffect, useState } from 'react';
import { AnimatePresence, useAnimationFrame } from 'framer-motion';
import DishImages from './sections/DishImages';
import Lenis from "@studio-freight/lenis"


function App() {

  const [isFormOpen, setIsFormOpen] = useState(parseInt(sessionStorage.getItem("reservationFormIsOpen")) || 0);

  const handleFormOverlay = e => {
    switch (e.target.dataset.actionToForm) {
      case "formOpen":
        setIsFormOpen(1);
        break;
      default:
        setIsFormOpen(0);
        // reset form values from session
        const resevationDetail = sessionStorage.getItem("previousTableReservation");
        sessionStorage.clear();
        resevationDetail && sessionStorage.setItem("previousTableReservation", resevationDetail);
    }
  }

  useEffect(() => {
    sessionStorage.setItem("reservationFormIsOpen", isFormOpen);
    // document.querySelector("body").style.overflow = isFormOpen ? "clip" : "visible";
  }, [isFormOpen]);

  const lenis = new Lenis();

  useAnimationFrame((t) => { lenis.raf(t) });

  return (
    <ChakraProvider theme={theme}>
      <Box
        pos="relative"
        zIndex="docked"
        w="100%"
        overflowX="hidden"
      >
        <RegularHeader />
        <MobileFixedNav
          handleFormOverlay={handleFormOverlay}
        />
        <StickyReservationButton
          onClick={handleFormOverlay}
          data-action-to-form="formOpen"
        />
        <Box
          as="main"
        >
          <Hero
            handleFormOverlay={handleFormOverlay}
          />
          <Specials />
          <Testimonials />
          <About />
          <AnimatePresence>
            {
              isFormOpen
              &&
              <TableReservation
                handleFormOverlay={handleFormOverlay}
              />
            }
          </AnimatePresence>
        </Box>
        {/* extra dish images */}
        <DishImages />
      </Box>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
