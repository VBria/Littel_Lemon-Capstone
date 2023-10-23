import { HStack } from '@chakra-ui/react';
import HamburgerMenuIcon from './HamburgerMenuIcon';
import ButtonRegular from '../../components/Buttons/ButtonRegular';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import OverlayMenu from './OverlayMenu';

const MobileFixedNav = ({ handleFormOverlay }) => {

    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const variants = {
        hide: {
            left: "calc(-1 * 120vw)",
            transition: {
                ease: "backIn",
                duration: 1.74 / 4
            }
        },
        show: {
            left: "-20vw",
            transition: {
                ease: "easeOut",
                duration: 1.74 / 4
            }
        }
    }

    return (
        <>
            {/* overlay menu */}
            <AnimatePresence>
                {menuIsOpen
                    &&
                    <OverlayMenu
                        key="mobile-nav-overlay"
                        variants={variants}
                        initial="hide"
                        animate="show"
                        exit="hide"
                        setMenuIsOpen={setMenuIsOpen}
                    />
                }
            </AnimatePresence>

            {/* bottom fixed nav */}
            <HStack
                as={motion.div}
                id="mobile-fixed-nav"
                pos="fixed"
                left="0"
                bottom="0"
                w="full"
                py={{ base: 2, md: 8 }}
                px={{ base: "20px", md: "70px" }}
                bg="brand.primary.green"
                zIndex="sticky"
                spacing={{ base: 6, md: 8 }}
                boxShadow="0px -1px 4px 0px #333333"
                hideFrom="xl"
            >
                <ButtonRegular
                    flexGrow={1}
                    onClick={handleFormOverlay}
                    data-action-to-form="formOpen"
                >
                    Reserve your table
                </ButtonRegular>
                <HamburgerMenuIcon
                    // showOverlayMenu={showOverlayMenu}
                    setMenuIsOpen={setMenuIsOpen}
                    menuIsOpen={menuIsOpen}
                />
            </HStack>
        </>
    )
}

export default MobileFixedNav;