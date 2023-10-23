import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { forwardRef } from "react";


const HeroImageFrame = forwardRef((props, ref) => {

    return (
        <Box
            id="heroImageFrame"
            as={motion.div}
            bg="transparent"
            w="full"
            style={{ perspective: "800px" }}
            ref={ref}
            {...props}
        >
            <Box
                as={motion.div}
                id="heroPicflipBoxInner"
                pos="relative"
                w="full"
                h="full"
                textAlign="center"
                style={{ transformStyle: "preserve-3d" }}
                transformOrigin={"center bottom"}
                initial={{ transform: "rotateX(0deg) translate(0, 0%)" }}
            >
                <Image
                    className="heroFlipBoxFront"
                    pos="absolute"
                    w="full"
                    h="full"
                    borderRadius="16px"
                    style={{ backfaceVisibility: "hidden" }}
                    src={require("../../assets/images/restaurant/restaurant.jpg")}
                    fit="cover"
                    alt="Restaurtant's image"
                />
                <Image
                    className="heroFlipBoxBack"
                    pos="absolute"
                    w="full"
                    h="full"
                    borderRadius="16px"
                    style={{ backfaceVisibility: "hidden" }}
                    transform={"rotateX(180deg)"}
                    src={require("../../assets/images/restaurant/restaurantfood.jpg")}
                    fit="cover"
                    alt="Restaurtant's food image"
                    boxShadow="16px 16px 8px 0px #333333B3"
                />
            </Box>
        </Box>
    )
})

export default HeroImageFrame;