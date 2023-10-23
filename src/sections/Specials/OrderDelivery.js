import { useAnimate, motion } from "framer-motion";
import { ReactComponent as DeliveryIcon } from "../../assets/icons/cycling.svg";
import { HStack, Text } from "@chakra-ui/react";

const OrderDelivery = () => {

    const [scope, animate] = useAnimate();

    const handleOrderFocus = e => {
        const enterSeq = [
            [scope.current, { gap: "32px" }],
            [".deliveryIcon", { filter: "drop-shadow(0px 4px 2px #33333380)" }, { at: "<" }],
        ]

        const exitSeq = [
            [scope.current, { gap: "8px" }],
            [".deliveryIcon", { filter: "drop-shadow(0px 0px 0px #33333380)" }, { at: "<" }],
        ]

        if (e.type === "focus" || e.type === "touchstart" || e.type === "mouseenter") {
            animate(enterSeq, {
                type: "spring",
                stiffness: 600,
                damping: 15
            })
        }
        else {
            animate(exitSeq, {
                ease: "easeOut",
                duration: 0.435
            })
        }
    }

    return (
        <HStack
            justify="start"
            spacing={2}
            as={motion.div}
            cursor="pointer"
            onFocus={handleOrderFocus}
            onTouchStart={handleOrderFocus}
            onBlur={handleOrderFocus}
            onTouchEnd={handleOrderFocus}
            onMouseEnter={handleOrderFocus}
            onMouseLeave={handleOrderFocus}
            tabIndex={0}
            className="deliveryStack"
            ref={scope}
        >
            <Text
                fontSize="18px"
                fontWeight={500}
                color="brand.primary.green"
            >
                Order a delivery
            </Text>
            {/* <Image
                        as={motion.img}
                        src={deliveryIcon}
                        alt="delivery icon"
                        className="deliveryIcon"
                    /> */}
            <DeliveryIcon
                className="deliveryIcon"
            />
        </HStack>
    )
}

export default OrderDelivery;