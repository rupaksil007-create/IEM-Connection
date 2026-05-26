document.addEventListener('DOMContentLoaded', async () => {
    // Load summary data for dashboard
    const eventsPreview = document.getElementById('events-preview');
    const teamsPreview = document.getElementById('teams-preview');
    const resourcesPreview = document.getElementById('resources-preview');
    const marketPreview = document.getElementById('market-preview');

    async function loadPreview(url, container, mapper) {
        if (!container) return;
        try {
            const res = await fetch(url);
            const data = await res.json();
            container.innerHTML = data.slice(0, 3).map(mapper).join('');
            if (data.length === 0) container.innerHTML = '<p>No items found.</p>';
        } catch (e) {
            console.error(e);
        }
    }

    loadPreview('/api/events', eventsPreview, e => `
        <div class="card">
            <h4>${e.title}</h4>
            <p>${new Date(e.event_date).toLocaleDateString()}</p>
        </div>
    `);

    loadPreview('/api/teams', teamsPreview, t => `
        <div class="card">
            <h4>${t.name}</h4>
            <p>${t.skills_required}</p>
        </div>
    `);


    loadPreview('/api/resources', resourcesPreview, r => `
        <div class="card">
            <h4>${r.title}</h4>
            <p>${r.type}</p>
        </div>
    `);

    loadPreview('/api/marketplace', marketPreview, m => `
        <div class="card">
            <h4>${m.product_name}</h4>
            <p>$${m.price}</p>
        </div>
    `);
});

