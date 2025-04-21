document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const modal = document.getElementById('authModal');
    const openModalBtn = document.querySelector('.open-modal-btn');
    const closeBtn = document.querySelector('.close-btn');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchLink = document.getElementById('switchLink');
    const switchText = document.getElementById('switchText');
    const formTitle = document.getElementById('formTitle');
    
    // State variable
    let isLoginForm = true;
    
    // Event Listeners
    openModalBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', handleOutsideClick);
    switchLink.addEventListener('click', toggleForms);
    loginForm.addEventListener('submit', handleLoginSubmit);
    signupForm.addEventListener('submit', handleSignupSubmit);
    
    // Functions
    function openModal() {
        modal.style.display = 'flex';
        showLoginForm();
    }
    
    function closeModal() {
        modal.style.display = 'none';
        clearForms();
    }
    
    function handleOutsideClick(e) {
        if (e.target === modal) {
            closeModal();
        }
    }
    
    function toggleForms() {
        if (isLoginForm) {
            showSignupForm();
        } else {
            showLoginForm();
        }
    }
    
    function showLoginForm() {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
        formTitle.textContent = 'Login';
        switchText.textContent = "Don't have an account?";
        switchLink.textContent = 'Sign up';
        isLoginForm = true;
        clearErrors();
    }
    
    function showSignupForm() {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        formTitle.textContent = 'Sign Up';
        switchText.textContent = "Already have an account?";
        switchLink.textContent = 'Login';
        isLoginForm = false;
        clearErrors();
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
    }
    
    function clearForms() {
        loginForm.reset();
        signupForm.reset();
        clearErrors();
    }
    
    function handleLoginSubmit(e) {
        e.preventDefault();
        clearErrors();
        
        const emailOrUsername = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        let isValid = true;
        
        // Validation
        if (!emailOrUsername) {
            showError('loginEmailError', 'Email or username is required');
            isValid = false;
        }
        
        if (!password) {
            showError('loginPasswordError', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('loginPasswordError', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (isValid) {
            // In a real app, you would send this to your backend
            console.log('Login attempt with:', { emailOrUsername, password });
            alert('Login successful! (This is a demo)');
            closeModal();
        }
    }
    
    function handleSignupSubmit(e) {
        e.preventDefault();
        clearErrors();
        
        const username = document.getElementById('signupUsername').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();
        let isValid = true;
        
        // Validation
        if (!username) {
            showError('signupUsernameError', 'Username is required');
            isValid = false;
        } else if (username.length < 3) {
            showError('signupUsernameError', 'Username must be at least 3 characters');
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            showError('signupUsernameError', 'Only letters, numbers and underscores allowed');
            isValid = false;
        }
        
        if (!email) {
            showError('signupEmailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('signupEmailError', 'Please enter a valid email');
            isValid = false;
        }
        
        if (!password) {
            showError('signupPasswordError', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('signupPasswordError', 'Password must be at least 6 characters');
            isValid = false;
        }
        
        if (password !== confirmPassword) {
            showError('signupConfirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (isValid) {
            // In a real app, you would send this to your backend
            const userData = { username, email, password };
            console.log('Signup data:', userData);
            alert('Account created successfully! (This is a demo)');
            closeModal();
        }
    }
    
    // Helper functions
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});