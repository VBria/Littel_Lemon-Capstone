import { HStack } from "@chakra-ui/react";
import OwnerImageFrame from "./OwnerImageFrame";
import { useAnimationFrame, useScroll } from "framer-motion";
import { forwardRef, useEffect, useRef } from "react";

const OwnerImagesStack = forwardRef(({ ...props }, ref) => {

    const scope = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scope,
        offset: ["0.1 0.6", "end 0.6"]
    })

    let leftImg = useRef(null);
    let leftImgElem = useRef(null);
    let centerImg = useRef(null);
    let centerImgElem = useRef(null);
    let rightImg = useRef(null);
    let rightImgElem = useRef(null);
    useEffect(() => {
        leftImg.current = scope.current.previousSibling;
        leftImgElem.current = scope.current.previousSibling.querySelector("img");
        centerImg.current = scope.current;
        centerImgElem.current = scope.current.querySelector("img");
        rightImg.current = scope.current.nextSibling;
        rightImgElem.current = scope.current.nextSibling.querySelector("img");
    }, [])

    const animateImages = () => {
        if (scrollYProgress.current > 0 && scrollYProgress.current < 1) {
            leftImg.current.style.cssText = `
            transform: translateY(-${(centerImg.current.offsetHeight - leftImg.current.firstChild.offsetHeight) * (scrollYProgress.current)}px);
            `
            rightImg.current.style.cssText = `
            transform: translateY(${(centerImg.current.offsetHeight - rightImg.current.firstChild.offsetHeight) * (scrollYProgress.current)}px);
            `
            leftImgElem.current.style.cssText = window.innerWidth >= 740
                ? `transform: scale(1.2) translateY(${30 * (1 - scrollYProgress.current)}px)`
                : `transform: scale(1.2) translateY(${15 * (1 - scrollYProgress.current)}px)`
            rightImgElem.current.style.cssText = window.innerWidth >= 740
                ? `transform: scale(1.2) translateY(-${30 * (1 - scrollYProgress.current)}px)`
                : `transform: scale(1.2) translateY(-${15 * (1 - scrollYProgress.current)}px)`
            centerImgElem.current.style.cssText = window.innerWidth >= 740
                ? `transform: scale(1.2) translateY(${50 - (60 * scrollYProgress.current)}px);`
                : `transform: scale(1.2) translateY(${25 - (30 * scrollYProgress.current)}px);`
        }
    }

    useAnimationFrame(animateImages);

    return (
        <HStack
            ref={ref}
            id="about-image-stack"
            w="full"
            h={{
                base: "calc(calc(calc(100vw - 40px - 16px) / 3) * 24 / 9)",
                md: "calc(calc(calc(100vw - 140px - 32px) / 3) * 24 / 9)",
                xl: "calc(calc(calc(657px - 32px) / 3) * 24 / 9)",
            }}
            spacing={{ base: 2, md: 4 }}
            align="start"
            {...props}
        >
            {/* image 1 */}
            <OwnerImageFrame
                src={() => require("../../assets/images/restaurant/owner-image-A.jpg")}
                alt={"An image of Adrian and Mario"}
                ratio={9 / 16}
                justify="end"
                align="70% top"
                transform={{ base: "scale(1.2) translateY(15px)", md: "scale(1.2) translateY(30px)" }}
            />
            {/* image 2 */}
            <OwnerImageFrame
                ref={scope}
                src={() => require("../../assets/images/restaurant/owner-image-C.jpg")}
                alt={"An image of Adrian and Mario"}
                ratio={9 / 24}
                align={{ base: "47% 0px", md: "47% 0px", xl: "47% 0px" }}
                transform={{ base: "scale(1.2) translateY(25px)", md: "scale(1.2) translateY(50px)" }}
                borderRadius="0px"
                boxShadow="0"
            />
            {/* image 3 */}
            <OwnerImageFrame
                src={() => require("../../assets/images/restaurant/owner-image-B.jpg")}
                alt={"An image of Adrian and Mario"}
                ratio={9 / 16}
                align="70% top"
                // justify="end"
                transform={{ base: "scale(1.2) translateY(-15px)", md: "scale(1.2) translateY(-30px)" }}
            />
        </HStack>
    )
})

export default OwnerImagesStack;