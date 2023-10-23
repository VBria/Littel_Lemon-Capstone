import { Circle } from "@chakra-ui/react";
import { useAnimate, motion } from "framer-motion";
import { useEffect, useState } from "react";

const PressHoldGesture = ({ ...props }) => {

    const [scope, animate] = useAnimate();

    const [seq, setSeq] = useState(0)

    const seq0 = [
        [scope.current, { border: "2px solid #495E57" }],
        [".pressHoldInner", { width: "16px", height: "16px" }, { at: "<" }]
    ]

    const seq1 = [
        [scope.current, { border: "0px" }],
        [".pressHoldInner", { width: "24px", height: "24px" }, { at: "<" }]
    ]

    const animateSeq0 = async () => {
        await animate(seq0, {
            ease: "easeInOut",
            duration: 0.435
        });
        setTimeout(() => {
            setSeq(Number(!seq));
        }, 1305);
    }

    const animateSeq1 = async () => {
        await animate(seq1, {
            type: "spring",
            duration: 0.435
        });
        setTimeout(() => {
            setSeq(Number(!seq));
        }, 1305);
    }

    useEffect(() => {
        seq
            ? animateSeq1()
            : animateSeq0();
    })

    return (
        <Circle
            as={motion.div}
            boxSize={8}
            border="2px solid #495E57"
            bg="brand.secondary.brightGray"
            borderColor="brand.primary.green"
            className="touchGesture"
            ref={scope}
            {...props}
        >
            <Circle
                className="pressHoldInner"
                as={motion.div}
                boxSize={6}
                bg="brand.primary.green"
            />
        </Circle>
    )
}

export default PressHoldGesture;