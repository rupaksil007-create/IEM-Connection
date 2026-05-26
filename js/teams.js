document.addEventListener('DOMContentLoaded', async () => {
    const teamsContainer = document.getElementById('teams-container');
    const createTeamForm = document.getElementById('create-team-form');

    // Load Teams
    if (teamsContainer) {
        try {
            const response = await fetch('/api/teams');
            const teams = await response.json();

            teamsContainer.innerHTML = teams.map(team => `
                <div class="card">
                    <h3>${team.name}</h3>
                    <p><strong>Skills:</strong> ${team.skills_required}</p>
                    <p><strong>Size:</strong> ${team.team_size}</p>
                    <button onclick="alert('Request sent to join ${team.name}')">Join Team</button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Failed to load teams', error);
        }
    }

    // Create Team
    if (createTeamForm) {
        createTeamForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(createTeamForm);
            const data = Object.fromEntries(formData.entries());
            
            const user = JSON.parse(localStorage.getItem('user'));
            data.leader_id = user.id;

            try {
                const response = await fetch('/api/create-team', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Team created!');
                    window.location.href = 'teams.html';
                } else {
                    alert('Failed to create team');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});

 const teamsData = [
      {
        id: 1,
        name: 'Code Warriors',
        event: 'Hackathon 2026',
        leader: 'Rajesh Kumar',
        members: 3,
        maxSize: 4,
        skills: 'React, Node.js, MongoDB',
        description: 'Passionate developers building innovative web solutions. Looking for a backend expert to complete our team.'
      },
      {
        id: 2,
        name: 'Pixel Masters',
        event: 'Design Sprint 2026',
        leader: 'Priya Sharma',
        members: 2,
        maxSize: 4,
        skills: 'UI/UX, Figma, Design Thinking',
        description: 'Creative design team focused on user-centered solutions for social impact challenges.'
      },
      {
        id: 3,
        name: 'Algorithm Crushers',
        event: 'Code Sprint',
        leader: 'Arjun Singh',
        members: 4,
        maxSize: 4,
        skills: 'C++, Python, Data Structures',
        description: 'Competitive programming team with strong algorithmic skills. Team is full but feel free to join our community.'
      },
      {
        id: 4,
        name: 'Mobile Ninjas',
        event: 'Hackathon 2026',
        leader: 'Aarav Patel',
        members: 2,
        maxSize: 5,
        skills: 'Flutter, Swift, Firebase',
        description: 'Building cross-platform mobile applications. Need developers interested in mobile development.'
      },
      {
        id: 5,
        name: 'AI Innovators',
        event: 'Hackathon 2026',
        leader: 'Sneha Gupta',
        members: 3,
        maxSize: 5,
        skills: 'Machine Learning, TensorFlow, Python',
        description: 'Exploring AI solutions for real-world problems. Looking for data scientists and ML engineers.'
      },
      {
        id: 6,
        name: 'DevOps Dragons',
        event: 'Code Sprint',
        leader: 'Vikram Desai',
        members: 2,
        maxSize: 4,
        skills: 'Docker, Kubernetes, AWS',
        description: 'Infrastructure and cloud specialists. Building scalable, robust systems.'
      },
      {
        id: 7,
        name: 'Database Divas',
        event: 'Hackathon 2026',
        leader: 'Ananya Singh',
        members: 1,
        maxSize: 4,
        skills: 'SQL, PostgreSQL, Database Design',
        description: 'Experts in database optimization and design. Seeking full-stack developers.'
      },
      {
        id: 8,
        name: 'Frontend Fighters',
        event: 'Design Sprint 2026',
        leader: 'Rohan Verma',
        members: 3,
        maxSize: 4,
        skills: 'React, Vue, CSS, Animation',
        description: 'Creating beautiful, responsive user interfaces. Need one more frontend developer.'
      },
      {
        id: 9,
        name: 'Cloud Architects',
        event: 'Code Sprint',
        leader: 'Neha Chopra',
        members: 2,
        maxSize: 5,
        skills: 'Azure, GCP, Terraform',
        description: 'Building enterprise-scale cloud solutions. Open for backend and DevOps engineers.'
      }
    ];

    function renderTeams() {
      const grid = document.getElementById('teamsGrid');
      const noResults = document.getElementById('noResults');
      
      if (teamsData.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
        return;
      }

      noResults.classList.add('hidden');
      grid.innerHTML = teamsData.map((team, index) => `
        <div class="card-hover rounded-xl overflow-hidden fade-in" style="background:#111; animation-delay: ${index * 50}ms;">
          <div class="event-image bg-gradient-to-br from-slate-900 to-black">
            <i data-lucide="users" style="width:48px;height:48px;color:#333;"></i>
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between mb-3">
              <span class="text-[10px] font-semibold uppercase tracking-widest text-white/30 bg-white/[0.06] px-2.5 py-1 rounded-full">${team.event}</span>
              <span class="text-xs text-white/40">${team.members}/${team.maxSize}</span>
            </div>
            <h3 class="font-semibold text-base mb-1 line-clamp-2">${team.name}</h3>
            <p class="text-[11px] text-white/40 mb-3">Leader: ${team.leader}</p>
            <div class="space-y-1.5 text-xs text-white/40 mb-4">
              <div class="flex items-center gap-2">
                <i data-lucide="code" style="width:13px;height:13px;"></i> ${team.skills}
              </div>
            </div>
            <div class="flex gap-2">
              <button class="btn-primary flex-1 py-2 rounded-lg text-xs font-semibold" onclick="showJoinSuccess()">Join</button>
              <button class="btn-outline flex-1 py-2 rounded-lg text-xs font-semibold" onclick="openTeamModal(${team.id})">Details</button>
            </div>
          </div>
        </div>
      `).join('');
      
      lucide.createIcons();
    }

    function openTeamModal(teamId) {
      const team = teamsData.find(t => t.id === teamId);
      if (!team) return;

      document.getElementById('modalTitle').textContent = team.name;
      document.getElementById('modalEvent').textContent = team.event;
      document.getElementById('modalLeader').textContent = team.leader;
      document.getElementById('modalMembers').textContent = `${team.members} / ${team.maxSize} Members`;
      document.getElementById('modalSkills').textContent = team.skills;
      document.getElementById('modalDescription').textContent = team.description;

      const modal = document.getElementById('eventModal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function openCreateModal() {
      const modal = document.getElementById('createModal');
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeCreateModal() {
      const modal = document.getElementById('createModal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
      document.getElementById('teamNameInput').value = '';
      document.getElementById('eventSelect').value = '';
      document.getElementById('skillsInput').value = '';
      document.getElementById('sizeInput').value = '';
      document.getElementById('descInput').value = '';
    }

    function closeModal() {
      const modal = document.getElementById('eventModal');
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function handleCreateTeam(event) {
      event.preventDefault();
      const newTeam = {
        id: teamsData.length + 1,
        name: document.getElementById('teamNameInput').value,
        event: document.getElementById('eventSelect').value,
        leader: 'You',
        members: 1,
        maxSize: parseInt(document.getElementById('sizeInput').value),
        skills: document.getElementById('skillsInput').value,
        description: document.getElementById('descInput').value
      };
      teamsData.unshift(newTeam);
      closeCreateModal();
      renderTeams();
    }

    function joinTeam() {
      closeModal();
      showJoinSuccess();
    }

    function showJoinSuccess() {
      const successMsg = document.createElement('div');
      successMsg.style.cssText = 'position:fixed;top:20px;right:20px;background:#fff;color:#000;padding:12px 20px;border-radius:8px;font-weight:600;z-index:9999;animation:slideIn 0.3s ease-out';
      successMsg.textContent = '✓ Successfully joined the team!';
      document.body.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    }

    function scrollToTeams() {
      document.getElementById('teamsSection').scrollIntoView({ behavior: 'smooth' });
    }

    document.getElementById('eventModal').addEventListener('click', (e) => {
      if (e.target.id === 'eventModal') closeModal();
    });

    document.getElementById('createModal').addEventListener('click', (e) => {
      if (e.target.id === 'createModal') closeCreateModal();
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
      page_title: 'Build or Join Teams',
      page_subtitle: 'Find teammates or create your own team for upcoming competitions and hackathons.',
      platform_name: 'IEM Connector'
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

    renderTeams();
    lucide.createIcons();

    // Add CSS animation for success message
    const style = document.createElement('style');
    style.textContent = '@keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }';
    document.head.appendChild(style);

    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9dc41ace47f93fe1',t:'MTc3MzQ5OTk3My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
