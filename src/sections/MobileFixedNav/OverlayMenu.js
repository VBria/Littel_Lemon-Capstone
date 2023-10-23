import { VStack, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navigation/Navbar";

const OverlayMenu = ({ setMenuIsOpen, ...props }) => {
    return (
        <VStack
            as={motion.div}
            border="1px"
            bg="brand.primary.green"
            pos="fixed"
            initial={{ left: "calc(-1 * 120vw)" }}
            zIndex="sticky"
            w="120vw"
            h="100vh"
            justify={{ md: "center" }}
            hideFrom="xl"
            pt={{ base: 10, md: 0 }}
            pl={"20vw"}
            // ref={overlayMenuScope}
            {...props}
        >
            {/* log and nav stack */}
            <VStack
                spacing={{ base: 10, md: 16 }}
            >
                <Image
                    h="156.27px"
                    src={require("../../assets/logo/logo_v2.png")}
                    alt="Little Lemon logo"
                />
                <Navbar
                    align="center"
                    color="brand.secondary.brightGray"
                    spacing={4}
                    setMenuIsOpen={setMenuIsOpen}
                />
            </VStack>
        </VStack>
    )
}

export default OverlayMenu;