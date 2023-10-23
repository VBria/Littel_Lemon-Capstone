import { Box, GridItem, Heading, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useRef } from "react";
import FullScreenGridSection from "../FullScreenGridSection";
import CardCarousel from "../../components/CardCarousel";
import TestimonialCard from "./TestimonialCard";

const Testimonials = ({ ...props }) => {

    const dragConstraintsRef = useRef(null);

    const testimonials = [
        {
            reviewer: "Colleen",
            imgSrc: () => require("../../assets/testimonial-customers/colleen.png"),
            rating: 5,
            review: "I visited this restaurant in Chicago recently and it was amazing! The food was delicious and the service was outstanding. I highly recommend it for anyone looking for a great dining experience in the Windy City!"
        },
        {
            reviewer: "Serenity",
            imgSrc: () => require("../../assets/testimonial-customers/serenity.png"),
            rating: 4,
            review: "This restaurant was great! The food was delicious and the service was friendly. I would definitely recommend it to anyone looking for a great dining experience."
        },
        {
            reviewer: "Jacob",
            imgSrc: () => require("../../assets/testimonial-customers/jacob.png"),
            rating: 5,
            review: "I had an amazing experience at this restaurant - the food was delicious and the service was outstanding! I highly recommend it."
        },
        {
            reviewer: "Courtney",
            imgSrc: () => require("../../assets/testimonial-customers/courtney.png"),
            rating: 3,
            review: "I would definitely recommend it to anyone looking for a delicious Mediterranean meal in the city"
        },
        {
            reviewer: "Cody",
            imgSrc: () => require("../../assets/testimonial-customers/cody.png"),
            rating: 5,
            review: "This Mediterranean restaurant in Chicago is a must-visit! The food is fresh and flavorful, and the atmosphere is warm and inviting. I highly recommend it!"
        },
        {
            reviewer: "James",
            imgSrc: () => require("../../assets/testimonial-customers/james.png"),
            rating: 4,
            review: "Great Mediterranean food and amazing atmosphere! I highly recommend this restaurant!"
        },
    ]

    return (
        <Box
            h="100vh"
            overflow="hidden"
            // maxH={{ xl: "900px" }}
            bg="brand.secondary.peachPuff"
            {...props}
        >
            <FullScreenGridSection
                id="testimonials-section"
            >
                {/* section header */}
                <GridItem
                    as="header"
                    h="max"
                    gridColumn={{ base: "1 / span 4", md: "1 / span 4", xl: "2 / span 4" }}
                    gridRow={{ base: (40 / 4) + 1, md: (216 / 4) + 1, xl: (184 / 4) + 1 }}
                >
                    <VStack
                        w="full"
                        pt="1"
                        pb="3"
                    >
                        <Heading
                            as="h2"
                            fontSize={"64px"}
                            fontWeight={500}
                            lineHeight="none"
                            color="brand.primary.green"
                            w="full"
                            textAlign={{ base: "center", md: "start" }}
                        >
                            {useBreakpointValue({
                                base: "Reviews",
                                md: "Testimonials"
                            })}
                        </Heading>
                    </VStack>
                </GridItem>

                {/* Reference grid item for card carousel drag constraints */}
                <GridItem gridColumn={{ xl: " 2 / span 11" }} ref={dragConstraintsRef} visibility="hidden" />
                {/* Testimonial Card Carousel */}
                <GridItem
                    h="max"
                    gridRow={{ base: (132 / 4) + 1, md: (348 / 4) + 1, xl: (284 / 4) + 1 }}
                    gridColumn={{ base: "1 / span 4", md: "1 / span 8", xl: "1 / span 12" }}
                >
                    <CardCarousel
                        id="reviews-card-carousel"
                        dragConstraintsRef={dragConstraintsRef}
                        numOfItems={testimonials.length}
                        renderCards={() => testimonials.map((testimonial, index) => <TestimonialCard
                            key={testimonial.reviewer}
                            cardIndex={index}
                            {...testimonial}
                        />)}
                    />
                </GridItem>
            </FullScreenGridSection>
        </Box>
    )
}

export default Testimonials;