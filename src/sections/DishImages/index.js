import { useBreakpointValue } from "@chakra-ui/react";
import { useAnimationFrame, useScroll, useTransform, easeInOut } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DishImageBox from "./DishImageBox";


const DishImages = () => {

  const [renderState, setRenderState] = useState(false);

  const viewPortRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const heroImgRef = useRef(null);
  const reservationButtonRef = useRef(null);
  const specialsHeaderRef = useRef(null);
  const specialCardCarouselRef = useRef(null);
  const reviewHeaderRef = useRef(null);
  const onlineMenuBtnRef = useRef(null);
  const aboutHeaderRef = useRef(null);
  const reviewCardCarouselRef = useRef(null);

  useEffect(() => {
    heroImgRef.current = document.querySelector("#heroImageGI");
    reservationButtonRef.current = document.querySelector("#heroReservationButton");
    specialsHeaderRef.current = document.querySelector("#specials-section>header");
    specialCardCarouselRef.current = document.querySelector("#specials-section #specials-card-carousel");
    reviewHeaderRef.current = document.querySelector("#testimonials-section>header");
    onlineMenuBtnRef.current = document.querySelector("#specials-section button");
    aboutHeaderRef.current = document.querySelector("#about-section>header");
    reviewCardCarouselRef.current = document.querySelector("#testimonials-section #reviews-card-carousel");
    setRenderState(true);
  }, [])

  // define positions with breakpoints
  const image1Props = useBreakpointValue({
    base: () => {
      const heroImgTop = heroImgRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const heroImgBottom = heroImgTop + (heroImgRef.current.getBoundingClientRect().width * 9 / 16)
      return {
        top: `${heroImgBottom + 64}px`,
        left: (heroImgRef.current.getBoundingClientRect().left - 16) + "px",
        h: "18vh"
      }
    },
    md: () => {
      const onlineBtnBottom = reservationButtonRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      return {
        top: `${onlineBtnBottom + 16}px`,
        left: (reservationButtonRef.current.getBoundingClientRect().left - 64) + "px",
        h: "30vh"
      }
    }
  });
  const image1bProps = useBreakpointValue({
    base: () => {
      const heroImgTop = heroImgRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const heroImgBottom = heroImgTop + (heroImgRef.current.getBoundingClientRect().width * 9 / 16);
      return {
        top: `${heroImgBottom + 16}px`,
        right: `calc(100vw - ${heroImgRef.current.getBoundingClientRect().right + 16}px)`,
        h: "18vh",
        display: viewPortRef.current.height >= 740 ? "block" : "none"
      }
    },
    md: () => {
      const heroImgTop = heroImgRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const heroImgBottom = heroImgTop + (heroImgRef.current.getBoundingClientRect().width * 4 / 3);
      return {
        top: `${heroImgBottom + 16}px`,
        right: `calc(100vw - ${heroImgRef.current.getBoundingClientRect().right + 64}px)`,
        h: "16vh"
      }
    },
    xl: () => {
      const heroImgTop = heroImgRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const heroImgBottom = heroImgTop + (heroImgRef.current.getBoundingClientRect().width * 3 / 4);
      return {
        top: `${heroImgBottom + 40}px`,
        left: `${heroImgRef.current.getBoundingClientRect().left}px`,
        h: "16vh"
      }
    }
  });
  const image2Props = useBreakpointValue({
    base: () => {
      const h = "28vh"
      const specialHeaderTop = specialsHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      return {
        top: `calc(${specialHeaderTop}px - ${h})`,
        right: `calc(100vw - ${heroImgRef.current.getBoundingClientRect().right}px - 16px)`,
        h: h,
      }
    },
    md: () => {
      const h = "40vh"
      const specialHeaderTop = specialsHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      return {
        top: `calc(${specialHeaderTop}px - ${h})`,
        right: `calc(100vw - ${heroImgRef.current.getBoundingClientRect().right}px - 64px)`,
        h: h,
      }
    },
  });
  const image2bProps = useBreakpointValue({
    base: () => {
      const h = "28vh"
      const specialHeaderTop = specialsHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      return {
        top: `calc(${specialHeaderTop}px - ${h} + 32px)`,
        left: `${heroImgRef.current.getBoundingClientRect().left - 16}px`,
        h: h,
        display: viewPortRef.current.height >= 740 ? "block" : "none"
      }
    },
    md: () => {
      const h = "40vh"
      const specialHeaderTop = specialsHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      return {
        top: `calc(${specialHeaderTop}px - ${h})`,
        left: `${reservationButtonRef.current.getBoundingClientRect().left - 128}px`,
        h: h,
      }
    },
  });
  const image3Props = useBreakpointValue({
    base: () => {
      const reviewHeaderTop = reviewHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const carouselBottom = specialCardCarouselRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = reviewHeaderTop - carouselBottom + 16;
      return {
        top: `${carouselBottom}px`,
        left: (reviewHeaderRef.current.getBoundingClientRect().left - 16) + "px",
        h: h + "px",
        maxH: "24vh"
      }
    },
    md: () => {
      const reviewHeaderTop = reviewHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const menuBtnBottom = onlineMenuBtnRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = reviewHeaderTop - menuBtnBottom;
      return {
        top: `${menuBtnBottom}px`,
        left: (reviewHeaderRef.current.getBoundingClientRect().left - 64) + "px",
        h: h + "px",
        maxH: "28vh"
      }
    },
    xl: () => {
      const reviewHeaderTop = reviewHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const carouselTop = specialCardCarouselRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const cardwithPaddingsH = (280 * 16 / 9) + (2 * 32) + 8;
      const h = reviewHeaderTop - (carouselTop + cardwithPaddingsH);
      return {
        top: `${carouselTop + cardwithPaddingsH}px`,
        left: (reviewHeaderRef.current.getBoundingClientRect().left - 64) + "px",
        h: h + "px",
        maxH: "28vh"
      }
    }
  });
  const image4Props = useBreakpointValue({
    base: () => {
      const reviewHeaderTop = reviewHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const carouselBottom = specialCardCarouselRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = reviewHeaderTop - carouselBottom + 16;
      return {
        top: h > 0.24 * viewPortRef.current.height
          ? `${reviewHeaderTop - (0.24 * viewPortRef.current.height) + 16}px`
          : `${reviewHeaderTop - h + 16}px`,
        right: `calc(100vw - ${reviewHeaderRef.current.getBoundingClientRect().right}px - 16px)`,
        h: h + "px",
        maxH: "24vh"
      }
    },
    md: () => {
      const reviewHeaderTop = reviewHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const reviewHeaderBottom = reviewHeaderRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const menuBtnBottom = onlineMenuBtnRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = reviewHeaderTop - menuBtnBottom;
      return {
        top: h > 0.28 * viewPortRef.current.height
          ? `${reviewHeaderBottom - (0.28 * viewPortRef.current.height)}px`
          : `${reviewHeaderBottom - h}px`,
        right: `calc(100vw - ${onlineMenuBtnRef.current.getBoundingClientRect().right - 64}px)`,
        h: h + "px",
        maxH: "28vh"
      }
    },
    xl: () => {
      const reviewHeaderTop = reviewHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const reviewHeaderBottom = reviewHeaderRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const carouselTop = specialCardCarouselRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const cardwithPaddingsH = (280 * 16 / 9) + (2 * 32) + 8;
      const h = reviewHeaderTop - (carouselTop + cardwithPaddingsH);
      return {
        top: h > 0.28 * viewPortRef.current.height
          ? `${reviewHeaderBottom - (0.28 * viewPortRef.current.height)}px`
          : `${reviewHeaderBottom - h}px`,
        right: `calc(100vw - ${onlineMenuBtnRef.current.getBoundingClientRect().right - 64}px)`,
        h: h + "px",
        maxH: "28vh"
      }
    }
  });
  const image5Props = useBreakpointValue({
    base: () => {
      const aboutHeaderTop = aboutHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const reviewCarouselBottom = reviewCardCarouselRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = aboutHeaderTop - reviewCarouselBottom + 16;
      return {
        top: h > 0.24 * viewPortRef.current.height
          ? `${aboutHeaderTop - (0.24 * viewPortRef.current.height) - 16}px`
          : `${aboutHeaderTop - h}px`,
        boxSize: h + "px",
        maxH: "24vh",
        maxW: "24vh",
        left: h > 0.24 * viewPortRef.current.height
          ? `calc(50vw - ${0.24 * viewPortRef.current.height / 2}px)`
          : `calc(50vw - ${h / 2}px)`
      }
    },
    md: () => {
      const aboutHeaderTop = aboutHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const reviewCarouselBottom = reviewCardCarouselRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = aboutHeaderTop - reviewCarouselBottom;
      return {
        top: h > 0.24 * viewPortRef.current.height
          ? `${aboutHeaderTop - (0.24 * viewPortRef.current.height) - 16}px`
          : `${aboutHeaderTop - h + 16}px`,
        left: `${aboutHeaderRef.current.getBoundingClientRect().left - 64 + 32}px`,
        h: h + "px",
        maxH: "24vh"
      }
    },
  });
  const image6Props = useBreakpointValue({
    base: () => {
      return {
        display: "none"
      }
    },
    md: () => {
      const aboutHeaderTop = aboutHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const reviewCarouselBottom = reviewCardCarouselRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = aboutHeaderTop - reviewCarouselBottom;
      return {
        top: `${reviewCarouselBottom}px`,
        // right: `calc(100vw - ${onlineMenuBtnRef.current.getBoundingClientRect().right + 64}px)`,
        left: h > 0.16 * viewPortRef.current.height
          ? `calc(50vw - ${0.16 * viewPortRef.current.height / 2}px)`
          : `calc(50vw - ${h / 2}px)`,
        h: h + "px",
        maxH: "16vh",
      }
    }
  });
  const image7Props = useBreakpointValue({
    base: () => {
      return {
        display: "none"
      }
    },
    md: () => {
      const aboutHeaderTop = aboutHeaderRef.current.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
      const aboutHeaderBottom = aboutHeaderRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const reviewCarouselBottom = reviewCardCarouselRef.current.getBoundingClientRect().bottom - document.body.getBoundingClientRect().top;
      const h = aboutHeaderTop - reviewCarouselBottom;
      return {
        top: h > 0.2 * viewPortRef.current.height
          ? `${aboutHeaderBottom - (0.2 * viewPortRef.current.height)}px`
          : `${aboutHeaderBottom - h}px`,
        right: `calc(100vw - ${onlineMenuBtnRef.current.getBoundingClientRect().right + 64}px)`,
        h: h + "px",
        maxH: "20vh"
      }
    },
    xl: () => {
      return {
        display: "none"
      }
    }
  });

  // link scrolls and animate
  const img1Ref = useRef(null);
  const img1Scroll = useScroll({
    target: img1Ref,
    offset: viewPortRef.current.width >= 1536
      ? ["start 0.5", "center start"]
      : viewPortRef.current.width >= 1280
        ? ["start 0.6", "center start"]
        : viewPortRef.current.width >= 740
          ? ["start 0.5", "center start"]
          : ["start 0.8", "center start"]
  });
  const img1tX = useTransform(
    img1Scroll.scrollYProgress,
    [0, 1],
    [0, -viewPortRef.current.width / 4],
    { ease: easeInOut }
  );
  const img1tY = useTransform(
    img1Scroll.scrollYProgress,
    [0, 1],
    [0, -viewPortRef.current.height / 6],
    { ease: easeInOut }
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img1Scroll.scrollYProgress.current > 0 && img1Scroll.scrollYProgress.current < 1) {
      img1Ref.current.firstChild.style.transform = `translate(${img1tX.current}px, ${img1tY.current}px)`;
    }
  });


  const img1bRef = useRef(null);
  const img1bScroll = useScroll({
    target: img1bRef,
    offset: viewPortRef.current.width >= 1536
      ? [`start 0.7`, "center start"]
      : viewPortRef.current.width >= 740
        ? [`start 0.8`, "center start"]
        : [`start 0.6`, "center start"],
  });
  const img1btX = useTransform(
    img1bScroll.scrollYProgress,
    [0, 1],
    [0, viewPortRef.current.width / 4],
    { ease: easeInOut }
  );
  const img1btY = useTransform(
    img1bScroll.scrollYProgress,
    [0, 1],
    [0, -viewPortRef.current.height / 6],
    { ease: easeInOut }
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img1bScroll.scrollYProgress.current > 0 && img1bScroll.scrollYProgress.current < 1) {
      img1bRef.current.firstChild.style.transform = `translate(${img1btX.current}px, ${img1btY.current}px)`;
    }
  });


  const img2Ref = useRef(null);
  const img2Scroll = useScroll({
    target: img2Ref,
    offset: ["start end", "center start"],
  });
  const img2rZ = useTransform(
    img2Scroll.scrollYProgress,
    [0, 1],
    [45, 0],
    { ease: easeInOut }
  );
  const img2tX = useTransform(
    img2Scroll.scrollYProgress,
    [0, 1],
    [viewPortRef.current.width / 8, -viewPortRef.current.width / 16],
    { ease: easeInOut }
  );
  const img2tY = useTransform(
    img2Scroll.scrollYProgress,
    [0, 1],
    [-viewPortRef.current.height / 16, viewPortRef.current.height / 16],
    { ease: easeInOut }
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img2Scroll.scrollYProgress.current > 0 && img2Scroll.scrollYProgress.current < 1) {
      img2Ref.current.firstChild.style.transform = `translate(${img2tX.current}px, ${img2tY.current}px) rotateZ(${img2rZ.current}deg)`;
    }
  });

  const img2bRef = useRef(null);
  const img2bScroll = useScroll({
    target: img2bRef,
    offset: ["start end", "center start"]
  });
  const img2brZ = useTransform(
    img2bScroll.scrollYProgress,
    [0, 1],
    [-60, 0],
    { ease: easeInOut }
  );
  const img2btX = useTransform(
    img2bScroll.scrollYProgress,
    [0, 1],
    [-viewPortRef.current.width / 8, viewPortRef.current.width / 16],
    { ease: easeInOut }
  );
  const img2btY = useTransform(
    img2bScroll.scrollYProgress,
    [0, 1],
    [-viewPortRef.current.height / 16, viewPortRef.current.height / 16],
    { ease: easeInOut }
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img2bScroll.scrollYProgress.current > 0 && img2bScroll.scrollYProgress.current < 1) {
      img2bRef.current.firstChild.style.transform = `translate(${img2btX.current}px, ${img2btY.current}px) rotateZ(${img2brZ.current}deg)`;
    }
  });

  const img3Ref = useRef(null);
  const img3Scroll = useScroll({
    target: img3Ref,
    offset: ["start end", "end start"]
  });
  const img3tX_p1 = useTransform(
    img3Scroll.scrollYProgress,
    [0, 0.3],
    [-viewPortRef.current.width / 4, 0]
  );
  const img3tX_p2 = useTransform(
    img3Scroll.scrollYProgress,
    [0.7, 1],
    [0, -viewPortRef.current.width / 4]
  );
  const img3rZ = useTransform(
    img3Scroll.scrollYProgress,
    [0, 1],
    [-90, 90]
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img3Scroll.scrollYProgress.current > 0 && img3Scroll.scrollYProgress.current <= 0.3) {
      img3Ref.current.firstChild.style.transform = `translate(${img3tX_p1.current}px, 0px) rotateZ(${img3rZ.current}deg)`;
    }
    else if (img3Scroll.scrollYProgress.current > 0.3 && img3Scroll.scrollYProgress.current < 1) {
      img3Ref.current.firstChild.style.transform = `translate(${img3tX_p2.current}px, 0px) rotateZ(${img3rZ.current}deg)`;
    }
  });

  const img4Ref = useRef(null);
  const img4Scroll = useScroll({
    target: img4Ref,
    offset: ["start end", "end start"]
  });
  const img4tX_p1 = useTransform(
    img4Scroll.scrollYProgress,
    [0, 0.3],
    [viewPortRef.current.width / 4, 0]
  );
  const img4tX_p2 = useTransform(
    img4Scroll.scrollYProgress,
    [0.65, 1],
    [0, viewPortRef.current.width / 4]
  );
  const img4rZ = useTransform(
    img3Scroll.scrollYProgress,
    [0, 1],
    [90, -90]
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img4Scroll.scrollYProgress.current > 0 && img4Scroll.scrollYProgress.current <= 0.3) {
      img4Ref.current.firstChild.style.transform = `translate(${img4tX_p1.current}px, 0px) rotateZ(${img4rZ.current}deg)`;
    }
    else if (img4Scroll.scrollYProgress.current > 0.3 && img4Scroll.scrollYProgress.current < 1) {
      img4Ref.current.firstChild.style.transform = `translate(${img4tX_p2.current}px, 0px) rotateZ(${img4rZ.current}deg)`;
    }
  });

  const img5Ref = useRef(null);
  const img5Scroll = useScroll({
    target: img5Ref,
    offset: ["start end", "end start"]
  });
  const img5rZ = useTransform(
    img5Scroll.scrollYProgress,
    [0, 1],
    [90, -90]
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img5Scroll.scrollYProgress.current > 0 && img5Scroll.scrollYProgress.current < 1) {
      img5Ref.current.firstChild.style.transform = `rotateZ(${img5rZ.current}deg)`;
    }
  });

  const img6Ref = useRef(null);
  const img6Scroll = useScroll({
    target: img6Ref,
    offset: ["start end", "end start"]
  });
  const img6tY = useTransform(
    img6Scroll.scrollYProgress,
    [0, 1],
    [viewPortRef.current.height / 2, -viewPortRef.current.height / 2]
  );
  const img6Scale = useTransform(
    img6Scroll.scrollYProgress,
    [0, 0.7],
    [0, 3]
  )
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img6Scroll.scrollYProgress.current > 0 && img6Scroll.scrollYProgress.current < 1) {
      img6Ref.current.firstChild.style.transform = `translateY(${img6tY.current}px) scale(${img6Scale.current})`;
    }
  });

  const img7Ref = useRef(null);
  const img7Scroll = useScroll({
    target: img7Ref,
    offset: ["start end", "end start"]
  });
  const img7rZ = useTransform(
    img7Scroll.scrollYProgress,
    [0, 1],
    [-45, 45]
  );
  useAnimationFrame(() => {
    if (!renderState) return;
    if (img7Scroll.scrollYProgress.current > 0 && img7Scroll.scrollYProgress.current < 1) {
      img7Ref.current.firstChild.style.transform = `rotateZ(${img7rZ.current}deg)`;
    }
  });

  return (
    <>
      {/* extra dish images */}
      <DishImageBox
        imagePosProps={renderState ? image1Props : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_1.png")}
        ref={img1Ref}
      />
      <DishImageBox
        imagePosProps={renderState ? image1bProps : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_1b.png")}
        ref={img1bRef}
      />
      <DishImageBox
        imagePosProps={renderState ? image2Props : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_2.png")}
        ref={img2Ref}
        transform={renderState ? `translate(${img2tX.current}px, ${img2tY.current}px) rotateZ(${img2rZ.current}deg)` : null}
      />
      <DishImageBox
        imagePosProps={renderState ? image2bProps : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_2b.png")}
        ref={img2bRef}
        transform={renderState ? `translate(${img2btX.current}px, ${img2btY.current}px) rotateZ(${img2brZ.current}deg)` : null}
      />
      <DishImageBox
        imagePosProps={renderState ? image3Props : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_3.png")}
        ref={img3Ref}
        transform={`translate(${img3tX_p1.current}px, 0px) rotateZ(${img3rZ.current}deg)`}
      />
      <DishImageBox
        imagePosProps={renderState ? image4Props : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_4.png")}
        ref={img4Ref}
        transform={`translate(${img4tX_p1.current}px, 0px) rotateZ(${img4rZ.current}deg)`}
      />
      <DishImageBox
        imagePosProps={renderState ? image5Props : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_5.png")}
        ref={img5Ref}
        transform={`rotateZ(${img5rZ.current}deg)`}
      />
      <DishImageBox
        imagePosProps={renderState ? image6Props : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_6.png")}
        ref={img6Ref}
        transform={`translateY(${img6tY.current}px) scale(${img6Scale.current})`}
      />
      <DishImageBox
        imagePosProps={renderState ? image7Props : () => null}
        renderState={renderState}
        imgSrc={() => require("../../assets/dish-images/dish_7.png")}
        ref={img7Ref}
      />
    </>
  )
};

export default DishImages;