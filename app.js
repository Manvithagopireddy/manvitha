// ========== STATE ==========
let allUniversities = [];

// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHamburger();
    initNavLinks();
    initSearch();
    loadUniversities();
    createDetailModal();
    initScrollAnimations();
});

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    const targets = document.querySelectorAll('.course-card, .why-card, .section-title, .section-subtitle');
    targets.forEach(t => {
        t.classList.add('reveal');
        observer.observe(t);
    });
    
    window.scrollObserver = observer;
}

// ========== THEME TOGGLE ==========
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    themeToggle.addEventListener('click', () => {
        const newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    });
}

// ========== HAMBURGER MENU ==========
function initHamburger() {
    const btn = document.getElementById('hamburgerBtn');
    const links = document.getElementById('navLinks');
    if (btn && links) {
        btn.addEventListener('click', () => links.classList.toggle('open'));
    }
}

// ========== NAV LINKS (smooth scroll to sections) ==========
function initNavLinks() {
    const sectionMap = {
        'Home':         '.hero',
        'Universities': '#universities',
        'Courses':      '#courses',
        'Compare':      '#compare',
        'Admissions':   '#admissions',
    };

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const label = link.textContent.trim();
            const target = sectionMap[label];
            if (target) {
                const el = document.querySelector(target);
                if (el) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }
            // Update active link
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
            // Close mobile menu
            const navMenu = document.getElementById('navLinks');
            if(navMenu) navMenu.classList.remove('open');
        });
    });
}

// ========== SEARCH ==========
function initSearch() {
    const heroInput = document.querySelector('.hero-search-box input');
    const heroBtn   = document.querySelector('.hero-search-box button');
    if (heroBtn && heroInput) {
        heroBtn.addEventListener('click', () => filterUniversities(heroInput.value));
        heroInput.addEventListener('keydown', e => { if (e.key === 'Enter') filterUniversities(heroInput.value); });
    }
}

function filterUniversities(query) {
    const q = query.trim();
    if (q) {
        window.open(`http://localhost:5174/colleges?search=${encodeURIComponent(q)}`, '_blank');
    } else {
        window.open(`http://localhost:5174/colleges`, '_blank');
    }
}

// ========== LOAD UNIVERSITIES ==========
function loadUniversities() {
    const container = document.getElementById('universityContainer');
    if (!container) return;
    container.innerHTML = '<p style="color:var(--text-muted);padding:1rem;">Loading universities…</p>';

    fetch('http://localhost:5000/api/universities')
        .then(res => res.json())
        .then(data => {
            allUniversities = data;
            renderCards(data);
        })
        .catch(() => {
            container.innerHTML = `
                <div style="color:#ef4444;background:#fee2e2;padding:1.5rem;border-radius:8px;border:1.5px solid #fecaca;max-width:500px;margin:0 auto;">
                    <h3 style="margin-top:0;color:#b91c1c;">⚠️ Backend Not Running</h3>
                    <p style="font-size:.9rem;color:#7f1d1d;margin-bottom:.8rem;">The page cannot reach the server on port 5000. Steps to fix:</p>
                    <ol style="font-size:.85rem;color:#7f1d1d;padding-left:1.2rem;line-height:1.7;">
                        <li>Set your password in the <code>.env</code> file</li>
                        <li>Run <code>node seed.js</code> to add data</li>
                        <li>Run <code>node server.js</code> and keep it open</li>
                    </ol>
                    <button onclick="location.reload()" style="margin-top:1rem;padding:.5rem 1rem;background:#ef4444;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:700;">Retry</button>
                </div>
            `;
        });
}

// ========== RENDER CARDS ==========
function renderCards(list) {
    const container = document.getElementById('universityContainer');
    if (!container) return;

    if (!list || list.length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);">No universities found.</p>';
        return;
    }

    container.innerHTML = list.map(uni => {
        const badgeClass = uni.type?.toLowerCase() === 'public'  ? 'badge-public'
                         : uni.type?.toLowerCase() === 'private' ? 'badge-private'
                         : 'badge-deemed';
        const tagsHTML = (uni.tags || []).map(t => `<span class="badge ${badgeClass}">${t}</span>`).join('');
        return `
            <div class="uni-card">
                <div class="uni-card-img">
                    <img src="${uni.image || ''}" alt="${uni.name}" style="width:100%;height:100%;object-fit:cover;">
                    <span class="rank-badge">#${uni.rank}</span>
                    <button class="fav-btn" title="Favourite"><i class="fa-regular fa-heart"></i></button>
                </div>
                <div class="uni-card-body">
                    <h3 class="uni-card-name">${uni.name}</h3>
                    <div class="uni-card-location"><i class="fa-solid fa-location-dot"></i> ${uni.location}</div>
                    <div class="uni-card-tags">${tagsHTML}</div>
                    <div class="uni-card-meta">
                        <div class="uni-meta-item">
                            <span class="uni-meta-label">Type</span>
                            <span class="uni-meta-value">${uni.type}</span>
                        </div>
                        <div class="uni-meta-item">
                            <span class="uni-meta-label">Accreditation</span>
                            <span class="uni-meta-value">${uni.accreditation}</span>
                        </div>
                        <div class="uni-meta-item">
                            <span class="uni-meta-label">Avg. Fees</span>
                            <span class="uni-meta-value">${uni.fees}</span>
                        </div>
                    </div>
                </div>
                <div class="uni-card-footer">
                    <button class="btn btn-primary btn-sm view-details-btn" style="flex:1;justify-content:center;"
                        data-id="${uni._id}" data-name="${uni.name}">
                        View Details
                    </button>
                    <button class="compare-toggle" title="Compare"><i class="fa-solid fa-code-compare"></i></button>
                </div>
            </div>
        `;
    }).join('');

    // Attach "View Details" click events
    container.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const uniName = btn.getAttribute('data-name');
            const uni = allUniversities.find(u => u.name === uniName);
            if (uni) openDetailModal(uni);
        });
    });

    // Favourite toggle
    container.querySelectorAll('.fav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            btn.innerHTML = btn.classList.contains('active')
                ? '<i class="fa-solid fa-heart" style="color:#ef4444;"></i>'
                : '<i class="fa-regular fa-heart"></i>';
        });
    });

    // Compare toggle
    container.querySelectorAll('.compare-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Compare feature coming soon to the React app! Stay tuned.');
        });
    });

    // Apply scroll animation to new cards
    if (window.scrollObserver) {
        container.querySelectorAll('.uni-card').forEach(card => {
            card.classList.add('reveal');
            window.scrollObserver.observe(card);
        });
    }
}

// ========== DETAIL MODAL ==========
function createDetailModal() {
    if (document.getElementById('uniDetailModal')) return;
    const modal = document.createElement('div');
    modal.id = 'uniDetailModal';
    modal.innerHTML = `
        <div class="modal-backdrop" id="modalBackdrop"></div>
        <div class="modal-box" id="modalBox">
            <button class="modal-close" id="modalClose"><i class="fa-solid fa-xmark"></i></button>
            <div id="modalContent"></div>
        </div>
    `;
    document.body.appendChild(modal);

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        #uniDetailModal { display:none; position:fixed; inset:0; z-index:2000; }
        #uniDetailModal.open { display:block; }
        .modal-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.55); backdrop-filter:blur(4px); }
        .modal-box {
            position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
            background:var(--bg-card); border-radius:18px; width:min(700px,94vw);
            max-height:88vh; overflow-y:auto; padding:2rem; box-shadow:0 24px 80px rgba(0,0,0,.3);
            animation:modalIn .25s ease;
        }
        @keyframes modalIn { from{opacity:0;transform:translate(-50%,-46%)} to{opacity:1;transform:translate(-50%,-50%)} }
        .modal-close {
            position:absolute; top:1rem; right:1rem; width:36px; height:36px; border-radius:50%;
            border:none; background:var(--bg-secondary); cursor:pointer; font-size:1.1rem;
            color:var(--text-secondary); display:grid; place-items:center; transition:.2s;
        }
        .modal-close:hover { background:var(--primary); color:#fff; }
        .modal-hero-img { width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:1.25rem; }
        .modal-title { font-size:1.35rem; font-weight:800; color:var(--text-primary); margin-bottom:.4rem; }
        .modal-location { color:var(--text-muted); font-size:.88rem; margin-bottom:1rem; }
        .modal-grid { display:grid; grid-template-columns:1fr 1fr; gap:.85rem; margin:1rem 0; }
        .modal-stat { background:var(--bg-secondary); border-radius:10px; padding:.85rem 1rem; }
        .modal-stat-label { font-size:.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:.05em; }
        .modal-stat-value { font-size:.97rem; font-weight:700; color:var(--text-primary); margin-top:.2rem; }
        .modal-desc { font-size:.9rem; color:var(--text-secondary); line-height:1.65; margin:1rem 0; }
        .modal-facilities { display:flex; flex-wrap:wrap; gap:.45rem; margin:.75rem 0; }
        .modal-fac-chip { padding:.3rem .8rem; border-radius:999px; background:var(--bg-hover); color:var(--primary);
            border:1.5px solid var(--primary); font-size:.8rem; font-weight:600; }
        .modal-section-title { font-size:.88rem; font-weight:700; color:var(--text-primary); margin:.9rem 0 .45rem; }
        .modal-actions { display:flex; gap:.75rem; margin-top:1.5rem; flex-wrap:wrap; }
        .modal-actions .btn { flex:1; min-width:120px; justify-content:center; }
    `;
    document.head.appendChild(style);

    document.getElementById('modalClose').addEventListener('click', closeDetailModal);
    document.getElementById('modalBackdrop').addEventListener('click', closeDetailModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDetailModal(); });
}

function openDetailModal(uni) {
    const modal = document.getElementById('uniDetailModal');
    const content = document.getElementById('modalContent');

    const facilitiesHTML = (uni.facilities || ['Library', 'Hostel', 'Sports']).map(f =>
        `<span class="modal-fac-chip"><i class="fa-solid fa-check" style="font-size:.7rem;"></i> ${f}</span>`
    ).join('');

    const badgeClass = uni.type?.toLowerCase() === 'public'  ? 'badge-public'
                     : uni.type?.toLowerCase() === 'private' ? 'badge-private'
                     : 'badge-deemed';
    const tagsHTML = (uni.tags || []).map(t => `<span class="badge ${badgeClass}" style="font-size:.8rem;">${t}</span>`).join('');

    content.innerHTML = `
        <img class="modal-hero-img" src="${uni.image || ''}" alt="${uni.name}">
        <div class="modal-title">${uni.name}</div>
        <div class="modal-location"><i class="fa-solid fa-location-dot"></i> ${uni.location}</div>
        <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.5rem;">${tagsHTML}</div>
        <p class="modal-desc">${uni.description || 'A leading institution in Hyderabad offering quality education and research opportunities.'}</p>

        <div class="modal-grid">
            <div class="modal-stat">
                <div class="modal-stat-label">Type</div>
                <div class="modal-stat-value">${uni.type}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Accreditation</div>
                <div class="modal-stat-value">${uni.accreditation}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Avg. Fees</div>
                <div class="modal-stat-value">${uni.fees}</div>
            </div>
            <div class="modal-stat">
                <div class="modal-stat-label">Established</div>
                <div class="modal-stat-value">${uni.established || 'N/A'}</div>
            </div>
        </div>

        <div class="modal-section-title"><i class="fa-solid fa-building"></i> Facilities</div>
        <div class="modal-facilities">${facilitiesHTML}</div>

        <div class="modal-actions">
            <button class="btn btn-primary" onclick="window.open('http://localhost:5174/', '_blank')">Apply Now</button>
            <button class="btn btn-outline" onclick="window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank')">Download Brochure</button>
        </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
    const modal = document.getElementById('uniDetailModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}
