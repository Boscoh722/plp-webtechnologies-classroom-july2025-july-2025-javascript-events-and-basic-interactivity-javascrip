// Selecting form and input elements
const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePassword = document.getElementById('togglePassword');
const successModal = document.getElementById('successModal');
const closeModalBtn = document.getElementById('closeModal');

// Validation functions with regex
function validateName(name) {
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  if (!name) return 'Name is required';
  if (!nameRegex.test(name)) return 'Name must be 2-50 characters, letters only';
  return '';
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Enter a valid email address';
  return '';
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!password) return 'Password is required';
  if (!passwordRegex.test(password)) return 'Password must be at least 8 characters, include uppercase, lowercase, and a number';
  return '';
}

function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return 'Confirm password is required';
  if (password !== confirmPassword) return 'Passwords do not match';
  return '';
}

// Display error messages
function showError(inputId, message) {
  const errorElement = document.getElementById(`${inputId}Error`);
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
}

// Clear error messages
function clearError(inputId) {
  const errorElement = document.getElementById(`${inputId}Error`);
  errorElement.textContent = '';
  errorElement.classList.add('hidden');
}

// Interactive Feature 1: Real-time validation on input
function validateInputOnType(input, validateFn, relatedInput = null) {
  input.addEventListener('input', () => {
    const value = input.value.trim();
    const error = relatedInput ? validateFn(value, relatedInput.value.trim()) : validateFn(value);
    if (error) {
      showError(input.id, error);
      input.classList.add('border-red-500');
      input.classList.remove('border-green-500');
    } else {
      clearError(input.id);
      input.classList.remove('border-red-500');
      input.classList.add('border-green-500');
    }
  });
}

// Apply real-time validation
validateInputOnType(nameInput, validateName);
validateInputOnType(emailInput, validateEmail);
validateInputOnType(passwordInput, validatePassword);
validateInputOnType(confirmPasswordInput, validateConfirmPassword, passwordInput);

// Interactive Feature 2: Toggle password visibility
togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.classList.toggle('bi-eye', !isPassword);
  togglePassword.classList.toggle('bi-eye-slash', isPassword);
});

// Form submission handler
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default submission

  // Validate all fields
  const nameError = validateName(nameInput.value.trim());
  const emailError = validateEmail(emailInput.value.trim());
  const passwordError = validatePassword(passwordInput.value.trim());
  const confirmPasswordError = validateConfirmPassword(passwordInput.value.trim(), confirmPasswordInput.value.trim());

  // Show errors if any
  if (nameError || emailError || passwordError || confirmPasswordError) {
    if (nameError) showError('name', nameError);
    else clearError('name');
    if (emailError) showError('email', emailError);
    else clearError('email');
    if (passwordError) showError('password', passwordError);
    else clearError('password');
    if (confirmPasswordError) showError('confirmPassword', confirmPasswordError);
    else clearError('confirmPassword');
    return;
  }

  // Clear all errors and show success modal
  clearError('name');
  clearError('email');
  clearError('password');
  clearError('confirmPassword');
  successModal.classList.remove('hidden');

  // Reset form
  form.reset();
  nameInput.classList.remove('border-green-500');
  emailInput.classList.remove('border-green-500');
  passwordInput.classList.remove('border-green-500');
  confirmPasswordInput.classList.remove('border-green-500');
});

// Close success modal
closeModalBtn.addEventListener('click', () => {
  successModal.classList.add('hidden');
});