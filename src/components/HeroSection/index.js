import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import HeroBgAnimation from "../HeroBgAnimation";
import {
  HeroContainer,
  HeroBg,
  HeroLeftContainer,
  Img,
  HeroRightContainer,
  HeroInnerContainer,
  TextLoop,
  Title,
  Span,
  SubTitle,
  ResumeButton,
  FloatingImage,
} from "./HeroStyle";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import { Tilt } from "react-tilt";
import StarCanvas from "../canvas/Stars";
import { fetchBioData } from "../../api/supabase";

const HeroSection = () => {
  const [bioData, setBioData] = useState({});

  useEffect(() => {
    const getBioData = async () => {
      const { data, error } = await fetchBioData();
      if (!error && data) {
        setBioData(data);
      }
    };
    getBioData();
  }, []);

  return (
    <div id="about">
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>

        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  Hi, I am <br /> {bioData.name}
                </Title>
                <TextLoop>
                  <Span>
                    <Typewriter
                      options={{
                        strings: bioData.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{bioData.description}</SubTitle>
              </motion.div>

              <ResumeButton href={bioData.resume} target="_blank">
                Check Resume
              </ResumeButton>
            </HeroLeftContainer>
            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt options={{ max: 25, scale: 1.05 }}>
                  <FloatingImage
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  >
                    <Img
                      src={bioData.Image}
                      alt={bioData.name}
                      loading="lazy"
                    />
                  </FloatingImage>
                </Tilt>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
