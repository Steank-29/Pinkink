import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  useMediaQuery,
  useTheme as useMuiTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
  Menu,
  MenuItem,
  Stack,
  Paper,
  Collapse,
} from '@mui/material';
import {
  ShoppingBag,
  Person,
  Menu as MenuIcon,
  Close as CloseIcon,
  Language,
  ExpandMore,
  ExpandLess,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/PinkEmra.png';
import logoMobile from '../assets/PinkEmra.png';

// Language options with flags and native names
const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
];

// Category links for the drawer - simplified
const categoryLinks = [
  { name: 'Notebooks', path: '/category/notebooks' },
  { name: 'Posters', path: '/category/posters' },
  { name: 'Jars', path: '/category/jars' },
  { name: 'Bookmarks', path: '/category/bookmarks' },
  { name: 'Stickers', path: '/category/stickers' },
  { name: 'Journals', path: '/category/journals' },
];

const Navbar: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [cartItems, setCartItems] = useState<any[]>([]); // Empty cart
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false);
  
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'PinkInk', path: '/pinkink' },
    { name: 'Category', path: '/category' },
    { name: 'Customized', path: '/customized' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const handleTabClick = (tabName: string) => {
    if (tabName === 'Category') {
      setCategoryDrawerOpen(true);
    } else {
      setActiveTab(tabName);
      window.location.href = navItems.find(item => item.name === tabName)?.path || '/';
    }
    setMobileOpen(false);
  };
  
  const handleCategoryItemClick = (path: string) => {
    window.location.href = path;
    setCategoryDrawerOpen(false);
  };
  
  const handleLoginClick = () => {
    console.log('Navigating to login page');
  };
  
  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    setLanguageAnchor(null);
    console.log(`Language changed to: ${language.name}`);
  };
  
  // Handle active tab based on current path
  useEffect(() => {
    const currentPath = window.location.pathname;
    const active = navItems.find(item => item.path === currentPath);
    if (active) {
      setActiveTab(active.name);
    }
  }, []);
  
// Drawer animation variants - FIXED
const drawerVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.3,
      staggerChildren: 0.05
    }
  },
  exit: { 
    x: -300, 
    opacity: 0,
    transition: {
      type: "tween" as const,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.3
    }
  },
  hover: {
    x: 15,
    scale: 1.05,
    transition: {
      type: "tween" as const,
      duration: 0.2
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      type: "tween" as const,
      duration: 0.1
    }
  }
};
  
  return (
    <>
      <AppBar 
        position="fixed"
        elevation={scrolled ? 8 : 0}
        sx={{
          backgroundColor: isDarkMode ? '#141010' : 'white',
          transition: 'all 0.3s ease',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? 'none' : `1px solid ${isDarkMode ? '#680747' : '#f0f0f0'}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ 
            py: 1.5,
            minHeight: { xs: 'auto', md: '85px' },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            
            {/* LEFT SECTION - Menu Icon (Only on mobile) */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              flex: { xs: 1, md: 0 },
              minWidth: { xs: 'auto', md: '150px' },
            }}>
              {isMobile && (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <IconButton
      onClick={() => setMobileOpen(true)}
      sx={{ color: '#ed186d', p: 0.5 }}
    >
      <MenuIcon />
    </IconButton>
    <Typography
      variant="caption"
      sx={{
        color: '#ed186d',
        fontSize: '0.4rem',
        fontWeight: 600,
        letterSpacing: '0.5px',
        fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
        mt: 0,
      }}
    >
      MENU
    </Typography>
  </Box>
)}
              {/* Desktop Logo - Hidden on mobile */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box 
                    component="img"
                    src={logo}
                    alt="PinkInk Logo"
                    sx={{ 
                      height: 60,
                      width: 'auto',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      color: '#000000',
                      letterSpacing: '1px',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    }}
                  >
                    Pink
                    <span style={{ color: '#ed186d' }}>I</span>
                    nk
                  </Typography>
                </Box>
              )}
            </Box>
            
            {/* CENTER SECTION - Mobile Logo (Only on mobile) */}
            {isMobile && (
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
                <Box 
                  component="img"
                  src={logoMobile}
                  alt="PinkInk Mobile Logo"
                  sx={{ 
                    height: 75,
                    width: 'auto',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              </Box>
            )}
            
            {/* CENTER SECTION - Navigation Tabs (Desktop only) */}
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                justifyContent: 'center',
                flex: 1,
              }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    onClick={() => handleTabClick(item.name)}
                    sx={{
                      color: isDarkMode ? 'white' : '#141010',
                      fontSize: '0.95rem',
                      fontWeight: activeTab === item.name ? 700 : 500,
                      px: 2,
                      py: 1,
                      position: 'relative',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: activeTab === item.name ? '30px' : '0',
                        height: '3px',
                        backgroundColor: '#ed186d',
                        transition: 'width 0.3s ease',
                        borderRadius: '2px',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#ed186d',
                        '&::before': {
                          width: '30px',
                        },
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
            
            {/* RIGHT SECTION - Icons */}
            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 1.5 }, 
              alignItems: 'center',
              justifyContent: 'flex-end',
              flex: { xs: 1, md: 0 },
              minWidth: { xs: 'auto', md: '150px' },
            }}>
              {/* Language Selector - Desktop only */}
              {!isMobile && (
                <IconButton
                  onClick={(e) => setLanguageAnchor(e.currentTarget)}
                  sx={{ 
                    color: isDarkMode ? 'white' : '#141010',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      color: '#ed186d',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Language />
                </IconButton>
              )}
              
              {/* Person Icon - Desktop only */}
              {!isMobile && (
                <IconButton
                  onClick={handleLoginClick}
                  href='/login'
                  sx={{ 
                    color: isDarkMode ? 'white' : '#141010',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      color: '#ed186d',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Person />
                </IconButton>
              )}
              
              {/* Cart Icon - Always visible */}
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{ 
                  color: isDarkMode ? 'white' : '#141010',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    color: '#ed186d',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Badge 
                  badgeContent={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
                  sx={{ 
                    '& .MuiBadge-badge': { 
                      backgroundColor: '#ed186d',
                      color: 'white',
                      fontSize: '10px',
                      height: '18px',
                      minWidth: '18px',
                    } 
                  }}
                >
                  <ShoppingBag />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Category Drawer - Opens from left with ed186d background using Framer Motion */}
      <Drawer
        anchor="left"
        open={categoryDrawerOpen}
        onClose={() => setCategoryDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '70%', sm: 280, md: 280 },
            backgroundColor: '#ed186d',
            boxSizing: 'border-box',
            borderRadius: '0 20px 20px 0',
            boxShadow: '10px 0 30px rgba(0,0,0,0.2)',
            overflowX: 'hidden',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          },
        }}
      >
        <AnimatePresence mode="wait">
          {categoryDrawerOpen && (
            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Header with Close Button */}
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: 'white',
                        fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                        fontSize: '1.1rem',
                      }}
                    >
                      Categories
                    </Typography>
                    <IconButton 
                      onClick={() => setCategoryDrawerOpen(false)}
                      sx={{ 
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' },
                        width: 28,
                        height: 28,
                      }}
                    >
                      <CloseIcon sx={{ color: 'white', fontSize: 18 }} />
                    </IconButton>
                  </Box>
                </motion.div>
                
                {/* Category Items - No scrollbar */}
                <Box sx={{ flex: 1, overflow: 'auto', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
                  <List sx={{ p: 0 }}>
                    {categoryLinks.map((category, index) => (
                      <motion.div
                        key={category.name}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        custom={index}
                      >
                        <ListItem
                          onClick={() => handleCategoryItemClick(category.path)}
                          sx={{
                            borderRadius: '12px',
                            mb: 1,
                            cursor: 'pointer',
                            backgroundColor: 'rgba(255,255,255,0.4)',
                            transition: 'all 0.3s ease',
                            py: 1,
                            px: 1.5,
                            '&:hover': {
                              backgroundColor: 'rgba(255,255,255,0.5)',
                            },
                          }}
                        >
                          <ListItemText 
                            primary={category.name}
                            slotProps={{
                              primary: {
                                sx: {
                                  color: 'white',
                                  fontWeight: 500,
                                  fontSize: '0.9rem',
                                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                                  textAlign: 'center',
                                }
                              }
                            }}
                            sx={{ textAlign: 'center' }}
                          />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Drawer>
      
      {/* Language Menu */}
      <Menu
        anchorEl={languageAnchor}
        open={Boolean(languageAnchor)}
        onClose={() => setLanguageAnchor(null)}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              minWidth: 200,
              backgroundColor: isDarkMode ? '#141010' : 'white',
              border: `1px solid ${isDarkMode ? '#680747' : '#eee'}`,
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            },
          },
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageSelect(language)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              direction: language.code === 'ar' ? 'rtl' : 'ltr',
              justifyContent: language.code === 'ar' ? 'flex-end' : 'flex-start',
              py: 1.5,
              mx: 1,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(195, 25, 93, 0.08)',
              },
            }}
          >
            <Typography sx={{ fontSize: '1.3rem', fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>{language.flag}</Typography>
            <Typography sx={{ 
              fontWeight: selectedLanguage.code === language.code ? 700 : 400,
              color: selectedLanguage.code === language.code ? '#ed186d' : 'inherit',
              fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
            }}>
              {language.nativeName}
            </Typography>
            {selectedLanguage.code === language.code && (
              <Box sx={{ ml: 'auto', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ed186d' }} />
            )}
          </MenuItem>
        ))}
      </Menu>
      
      {/* Professional Mobile Drawer with Plus/Minus for Category */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '85%',
            maxWidth: 360,
            backgroundColor: isDarkMode ? '#141010' : 'white',
            boxSizing: 'border-box',
            borderRadius: '0 20px 20px 0',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          {/* Close Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton 
              onClick={() => setMobileOpen(false)}
              sx={{ 
                backgroundColor: 'rgba(195, 25, 93, 0.1)',
                '&:hover': { backgroundColor: 'rgba(195, 25, 93, 0.2)' },
              }}
            >
              <CloseIcon sx={{ color: '#ed186d' }} />
            </IconButton>
          </Box>
          
          {/* Logo Section in Drawer */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src={logoMobile}
              alt="PinkInk Mobile Logo"
              sx={{ height: 100, width: 'auto'}}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700, 
                background: 'linear-gradient(135deg, #ed186d, #680747)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                color: 'transparent',
              }}
            >
              PinkInk
            </Typography>
          </Box>
          
          {/* Navigation Items with Plus/Minus for Category */}
          <List>
            {navItems.map((item) => (
              <React.Fragment key={item.name}>
                <ListItem
                  onClick={() => {
                    if (item.name === 'Category') {
                      setMobileCategoryOpen(!mobileCategoryOpen);
                    } else {
                      handleTabClick(item.name);
                    }
                  }}
                  sx={{
                    borderRadius: 12,
                    mb: 1,
                    cursor: 'pointer',
                    backgroundColor: activeTab === item.name ? 'rgba(195, 25, 93, 0.1)' : 'transparent',
                    transition: 'all 0.3s ease',
                    py: 1.5,
                    '&:hover': {
                      backgroundColor: 'rgba(195, 25, 93, 0.08)',
                      transform: 'translateX(5px)',
                    },
                  }}
                >
                  <ListItemText 
                    primary={item.name}
                    slotProps={{
                      primary: {
                        sx: {
                          color: activeTab === item.name ? '#ed186d' : (isDarkMode ? 'white' : '#141010'),
                          fontWeight: activeTab === item.name ? 700 : 500,
                          fontSize: '1rem',
                          textAlign: 'left',
                          fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                        }
                      }
                    }}
                  />
                  {item.name === 'Category' && (
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMobileCategoryOpen(!mobileCategoryOpen);
                      }}
                      sx={{ color: '#ed186d' }}
                    >
                      {mobileCategoryOpen ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  )}
                  {activeTab === item.name && item.name !== 'Category' && (
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#ed186d' }} />
                  )}
                </ListItem>
                
                {/* Category Subitems - Collapsible on Mobile */}
                {item.name === 'Category' && (
                  <Collapse in={mobileCategoryOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {categoryLinks.map((category) => (
                        <ListItem
                          key={category.name}
                          onClick={() => {
                            window.location.href = category.path;
                            setMobileOpen(false);
                          }}
                          sx={{
                            borderRadius: 12,
                            mb: 0.5,
                            ml: 2,
                            cursor: 'pointer',
                            py: 1,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: 'rgba(195, 25, 93, 0.08)',
                              transform: 'translateX(5px)',
                            },
                          }}
                        >
                          <ListItemText 
                            primary={category.name}
                            slotProps={{
                              primary: {
                                sx: {
                                  color: isDarkMode ? 'rgba(255,255,255,0.8)' : '#666',
                                  fontSize: '0.85rem',
                                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                                }
                              }
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
          
          {/* Language Selection */}
          <Typography variant="subtitle2" sx={{ mb: 2, color: '#ed186d', fontWeight: 600, fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
            Select Language
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            {languages.map((language) => (
              <Button
                key={language.code}
                onClick={() => {
                  handleLanguageSelect(language);
                }}
                sx={{
                  flex: 1,
                  flexDirection: 'column',
                  gap: 0.5,
                  py: 1.5,
                  borderRadius: '12px',
                  backgroundColor: selectedLanguage.code === language.code ? 'rgba(195, 25, 93, 0.1)' : 'transparent',
                  border: selectedLanguage.code === language.code ? `1px solid #ed186d` : `1px solid ${isDarkMode ? '#680747' : '#e0e0e0'}`,
                  color: selectedLanguage.code === language.code ? '#ed186d' : (isDarkMode ? 'white' : '#141010'),
                  '&:hover': {
                    backgroundColor: 'rgba(195, 25, 93, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Typography sx={{ fontSize: '1.5rem', fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>{language.flag}</Typography>
                <Typography variant="caption" sx={{ fontWeight: 500, fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
                  {language.nativeName}
                </Typography>
              </Button>
            ))}
          </Stack>
          
          <Divider sx={{ my: 2, backgroundColor: isDarkMode ? '#680747' : '#eee' }} />
          
          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            startIcon={<Person />}
            onClick={handleLoginClick}
            sx={{
              bgcolor: '#ed186d',
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none',
              fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(195, 25, 93, 0.3)',
              '&:hover': { 
                bgcolor: '#680747',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(195, 25, 93, 0.4)',
              },
            }}
          >
            Sign In to Account
          </Button>
          
          {/* Footer Text */}
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block', 
              textAlign: 'center', 
              fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              mt: 3,
              color: isDarkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            }}
          >
            © 2026 PinkInk. All rights reserved.
          </Typography>
        </Box>
      </Drawer>
      
      {/* Professional Cart Drawer - Empty Cart */}
      <Drawer
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 480, md: 550 },
            backgroundColor: isDarkMode ? '#141010' : 'white',
            borderRadius: { sm: '20px 0 0 20px' },
          },
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Cart Header */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderBottom: `1px solid ${isDarkMode ? '#680747' : '#f0f0f0'}`,
              backgroundColor: 'transparent',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#ed186d', fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
                  Shopping Cart
                </Typography>
                <Typography variant="body2" sx={{ color: isDarkMode ? '#ccc' : '#666', mt: 0.5, fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in your cart
                </Typography>
              </Box>
              <IconButton 
                onClick={() => setCartOpen(false)}
                sx={{ 
                  backgroundColor: 'rgba(195, 25, 93, 0.1)',
                  '&:hover': { backgroundColor: 'rgba(195, 25, 93, 0.2)' },
                }}
              >
                <CloseIcon sx={{ color: '#ed186d' }} />
              </IconButton>
            </Box>
          </Paper>
          
          {/* Cart Items - Empty State */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
            <ShoppingBag sx={{ fontSize: 100, color: '#680747', mb: 2, opacity: 0.5 }} />
            <Typography variant="h6" sx={{ color: '#680747', mb: 1, fontWeight: 600, fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
              Your cart is empty
            </Typography>
            <Typography variant="body2" sx={{ color: isDarkMode ? '#ccc' : '#666', mb: 3, textAlign: 'center', fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
              Looks like you haven't added any items yet
            </Typography>
            <Button
              variant="contained"
              onClick={() => setCartOpen(false)}
              sx={{
                bgcolor: '#ed186d',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                fontWeight: 600,
                '&:hover': { bgcolor: '#680747' },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </Box>
      </Drawer>
      
      {/* Spacer for fixed navbar */}
      <Toolbar sx={{ minHeight: { xs: 'auto', md: '85px' } }} />
    </>
  );
};

export default Navbar;