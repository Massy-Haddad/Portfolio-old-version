import React, { useState, useEffect, useRef } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Testimonial.scss";
import { wrap } from "popmotion";

const results = [
  {
    _createdAt: "2022-05-03T02:23:39Z",
    _id: "059c16ed-9687-4790-ab8d-9770cc65e6b8",
    _rev: "09WuA35E2jBANHlXDcy1bx",
    _type: "testimonials",
    _updatedAt: "2022-05-03T02:23:39Z",
    company: "Baki",
    feedback: "Il est beaucoup trop puissant pour un simple humain.",
    imgurl: {
      _type: "image",
      asset: {
        _ref: "image-ecb6e74778bd3c8506802547b81f7a6d585da181-766x719-png",
        _type: "reference",
      },
    },
    name: "Baki Hanma",
  },
  {
    _createdAt: "2022-05-01T16:21:34Z",
    _id: "4356ddfd-7b59-4635-a1c3-65c91979bad6",
    _rev: "CbJoqNxFlN9h4vbNnmBG5t",
    _type: "testimonials",
    _updatedAt: "2022-05-03T02:44:37Z",
    company: "Solo Leveling",
    feedback: "Le plus terrifiant monarque ayant existé.",
    imgurl: {
      _type: "image",
      asset: {
        _ref: "image-135a932c4ee99d56085062a155b46eef3d738c9b-1128x1832-png",
        _type: "reference",
      },
      crop: {
        _type: "sanity.imageCrop",
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
      },
      hotspot: {
        _type: "sanity.imageHotspot",
        height: 1,
        width: 1,
        x: 0.5,
        y: 0.5,
      },
    },
    name: "Sung Jin-Woo",
  },
  {
    _createdAt: "2022-05-03T02:29:32Z",
    _id: "f703f0af-974d-4b18-849d-efa0e4f7ad52",
    _rev: "09WuA35E2jBANHlXDcyTJB",
    _type: "testimonials",
    _updatedAt: "2022-05-03T02:29:32Z",
    company: "JJBA",
    feedback: "Yare yare daze...",
    imgurl: {
      _type: "image",
      asset: {
        _ref: "image-9d7a93629c54084f8e235ffc9042f45a8257e6b2-784x1891-webp",
        _type: "reference",
      },
    },
    name: "Jotaro Kujo",
  },
];

export const images = [
  "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
  "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png",
];

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [brands, setBrands] = useState([]);

  // Slider pagination
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, testimonials.length, page);
  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const MINUTE_MS = 4000;
  const ref = useRef(null);

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    const brandsQuery = '*[_type == "brands"]';

    client.fetch(query).then((data) => {
      setTestimonials(data);
    });

    client.fetch(brandsQuery).then((data) => {
      setBrands(data);
    });

    // Slider swipe interval with MINUTE_MS const
    const interval = setInterval(() => {
      // console.log("Logs every " + MINUTE_MS / 1000 + " seconds");
      ref.current.click();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <>
      {testimonials.length && (
        <>
          <div className="app__testimonial-item app__flex">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                className="app__testimonial-item-slider"
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
              >
                <img
                  src={urlFor(testimonials[imageIndex].imgurl)}
                  alt={testimonials[imageIndex].name}
                />

                <div className="app__testimonial-content">
                  <p className="p-text">{testimonials[imageIndex].feedback}</p>
                  <div>
                    <h4 className="bold-text">
                      {testimonials[imageIndex].name}
                    </h4>
                    <h5 className="p-text">
                      {testimonials[imageIndex].company}
                    </h5>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => paginate(-1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" ref={ref} onClick={() => paginate(1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className="app__testimonial-brands app__flex">
        {brands.map((brand) => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, type: "tween" }}
            key={brand._id}
          >
            <img src={urlFor(brand.imgUrl)} alt={brand.name} />
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonial",
  "app__primarybg"
);
