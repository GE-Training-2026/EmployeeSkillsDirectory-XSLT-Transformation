let globalXmlDoc = null;
let globalXslDoc = null;

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch data and style
    Promise.all([
        fetch('data/employees.xml').then(res => res.text()),
        fetch('data/transform.xsl').then(res => res.text())
    ])
    .then(([xmlText, xslText]) => {
        const parser = new DOMParser();
        globalXmlDoc = parser.parseFromString(xmlText, "text/xml");
        globalXslDoc = parser.parseFromString(xslText, "text/xml");

        // Render the initial UI
        renderDirectory();
        setupModal();
    })
    .catch(err => {
        console.error("Error:", err);
        document.getElementById('directoryContainer').innerHTML = `<p style="color:red">Failed to load data.</p>`;
    });
});

// Function to run XSLT and draw HTML
function renderDirectory() {
    const processor = new XSLTProcessor();
    processor.importStylesheet(globalXslDoc);
    
    const fragment = processor.transformToFragment(globalXmlDoc, document);
    const container = document.getElementById('directoryContainer');
    container.innerHTML = ''; 
    container.appendChild(fragment);

    // Re-attach filters every time we re-draw the HTML
    initFilters();
}

function setupModal() {
    const modal = document.getElementById('addModal');
    const form = document.getElementById('addEmployeeForm');
    
    // Open/Close logic
    document.getElementById('addBtn').addEventListener('click', () => modal.classList.remove('hidden'));
    document.getElementById('cancelBtn').addEventListener('click', () => {
        form.reset();
        modal.classList.add('hidden');
    });

    // Handle Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Create a new <employee> XML element
        const newEmp = globalXmlDoc.createElement('employee');
        newEmp.setAttribute('id', 'EMP' + Date.now()); // Generate a random ID
        newEmp.setAttribute('isMentor', document.getElementById('newMentor').checked ? 'true' : 'false');

        // 2. Add text nodes
        const addNode = (tagName, value) => {
            const node = globalXmlDoc.createElement(tagName);
            node.textContent = value;
            newEmp.appendChild(node);
        };
        addNode('name', document.getElementById('newName').value);
        addNode('role', document.getElementById('newRole').value);
        addNode('department', document.getElementById('newDept').value);
        addNode('email', document.getElementById('newEmail').value);

        // 3. Add skills nodes (split by comma)
        const skillsContainer = globalXmlDoc.createElement('skills');
        const skillsArray = document.getElementById('newSkills').value.split(',');
        skillsArray.forEach(skillStr => {
            const skillNode = globalXmlDoc.createElement('skill');
            skillNode.textContent = skillStr.trim();
            skillsContainer.appendChild(skillNode);
        });
        newEmp.appendChild(skillsContainer);

        // 4. Append to the root <registry> tag in our XML memory
        globalXmlDoc.documentElement.appendChild(newEmp);

        // 5. Cleanup and Re-render!
        form.reset();
        modal.classList.add('hidden');
        renderDirectory(); 
    });
}

function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const deptFilter = document.getElementById('deptFilter');
    const mentorFilter = document.getElementById('mentorFilter');
    const cards = document.querySelectorAll('.employee-card');

    function applyFilters() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedDept = deptFilter.value;
        const mentorsOnly = mentorFilter.checked;

        cards.forEach(card => {
            const name = card.getAttribute('data-name');
            const dept = card.getAttribute('data-department');
            const isMentor = card.querySelector('.mentor-badge') !== null;

            const matchesSearch = name.includes(searchTerm);
            const matchesDept = selectedDept === 'All' || dept === selectedDept;
            const matchesMentor = !mentorsOnly || isMentor;

            card.style.display = (matchesSearch && matchesDept && matchesMentor) ? 'flex' : 'none';
        });
    }

    searchInput.addEventListener('input', applyFilters);
    deptFilter.addEventListener('change', applyFilters);
    mentorFilter.addEventListener('change', applyFilters);
}