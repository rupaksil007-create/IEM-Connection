   // Element SDK Configuration
    const defaultConfig = {
      background_color: '#000000',
      card_color: '#111111',
      text_color: '#ffffff',
      secondary_text_color: '#cccccc',
      accent_color: '#ffffff',
      font_family: 'Outfit',
      font_size: 14,
      platform_name: 'IEM Connector',
      login_title: 'Login to IEM Connector',
      login_subtitle: 'Access events, teams, and resources.',
      signup_link_text: "Don't have an account? Sign Up",
      forgot_password_text: 'Forgot Password?'
    };

    let config = { ...defaultConfig };

    function applyConfig(updatedConfig) {
      config = { ...config, ...updatedConfig };
      
      const loginTitle = document.getElementById('loginTitle');
      const loginSubtitle = document.getElementById('loginSubtitle');
      const platformName = document.getElementById('navPlatformName');
      const forgotPasswordLink = document.getElementById('forgotPasswordLink');
      const signupText = document.getElementById('signupText');

      if (loginTitle) loginTitle.textContent = config.login_title || defaultConfig.login_title;
      if (loginSubtitle) loginSubtitle.textContent = config.login_subtitle || defaultConfig.login_subtitle;
      if (platformName) platformName.textContent = config.platform_name || defaultConfig.platform_name;
      if (forgotPasswordLink) forgotPasswordLink.textContent = config.forgot_password_text || defaultConfig.forgot_password_text;
      if (signupText) signupText.textContent = config.signup_link_text.split('?')[0].trim() || "Don't have an account?";

      const font = config.font_family || defaultConfig.font_family;
      const baseSize = config.font_size || defaultConfig.font_size;
      document.body.style.fontFamily = `${font}, sans-serif`;
      document.body.style.fontSize = `${baseSize}px`;

      document.body.style.background = config.background_color || defaultConfig.background_color;
      document.body.style.color = config.text_color || defaultConfig.text_color;

      document.querySelectorAll('[style*="background:#111"]').forEach(el => {
        el.style.background = config.card_color || defaultConfig.card_color;
      });
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (updatedConfig) => { applyConfig(updatedConfig); },
        mapToCapabilities: (cfg) => ({
          recolorables: [
            { 
              get: () => cfg.background_color || defaultConfig.background_color, 
              set: (v) => { cfg.background_color = v; window.elementSdk.setConfig({ background_color: v }); } 
            },
            { 
              get: () => cfg.card_color || defaultConfig.card_color, 
              set: (v) => { cfg.card_color = v; window.elementSdk.setConfig({ card_color: v }); } 
            },
            { 
              get: () => cfg.text_color || defaultConfig.text_color, 
              set: (v) => { cfg.text_color = v; window.elementSdk.setConfig({ text_color: v }); } 
            },
            { 
              get: () => cfg.secondary_text_color || defaultConfig.secondary_text_color, 
              set: (v) => { cfg.secondary_text_color = v; window.elementSdk.setConfig({ secondary_text_color: v }); } 
            },
            { 
              get: () => cfg.accent_color || defaultConfig.accent_color, 
              set: (v) => { cfg.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); } 
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => cfg.font_family || defaultConfig.font_family,
            set: (v) => { cfg.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
          },
          fontSizeable: {
            get: () => cfg.font_size || defaultConfig.font_size,
            set: (v) => { cfg.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
          }
        }),
        mapToEditPanelValues: (cfg) => new Map([
          ['platform_name', cfg.platform_name || defaultConfig.platform_name],
          ['login_title', cfg.login_title || defaultConfig.login_title],
          ['login_subtitle', cfg.login_subtitle || defaultConfig.login_subtitle],
          ['signup_link_text', cfg.signup_link_text || defaultConfig.signup_link_text],
          ['forgot_password_text', cfg.forgot_password_text || defaultConfig.forgot_password_text]
        ])
      });
    }

    // Password Visibility Toggle
    function togglePasswordVisibility() {
      const passwordInput = document.getElementById('password');
      const eyeIcon = document.getElementById('eyeIcon');
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
      } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
      }
      lucide.createIcons();
    }

    // Form Validation
    function validateEmail(email) {
      const collegeEmailRegex = /@college\.edu$/i;
      return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) && collegeEmailRegex.test(email);
    }

    function validatePassword(password) {
      return password.length >= 6;
    }

    // Handle Login
    function handleLogin(event) {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const emailError = document.getElementById('emailError');
      const passwordError = document.getElementById('passwordError');

      // Clear previous errors
      emailError.classList.add('hidden');
      passwordError.classList.add('hidden');

      let isValid = true;

      // Validate Email
      if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid college email (example@college.edu)';
        emailError.classList.remove('hidden');
        isValid = false;
      }

      // Validate Password
      if (!validatePassword(password)) {
        passwordError.textContent = 'Password must be at least 6 characters long';
        passwordError.classList.remove('hidden');
        isValid = false;
      }

      if (isValid) {
        // Show success notification
        showNotification('✓ Login successful! Redirecting...');
        
        // Simulate login delay and redirect
        setTimeout(() => {
          // In a real application, you would send credentials to your backend
          console.log('Login attempt:', { email, password });
          // Redirect to dashboard
          // window.location.href = '/dashboard';
        }, 1500);
      }
    }

    // Show Notification
    function showNotification(message) {
      const notif = document.createElement('div');
      notif.className = 'success-notification';
      notif.textContent = message;
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 3000);
    }

    // Initialize
    lucide.createIcons();
    applyConfig(defaultConfig);

    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9dc51bb8a3016ed7',t:'MTc3MzUxMDQ5Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
