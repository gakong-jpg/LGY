document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const nav = document.getElementById('full-menu');
    const sections = document.querySelectorAll('.page-section');
    const h1 = document.getElementById('page-title');
    const boardContent = document.getElementById('board-content');

    // Menu Toggle Logic
    menuToggle.addEventListener('click', () => {
        nav.style.display = 'flex';
        setTimeout(() => nav.classList.add('visible'), 50);
    });

    menuClose.addEventListener('click', () => {
        nav.classList.remove('visible');
        setTimeout(() => nav.style.display = 'none', 800);
    });

    // Background Color Switching Logic
    const dots = document.querySelectorAll('.dot');
    const heroText = document.querySelectorAll('.hero-bg-text span');
    const menuBtn = document.getElementById('menu-toggle');

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            if (dot.classList.contains('white')) {
                // White Mode: White BG, Navy Text
                document.body.style.backgroundColor = '#ffffff';
                updateColors('#000080'); 
            } else if (dot.classList.contains('yellow')) {
                // Yellow Mode: Yellow BG, Black Text
                document.body.style.backgroundColor = '#ffcc00';
                updateColors('#000000');
            } else if (dot.classList.contains('red')) {
                // Red/Blue Mode: Sky Blue BG, Red Text
                document.body.style.backgroundColor = '#3399ff';
                updateColors('#ff0000');
            }
        });
    });

    function updateColors(color) {
        document.body.style.color = color;
        menuBtn.style.color = color;
        heroText.forEach(span => span.style.color = color);
        document.body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
    }

    // Navigation and Page Switching
    const menuLinks = document.querySelectorAll('.menu-list a');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            
            // If it's a normal page (not CONTACT)
            if (page) {
                const pageTitleValue = link.innerText;
                nav.classList.remove('visible');
                setTimeout(() => nav.style.display = 'none', 500);
                switchPage(page, pageTitleValue);
            }
        });
    });

    // Dedicated Trigger for Contact Popup
    const contactTrigger = document.getElementById('menu-contact-trigger');
    contactTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        contactPopup.classList.remove('hidden');
        // Keep menu open or close it? 
        // In the image, the contact info is a side-popup. 
        // I'll keep it as a separate overlay.
    });

    document.querySelector('.back-home').addEventListener('click', () => {
        switchPage('HOME', '');
    });

    // Pop-up Logic
    const contactPopup = document.getElementById('contact-popup');
    const popupClose = document.getElementById('popup-close');

    popupClose.addEventListener('click', () => {
        contactPopup.classList.add('hidden');
    });

    function switchPage(page, titleText) {
        // If CONTACT is clicked, show pop-up and return
        if (page === 'CONTACT') {
            contactPopup.classList.remove('hidden');
            return;
        }
        
        contactPopup.classList.add('hidden'); // Close popup when switching to other pages
        sections.forEach(s => s.classList.add('hidden'));
        sections.forEach(s => s.classList.remove('visible'));

        if (page === 'HOME') {
            const hero = document.getElementById('hero');
            hero.style.display = 'flex';
            setTimeout(() => {
                hero.classList.remove('hidden');
                hero.classList.add('visible');
            }, 50);
        } else {
            const contentPage = document.getElementById('content-page');
            h1.innerText = titleText.toUpperCase();
            contentPage.style.display = 'flex';
            
            // Mock dynamic loading based on page
            loadMockData(page);

            setTimeout(() => {
                contentPage.classList.remove('hidden');
                contentPage.classList.add('visible');
            }, 50);
        }
    }

    function loadMockData(page) {
        boardContent.innerHTML = ''; // Clear
        const data = {
            'SCHOOL': [
                { category: 'DEPARTMENT', title: 'Robot Software @ DMU', desc: 'Dongyang Mirae University - Cultivating expert engineers in robot software operation, maintenance, and field-oriented hardware control.', img: 'images/5.jpg' },
                { category: 'OBJECTIVE', title: 'Professional Engineering', desc: 'Specialized education to create field-ready robot specialists and project-based system integration experts.', img: 'images/3.jpg' },
                { category: 'CAREER', title: 'Global Path & Outlook', desc: 'Graduates advance to industry leaders like Samsung, LG, SK Hynix, and AMK, specializing in automation and robotics.', img: 'images/4.jpg' }
            ],
            'PORTFOLIO': [
                { category: 'EXTERNAL', title: 'Visit Full Portfolio Archive', desc: 'Click here to view my complete engineering projects and live demonstrations on the original portfolio site.', url: 'https://myportfolioo-chi.vercel.app/', isLink: true }
            ],
            'COMPANIES': [
                { category: 'TALENT 01', title: 'Global Technical Synergy', desc: 'Leveraging quadrilingual fluency and 6 years of international experience to lead multi-national engineering collaborations.', img: null },
                { category: 'TALENT 02', title: 'Strategic Problem Solving', desc: 'Expertise in PLC logic analysis and hardware diagnostics to maximize machine uptime and minimize process interruptions.', img: null },
                { category: 'TALENT 03', title: 'Execution & Teamwork', desc: 'Goal-driven professional with strong execution power, ensuring perfect delivery within strict industrial deadlines.', img: null }
            ],
            'LIFE': [
                { category: 'ACHIEVEMENT', title: 'Capstone Competition Winner', desc: 'Led a multidisciplinary team to victory through strong execution and technical leadership.', img: 'images/2.jpeg' },
                { category: 'STORY', title: 'Multilingual Journey', desc: 'Connecting the world through 4 languages: Korean, Chinese, English, and Japanese.', img: 'images/1.jpeg' }
            ]
        };

        const pageData = data[page] || [];
        pageData.forEach(item => {
            const card = document.createElement('div');
            card.className = item.isLink ? 'board-card link-card' : 'board-card';
            
            if (item.isLink) {
                card.addEventListener('click', () => {
                    window.open(item.url, '_blank');
                });
            }

            // Only show image if it exists
            const imageHtml = item.img ? `<div class="card-image"><img src="${item.img}" alt="${item.title}"></div>` : '';
            
            card.innerHTML = `
                ${imageHtml}
                <div class="card-info">
                    <span class="card-category">[ ${item.category} ]</span>
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    ${item.isLink ? '<span class="link-hint">🚀 CLICK TO OPEN EXTERNAL LINK</span>' : ''}
                    <span class="date">${new Date().getFullYear()}.05.07</span>
                </div>
            `;
            boardContent.appendChild(card);
        });
    }
});
