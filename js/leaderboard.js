document.addEventListener('DOMContentLoaded', () => {
    const leaderboardBody = document.getElementById('leaderboard-body');

    // Mock Data (Since backend API was not fully requested for leaderboard logic in detail)
    const leaderboardData = [
        { rank: 1, name: 'Team Alpha', score: 1200, type: 'Team' },
        { rank: 2, name: 'John Doe', score: 1150, type: 'Individual' },
        { rank: 3, name: 'CSE Dept', score: 1100, type: 'Department' },
        { rank: 4, name: 'Team Beta', score: 950, type: 'Team' },
        { rank: 5, name: 'Jane Smith', score: 900, type: 'Individual' }
    ];

    if (leaderboardBody) {
        leaderboardBody.innerHTML = leaderboardData.map(entry => `
            <tr>
                <td>${entry.rank}</td>
                <td>${entry.name}</td>
                <td>${entry.score}</td>
                <td>${entry.type}</td>
            </tr>
        `).join('');
    }
});

  const leaderboardData = {
      hackathon: {
        individual: [
          { rank: 1, name: 'Rahul Roy', event: 'Hackathon 2026', score: 920, badge: '🥇' },
          { rank: 2, name: 'Priya Sharma', event: 'Hackathon 2026', score: 895, badge: '🥈' },
          { rank: 3, name: 'Aman Patel', event: 'Hackathon 2026', score: 870, badge: '🥉' },
          { rank: 4, name: 'Neha Gupta', event: 'Hackathon 2026', score: 850, badge: '⭐' },
          { rank: 5, name: 'Vikram Singh', event: 'Hackathon 2026', score: 825, badge: '' },
          { rank: 6, name: 'Sarah Khan', event: 'Hackathon 2026', score: 805, badge: '' }
        ],
        team: [
          { rank: 1, name: 'Code Warriors', event: 'Hackathon 2026', score: 980, badge: '🏆' },
          { rank: 2, name: 'Tech Titans', event: 'Hackathon 2026', score: 945, badge: '🥈' },
          { rank: 3, name: 'Digital Innovators', event: 'Hackathon 2026', score: 920, badge: '🥉' },
          { rank: 4, name: 'Python Pro Squad', event: 'Hackathon 2026', score: 890, badge: '⭐' },
          { rank: 5, name: 'Web Nexus', event: 'Hackathon 2026', score: 850, badge: '' }
        ],
        department: [
          { rank: 1, name: 'CSE Department', event: 'Hackathon 2026', score: 2850, badge: '🏆' },
          { rank: 2, name: 'IT Department', event: 'Hackathon 2026', score: 2420, badge: '🥈' },
          { rank: 3, name: 'ECE Department', event: 'Hackathon 2026', score: 1890, badge: '🥉' },
          { rank: 4, name: 'Mechanical Department', event: 'Hackathon 2026', score: 1520, badge: '⭐' },
          { rank: 5, name: 'Civil Department', event: 'Hackathon 2026', score: 980, badge: '' }
        ]
      },
      workshop: {
        individual: [
          { rank: 1, name: 'Aman Patel', event: 'AI Workshop', score: 950, badge: '🥇' },
          { rank: 2, name: 'Vikram Singh', event: 'AI Workshop', score: 920, badge: '🥈' },
          { rank: 3, name: 'Neha Gupta', event: 'AI Workshop', score: 895, badge: '🥉' },
          { rank: 4, name: 'Rohan Kumar', event: 'AI Workshop', score: 870, badge: '⭐' },
          { rank: 5, name: 'Priya Sharma', event: 'AI Workshop', score: 840, badge: '' }
        ],
        team: [
          { rank: 1, name: 'AI Architects', event: 'AI Workshop', score: 1025, badge: '🏆' },
          { rank: 2, name: 'Machine Learning Pro', event: 'AI Workshop', score: 990, badge: '🥈' },
          { rank: 3, name: 'Neural Networks', event: 'AI Workshop', score: 955, badge: '🥉' }
        ],
        department: [
          { rank: 1, name: 'CSE Department', event: 'AI Workshop', score: 3020, badge: '🏆' },
          { rank: 2, name: 'IT Department', event: 'AI Workshop', score: 2640, badge: '🥈' }
        ]
      },
      coding: {
        individual: [
          { rank: 1, name: 'Rohan Kumar', event: 'Coding Contest', score: 2100, badge: '🥇' },
          { rank: 2, name: 'Sarah Khan', event: 'Coding Contest', score: 1950, badge: '🥈' },
          { rank: 3, name: 'Rahul Roy', event: 'Coding Contest', score: 1850, badge: '🥉' },
          { rank: 4, name: 'Arjun Desai', event: 'Coding Contest', score: 1750, badge: '⭐' },
          { rank: 5, name: 'Ananya Verma', event: 'Coding Contest', score: 1620, badge: '' }
        ],
        team: [
          { rank: 1, name: 'Code Masters', event: 'Coding Contest', score: 5250, badge: '🏆' },
          { rank: 2, name: 'Algorithm Experts', event: 'Coding Contest', score: 4890, badge: '🥈' }
        ],
        department: [
          { rank: 1, name: 'CSE Department', event: 'Coding Contest', score: 8920, badge: '🏆' },
          { rank: 2, name: 'IT Department', event: 'Coding Contest', score: 7850, badge: '🥈' }
        ]
      },
      robotics: {
        individual: [
          { rank: 1, name: 'Vikram Singh', event: 'Robotics Challenge', score: 880, badge: '🥇' },
          { rank: 2, name: 'Ananya Verma', event: 'Robotics Challenge', score: 850, badge: '🥈' },
          { rank: 3, name: 'Arjun Desai', event: 'Robotics Challenge', score: 820, badge: '🥉' }
        ],
        team: [
          { rank: 1, name: 'Robot Warriors', event: 'Robotics Challenge', score: 1680, badge: '🏆' },
          { rank: 2, name: 'Automation Hub', event: 'Robotics Challenge', score: 1550, badge: '🥈' }
        ],
        department: [
          { rank: 1, name: 'Mechanical Department', event: 'Robotics Challenge', score: 3200, badge: '🏆' },
          { rank: 2, name: 'ECE Department', event: 'Robotics Challenge', score: 2850, badge: '🥈' }
        ]
      }
    };

    let currentEvent = 'hackathon';
    let currentLeaderboard = 'individual';

    // Element SDK Configuration
    const defaultConfig = {
      background_color: '#000000',
      card_color: '#111111',
      text_color: '#ffffff',
      secondary_text_color: '#cccccc',
      accent_color: '#ffd700',
      font_family: 'Outfit',
      font_size: 14,
      platform_name: 'IEM Connector',
      page_title: 'Event Leaderboards',
      page_subtitle: 'Track top performers across competitions and events.'
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

    function getRankBadgeClass(rank) {
      if (rank === 1) return 'rank-1';
      if (rank === 2) return 'rank-2';
      if (rank === 3) return 'rank-3';
      return 'rank-other';
    }

    function renderLeaderboard() {
      const data = leaderboardData[currentEvent][currentLeaderboard];
      const tbody = document.getElementById('leaderboardBody');
      
      tbody.innerHTML = data.map(entry => `
        <tr>
          <td class="px-6 py-4">
            <div class="rank-badge ${getRankBadgeClass(entry.rank)}">${entry.rank}</div>
          </td>
          <td class="px-6 py-4 font-medium">${entry.name}</td>
          <td class="px-6 py-4 text-white/60">${entry.event}</td>
          <td class="px-6 py-4 text-right score-display">${entry.score}</td>
          <td class="px-6 py-4 text-center">${entry.badge}</td>
        </tr>
      `).join('');

      // Update top performer
      const topEntry = data[0];
      document.getElementById('topPerformerName').textContent = topEntry.name;
      document.getElementById('topPerformerEvent').textContent = topEntry.event;
      document.getElementById('topPerformerScore').textContent = topEntry.score;
    }

    function switchLeaderboard(type) {
      currentLeaderboard = type;
      
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      const header = document.getElementById('nameHeader');
      if (type === 'individual') header.textContent = 'Name';
      else if (type === 'team') header.textContent = 'Team';
      else header.textContent = 'Department';
      
      renderLeaderboard();
    }

    function handleEventChange() {
      const select = document.getElementById('eventSelect');
      currentEvent = select.value;
      renderLeaderboard();
    }

    // Initialize
    lucide.createIcons();
    renderLeaderboard();
    applyConfig(defaultConfig);

    (function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9dc58de1c3f547da',t:'MTc3MzUxNTE3Mi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();
