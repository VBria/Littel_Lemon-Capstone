import { Stack } from "@chakra-ui/react";
import NavItem from "./NavItem";
import { useState, useEffect, useRef } from 'react';
import { useAnimationFrame, useScroll } from "framer-motion";

const Navbar = ({ darkBg = true, scrollActivationLocked = false, setMenuIsOpen = null, ...props }) => {

    const [navMenuItems, setNavMenuItems] = useState([
        { name: "home", href: "#hero-section", active: true },
        { name: "specials", href: "#specials-section", active: false },
        { name: "testimonials", href: "#testimonials-section", active: false },
        { name: "about", href: "#about-section", active: false },
    ]);

    const isScrollActivationLocked = useRef(scrollActivationLocked);

    const handleClickActivation = event => {
        setMenuIsOpen && setMenuIsOpen(false);
        isScrollActivationLocked.current = true;
        event.preventDefault();
        const sectionId = event.target.href.split("/").slice(-1)[0];
        document.querySelector(sectionId).scrollIntoView({
            behavior: "smooth",
        });
        setNavMenuItems(prev => {
            return prev.map(item => {
                return { ...item, active: item.name === event.target.text.toLowerCase() }
            });
        });
    };

    const sectionScrollOffsets = useRef(null);
    const { scrollY } = useScroll();

    useAnimationFrame(() => {
        const compareArray = sectionScrollOffsets.current.map(offset => scrollY.current - offset + (window.innerHeight * 0.2));
        let i = compareArray.length;
        while (i >= 0) {
            i--;
            if (compareArray[i] >= 0) {
                break;
            }
        }
        if (isScrollActivationLocked.current) {
            isScrollActivationLocked.current = !navMenuItems[i].active;
        }
        if (!navMenuItems[i].active && !isScrollActivationLocked.current) {
            setNavMenuItems(prev => {
                return prev.map((item, index) => {
                    return {
                        ...item,
                        active: i === index
                    }
                })
            });
        }
    })

    useEffect(() => {
        sectionScrollOffsets.current = navMenuItems.map((item) => {
            return document.querySelector(item.href).getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        });
    });


    return (
        <Stack
            as="nav"
            {...props}
        >
            {navMenuItems.map(item => {
                return (
                    <NavItem
                        key={item.name}
                        href={item.href}
                        isActive={item.active}
                        handleActivation={handleClickActivation}
                        itemColor={item.name === "home" && item.active ? "brand.secondary.brightGray" : "brand.primary.green"}
                    >
                        {item.name.toUpperCase()}
                    </NavItem>
                )
            }
            )}
        </Stack >
    )
}

export default Navbar;