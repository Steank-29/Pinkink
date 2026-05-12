import React, { useState } from 'react';
import {
  Box,
  Container,
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
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Avatar,
  CircularProgress,
  Grid,
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  Google,
  CloudUpload,
  CalendarToday,
  Wc,
} from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import logo from '../assets/PinkEmra.png';

const SignUp: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const { name, value } = event.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  let hasError = false;
  const newErrors = { 
    name: '', 
    email: '', 
    dateOfBirth: '',
    gender: '',
    password: '', 
    confirmPassword: '' 
  };

  if (!formData.name) {
    newErrors.name = 'Full name is required';
    hasError = true;
  }

  if (!formData.email) {
    newErrors.email = 'Email address is required';
    hasError = true;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address';
    hasError = true;
  }

  if (!formData.dateOfBirth) {
    newErrors.dateOfBirth = 'Date of birth is required';
    hasError = true;
  }

  if (!formData.gender) {
    newErrors.gender = 'Please select your gender';
    hasError = true;
  }

  if (!formData.password) {
    newErrors.password = 'Password is required';
    hasError = true;
  } else if (formData.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
    hasError = true;
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = 'Please confirm your password';
    hasError = true;
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
    hasError = true;
  }

  if (!agreeTerms) {
    setSignupError('You must agree to the Terms and Conditions');
    hasError = true;
  }

  setErrors(newErrors);

  if (!hasError) {
    setSignupError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSignupSuccess(true);
      console.log('Account created:', { ...formData, profileImage });
    }, 2000);
  }
};

const handleGoogleSignUp = () => {
  console.log('Sign up with Google');
};

  if (signupSuccess) {
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
          <Box sx={{ textAlign: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="PinkInk Logo"
              sx={{ height: 80, width: 'auto', mb: 3 }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: '#ed186d',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                mb: 2,
              }}
            >
              Account Created! 🎉
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: isDarkMode ? '#b0b0b0' : '#666666',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                mb: 3,
              }}
            >
              Welcome to PinkInk! Your account has been successfully created.
            </Typography>
            <Button
              fullWidth
              variant="contained"
              href="/login"
              sx={{
                backgroundColor: '#ed186d',
                borderRadius: '12px',
                py: 1.5,
                textTransform: 'none',
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                fontWeight: 600,
                '&:hover': { backgroundColor: '#680747' },
              }}
            >
              Sign In to Your Account
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 85px)',
        display: 'flex',
        alignItems: 'center',
        backgroundColor:  '#ffffff',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>
          {/* Left Side - Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#ed186d',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    mb: 1,
                  }}
                >
                  Create Account
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? '#b0b0b0' : '#666666',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  }}
                >
                  Join PinkInk and start your creative journey
                </Typography>
              </Box>

              {/* Error Alert */}
              {signupError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                  {signupError}
                </Alert>
              )}

              {/* Profile Image Upload */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={profileImage || undefined}
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: '#ed186d',
                      border: '3px solid #ed186d',
                    }}
                  >
                    {!profileImage && <Person sx={{ fontSize: 40 }} />}
                  </Avatar>
                  <IconButton
                    component="label"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: '#ed186d',
                      color: 'white',
                      '&:hover': { backgroundColor: '#680747' },
                      width: 28,
                      height: 28,
                    }}
                  >
                    <CloudUpload sx={{ fontSize: 16 }} />
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </IconButton>
                </Box>
              </Box>

              {/* Sign Up Form - Two Columns */}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Full Name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      sx={{
                        mb: 0,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '&:hover fieldset': { borderColor: '#ed186d' },
                          '&.Mui-focused fieldset': { borderColor: '#ed186d' },
                        },
                        '& .MuiInputLabel-root': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                        '& .MuiInputBase-input': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Person sx={{ color: '#ed186d', fontSize: 18 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      sx={{
                        mb: 0,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '&:hover fieldset': { borderColor: '#ed186d' },
                          '&.Mui-focused fieldset': { borderColor: '#ed186d' },
                        },
                        '& .MuiInputLabel-root': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                        '& .MuiInputBase-input': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: '#ed186d', fontSize: 18 }} />
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Date of Birth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      error={!!errors.dateOfBirth}
                      helperText={errors.dateOfBirth}
                      sx={{
                        mb: 0,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '&:hover fieldset': { borderColor: '#ed186d' },
                          '&.Mui-focused fieldset': { borderColor: '#ed186d' },
                        },
                        '& .MuiInputLabel-root': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                        '& .MuiInputBase-input': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarToday sx={{ color: '#ed186d', fontSize: 18 }} />
                            </InputAdornment>
                          ),
                        },
                        inputLabel: { shrink: true }
                      }}
                      
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl 
                      fullWidth 
                      size="small"
                      error={!!errors.gender}
                      sx={{ mb: 0 }}
                    >
                      <InputLabel sx={{ fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' }}>
                        Gender
                      </InputLabel>
<Select
  name="gender"
  value={formData.gender}
  onChange={(e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  }}
  label="Gender"
  sx={{
    borderRadius: '10px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ed186d',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ed186d',
    },
    '& .MuiSelect-select': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
  }}
  startAdornment={
    <InputAdornment position="start">
      <Wc sx={{ color: '#ed186d', fontSize: 18, ml: 0.5 }} />
    </InputAdornment>
  }
>
  <MenuItem value="" disabled>Select gender</MenuItem>
  <MenuItem value="female">Female</MenuItem>
  <MenuItem value="male">Male</MenuItem>
</Select>
                      {errors.gender && (
                        <FormHelperText sx={{ fontFamily: "'Comic Sans MS', 'Comic Neue', cursive" }}>
                          {errors.gender}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={handleInputChange}
                      error={!!errors.password}
                      helperText={errors.password}
                      sx={{
                        mb: 0,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '&:hover fieldset': { borderColor: '#ed186d' },
                          '&.Mui-focused fieldset': { borderColor: '#ed186d' },
                        },
                        '& .MuiInputLabel-root': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                        '& .MuiInputBase-input': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#ed186d', fontSize: 18 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword}
                      sx={{
                        mb: 0,
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '10px',
                          '&:hover fieldset': { borderColor: '#ed186d' },
                          '&.Mui-focused fieldset': { borderColor: '#ed186d' },
                        },
                        '& .MuiInputLabel-root': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                        '& .MuiInputBase-input': { fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.85rem' },
                      }}
                      slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#ed186d', fontSize: 18 }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                                {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <FormControlLabel
                  control={
                    <Checkbox
                      size="small"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      sx={{
                        color: '#ed186d',
                        '&.Mui-checked': { color: '#ed186d' },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontFamily: "'Comic Sans MS', 'Comic Neue', cursive", fontSize: '0.8rem' }}>
                      I agree to the{' '}
                      <Link href="/terms" sx={{ color: '#ed186d' }}>
                        Terms and Conditions
                      </Link>
                    </Typography>
                  }
                  sx={{ mt: 2, mb: 2 }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    backgroundColor: '#0a0a0a',
                    borderRadius: '10px',
                    py: 1,
                    textTransform: 'none',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    mb: 2,
                    '&:hover': {
                      backgroundColor: '#ed186d',
                      transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? <CircularProgress size={20} color="inherit" /> : 'Create Account'}
                </Button>
              </form>

              {/* Divider */}
              <Divider sx={{ my: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: isDarkMode ? '#b0b0b0' : '#999999',
                    px: 2,
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    fontSize: '0.7rem',
                  }}
                >
                  OR SIGN UP WITH
                </Typography>
              </Divider>

              {/* Google Sign Up Button */}
              <Button
                fullWidth
                variant="outlined"
                size="small"
                onClick={handleGoogleSignUp}
                sx={{
                  borderRadius: '10px',
                  py: 1,
                  textTransform: 'none',
                  fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                  fontSize: '0.85rem',
                  borderColor: '#e0e0e0',
                  color: isDarkMode ? '#ffffff' : '#141010',
                  mb: 2,
                  '&:hover': {
                    borderColor: '#ed186d',
                    backgroundColor: 'rgba(195, 25, 93, 0.05)',
                  },
                }}
                startIcon={<Google />}
              >
                Continue with Google
              </Button>

              {/* Sign In Link */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: isDarkMode ? '#b0b0b0' : '#666666',
                    fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                    fontSize: '0.8rem',
                  }}
                >
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    underline="hover"
                    sx={{
                      color: '#ed186d',
                      fontWeight: 600,
                      cursor: 'pointer',
                      '&:hover': { color: '#680747' },
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Just Logo with Animation, No Background */}
          <Grid 
            size={{ xs: 12, md: 6 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="PinkInk Logo"
              sx={{
                width: '100%',
                maxWidth: 450,
                height: 'auto',
                filter: 'drop-shadow(0 8px 32px rgba(195, 25, 93, 0.15))',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-15px)' },
                  '100%': { transform: 'translateY(0px)' },
                },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignUp;