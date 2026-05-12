import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Google,
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/PinkInk.jpg';

const Login: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log('Login attempted with:', { email, password, rememberMe });
      setLoginError('');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Login with Google');
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 85px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: '24px',
            mt: { xs:10, md: 0 },
            backgroundColor: '#ffffff',
            border: `1px solid ${isDarkMode ? '#680747' : '#e0e0e0'}`,
            boxShadow: isDarkMode 
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(0,0,0,0.08)',
          }}
        >
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
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? '#b0b0b0' : '#666666',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              }}
            >
              Sign in to continue to your account
            </Typography>
          </Box>

          {/* Error Alert */}
          {loginError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
              {loginError}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              placeholder="Pinkink_By_Emra@pinkink.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
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

            <TextField
              fullWidth
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                mb: 1.5,
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
                      <Lock sx={{ color: '#c3195d' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: '#c3195d',
                      '&.Mui-checked': {
                        color: '#c3195d',
                      },
                    }}
                  />
                }
                label="Remember me"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    color: isDarkMode ? '#b0b0b0' : '#666666',
                  },
                }}
              />
              <Link
                href="/forgot-password"
                underline="hover"
                sx={{
                  color: '#c3195d',
                  fontSize: '0.875rem',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  cursor: 'pointer',
                  '&:hover': { color: '#680747' },
                }}
              >
                Forgot password?
              </Link>
            </Box>

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
                mb: 2,
                '&:hover': {
                  backgroundColor: '#680747',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography
              variant="caption"
              sx={{
                color: isDarkMode ? '#b0b0b0' : '#999999',
                px: 2,
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              }}
            >
              OR CONTINUE WITH
            </Typography>
          </Divider>

          {/* Google Sign In Button */}
          <Button
            fullWidth
            variant="outlined"
            onClick={handleGoogleLogin}
            sx={{
              borderRadius: '12px',
              py: 1.5,
              textTransform: 'none',
              fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              borderColor: '#e0e0e0',
              color: isDarkMode ? '#ffffff' : '#141010',
              mb: 3,
              '&:hover': {
                borderColor: '#c3195d',
                backgroundColor: 'rgba(195, 25, 93, 0.05)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
            startIcon={<Google />}
          >
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: isDarkMode ? '#b0b0b0' : '#666666',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
              }}
            >
              Don't have an account?{' '}
              <Link
                href="/signup"
                underline="hover"
                sx={{
                  color: '#c3195d',
                  fontWeight: 600,
                  cursor: 'pointer',
                  '&:hover': { color: '#680747' },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;