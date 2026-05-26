 const eventsData = [
      {
  id: 1,
  name: 'INNOVACION 2026',
  organizer: 'Tech Department',
  category: 'Tech Fest',
  type: 'college',
  date: '13-15 March',
  location: 'IEM Management Building',
  teamSize: 'Open to All',
  description: 'Institute of Engineering and Management, Kolkata proudly presents the 13th edition of its Annual Techno-Management Fest.',
  prize: '₹5L + Prizes',
  image: 'images/Innovacion.jpeg'
},
     {
  id: 2,
  name: 'CodeQuest 2026',
  organizer: 'Tech Department',
  category: 'College Events',
  type: 'college',
  date: '17 March',
  location: 'IEM Management Building',
  teamSize: '2 members',
  description: 'Get ready for an exciting adventure of logic, teamwork, and quick thinking! *CODEQUEST 2026* is a thrilling puzzle-solving event where teams will navigate through a series of rooms, uncover hidden clues, and solve challenging riddles to progress through the mission. Each solved puzzle unlocks the path to the next stage, testing your analytical skills, creativity, and coordination with your teammates.',
  prize: '₹3000 Prize Pool',
  image: 'images/CodeQuest.jpeg'
},
      {
  id: 3,
  name: 'PROMPTX - Design with AI',
  organizer: 'IEEE Antennas and Propagation Society Student Chapter (IEM)',
  category: 'Competitions',
  type: 'college',
  date: '20 March',
  location: 'Online',
  teamSize: 'Individual',
  description: 'An AI Creativity Competition organized by IEEE Antennas and Propagation Society Student Chapter (IEM). Turn your imagination into stunning visuals using AI image generation tools and showcase your prompt engineering skills through creative rounds.',
  prize: 'To be Declared',
  image: 'images/Promptx.jpeg'
},   
    {
  id: 4,
  name: 'Converge 2K26',
  organizer: 'IEEE Computer Society IEM SBC',
  category: 'Competitions',
  type: 'college',
  date: '6-8 March',
  location: 'IEM Gurukul Building',
  teamSize: 'Solo or upto 4 members',
  description: 'PLOT UNLOCKED. A multi activity event hosted by IEEE Computer Society IEM SBC.',
  prize: 'To be Declared',
  image: 'images/converge.jpeg'
}, 
 {
id: 5,
  name: 'AXIORA - Innovate Beyond Limits',
  organizer: 'IETE - IEM Student Chapter CSBS . CSE-AIML',
  category: 'Competitions',
  type: 'hackathon',
  date: '17-20 March',
  location: 'IEM SaltLake',
  teamSize: '2-5 members',
  description: 'AXIORA, the national-level online hackathon, now has its dedicated platform where participants can explore event details, tracks, schedules, and registration.',
  prize: '₹20K +',
  image: 'images/Axiora.jpeg'
}, 
      {
  id: 6,
  name: 'EXABYTE- 26 : Optimizing Horizons',
  organizer: 'PostGraduate and Research Department of Computer Science',
  category: 'intercollege',
  type: 'intercollege',
  date: '23-24 March',
  location: 'St. Xaviers College (Autonomous)',
  teamSize: 'Solo or upto 4 members',
  description: 'A series of mind boggling coding events including hackathons and competitons.',
  prize: '₹10K +',
  image: 'images/exabyte.jpeg'
}, 
     
    ];

    let currentFilter = 'all';

    function renderEvents(filter = 'all') {
      const grid = document.getElementById('eventsGrid');
      const noResults = document.getElementById('noResults');
      
      const filteredEvents = filter === 'all' 
        ? eventsData 
        : eventsData.filter(e => e.category === filter || e.type === filter);

      if (filteredEvents.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
      }

      noResults.classList.add('hidden');
      grid.innerHTML = filteredEvents.map((event, index) => `
        <div class="card-hover rounded-xl overflow-hidden fade-in" style="background:#111; animation-delay: ${index * 50}ms;">
          <div class="event-image bg-gradient-to-br from-slate-900 to-black">
            <img src="${event.image}" alt="${event.name}">
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-white/30 bg-white/[0.06] px-2.5 py-1 rounded-full capitalize">${event.category}</span>
              <span class="text-xs text-white/40">${event.date}</span>
            </div>
            <h3 class="font-semibold text-base mb-1 line-clamp-2">${event.name}</h3>
            <p class="text-[11px] text-white/40 mb-3">${event.organizer}</p>
            <div class="space-y-1.5 text-xs text-white/40 mb-4">
              <div class="flex items-center gap-2">
                <i data-lucide="map-pin" style="width:13px;height:13px;"></i> ${event.location}
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="users" style="width:13px;height:13px;"></i> ${event.teamSize}
              </div>
            </div>
            <div class="flex gap-2">
              <button class="btn-primary flex-1 py-2 rounded-lg text-xs font-semibold">Register</button>
              <button class="btn-outline flex-1 py-2 rounded-lg text-xs font-semibold" onclick="openModal(${event.id})">Details</button>
            </div>
          </div>
        </div>
      `).join('');
      
      lucide.createIcons();
    }

    function openModal(eventId) {
      const event = eventsData.find(e => e.id === eventId);
      if (!event) return;

      document.getElementById('modalTitle').textContent = event.name;
      document.getElementById('modalCategory').textContent = event.category.charAt(0).toUpperCase() + event.category.slice(1);
      document.getElementById('modalDescription').textContent = event.description;
      document.getElementById('modalDate').textContent = event.date;
      document.getElementById('modalLocation').textContent = event.location;
      document.getElementById('modalTeamSize').textContent = event.teamSize;
      document.getElementById('modalOrganizer').textContent = event.organizer;
      document.getElementById('modalPrize').textContent = event.prize;

      const modal = document.getElementById('eventModal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      const modal = document.getElementById('eventModal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    document.getElementById('eventModal').addEventListener('click', (e) => {
      if (e.target.id === 'eventModal') closeModal();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderEvents(currentFilter);
      });
    });

    // Sidebar toggle
    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('sidebarOverlay');
      sidebar.classList.toggle('open');
      overlay.classList.toggle('hidden');
      setTimeout(() => {
        overlay.style.opacity = sidebar.classList.contains('open') ? '1' : '0';
      }, 10);
    }

    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
        overlay.style.opacity = '0';
      }
    });

    document.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        if (window.innerWidth < 1024) toggleSidebar();
      });
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
      page_title: 'Explore Events',
      page_subtitle: 'Discover college and intercollege competitions, workshops, and hackathons.',
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

    renderEvents('all');
    lucide.createIcons();

    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9dc3eb8cc147538b',t:'MTc3MzQ5ODAzNy4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
