import ScrollIndicator from "../../components/Gestures/ScrollIndicator";
import FullScreenGridSection from "../FullScreenGridSection";
import ButtonRegular from "../../components/Buttons/ButtonRegular"
import ButtonHoverable from "../../components/Buttons/ButtonHoverable";
import HeroImageFrame from "./HeroImageFrame";
import { Box, GridItem, Heading, VStack, Text, Center } from "@chakra-ui/react";
import { useBreakpointValue } from "@chakra-ui/react";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";


const Hero = ({ handleFormOverlay, ...props }) => {

    const [heroBgScope, animateHeroBg] = useAnimate();
    const [heroPicScope, animateHeroPic] = useAnimate();

    const sizeHeroBg = (referenceOffset) => {
        animateHeroBg("#heroBg", { height: referenceOffset }, {
            ease: "easeOut",
            duration: 1.74
        });
    }

    const sizeHeroPic = () => {
        const viewportWidth = window.innerWidth;
        let heroPicHeight = null;

        if (viewportWidth >= 1280) {
            heroPicHeight = heroPicScope.current.offsetWidth * (3 / 4);
        }
        else if (viewportWidth >= 740) {
            heroPicHeight = heroPicScope.current.offsetWidth * (4 / 3);
        }
        else {
            heroPicHeight = heroPicScope.current.offsetWidth * (9 / 16);
        }

        animateHeroPic("#heroImageFrame", { height: heroPicHeight }, {
            ease: "easeOut",
            duration: 3 * 0.435
        });
    }

    useEffect(() => {
        const reservationBtn = document.getElementById("heroReservationButton");
        const heroImageGI = document.getElementById("heroImageGI");

        sizeHeroBg(
            window.innerWidth >= 740
                ? reservationBtn.offsetTop + reservationBtn.offsetHeight + 40
                : heroImageGI.offsetTop + 40
        );

        sizeHeroPic();
    })

    const [scope, animate] = useAnimate();

    const handleHeroPicFlip = async (e) => {
        if (e.type === "mouseenter" || e.type === "focus") {
            animate(
                "#heroPicflipBoxInner",
                { transform: "rotateX(180deg) translate(-60%, 65%) scale(0.8)" },
                {
                    duration: 0.87,
                    ease: "easeOut"
                }
            );

        }
        else {
            animate(
                "#heroPicflipBoxInner",
                { transform: "rotateX(0deg) translate(0, 0%)" },
                {
                    ease: [.32, -0.41, .62, 1],
                    duration: 0.435
                }
            );
            animate(".heroFlipBoxFront", { boxShadow: "0px 0px 0px 0px #333333" });
        }
    }

    return (
        <Box
            h="100vh"
            pos="relative"
            ref={heroBgScope}
            bg="brand.secondary.brightGray"
            {...props}
        >
            {/* Hero Section BG */}
            <Box
                as={motion.div}
                id="heroBg"
                initial={{ height: "100vh" }}
                w="full"
                bg="brand.primary.green"
                pos="absolute"
                zIndex="base"
            />
            {/* Scroll Indicator */}
            <Center
                pos="absolute"
                top={{ base: "75vh" }}
                w="full"
            >
                <ScrollIndicator />
            </Center>
            {/* Hero Section Grid / Content */}
            <FullScreenGridSection
                id="hero-section"
                pos="relative"
                zIndex="base"
            >

                {/* Hero Title */}
                <GridItem
                    gridColumn={{ base: "1 / span 4", md: "1/ span 4", xl: "2 / span 4" }}
                    gridRow={{ base: (40 / 4) + 1, md: (216 / 4) + 1 }}
                    h="max"
                >
                    <VStack
                        pt="1px"
                        pb="3px"
                    >
                        <Heading
                            as="h1"
                            fontSize="64px"
                            fontWeight={400}
                            color="brand.primary.yellow"
                            lineHeight="none"
                            w="full"
                            textAlign={{ base: "center", md: "start" }}
                        >
                            Little Lemon
                        </Heading>
                    </VStack>
                </GridItem>

                {/* Hero Subtitle */}
                <GridItem
                    gridColumn={{ base: "1 / span 4", md: "1/ span ", xl: "2 / span 4" }}
                    gridRow={{ base: (92 / 4) + 1, md: (268 / 4) + 1 }}
                    h="max"
                >
                    <VStack
                        py={0.5}
                    >
                        <Heading
                            as="h2"
                            fontSize="40px"
                            fontWeight={400}
                            color="brand.secondary.brightGray"
                            lineHeight="none"
                            w="full"
                            textAlign={{ base: "center", md: "start" }}
                        >
                            Chicago
                        </Heading>
                    </VStack>
                </GridItem>

                {/* Hero description */}
                <GridItem
                    id="heroTextDesc"
                    gridColumn={{ base: "1 / span 4", md: "1/ span 4", xl: "2 / span 4" }}
                    gridRow={{ base: (140 / 4) + 1, md: (324 / 4) + 1 }}
                    h="max"
                >
                    <VStack
                        pt="3px"
                        pb="1px"
                    >
                        <Text
                            color="brand.secondary.brightGray"
                            fontSize="18px"
                            fontWeight={700}
                            lineHeight="125%"
                            textAlign={{ base: "center", md: "start" }}
                        >
                            We are a family owned Mediterranean restaurant, focussed on traditional recipes served with a modern twist.
                        </Text>
                    </VStack>
                </GridItem>

                {/* Reserve your table button */}
                <GridItem
                    gridColumn={{ md: "1/ span 3", xl: "2 / span 3" }}
                    gridRow={{ md: (448 / 4) + 1, xl: (424 / 4) + 1 }}
                    h="max"
                    hideBelow="md"
                    id="heroReservationButton"
                >
                    {useBreakpointValue({
                        base: <ButtonRegular
                            w="full"
                            onClick={handleFormOverlay}
                            data-action-to-form="formOpen"
                        >
                            Reserve your table
                        </ButtonRegular>,
                        xl: <ButtonHoverable
                            onMouseEnter={handleHeroPicFlip}
                            onMouseLeave={handleHeroPicFlip}
                            onFocus={handleHeroPicFlip}
                            onBlur={handleHeroPicFlip}
                            w="full"
                            onClick={handleFormOverlay}
                            data-action-to-form="formOpen"
                        >
                            Reserve your table
                        </ButtonHoverable>,
                    }, { ssr: false })}
                </GridItem>

                {/* Hero Pic */}
                <GridItem
                    id="heroImageGI"
                    ref={heroPicScope}
                    gridColumn={{ base: "1 / span 4", md: "5 / span 4", xl: "8 / span 5" }}
                    gridRow={{ base: (252 / 4) + 1, xl: (300 / 4) + 1 }}
                    pos="relative"
                    h="max"
                >
                    <HeroImageFrame pos="absolute" />
                    <HeroImageFrame ref={scope} />
                </GridItem>
            </FullScreenGridSection>
        </Box >
    )
}

export default Hero;