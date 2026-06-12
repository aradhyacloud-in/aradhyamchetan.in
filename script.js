// Fetch and Render Projects
async function loadProjects() {
    try {
        const response = await fetch('projects.json');
        const projects = await response.json();
        const container = document.getElementById('project-container');

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.aim}</p>
                <button class="view-btn">View Project</button>
            `;
            // Click event for "Zoom" effect
            card.addEventListener('click', () => expandProject(project));
            container.appendChild(card);
        });
    } catch (err) {
        console.error("Error loading projects:", err);
    }
}

function expandProject(project) {
    // This function will handle the full-screen modal animation
    console.log("Opening:", project.title);
    // Future logic for GSAP animation will go here
}

document.addEventListener('DOMContentLoaded', loadProjects);