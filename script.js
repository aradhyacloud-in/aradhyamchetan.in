let projectsData = [];

// --- FETCH PROJECTS FROM JSON ---
async function fetchProjects() {
    try {
        const response = await fetch('projects.json');
        projectsData = await response.json();
        loadProjects(); // Call function to render cards after data loads
    } catch (error) {
        console.error("Error loading projects.json:", error);
    }
}

// --- RENDER PROJECTS & CAROUSEL LOGIC ---
const projectsTrack = document.getElementById('projectsTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function loadProjects() {
    projectsData.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <div>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-tech"><i class="fa-solid fa-screwdriver-wrench"></i> ${project.tools}</p>
                <p class="project-summary">${project.aim}</p>
            </div>
            <button class="btn-secondary" onclick="openModal(${project.id})">View Project</button>
        `;
        projectsTrack.appendChild(card);
    });
}

// Carousel Scroll Functionality
const scrollAmount = 350; // Adjust based on card width
nextBtn.addEventListener('click', () => {
    projectsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});
prevBtn.addEventListener('click', () => {
    projectsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

// --- MODAL LOGIC (Full Page Zoom) ---
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');

const mTitle = document.getElementById('modalTitle');
const mAim = document.getElementById('modalAim');
const mTools = document.getElementById('modalTools');
const mSuccess = document.getElementById('modalSuccess');
const mTimeline = document.getElementById('modalTimeline');
const mDesc = document.getElementById('modalDesc');

// Open Modal
window.openModal = function(id) {
    const project = projectsData.find(p => p.id === id);
    if(project) {
        mTitle.innerText = project.title;
        mAim.innerText = project.aim;
        mTools.innerText = project.tools;
        mSuccess.innerText = project.success;
        mTimeline.innerText = project.timeline;
        mDesc.innerText = project.desc;
        
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

// Close Modal via button
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
});

// Close Modal by clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(10, 14, 23, 0.95)';
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'rgba(10, 14, 23, 0.9)';
        nav.style.boxShadow = 'none';
    }
});

// Initialize by fetching the data
fetchProjects();