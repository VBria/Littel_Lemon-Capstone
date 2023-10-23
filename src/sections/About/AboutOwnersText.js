import { VStack, Text } from "@chakra-ui/react";
import { useAnimationFrame, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";

const AboutOwnersText = ({ children }) => {

    const scope = useRef(null);
    const { scrollYProgress, scrollY } = useScroll({
        target: scope,
        offset: ["start 0.6", "end 0.6"]
    })

    const words = children.split(" ");
    let uncoloredWords = useRef(null);
    useEffect(() => {
        uncoloredWords.current = Array.from(scope.current.querySelectorAll("span"));
    })

    let i = 0;
    let coloredWords = []
    const handleScrollAnimation = () => {
        if (scrollYProgress.current * 100 > 0 && scrollYProgress.current * 100 < 100) {
            if (scrollY.current > scrollY.prev && scrollYProgress.current * 100 > i * 100 / words.length && i < words.length) {
                uncoloredWords.current[0].style.cssText = "color: #333333;";
                coloredWords.unshift(uncoloredWords.current[0]);
                uncoloredWords.current.shift();
                i++;
            }
            else if (scrollY.current < scrollY.prev && scrollYProgress.current * 100 < i * 100 / words.length && i >= 0) {
                coloredWords[0].style.cssText = "color: #F4CE14;";
                uncoloredWords.current.unshift(coloredWords[0]);
                coloredWords.shift();
                i--;
            }
        }
        else if (scrollYProgress.current >= 1 && uncoloredWords.current.length > 0) {
            i = words.length;
            for (let word of uncoloredWords.current) {
                word.style.cssText = "color: #333333;";
                coloredWords.unshift(word);
            }
            uncoloredWords.current = [];
        }
        else if (scrollYProgress.current <= 0 && coloredWords.length > 0) {
            i = 0;
            for (let word of coloredWords) {
                word.style.cssText = "color: #F4CE14;";
                uncoloredWords.current.unshift(word);
            }
            coloredWords = [];
        }
    }

    useAnimationFrame(handleScrollAnimation);

    /*TODO: find a better way to control scroll speed during text color change onscroll*/
    // const handleScrollSpeed = e => {
    //     if (scrollYProgress.current > 0 && scrollYProgress.current < 1) {
    //         e.preventDefault();
    //         switch (e.deltaY < 0) {
    //             case true:
    //                 document.scrollingElement.scrollTop--;
    //                 break;
    //             default:
    //                 document.scrollingElement.scrollTop++;
    //         }
    //     }
    // }

    // useEffect(() => {
    //     document.scrollingElement.addEventListener("wheel", handleScrollSpeed, { passive: false });
    //     return () => document.scrollingElement.removeEventListener("wheel", handleScrollSpeed, { passive: false });
    // })

    return (
        <VStack
            ref={scope}
            w="full"
            pt="3px"
            pb="1px"
        >
            <Text
                w="full"
                fontSize="16px"
                fontWeight={400}
                lineHeight="150%"
                color="brand.primary.yellow"
            // color="brand.secondary.brightGray"
            >
                {words.map((word, index) => <span
                    key={word + "-" + index}
                    data-word-indicator={word + "-" + index}
                >
                    {word + " "}
                </span>)}
            </Text>
        </VStack>
    )
}

export default AboutOwnersText;