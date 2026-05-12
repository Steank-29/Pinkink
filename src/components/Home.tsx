// Home.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Grid, Typography, Button, Container, IconButton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowForward, AutoAwesome, ChevronLeft, ChevronRight } from '@mui/icons-material';
import NB from '../assets/NB.png';
import Poster from '../assets/Poster.png';
import Jar from '../assets/Jar.png';
import BM from '../assets/BM.png';
import Sticker from '../assets/Sticker.png';
import hangingImage from '../assets/frame.png';

const stickers = [
  { id: 0, image: NB, title: "NoteBooks", path: "/shop/notebooks", color: "#ed186d", tagline: "Write Your Story" },
  { id: 1, image: Poster, title: "Posters", path: "/shop/posters", color: "#ff6b9d", tagline: "Decorate Your Space" },
  { id: 2, image: Jar, title: "Jars", path: "/shop/jars", color: "#d4af37", tagline: "Store Memories" },
  { id: 3, image: BM, title: "Bookmarks", path: "/shop/bookmarks", color: "#8b5cf6", tagline: "Mark Moments" },
  { id: 4, image: Sticker, title: "Stickers", path: "/shop/stickers", color: "#ff3b30", tagline: "Express Yourself" },
];

// Mobile Image Slider Component
const MobileImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);

  const slides = stickers.map(sticker => ({
    image: sticker.image,
    title: sticker.title,
    tagline: sticker.tagline,
    color: sticker.color,
    path: sticker.path,
  }));

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!isHovered) {
      autoPlayRef.current = setInterval(goToNext, 3000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isHovered, goToNext]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        position: 'relative',
        top: 16,
        left: 0,
        right: 0,
        zIndex: 1,
        mt: -2,
        mx: -2,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          maxHeight: '100svh',
          minHeight: { xs: '100vh', sm: '100vh' },
          overflow: 'hidden',
        }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <AnimatePresence initial={false} custom={currentSlide}>
            <motion.div
              key={currentSlide}
              custom={currentSlide}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.25 },
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            >
              <Box
                onClick={() => window.location.href = slides[currentSlide].path}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  cursor: 'pointer',
                  '&:active': { transform: 'scale(0.98)' },
                  transition: 'transform 0.2s ease',
                }}
              >
                <Box
                  component="img"
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.15) 100%)',
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    px: 4,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      fontWeight: 900,
                      fontSize: { xs: '3rem', sm: '3.5rem' },
                      color: 'white',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      lineHeight: 1,
                      textShadow: '0 4px 20px rgba(0,0,0,0.7)',
                    }}
                  >
                    {slides[currentSlide].title}
                  </Typography>

                  <Typography
                    sx={{
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      fontWeight: 700,
                      fontSize: { xs: '1.1rem', sm: '1.3rem' },
                      color: 'rgba(255,255,255,0.95)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      textShadow: '0 2px 8px rgba(0,0,0,0.6)',
                    }}
                  >
                    {slides[currentSlide].tagline}
                  </Typography>

                  <Button
                    variant="contained"
                    size="large"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = slides[currentSlide].path;
                    }}
                    sx={{
                      mt: 1,
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      bgcolor: 'white',
                      color: '#ed186d', // Always pink color
                      borderRadius: '50px',
                      px: 4,
                      py: 1.4,
                      minWidth: 180,
                      boxShadow: '0 6px 30px rgba(0,0,0,0.4)',
                      border: '2px solid transparent',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        bgcolor: 'transparent',
                        color: 'white',
                        border: `2px solid white`,
                        transform: 'translateY(-3px)',
                      },
                    }}
                  >
                    Shop Now
                    <ArrowForward sx={{ ml: 1, fontSize: '1.1rem' }} />
                  </Button>
                </Box>
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Navigation Arrows */}
        <IconButton
          onClick={goToPrev}
          sx={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.15)',
            color: 'white',
            width: 44,
            height: 44,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            zIndex: 2,
          }}
        >
          <ChevronLeft sx={{ fontSize: 30 }} />
        </IconButton>

        <IconButton
          onClick={goToNext}
          sx={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255,255,255,0.15)',
            color: 'white',
            width: 44,
            height: 44,
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.2)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,0.3)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            zIndex: 2,
          }}
        >
          <ChevronRight sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Dots Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1.5,
            zIndex: 2,
          }}
        >
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: index === currentSlide ? 32 : 10,
                height: 10,
                borderRadius: '5px',
                bgcolor: index === currentSlide ? 'white' : 'rgba(255,255,255,0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const Home: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  const phrases = [
    "Inked With Love", 
    "Where Thoughts Bloom"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Mobile Slider - Only visible on mobile */}
      <MobileImageSlider />

      {/* Hero Section - Hidden on mobile, visible on tablet/desktop */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'visible',
          pt: { xs: 0, md: 4 },
          pb: { xs: 0, md: 0 },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Left Side - Smaller Stacked Titles */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Main Title Stack - MADE SMALLER */}
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem', lg: '3.2rem' },
                      lineHeight: 1.2,
                      background: 'linear-gradient(135deg, #ed186d 0%, #ff6b9d 50%, #ed186d 100%)',
                      backgroundSize: '200% auto',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.3,
                      animation: 'shine 3s linear infinite',
                      '@keyframes shine': {
                        '0%': { backgroundPosition: '0% center' },
                        '100%': { backgroundPosition: '200% center' },
                      },
                    }}
                  >
                    Handwritten
                  </Typography>
                  
                  {/* Dreams with Shiny Effect - MADE SMALLER */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem', lg: '3.2rem' },
                      lineHeight: 1.2,
                      background: 'linear-gradient(90deg, #000000 0%, #333333 25%, #ffffff 50%, #666666 75%, #000000 100%)',
                      backgroundSize: '200% auto',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      animation: 'shinyText 2.5s linear infinite',
                      '@keyframes shinyText': {
                        '0%': { backgroundPosition: '200% center' },
                        '100%': { backgroundPosition: '-200% center' },
                      },
                    }}
                  >
                    Dreams
                  </Typography>
                </Box>

                {/* Rotating Subtitle - MADE SMALLER */}
                <Box sx={{ mb: 2 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPhraseIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          fontWeight: 700,
                          fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                          color: '#ed186d',
                          fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.5rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {phrases[currentPhraseIndex]}
                      </Typography>
                    </motion.div>
                  </AnimatePresence>
                </Box>

                {/* Professional Paragraph - MADE SMALLER */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                      color: '#666',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      lineHeight: 1.5,
                      maxWidth: 500,
                      mb: 2.5,
                    }}
                  >
                    Turning your ideas into beautifully customized stationery and decor <br /> 
                    Every design starts with a digital preview, allowing you to confirm every detail before it becomes reality.
                  </Typography>
                </motion.div>

                {/* Browse Collections Button - MADE SMALLER */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Button
                    variant="contained"
                    size="medium"
                    endIcon={<AutoAwesome />}
                    href="/collections"
                    sx={{
                      backgroundColor: '#0a0a0a',
                      borderRadius: '50px',
                      py: 1,
                      px: 3,
                      textTransform: 'none',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      color: 'white',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                        transition: 'left 0.5s ease',
                      },
                      '&:hover': {
                        backgroundColor: '#ed186d',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(237, 24, 109, 0.25)',
                        '&::before': {
                          left: '100%',
                        },
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Browse Collections
                  </Button>
                </motion.div>

              </motion.div>
            </Grid>

            {/* Right Side - Hanging Frame Image - MADE SMALLER */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ position: 'relative', zIndex: 20 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {/* Hanging string/rope - SMALLER */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -25,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '1.5px',
                      height: '30px',
                      background: 'linear-gradient(180deg, #8B7355 0%, #d4b896 100%)',
                      zIndex: 1,
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -30,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#8B7355',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      zIndex: 1,
                    }}
                  />
                  
                  {/* Hanging Frame with Animation - SMALLER */}
                  <motion.div
                    animate={{ 
                      rotate: [-2, 2, -2],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 4,
                      ease: "easeInOut"
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        maxWidth: '300px',
                        height: '360px',
                        margin: '0 auto',
                        position: 'relative',
                        borderRadius: '12px',
                        boxShadow: '0 15px 30px rgba(0,0,0,0.15), 0 0 0 6px #fff, 0 0 0 10px #e0e0e0',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        overflow: 'hidden',
                        backgroundColor: '#fff',
                        '&:hover': {
                          transform: 'scale(1.02)',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 6px #fff, 0 0 0 10px #ed186d',
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={hangingImage}
                        alt="Featured Art"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Products Grid Section - Hidden on mobile, only visible on tablet/desktop */}
      <Box
        sx={{
          mx: { xs: 2, sm: 3, md: 5 },
          backgroundColor: '#fdf4f4',
          borderRadius: '20px',
          padding: { xs: 2, sm: 2, md: 3 },
          overflow: 'hidden',
          mt: { xs: 0, md: -4 },
          mb: 3,
          position: 'relative',
          zIndex: 5,
          boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
          display: { xs: 'none', md: 'block' }, // Hidden on mobile, visible on desktop
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="center">
            {stickers.map((sticker, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 2.4 }} key={sticker.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      maxWidth: '180px',
                      height: 'auto',
                      margin: '0 auto',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      bgcolor: 'transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        position: 'relative',
                        borderRadius: '12px',
                        boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
                      }}
                    >
                      <Box
                        component="img"
                        src={sticker.image}
                        alt={sticker.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.08)',
                          },
                        }}
                      />
                    </Box>

                    <Box sx={{ textAlign: 'center', mt: 1 }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                          color: '#1a1a1a',
                          fontSize: '0.85rem',
                        }}
                      >
                        {sticker.title}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.3 }}>
                      <Button
                        component="a"
                        href={sticker.path}
                        size="small"
                        endIcon={<ArrowForward sx={{ fontSize: '0.9rem' }} />}
                        sx={{
                          color: '#ed186d',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          '&:hover': {
                            transform: 'translateX(5px)',
                            color: '#680747',
                            backgroundColor: 'transparent',
                          },
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        Shop Now 
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;