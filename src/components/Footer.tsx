import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Link,
  Stack,
  Paper,
} from '@mui/material';
import {
  Instagram,
  Facebook,
  Send,
  Copyright,
} from '@mui/icons-material';
import logo from '../assets/PinkInk.jpg';

// TikTok icon as a custom component
const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const socialLinks = [
  { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/pinkink' },
  { name: 'TikTok', icon: TikTokIcon, url: 'https://tiktok.com/@pinkink' },
  { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/pinkink' },
];

const quickLinks = [
  { name: 'Home', url: '/' },
  { name: 'PinkInk', url: '/pinkink' },
  { name: 'Customized', url: '/customized' },
  { name: 'Contact', url: '/contact' },
  { name: 'Privacy Policy', url: '/privacy' },
  { name: 'Contact', url: '/contact' },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    setEmailError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f2f9f1',
        color: '#141010',
        mt: 'auto',
        borderTop: '1px solid #e0e0e0',
        fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Logo & Social Section */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="PinkInk Logo"
                sx={{ height: 45, width: 'auto' }}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700, 
                  color: '#c3195d',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                }}
              >
                Pink<span style={{color: '#000000'}}>I</span>nk
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#666666', 
                mb: 2,
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              }}
            >
              Premium quality products and custom journals designed to inspire creativity.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.name}
                  component="a"
                  href={social.url}
                  target="_blank"
                  sx={{
                    color: '#666666',
                    backgroundColor: '#f5f5f5',
                    '&:hover': { 
                      color: '#c3195d', 
                      backgroundColor: '#fce4ec',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2,
                color: '#c3195d',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              }}
            >
              Quick Links
            </Typography>
            <Grid container spacing={1}>
              {quickLinks.map((link) => (
                <Grid size={{ xs: 6 }} key={link.name}>
                  <Link
                    href={link.url}
                    underline="none"
                    sx={{
                      color: '#666666',
                      fontSize: '0.875rem',
                      display: 'block',
                      mb: 1,
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                      transition: 'color 0.3s ease',
                      '&:hover': { color: '#c3195d' },
                    }}
                  >
                    {link.name}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Newsletter - Enhanced Design */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                backgroundColor: '#fafafa',
                borderRadius: '16px',
                border: '1px solid #e0e0e0',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  mb: 1,
                  color: '#c3195d',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                }}
              >
                Stay Updated
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#666666', 
                  mb: 2.5,
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                }}
              >
                Subscribe to get special offers, free giveaways, and exclusive deals.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      '&:hover fieldset': { 
                        borderColor: '#c3195d',
                      },
                      '&.Mui-focused fieldset': { 
                        borderColor: '#c3195d',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputBase-input': { 
                      color: '#141010',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                    flex: 1,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSubscribe}
                  disabled={subscribed}
                  sx={{
                    backgroundColor: '#c3195d',
                    borderRadius: '12px',
                    padding: '8px 24px',
                    textTransform: 'none',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    minWidth: '120px',
                    '&:hover': { 
                      backgroundColor: '#680747',
                      transform: 'translateY(-2px)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {subscribed ? (
                    'Subscribed! ✓'
                  ) : (
                    <>
                      Subscribe <Send sx={{ ml: 1, fontSize: 18 }} />
                    </>
                  )}
                </Button>
              </Box>
              
              {subscribed && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mt: 1.5, 
                    display: 'block', 
                    color: '#4caf50',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    textAlign: 'center',
                  }}
                >
                  Thank you for subscribing! 🎉
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Copyright sx={{ fontSize: 14, color: '#999999' }} />
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#999999',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              }}
            >
              {currentYear} PinkInk. All rights reserved.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link 
              href="/privacy" 
              underline="none" 
              sx={{ 
                color: '#999999', 
                fontSize: '0.7rem', 
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                '&:hover': { color: '#c3195d' },
                transition: 'color 0.3s ease',
              }}
            >
              Privacy
            </Link>
            <Link 
              href="/terms" 
              underline="none" 
              sx={{ 
                color: '#999999', 
                fontSize: '0.7rem', 
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                '&:hover': { color: '#c3195d' },
                transition: 'color 0.3s ease',
              }}
            >
              Terms
            </Link>
            <Link 
              href="/contact" 
              underline="none" 
              sx={{ 
                color: '#999999', 
                fontSize: '0.7rem', 
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                '&:hover': { color: '#c3195d' },
                transition: 'color 0.3s ease',
              }}
            >
              Contact
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;