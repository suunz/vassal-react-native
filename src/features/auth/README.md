# Authentication Feature

This feature provides a complete authentication system with login and signup screens following Material 3 design guidelines.

## Features

### 🔐 **Login Screen**
- **Material 3 Design**: Clean, modern interface following Google's Material 3 guidelines
- **Form Validation**: Real-time email and password validation
- **Demo Account**: Quick access with pre-filled demo credentials
- **Password Visibility**: Toggle to show/hide password
- **Loading States**: Smooth loading indicators during authentication
- **Error Handling**: User-friendly error messages with retry options

### 📝 **Sign Up Screen**
- **Complete Registration**: Name, email, password, and confirmation fields
- **Password Strength**: Real-time password strength indicator
- **Form Validation**: Comprehensive validation with helpful error messages
- **Terms Acceptance**: Checkbox for terms and conditions
- **Security Note**: Visual security assurance for users
- **Responsive Design**: Adapts to different screen sizes

### 🎨 **Material 3 Design Elements**
- **Elevated Cards**: Modern card-based layout
- **Outlined Text Inputs**: Clean input fields with icons
- **Contained Buttons**: Primary action buttons with loading states
- **Typography**: Consistent text hierarchy using Material 3 variants
- **Color System**: Proper use of Material 3 color tokens
- **Spacing**: Consistent spacing following Material 3 guidelines

## Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: `demo@example.com`
- **Password**: `password`

## Architecture

### Domain Layer
- **entities/User.ts**: User entity and authentication data types

### Presentation Layer
- **screens/LoginScreen.tsx**: Login interface with Material 3 design
- **screens/SignUpScreen.tsx**: Registration interface with validation
- **slices/authSlice.ts**: Redux state management for authentication
- **components/AuthWrapper.tsx**: Authentication initialization wrapper

## State Management

The authentication slice includes:
- `login`: Async thunk for user authentication
- `signUp`: Async thunk for user registration
- `logout`: Async thunk for user logout
- `clearError`: Action to clear error messages
- `setInitialized`: Action to mark auth as initialized
- `resetAuth`: Action to reset authentication state

## Form Validation

### Login Form
- Email format validation
- Password minimum length (6 characters)
- Real-time error clearing

### Sign Up Form
- Name minimum length (2 characters)
- Email format validation
- Password strength requirements (uppercase, lowercase, number)
- Password confirmation matching
- Terms and conditions acceptance

## Security Features

- Password visibility toggle
- Secure password requirements
- Form validation to prevent invalid submissions
- Error handling for network issues
- Loading states to prevent multiple submissions

## Navigation Flow

1. **App Start** → Login Screen
2. **Login Success** → Home Screen
3. **Sign Up Link** → Sign Up Screen
4. **Sign Up Success** → Home Screen
5. **Logout** → Login Screen

## Material 3 Components Used

- `Card` with elevated mode
- `TextInput` with outlined mode and icons
- `Button` with contained and text modes
- `Checkbox` for terms acceptance
- `Snackbar` for error messages
- `ActivityIndicator` for loading states
- `Divider` for visual separation
- Material 3 typography variants

## Future Enhancements

- [ ] Biometric authentication
- [ ] Social login (Google, Apple)
- [ ] Password reset functionality
- [ ] Email verification
- [ ] Remember me functionality
- [ ] AsyncStorage integration for persistence
- [ ] Real API integration
- [ ] Multi-factor authentication