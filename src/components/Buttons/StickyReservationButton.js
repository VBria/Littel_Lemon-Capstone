import { Box } from "@chakra-ui/react";
import ButtonHoverable from "./ButtonHoverable";
import { useState, useEffect, useRef } from "react";
import { useAnimationFrame, useScroll } from "framer-motion";
import chakraPropFilter from "../../util/chakraPropFilter";

const StickyReservationButton = ({ ...props }) => {

    const [render, setRender] = useState(false)

    const [position, setPosition] = useState({
        pos: "absolute",
        left: "35px"
    });

    const ref = useRef(null);
    const headerH = useRef(null);
    const buttonW = useRef(null);
    useEffect(() => {
        headerH.current = document.getElementById("regular-header").getBoundingClientRect().height;
        const specialCardCarouselTop = document.getElementById("specials-card-carousel").getBoundingClientRect().top
            - document.body.getBoundingClientRect().top;
        buttonW.current = ref.current.getBoundingClientRect().width;
        setPosition(prev => {
            return {
                ...prev,
                top: (specialCardCarouselTop + buttonW.current + 32) + "px",
            }
        });
        setRender(true);
    }, [])

    const { scrollY } = useScroll();

    const handleStickiness = () => {
        const carouselTop = document.querySelector("#specials-card-carousel").getBoundingClientRect().top
            - document.body.getBoundingClientRect().top;
        if (scrollY.current >= carouselTop - headerH.current + 16 && position.pos !== "fixed") {
            setPosition(prevState => {
                return {
                    ...prevState,
                    pos: "fixed",
                    top: (headerH.current + 16 + buttonW.current) + "px"
                }
            })
        }
        else if (scrollY.current < carouselTop - headerH.current + 16 && position.pos !== "absolute") {
            setPosition(prevState => {
                return {
                    ...prevState,
                    pos: "absolute",
                    top: carouselTop + buttonW.current + 32
                }
            })
        }
    }

    useAnimationFrame(handleStickiness);

    const { chakraProps, nonChakraProps } = chakraPropFilter(props);

    return (
        <Box
            ref={ref}
            zIndex="sticky"
            w="max"
            hideBelow="xl"
            {...position}
            {...chakraProps}
            visibility={render ? "visible" : "hidden"}
        >
            <ButtonHoverable
                transform="rotateZ(-90deg)"
                transformOrigin="left top"
                darkBg={false}
                {...nonChakraProps}
            >
                Reserve your table
            </ButtonHoverable>
        </Box>
    )
}

export default StickyReservationButton;