document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const currentPage = window.location.pathname.split('/').pop();

    // Protected Routes
    const protectedPages = ['dashboard.html', 'create-event.html', 'events.html', 'teams.html', 'leaderboard.html', 'resources.html', 'marketplace.html'];
    if (!user && protectedPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return;
    }

    // Navbar Setup
    const navbar = document.querySelector('.nav-links');
    if (navbar) {
        if (user) {
            navbar.innerHTML = `
                <li><a href="dashboard.html">Home</a></li>
                <li><a href="events.html">Events</a></li>
                <li><a href="teams.html">Teams</a></li>
                <li><a href="leaderboard.html">Leaderboards</a></li>
                <li><a href="resources.html">Resources</a></li>
                <li><a href="marketplace.html">Marketplace</a></li>
                <li><a href="#" id="logout-btn">Logout (${user.name})</a></li>
            `;
            
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            });
        } else {
            navbar.innerHTML = `
                <li><a href="index.html">Home</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="signup.html">Signup</a></li>
            `;
        }
    }
});
