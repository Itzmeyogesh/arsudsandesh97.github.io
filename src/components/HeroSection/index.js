import React, { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Tilt } from "react-tilt";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchBioData } from "../../api/supabase";
import _default from "../../themes/default";
import { useTheme } from "styled-components";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
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
  LoadingContainer,
} from "./HeroStyle";

// Lazy load only heavy components
const HeroBgAnimation = React.lazy(() => import("../HeroBgAnimation"));
const StarCanvas = React.lazy(() => import("../canvas/Stars"));

const HeroSectionSkeleton = () => (
  <HeroContainer>
    <HeroBg>
      <div style={{ height: "100vh", background: "rgba(0,0,0,0.1)" }} />
    </HeroBg>
    <HeroInnerContainer>
      <HeroLeftContainer>
        <Title>
          <Skeleton height={60} width={300} />
        </Title>
        <Skeleton height={40} width={200} style={{ marginBottom: 20 }} />
        <SubTitle>
          <Skeleton count={3} style={{ marginBottom: 10 }} />
        </SubTitle>
        <Skeleton height={50} width={150} borderRadius={20} />
      </HeroLeftContainer>
      <HeroRightContainer>
        <Skeleton circle height={400} width={400} style={{ marginLeft: 20 }} />
      </HeroRightContainer>
    </HeroInnerContainer>
  </HeroContainer>
);

const HeroSection = () => {
  const [bioData, setBioData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const getBioData = async () => {
      try {
        const { data, error } = await fetchBioData();
        if (!error && data) {
          setBioData(data);
        }
      } finally {
        setLoading(false);
      }
    };
    getBioData();
  }, []);

  // Preload image
  useEffect(() => {
    if (bioData.Image) {
      const img = new Image();
      img.onload = () => setImageLoaded(true);
      img.src = bioData.Image;
    }
  }, [bioData.Image]);

  if (loading) {
    return <HeroSectionSkeleton />;
  }

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
                    <Suspense fallback={<div>Loading...</div>}>
                      <Typewriter
                        options={{
                          strings: bioData.roles || [],
                          autoStart: true,
                          loop: true,
                          delay: 50,
                        }}
                      />
                    </Suspense>
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{bioData.description}</SubTitle>
              </motion.div>

              <ResumeButton
                href={bioData.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check Resume
              </ResumeButton>
            </HeroLeftContainer>

            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Suspense fallback={<div>Loading image...</div>}>
                  <Tilt options={{ max: 25, scale: 1.05 }}>
                    <FloatingImage
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <Img
                        src={bioData.Image}
                        alt={bioData.name}
                        loading="lazy"
                        width="400"
                        height="400"
                      />
                    </FloatingImage>
                  </Tilt>
                </Suspense>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default HeroSection;
