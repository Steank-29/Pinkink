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
} from '@mui/material';
import { Email, Phone, LocationOn } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 85px)',
        backgroundColor: isDarkMode ? '#141010' : '#f2f9f1',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            color: '#c3195d',
            fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
            textAlign: 'center',
            mb: 1,
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
            mb: 6,
          }}
        >
          We'd love to hear from you
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '16px',
                backgroundColor: isDarkMode ? '#1e1a1a' : '#ffffff',
                height: '100%',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#c3195d',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  mb: 3,
                }}
              >
                Get in Touch
              </Typography>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ color: '#c3195d' }} />
                  <Typography
                    sx={{
                      color: isDarkMode ? '#b0b0b0' : '#666666',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    }}
                  >
                    hello@pinkink.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone sx={{ color: '#c3195d' }} />
                  <Typography
                    sx={{
                      color: isDarkMode ? '#b0b0b0' : '#666666',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    }}
                  >
                    +1 (888) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ color: '#c3195d' }} />
                  <Typography
                    sx={{
                      color: isDarkMode ? '#b0b0b0' : '#666666',
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    }}
                  >
                    123 Luxury Avenue, Beverly Hills, CA 90210
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '16px',
                backgroundColor: isDarkMode ? '#1e1a1a' : '#ffffff',
              }}
            >
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
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#c3195d',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#c3195d',
                      },
                    },
                    '& .MuiInputLabel-root': {
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
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#c3195d',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#c3195d',
                      },
                    },
                    '& .MuiInputLabel-root': {
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
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#c3195d',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#c3195d',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    },
                  }}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: '#c3195d',
                    borderRadius: '12px',
                    py: 1.5,
                    textTransform: 'none',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: '#680747',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;