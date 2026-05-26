document.addEventListener('DOMContentLoaded', async () => {
    const marketplaceContainer = document.getElementById('marketplace-container');
    const sellForm = document.getElementById('sell-product-form');

    if (marketplaceContainer) {
        try {
            const response = await fetch('/api/marketplace');
            const items = await response.json();

            marketplaceContainer.innerHTML = items.map(item => `
                <div class="card">
                    <h3>${item.product_name}</h3>
                    ${item.image_url ? `<img src="${item.image_url}" alt="${item.product_name}">` : ''}
                    <p><strong>Price:</strong> $${item.price}</p>
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p>${item.description}</p>
                    <button onclick="alert('Contact seller for ${item.product_name}')">Buy Now</button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Failed to load marketplace', error);
        }
    }

    if (sellForm) {
        sellForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(sellForm);
            const data = Object.fromEntries(formData.entries());
            
            const user = JSON.parse(localStorage.getItem('user'));
            data.seller_id = user.id;

            try {
                const response = await fetch('/api/post-product', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Product listed!');
                    window.location.reload();
                } else {
                    alert('Failed to list product');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});

    // Sample Products Data
    const sampleProducts = [
      { 
 id: 1,
 name: 'Engineering Drawing Tools Set',
 price: 700,
 category: 'Drawing Tools',
 seller: 'Rahul Roy',
 description: 'Complete set of drawing instruments used in engineering college.',
 image: 'images/engineering drawing.jpeg'
},
{ id: 2, 
  name: 'Engineering Physics Textbook', 
  price: 650, 
  category: 'Books', 
  seller: 'Priya Sharma', 
  description: 'Comprehensive physics book for semester 1.', 
  image: 'images/physics.jpeg'
},
{ id: 3, 
  name: 'Chemistry Lab Coat (XL)', 
  price: 150, 
  category: 'Lab Coat', 
  seller: 'Aman Patel', 
  description: 'White lab coat, perfect condition, only used for 1 semester.', 
  image: 'images/white lab coat.jpeg'
},
{ id: 4, 
  name: 'Arduino Kit', 
  price: 800, 
  category: 'Electronics', 
  seller: 'Sarah Khan', 
  description: 'Complete Arduino Uno starter kit with sensors and components.', 
  image: 'images/arduino.jpeg'
},
{ id: 5, 
  name: 'Calculator fx-991 ES', 
  price: 500, 
  category: 'Electronics', 
  seller: 'Vikram Singh', 
  description: 'Scientific Calculator', 
  image: 'images/calculator.jpeg' 
},
{ id: 6, 
  name: 'Workshop Lab Coat (XL)', 
  price: 150, category: 'Lab Coat', 
  seller: 'Ananya Verma', 
  description: 'Brand new lab coat, never worn.',
  image: 'images/navy lab coat.jpeg'
  },

{ id: 7, 
  name: 'Multimeter Digital', 
  price: 200, 
  category: 'Electronics', 
  seller: 'Arjun Desai', 
  description: 'Fluke digital multimeter for laboratory use.', 
  image: 'images/multimeter.jpeg'
},

    ];

    let allProducts = [...sampleProducts];
    let filteredProducts = [...sampleProducts];

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
      page_title: 'Campus Marketplace',
      page_subtitle: 'Buy and sell useful items within your college community.'
    };

    let config = { ...defaultConfig };

    function applyConfig(updatedConfig) {
      config = { ...config, ...updatedConfig };
      
      const pageTitle = document.getElementById('pageTitle');
      const pageSubtitle = document.getElementById('pageSubtitle');
      const platformName = document.getElementById('navPlatformName');

      if (pageTitle) pageTitle.textContent = config.page_title || defaultConfig.page_title;
      if (pageSubtitle) pageSubtitle.textContent = config.page_subtitle || defaultConfig.page_subtitle;
      if (platformName) platformName.textContent = config.platform_name || defaultConfig.platform_name;

      const font = config.font_family || defaultConfig.font_family;
      const baseSize = config.font_size || defaultConfig.font_size;
      document.body.style.fontFamily = `${font}, sans-serif`;
      document.body.style.fontSize = `${baseSize}px`;

      document.body.style.background = config.background_color || defaultConfig.background_color;
      document.body.style.color = config.text_color || defaultConfig.text_color;
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
          ['page_title', cfg.page_title || defaultConfig.page_title],
          ['page_subtitle', cfg.page_subtitle || defaultConfig.page_subtitle]
        ])
      });
    }

    // Render Products
    function renderProducts(products) {
      const container = document.getElementById('productsContainer');
      const emptyState = document.getElementById('emptyState');

      if (products.length === 0) {
        container.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
      }

      emptyState.classList.add('hidden');
      container.innerHTML = products.map(product => `
        <div class="product-card rounded-xl overflow-hidden" style="background:#111; border:1px solid rgba(255,255,255,0.06);">
          <div class="event-image bg-gradient-to-br from-slate-900 to-black">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <div>
                <h3 class="font-bold text-base mb-1">${product.name}</h3>
                <p class="text-xs text-white/50 mb-2">by ${product.seller}</p>
              </div>
              <span class="text-lg font-bold text-white">₹${product.price}</span>
            </div>
            <div class="inline-block px-2.5 py-1 rounded-md text-xs font-medium text-white/70" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);">
              ${product.category}
            </div>
            <p class="text-sm text-white/60 mt-3 mb-4 line-clamp-2">${product.description}</p>
            <div class="flex gap-2">
              <button class="btn-primary flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <i data-lucide="message-circle" style="width:14px;height:14px;"></i> Contact
              </button>
              <button class="btn-secondary flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                <i data-lucide="eye" style="width:14px;height:14px;"></i> Details
              </button>
            </div>
          </div>
        </div>
      `).join('');
      lucide.createIcons();
    }

    // Filter Products
    function filterProducts(category) {
      // Update active button
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');

      if (category === 'all') {
        filteredProducts = [...allProducts];
      } else {
        filteredProducts = allProducts.filter(p => p.category === category);
      }
      renderProducts(filteredProducts);
    }

    // Handle Post Product
    function handlePostProduct(e) {
      e.preventDefault();

      const name = document.getElementById('productName').value;
      const price = parseInt(document.getElementById('price').value);
      const category = document.getElementById('category').value;
      const description = document.getElementById('description').value;

      // Clear errors
      document.getElementById('nameError').classList.add('hidden');
      document.getElementById('priceError').classList.add('hidden');

      let isValid = true;

      if (!name || name.trim().length < 3) {
        document.getElementById('nameError').textContent = 'Product name must be at least 3 characters';
        document.getElementById('nameError').classList.remove('hidden');
        isValid = false;
      }

      if (!price || price < 1) {
        document.getElementById('priceError').textContent = 'Please enter a valid price';
        document.getElementById('priceError').classList.remove('hidden');
        isValid = false;
      }

      if (isValid) {
        const newProduct = {
          id: allProducts.length + 1,
          name,
          price,
          category,
          seller: 'You',
          description,
          emoji: '🛍️'
        };

        allProducts.unshift(newProduct);
        filteredProducts = [...allProducts];
        renderProducts(filteredProducts);

        // Reset form
        e.target.reset();
        showNotification('✓ Product posted successfully!');
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
    renderProducts(filteredProducts);
    applyConfig(defaultConfig);

    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9dc5718936936ed7',t:'MTc3MzUxNDAxMi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
