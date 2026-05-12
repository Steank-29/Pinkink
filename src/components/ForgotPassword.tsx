import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Email, ArrowBack } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/PinkInk.jpg';

const ForgotPassword: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError('Please enter your email address');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setEmailError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log('Password reset email sent to:', email);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 85px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode ? '#141010' : '#f2f9f1',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: '24px',
            backgroundColor: isDarkMode ? '#1e1a1a' : '#ffffff',
            border: `1px solid ${isDarkMode ? '#680747' : '#e0e0e0'}`,
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
          {/* Back to Login Link */}
          <Link
            href="/login"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: '#c3195d',
              textDecoration: 'none',
              mb: 3,
              '&:hover': { color: '#680747' },
            }}
          >
            <ArrowBack sx={{ fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
              Back to Login
            </Typography>
          </Link>

          {/* Logo and Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src={logo}
              alt="PinkInk Logo"
              sx={{ height: 70, width: 'auto', mb: 2 }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#c3195d',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                mb: 1,
              }}
            >
              Reset Password
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? '#b0b0b0' : '#666666',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              }}
            >
              Enter your email to receive a reset link
            </Typography>
          </Box>

          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: '#c3195d' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
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
                  '&:disabled': {
                    backgroundColor: '#999',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Alert 
                severity="success" 
                sx={{ 
                  mb: 3, 
                  borderRadius: '12px',
                  '& .MuiAlert-message': {
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  }
                }}
              >
                Password reset link has been sent to your email!
              </Alert>
              <Typography
                variant="body2"
                sx={{
                  color: isDarkMode ? '#b0b0b0' : '#666666',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  mb: 3,
                }}
              >
                Please check your inbox and follow the instructions to reset your password.
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  textTransform: 'none',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  borderColor: '#c3195d',
                  color: '#c3195d',
                  '&:hover': {
                    borderColor: '#680747',
                    backgroundColor: 'rgba(195, 25, 93, 0.05)',
                  },
                }}
              >
                Try Another Email
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;