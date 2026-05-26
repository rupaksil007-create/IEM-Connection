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
      signup_title: 'Create an Account',
      signup_subtitle: 'Join the IEM Connector platform to explore events, teams, and resources.',
      login_link_text: 'Already have an account? Login'
    };

    let config = { ...defaultConfig };

    function applyConfig(updatedConfig) {
      config = { ...config, ...updatedConfig };
      
      const signupTitle = document.getElementById('signupTitle');
      const signupSubtitle = document.getElementById('signupSubtitle');
      const platformName = document.getElementById('navPlatformName');
      const loginText = document.getElementById('loginText');

      if (signupTitle) signupTitle.textContent = config.signup_title || defaultConfig.signup_title;
      if (signupSubtitle) signupSubtitle.textContent = config.signup_subtitle || defaultConfig.signup_subtitle;
      if (platformName) platformName.textContent = config.platform_name || defaultConfig.platform_name;
      if (loginText) loginText.textContent = config.login_link_text.split('?')[0].trim() || "Already have an account?";

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
          ['signup_title', cfg.signup_title || defaultConfig.signup_title],
          ['signup_subtitle', cfg.signup_subtitle || defaultConfig.signup_subtitle],
          ['login_link_text', cfg.login_link_text || defaultConfig.login_link_text]
        ])
      });
    }

    // Password Visibility Toggle
    function togglePasswordVisibility(fieldId, iconId) {
      const field = document.getElementById(fieldId);
      const icon = document.getElementById(iconId);
      
      if (field.type === 'password') {
        field.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
      } else {
        field.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
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

    function validateName(name) {
      return name.trim().length >= 2;
    }

    // Handle Signup
    function handleSignup(event) {
      event.preventDefault();
      
      const fullName = document.getElementById('fullName').value;
      const email = document.getElementById('email').value;
      const department = document.getElementById('department').value;
      const year = document.getElementById('year').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      // Clear previous errors
      document.getElementById('nameError').classList.add('hidden');
      document.getElementById('emailError').classList.add('hidden');
      document.getElementById('departmentError').classList.add('hidden');
      document.getElementById('yearError').classList.add('hidden');
      document.getElementById('passwordError').classList.add('hidden');
      document.getElementById('confirmPasswordError').classList.add('hidden');

      let isValid = true;

      // Validate Name
      if (!validateName(fullName)) {
        document.getElementById('nameError').textContent = 'Please enter a valid full name';
        document.getElementById('nameError').classList.remove('hidden');
        isValid = false;
      }

      // Validate Email
      if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid college email (example@college.edu)';
        document.getElementById('emailError').classList.remove('hidden');
        isValid = false;
      }

      // Validate Department
      if (!department) {
        document.getElementById('departmentError').textContent = 'Please select a department';
        document.getElementById('departmentError').classList.remove('hidden');
        isValid = false;
      }

      // Validate Year
      if (!year) {
        document.getElementById('yearError').textContent = 'Please select your academic year';
        document.getElementById('yearError').classList.remove('hidden');
        isValid = false;
      }

      // Validate Password
      if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long';
        document.getElementById('passwordError').classList.remove('hidden');
        isValid = false;
      }

      // Validate Password Confirmation
      if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        document.getElementById('confirmPasswordError').classList.remove('hidden');
        isValid = false;
      }

      if (isValid) {
        // Show success notification
        showNotification('✓ Account created successfully! Redirecting...');
        
        // Simulate signup delay and redirect
        setTimeout(() => {
          // In a real application, you would send credentials to your backend
          console.log('Signup attempt:', { fullName, email, department, year, password });
          // Redirect to dashboard or login
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

    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9dc54910c19e94b3',t:'MTc3MzUxMjM1NC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
