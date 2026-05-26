  const resourcesData = [
  
        {
  id: 1,
  title: 'Java Programming Notes',
  type: 'Notes',
  uploadedBy: 'Rohan Verma',
  date: '25 Feb 2026',
  description: ' Clear and concise Java programming notes covering core concepts like variables, OOP, classes, inheritance, loops, and exception handling—perfect for beginners and students learning Java.',
  downloads: 501,
  image: 'images/Java cover.jpeg',
  file: 'pdf/Java_Complete_Notes.pdf'
},  {
  id: 2,
  title: 'MySQL Cheatsheet',
  type: 'cheatsheet',
  uploadedBy: 'Rahul Roy',
  date: '12 March 2026',
  description: 'A handy MySQL cheat sheet with the most useful SQL commands, queries, and syntax to help you work faster with databases.',
  downloads: 342,
  image: 'images/mysql cover.png',
  file: 'pdf/MySQL Cheatsheet.pdf'
},
     {
  id: 3,
  title: 'HTML Cheatsheet',
  type: 'cheatsheet',
  uploadedBy: 'Priya Sharma',
  date: '10 March 2026',
  description: 'A quick and handy HTML Cheat Sheet covering essential tags, elements, forms, tables, and page structure. Perfect for beginners and developers who want a fast reference while building web pages.',
  downloads: 246,
  image: 'images/HTML cover.jpeg',
  file: 'pdf/HTML Cheatsheet.pdf'
},
     {
  id: 4,
  title: 'JavaScript Cheatsheet',
  type: 'cheatsheet',
  uploadedBy: 'Arjun Singh',
  date: '8 March 2026',
  description: 'Master JavaScript faster with this handy cheat sheet! Quickly access commonly used syntax, functions, and concepts needed for modern web development.',
  downloads: 114,
  image: 'images/javascript cover.jpeg',
  file: 'pdf/JavaScript Cheatsheet.pdf'
},
     {
  id: 5,
  title: 'CSS Cheatsheet',
  type: 'cheatsheet',
  uploadedBy: 'Sneha Gupta',
  date: '5 March 2026',
  description: 'Design websites faster with this handy CSS Cheat Sheet! Quickly access commonly used properties, layouts, and styling tricks in one place.',
  downloads: 371,
  image: 'images/css cover.jpeg',
  file: 'pdf/CSS Cheatsheet.pdf'
},
     {
  id: 6,
  title: 'Python Programming Notes',
  type: 'Notes',
  uploadedBy: 'Vikram Desai',
  date: '1 March 2026',
  description: ' A complete Python guide covering core concepts, syntax, functions, object-oriented programming, and useful libraries. Perfect for beginners and developers who want a clear and structured reference while learning or building Python projects.',
  downloads: 426,
  image: 'images/python_notes_cover.png',
  file: 'pdf/Python_Complete_Notes.pdf'
},
      {
  id: 7,
  title: 'Computer Science and Engineering Career Report',
  type: 'Documentation',
  uploadedBy: 'Ananya Singh',
  date: '28 Feb 2026',
  description: ' A comprehensive report explaining career opportunities in Computer Science Engineering, including required skills, job roles, higher studies, and future scope in the tech industry.',
  downloads: 23,
  image: 'images/cse cover.jpeg',
  file: 'pdf/computer_science_engineering_report.pdf'
},

  ];

    let currentFilter = 'all';

    function renderResources(filter = 'all') {
      const grid = document.getElementById('resourcesGrid');
      const noResults = document.getElementById('noResults');
      
      let filtered = resourcesData;
      if (filter !== 'all') {
        filtered = resourcesData.filter(r => r.type === filter);
      }

      if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
      }

      noResults.classList.add('hidden');
      grid.innerHTML = filtered.map((resource, index) => `
        <div class="card-hover rounded-xl overflow-hidden fade-in" style="background:#111; animation-delay: ${index * 50}ms;">
          <div class="event-image bg-gradient-to-br from-slate-900 to-black flex flex-col items-center justify-center gap-2">
            <div class="event-image bg-gradient-to-br from-slate-900 to-black">
            <img src="${resource.image}" alt="${resource.name}">
          </div>
            <span class="text-[10px] text-white/30">${resource.type}</span>
          </div>
          <div class="p-5">

            <h3 class="font-semibold text-base mb-1 line-clamp-2">${resource.title}</h3>
            <p class="text-[11px] text-white/40 mb-3">By ${resource.uploadedBy} • ${resource.date}</p>
                        <div class="flex gap-2 mt-4">

<a href="${resource.file}" download 
class="px-4 py-2 bg-white text-black rounded-lg text-sm flex items-center gap-2">
<i data-lucide="download" style="width:16px;height:16px;"></i>
Download
</a>

<a href="${resource.file}" target="_blank"
class="px-4 py-2 border border-white/20 rounded-lg text-sm flex items-center gap-2">
<i data-lucide="eye" style="width:16px;height:16px;"></i>
Preview
</a>

</div>
          </div>
        </div>
      `).join('');
      
      lucide.createIcons();
    }

    function filterResources(type) {
      currentFilter = type;
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      renderResources(type);
    }

    function openResourceModal(resourceId) {
      const resource = resourcesData.find(r => r.id === resourceId);
      if (!resource) return;

      document.getElementById('modalTitle').textContent = resource.title;
      document.getElementById('modalType').textContent = resource.type;
      document.getElementById('modalDescription').textContent = resource.description;
      document.getElementById('modalUploadedBy').textContent = resource.uploadedBy;
      document.getElementById('modalDate').textContent = resource.date;
      document.getElementById('modalDownloads').textContent = resource.downloads;

      const modal = document.getElementById('eventModal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      const modal = document.getElementById('eventModal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function downloadResource() {
      showNotification('✓ Resource downloaded successfully!');
      closeModal();
    }

    function previewResource() {
      showNotification('📄 Opening preview...');
    }

    function handleUploadResource(event) {
      event.preventDefault();
      const title = document.getElementById('resourceTitle').value;
      const type = document.getElementById('resourceType').value;
      const description = document.getElementById('resourceDesc').value;

      const newResource = {
        id: resourcesData.length + 1,
        title: title,
        type: type,
        uploadedBy: 'You',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        description: description || 'No description provided.',
        downloads: 0
      };

      resourcesData.unshift(newResource);
      renderResources(currentFilter);
      
      document.getElementById('resourceTitle').value = '';
      document.getElementById('resourceType').value = '';
      document.getElementById('resourceDesc').value = '';
      
      showNotification('✓ Resource uploaded successfully!');
    }

    function showNotification(message) {
      const notif = document.createElement('div');
      notif.style.cssText = 'position:fixed;top:20px;right:20px;background:#fff;color:#000;padding:12px 20px;border-radius:8px;font-weight:600;z-index:9999;animation:slideIn 0.3s ease-out';
      notif.textContent = message;
      document.body.appendChild(notif);
      setTimeout(() => notif.remove(), 3000);
    }

    document.getElementById('eventModal').addEventListener('click', (e) => {
      if (e.target.id === 'eventModal') closeModal();
    });

    // Element SDK
    const defaultConfig = {
      background_color: '#000000',
      card_color: '#111111',
      text_color: '#ffffff',
      secondary_text_color: '#cccccc',
      accent_color: '#ffffff',
      font_family: 'Outfit',
      font_size: 14,
      page_title: 'Study Resources',
      page_subtitle: 'Share and access notes, documentation, and learning materials from other students.',
      platform_name: 'IEM Help'
    };

    function applyConfig(config) {
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

      document.querySelectorAll('[style*="background:#111"]').forEach(el => {
        el.style.background = config.card_color || defaultConfig.card_color;
      });
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange: async (config) => { applyConfig(config); },
        mapToCapabilities: (config) => ({
          recolorables: [
            { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; window.elementSdk.setConfig({ background_color: v }); } },
            { get: () => config.card_color || defaultConfig.card_color, set: (v) => { config.card_color = v; window.elementSdk.setConfig({ card_color: v }); } },
            { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; window.elementSdk.setConfig({ text_color: v }); } },
            { get: () => config.secondary_text_color || defaultConfig.secondary_text_color, set: (v) => { config.secondary_text_color = v; window.elementSdk.setConfig({ secondary_text_color: v }); } },
            { get: () => config.accent_color || defaultConfig.accent_color, set: (v) => { config.accent_color = v; window.elementSdk.setConfig({ accent_color: v }); } }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (v) => { config.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (v) => { config.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['page_title', config.page_title || defaultConfig.page_title],
          ['page_subtitle', config.page_subtitle || defaultConfig.page_subtitle],
          ['platform_name', config.platform_name || defaultConfig.platform_name]
        ])
      });
    }

    renderResources();
    lucide.createIcons();

    // Add CSS animation for success message
    const style = document.createElement('style');
    style.textContent = '@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
    document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', async () => {
    const resourcesContainer = document.getElementById('resources-container');
    const uploadForm = document.getElementById('upload-resource-form');

    if (resourcesContainer) {
        try {
            const response = await fetch('/api/resources');
            const resources = await response.json();

            resourcesContainer.innerHTML = resources.map(res => `
                <div class="card">
                    <h3>${res.title}</h3>
                    <p><strong>Type:</strong> ${res.type}</p>
                    <a href="${res.file_url}" target="_blank">Download/View</a>
                </div>
            `).join('');
        } catch (error) {
            console.error('Failed to load resources', error);
        }
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(uploadForm);
            const data = Object.fromEntries(formData.entries());
            
            const user = JSON.parse(localStorage.getItem('user'));
            data.user_id = user.id;

            try {
                const response = await fetch('/api/upload-resource', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Resource uploaded!');
                    window.location.reload();
                } else {
                    alert('Failed to upload');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9dc4206a70083fe1',t:'MTc3MzUwMDIwMy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
