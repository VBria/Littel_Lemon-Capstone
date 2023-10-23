import { useRef } from "react";
import { Box, GridItem, Heading, VStack, useBreakpointValue } from "@chakra-ui/react";
import FullScreenGridSection from "../FullScreenGridSection";
import ButtonRegular from "../../components/Buttons/ButtonRegular";
import ButtonHoverable from "../../components/Buttons/ButtonHoverable";
import SpecialsCardSmall from "./SpecialsCardSmall";
import CardCarousel from "../../components/CardCarousel";
import SpecialsCardRegular from "./SpecialsCardRegular";


const Specials = ({ ...props }) => {

    const specialDishes = [
        {
            title: "Greek Salad",
            price: "$ 12.99",
            imgSrc: () => require("../../assets/images/specials/greek-salad.jpg"),
            desc: "Our salad is made with fresh tomatoes, cucumber, feta cheese, olives, and a homemade Greek dressing. It's the perfect light meal to enjoy any time of the day."
        },
        {
            title: "Bruschetta",
            price: "$ 5.99",
            imgSrc: () => require("../../assets/images/specials/bruschetta.png"),
            desc: "Treat yourself to the most delicious Bruschetta in town! Our Bruschetta is made with fresh tomatoes, basil, and garlic, topped with olive oil and Parmesan cheese."
        },
        {
            title: "Lemon Dessert",
            price: "$ 5.00",
            imgSrc: () => require("../../assets/images/specials/lemon-dessert.jpg"),
            desc: "Buttery graham cracker crust that is filled with a zesty lemon custard. The top of the dessert is finished with a sweetened whipped cream and lemon zest for a bright and flavorful finish."
        },
        {
            title: "Lamb Chops",
            price: "$ 15.99",
            imgSrc: () => require("../../assets/images/specials/lamb-chops.jpeg"),
            desc: "Treat yourself to the ultimate dining experience with our delicious lamb chops! Our succulent, juicy chops are made with the finest ingredients and cooked to perfection."
        },
        {
            title: "Mushroom Pitas",
            price: "$ 10.95",
            imgSrc: () => require("../../assets/images/specials/mushroom-pitas.jpeg"),
            desc: "Our freshly-baked pita bread is stuffed with your choice of sautéed mushrooms, feta cheese, and a medley of herbs and spices. Enjoy a tasty and healthy meal that is packed with flavor."
        },
    ]

    const dragConstraintsRef = useRef(null);

    return (
        <Box
            h="100vh"
            overflow="hidden"
            // maxH={{ xl: "900px" }}
            bg="brand.secondary.brightGray"
            {...props}
        >
            <FullScreenGridSection
                id="specials-section"
            >

                {/* Specials Msg */}
                <GridItem
                    as="header"
                    h="max"
                    gridColumn={{ base: "1 / span 4", md: "1 / span 6", xl: "2 / span 5" }}
                    gridRow={{ base: (40 / 4) + 1, md: (216 / 4) + 1, xl: (176 / 4) + 1 }}
                >
                    <VStack
                        pt="1px"
                        pb="3px"
                        w="full"
                    >
                        <Heading
                            as="h2"
                            color="brand.primary.green"
                            fontSize="64px"
                            fontWeight={500}
                            lineHeight="none"
                            w="full"
                            textAlign="start"
                        >
                            This week's specials!
                        </Heading>
                    </VStack>
                </GridItem>

                {/* Online Menu Btn */}
                <GridItem
                    h="max"
                    gridRow={{ md: (948 / 4) + 1, xl: (188 / 4) + 1 }}
                    gridColumn={{ md: "1 / span 8", xl: "10 / span 3" }}
                    hideBelow="md"
                    zIndex={1}
                >
                    {useBreakpointValue({
                        base: <ButtonRegular
                            w="full"
                        >
                            Online Menu
                        </ButtonRegular>,
                        xl: <ButtonHoverable
                            darkBg={false}
                            w="full"
                        >
                            Online Menu
                        </ButtonHoverable>,
                    }, { ssr: false })}
                </GridItem>

                {/* Reference grid item for card carousel drag constraints */}
                <GridItem gridColumn={{ xl: " 2 / span 11" }} ref={dragConstraintsRef} visibility="hidden" />
                {/* Specials Card Carousel */}
                <GridItem
                    h="max"
                    gridRow={{ base: (196 / 4) + 1, md: (348 / 4) + 1, xl: (284 / 4) + 1 }}
                    gridColumn={{ base: "1 / span 4", md: "1 / span 8", xl: "1 / span 12" }}
                >
                    <CardCarousel
                        id="specials-card-carousel"
                        dragConstraintsRef={dragConstraintsRef}
                        numOfItems={specialDishes.length}
                        renderCards={useBreakpointValue({
                            base: () => specialDishes.map((dish, index) => <SpecialsCardSmall
                                key={dish.title}
                                cardIndex={index}
                                {...dish}
                            />),
                            md: () => specialDishes.map((dish, index) => <SpecialsCardRegular
                                key={dish.title}
                                cardIndex={index}
                                {...dish}
                            />)
                        })}
                    />
                </GridItem>
            </FullScreenGridSection>
        </Box>
    )
}

export default Specials;