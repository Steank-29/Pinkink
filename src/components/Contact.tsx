import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Stack,
  Link,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material';
import { Email, Phone, LocationOn, Send, AccessTime } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setSnackbar({ open: true, message: 'Please enter a valid email address', severity: 'error' });
      return;
    }
    console.log('Form submitted:', formData);
    setSnackbar({ open: true, message: 'Message sent successfully! We\'ll get back to you soon.', severity: 'success' });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <Email sx={{ color: '#ed186d', fontSize: { xs: 22, sm: 24 } }} />,
      label: 'Email Us',
      value: 'hello@pinkink.com',
      href: 'mailto:hello@pinkink.com',
      color: '#ed186d',
    },
    {
      icon: <Phone sx={{ color: '#ed186d', fontSize: { xs: 22, sm: 24 } }} />,
      label: 'Call Us',
      value: '+216 12 345 678',
      href: 'tel:+21612345678',
      color: '#ed186d',
    },
    {
      icon: <LocationOn sx={{ color: '#ed186d', fontSize: { xs: 22, sm: 24 } }} />,
      label: 'Visit Us',
      value: 'Tunis, Tunis',
      href: 'https://maps.google.com/?q=Tunis,Tunisia',
      color: '#ed186d',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 85px)',
        backgroundColor:'#ffffff',
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ed186d 0%, #ff6b9d 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
            textAlign: 'center',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            mb: 1,
            mt: { xs: 10, md: 0 },
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: isDarkMode ? '#b0b0b0' : '#666666',
            fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
            textAlign: 'center',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            mb: { xs: 4, sm: 5, md: 6 },
          }}
        >
          We'd love to hear from you ✨
        </Typography>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Contact Form - FIRST on mobile */}
          <Grid size={{ xs: 12, md: 7 }} >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: '24px',
                backgroundColor:  '#ffffff',
                border: `1px solid ${isDarkMode ? '#680747' : '#ffe0e0'}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 20px 40px rgba(237, 24, 109, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#ed186d',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  mb: { xs: 2.5, sm: 3 },
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Send sx={{ fontSize: { xs: 20, sm: 24 } }} />
                Send us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px',
                      backgroundColor: isDarkMode ? '#2a1a20' : '#fff',
                      '&:hover fieldset': {
                        borderColor: '#ed186d',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ed186d',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 2.5,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px',
                      backgroundColor: isDarkMode ? '#2a1a20' : '#fff',
                      '&:hover fieldset': {
                        borderColor: '#ed186d',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ed186d',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '14px',
                      backgroundColor: isDarkMode ? '#2a1a20' : '#fff',
                      '&:hover fieldset': {
                        borderColor: '#ed186d',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ed186d',
                        borderWidth: '2px',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                    '& .MuiInputBase-input': {
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                  }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                    borderRadius: '14px',
                    py: { xs: 1.2, sm: 1.5 },
                    textTransform: 'none',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    fontWeight: 700,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
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
                      background: 'linear-gradient(135deg, #ed186d 0%, #ff6b9d 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(237, 24, 109, 0.4)',
                      '&::before': {
                        left: '100%',
                      },
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* Contact Info - SECOND on mobile */}
          <Grid size={{ xs: 12, md: 5 }} >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, sm: 3, md: 4 },
                borderRadius: '24px',
                backgroundColor: '#ffffff',
                border: `1px solid ${isDarkMode ? '#680747' : '#ffe0e0'}`,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 20px 40px rgba(237, 24, 109, 0.15)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: '#ed186d',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  mb: { xs: 2.5, sm: 3 },
                }}
              >
                Get in Touch
              </Typography>
              <Stack spacing={{ xs: 2.5, sm: 3 }}>
                {contactInfo.map((info, index) => (
                  <Link
                    key={index}
                    href={info.href}
                    target={info.label === 'Visit Us' ? '_blank' : '_self'}
                    rel={info.label === 'Visit Us' ? 'noopener noreferrer' : undefined}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      textDecoration: 'none',
                      p: 1.5,
                      borderRadius: '16px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: isDarkMode ? 'rgba(237, 24, 109, 0.1)' : '#fdf0f0',
                        transform: 'translateX(8px)',
                      },
                    }}
                  >
                    {info.icon}
                    <Box>
                      <Typography
                        sx={{
                          color: isDarkMode ? '#999' : '#888',
                          fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {info.label}
                      </Typography>
                      <Typography
                        sx={{
                          color: isDarkMode ? '#ffffff' : '#141010',
                          fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          fontWeight: 500,
                          '&:hover': {
                            color: '#ed186d',
                          },
                        }}
                      >
                        {info.value}
                      </Typography>
                    </Box>
                  </Link>
                ))}

                {/* Business Hours */}
                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: '16px',
                    background: isDarkMode ? 'rgba(237, 24, 109, 0.1)' : '#fdf0f0',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <AccessTime sx={{ color: '#ed186d', fontSize: 20 }} />
                    <Typography
                      sx={{
                        fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                        fontWeight: 700,
                        color: '#ed186d',
                        fontSize: '0.85rem',
                      }}
                    >
                      Business Hours
                    </Typography>
                  </Box>
                  <Stack spacing={0.5}>
                    <Typography sx={{ fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", color: isDarkMode ? '#b0b0b0' : '#666', fontSize: '0.75rem' }}>
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </Typography>
                    <Typography sx={{ fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", color: isDarkMode ? '#b0b0b0' : '#666', fontSize: '0.75rem' }}>
                      Saturday: 10:00 AM - 4:00 PM
                    </Typography>
                    <Typography sx={{ fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", color: isDarkMode ? '#b0b0b0' : '#666', fontSize: '0.75rem' }}>
                      Sunday: Closed
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Map Section */}
        <Box
          sx={{
            mt: { xs: 4, sm: 5, md: 6 },
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.01)',
              boxShadow: '0 12px 32px rgba(237, 24, 109, 0.15)',
            },
          }}
        >
          <iframe
            title="PinkInk Location - Tunis, Tunisia"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d204158.77412129573!2d10.0631231!3d36.8065141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd337f5e7ef933%3A0x8e7f5b7e5b7e5b7e!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height={isMobile ? 250 : 350}
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            borderRadius: '14px',
            fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;