// Vanilla JS Portfolio Renderer & Editor
document.addEventListener('DOMContentLoaded', () => {
    let data = window.PortfolioApp?.DEFAULT_DATA;
    const Icons = window.PortfolioApp?.Icons;

    if (!data || !Icons) {
        console.error("Failed to load portfolio data or icons.");
        return;
    }

    // Try loading saved data from localStorage to persist edits locally
    const savedData = localStorage.getItem('portfolio_local_data');
    if (savedData) {
        try {
            data = JSON.parse(savedData);
        } catch (e) {
            console.error("Failed to parse saved local portfolio data:", e);
        }
    }

    const root = document.getElementById('root');
    if (!root) return;

    // Render function
    const render = () => {
        root.innerHTML = `
            <div class="min-h-screen bg-gray-950 text-gray-200 font-sans selection:bg-orange-500 selection:text-white relative">
                <!-- Navigation -->
                <nav class="fixed w-full z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/80 shadow-lg">
                    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
                        <div id="nav-logo" class="flex items-center space-x-3 cursor-pointer group" title="Click to open Edit Mode (Password Required)">
                            <div class="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-orange-500/20 shadow-lg group-hover:scale-105 transition-transform duration-300">
                                <span class="text-white font-bold text-xl">P</span>
                            </div>
                            <span class="text-xl font-black text-white tracking-wider">PORTFOLIO</span>
                        </div>
                        <div class="hidden md:flex space-x-8" id="nav-links-desktop">
                            <button data-target="home" class="nav-btn text-xs font-bold tracking-widest transition-colors duration-300 hover:text-orange-400 uppercase text-orange-400">HOME</button>
                            ${Object.keys(data.titles).map(key => `
                                <button data-target="${key}" class="nav-btn text-xs font-bold tracking-widest transition-colors duration-300 hover:text-orange-400 uppercase text-gray-400">${data.titles[key]}</button>
                            `).join('')}
                        </div>
                        <div class="md:hidden">
                            <button id="mobile-menu-btn" class="text-gray-400 hover:text-white transition-colors w-6 h-6">
                                ${Icons.Menu}
                            </button>
                        </div>
                    </div>
                    <div id="mobile-menu" class="hidden md:hidden bg-gray-950 border-t border-gray-850">
                        <div class="px-6 py-6 space-y-3">
                            <button data-target="home" class="mobile-nav-btn block w-full text-left py-2.5 text-gray-300 hover:text-orange-400 font-bold tracking-wide transition-colors uppercase">HOME</button>
                            ${Object.keys(data.titles).map(key => `
                                <button data-target="${key}" class="mobile-nav-btn block w-full text-left py-2.5 text-gray-300 hover:text-orange-400 font-bold tracking-wide transition-colors uppercase">${data.titles[key]}</button>
                            `).join('')}
                        </div>
                    </div>
                </nav>

                <!-- Hero Section -->
                <section id="home" class="min-h-screen pt-32 pb-20 md:pt-0 md:pb-0 flex items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black relative overflow-hidden">
                    <div class="absolute top-20 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    <div class="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
                    <div class="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-16">
                        <div class="flex-1 text-center md:text-left space-y-6">
                            <div class="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                                <span class="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                                Available for Internship / Work
                            </div>
                            <h1 class="text-4xl md:text-6xl font-black text-white leading-tight">
                                สวัสดีครับ, ผม <br/>
                                <span id="edit-name" class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 inline-block" data-editable>
                                    ${data.personalInfo.name || "ปฏิภาณ จักรเงิน"}
                                </span>
                            </h1>
                            <h2 class="text-xl md:text-2xl text-gray-400 font-medium">
                                <span id="edit-engName" data-editable>${data.personalInfo.engName || "Patiphan Chakngoen"}</span>
                            </h2>
                            <div class="text-lg md:text-xl text-gray-300 font-semibold flex items-center justify-center md:justify-start gap-2">
                                <div class="w-5 h-5 text-orange-500 flex-shrink-0">${Icons.Gamepad2}</div>
                                <span id="edit-role" data-editable>${data.personalInfo.role || "Game Programmer"}</span>
                            </div>
                            <p id="edit-hero-desc" class="text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed text-base font-light" data-editable>
                                ${data.personalInfo.heroDesc || "นักพัฒนาเกมที่มีความหลงใหลในการสร้าง Core Mechanics และ System Design เชี่ยวชาญ Unity และ C# พร้อมเรียนรู้และเติบโตในอุตสาหกรรมเกม"}
                            </p>
                            <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                                <button id="hero-view-work" class="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/45 hover:-translate-y-0.5 transition-all duration-300">ดูผลงานของผม</button>
                                <button id="hero-contact" class="px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl border border-gray-800 hover:bg-gray-850 hover:border-gray-700 transition-all duration-300 flex items-center justify-center gap-2">
                                    <div class="w-4.5 h-4.5">${Icons.Mail}</div> ติดต่อ
                                </button>
                            </div>
                        </div>
                        <div class="flex-1 flex justify-center relative">
                            <div class="relative w-64 h-64 md:w-80 md:h-80 group">
                                <div class="absolute inset-0 bg-gradient-to-tr from-orange-500 via-amber-500 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                                <div class="absolute inset-1 bg-gray-950 rounded-full flex items-center justify-center overflow-hidden border-4 border-gray-800/80 shadow-2xl relative z-10" id="profile-img-container">
                                    ${data.personalInfo.profileImage ? `
                                        <img src="${data.personalInfo.profileImage}" alt="Profile" class="w-full h-full object-cover rounded-full" id="profile-image-view" />
                                    ` : `
                                        <div class="flex flex-col items-center text-gray-500" id="profile-image-placeholder">
                                            <div class="w-20 h-20 mb-2 opacity-30">${Icons.User}</div>
                                            <span class="text-xs uppercase tracking-wider font-bold text-gray-600">No Image</span>
                                        </div>
                                    `}
                                </div>
                                <button class="edit-control absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-lg z-20 cursor-pointer" id="edit-profile-img-btn">
                                    Change Image
                                </button>
                            </div>
                        </div>
                    </div>
                    <div id="scroll-down-btn" class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-600 cursor-pointer hidden md:block w-8 h-8">${Icons.ChevronDown}</div>
                </section>

                <!-- About Section -->
                <section id="about" class="py-24 px-6 bg-gray-950 relative border-t border-gray-900">
                    <div class="container mx-auto max-w-4xl">
                        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-16 text-center relative after:content-[''] after:block after:w-12 after:h-1 after:bg-orange-500 after:mx-auto after:mt-4">
                            <span id="edit-title-about" data-editable>${data.titles.about || "เกี่ยวกับผม (Preface)"}</span>
                        </h2>
                        <div class="grid md:grid-cols-2 gap-8 items-start">
                            <div class="bg-gray-900/40 backdrop-blur border border-gray-800/80 p-8 rounded-2xl shadow-xl space-y-6">
                                <h3 class="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-4">
                                    <div class="w-5 h-5 text-orange-500">${Icons.User}</div>
                                    ข้อมูลส่วนตัว
                                </h3>
                                <ul class="space-y-4 text-sm font-medium">
                                    <li class="flex justify-between border-b border-gray-800/30 pb-3">
                                        <span class="text-gray-400 font-light">ชื่อเล่น:</span>
                                        <span id="edit-nickname" class="text-white" data-editable>${data.personalInfo.nickname || "Best"}</span>
                                    </li>
                                    <li class="flex justify-between border-b border-gray-800/30 pb-3">
                                        <span class="text-gray-400 font-light">ที่อยู่:</span>
                                        <span id="edit-address" class="text-white text-right max-w-[220px]" data-editable>${data.personalInfo.address || "-"}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bg-gray-900/40 backdrop-blur border border-gray-800/80 p-8 rounded-2xl shadow-xl space-y-6">
                                <h3 class="text-lg font-bold text-white flex items-center gap-2.5 border-b border-gray-800 pb-4">
                                    <div class="w-5 h-5 text-orange-500">${Icons.BookOpen}</div>
                                    จุดมุ่งหมายและการทำงาน
                                </h3>
                                <p id="edit-about-desc" class="text-gray-300 leading-relaxed text-sm font-light" data-editable>
                                    ${data.personalInfo.aboutDesc || "ผมตั้งใจที่จะพัฒนาทักษะด้าน Game Programming ให้เชี่ยวชาญยิ่งขึ้น โดยมีความตั้งใจในการร่วมออกแบบและพัฒนา Core Mechanics ที่ตอบสนองความต้องการของผู้เล่นได้อย่างยอดเยี่ยม และมุ่งหวังที่จะนำทักษะด้าน OOP, Data Structures และ Game Logic มาสร้างประสบการณ์ความสนุกแปลกใหม่ในผลงานทุกชิ้น"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Skills Section -->
                <section id="skills" class="py-24 px-6 bg-black relative border-t border-gray-900">
                    <div class="container mx-auto">
                        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-16 text-center relative after:content-[''] after:block after:w-12 after:h-1 after:bg-orange-500 after:mx-auto after:mt-4">
                            <span id="edit-title-skills" data-editable>${data.titles.skills || "Technical Skills"}</span>
                        </h2>
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${data.skillCategories.map(category => {
                                const categoryIcon = Icons[category.iconType] || Icons.Cpu;
                                return `
                                    <div class="skill-card bg-gray-950/60 border border-gray-900 p-6 rounded-2xl shadow-lg hover:border-orange-500/20 hover:shadow-orange-500/5 transition-all duration-300 relative" data-icon-type="${category.iconType}">
                                        <button class="edit-control absolute top-2 right-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded p-1 cursor-pointer delete-skill-category-btn" title="Delete Category" style="font-size: 10px;">×</button>
                                        <div class="flex items-center gap-3.5 mb-6 border-b border-gray-900 pb-4">
                                            <div class="p-2.5 bg-orange-500/10 rounded-xl text-orange-500 w-10 h-10 flex items-center justify-center">
                                                ${categoryIcon}
                                            </div>
                                            <h3 class="skill-category-title text-base font-bold text-white tracking-wide" data-editable>${category.title}</h3>
                                        </div>
                                        <div class="flex flex-wrap gap-2 skill-tags-container">
                                            ${category.items.map(skill => `
                                                <span class="skill-tag px-3 py-1.5 bg-gray-900/60 text-gray-300 rounded-lg text-xs font-semibold border border-gray-800 hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/20 transition-all duration-300 flex items-center gap-1.5">
                                                    <span class="skill-text" data-editable>${skill}</span>
                                                    <button class="edit-control text-red-500 hover:text-red-400 font-bold delete-skill-btn cursor-pointer" style="font-size: 10px;">×</button>
                                                </span>
                                            `).join('')}
                                            <button class="edit-control px-2.5 py-1 bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 text-xs font-bold rounded-lg cursor-pointer add-skill-btn">+ Add</button>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                        <div class="edit-control w-full flex justify-center mt-8">
                            <button id="add-skill-category-btn" class="px-6 py-3 bg-gray-900 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-gray-800 hover:border-orange-500/30 font-bold rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-2">
                                + Add New Skill Category
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Projects Section -->
                <section id="projects" class="py-24 px-6 bg-gray-950 border-t border-gray-900">
                    <div class="container mx-auto">
                        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-16 text-center relative after:content-[''] after:block after:w-12 after:h-1 after:bg-orange-500 after:mx-auto after:mt-4">
                            <span id="edit-title-projects" data-editable>${data.titles.projects || "Featured Projects"}</span>
                        </h2>
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            ${data.projects.map(project => `
                                <div class="project-card flex flex-col bg-gray-900/30 backdrop-blur border border-gray-800/80 rounded-2xl overflow-hidden hover:border-orange-500/20 hover:-translate-y-1 transition-all duration-300 shadow-xl group relative" data-id="${project.id}" data-link="${project.link}" data-image-color="${project.imageColor || 'bg-gray-800'}" data-embed-url="${project.embedUrl || ''}">
                                    <button class="edit-control absolute top-2 left-2 bg-red-600/30 hover:bg-red-600 text-red-400 hover:text-white rounded px-2.5 py-1 cursor-pointer delete-project-btn z-30" style="font-size: 10px;">Delete Card</button>
                                    <div class="h-48 flex items-center justify-center relative overflow-hidden project-image-container ${project.imageColor || 'bg-gray-800'}">
                                        ${project.image ? `
                                            <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ` : `
                                            <div class="text-center p-6 text-white/50 project-placeholder">
                                                <div class="w-11 h-11 mx-auto mb-2 opacity-40 group-hover:scale-105 transition-transform">${Icons.Gamepad2}</div>
                                                <span class="text-xs uppercase font-extrabold tracking-widest project-engine-badge">${project.engine}</span>
                                            </div>
                                        `}
                                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 link-overlay">
                                            ${project.link && project.link !== "#" ? `
                                                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="p-3 bg-orange-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg w-11 h-11 flex items-center justify-center project-link-anchor">
                                                    ${Icons.ExternalLink}
                                                </a>
                                            ` : ''}
                                        </div>
                                        <!-- Edit Project Image/Link controls -->
                                        <div class="edit-control absolute top-2 right-2 flex gap-1.5 z-20">
                                            <button class="bg-gray-900/90 hover:bg-orange-600 text-white border border-gray-700 text-[10px] font-bold px-2.5 py-1 rounded shadow cursor-pointer change-project-img-btn">Img</button>
                                            <button class="bg-gray-900/90 hover:bg-orange-600 text-white border border-gray-700 text-[10px] font-bold px-2.5 py-1 rounded shadow cursor-pointer change-project-link-btn">Link</button>
                                        </div>
                                    </div>
                                    <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
                                        <div>
                                            <div class="flex justify-between items-start mb-2">
                                                <h3 class="project-title text-lg font-bold text-white group-hover:text-orange-400 transition-colors" data-editable>${project.title}</h3>
                                                <span class="project-engine px-2.5 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold rounded-full" data-editable>${project.engine}</span>
                                            </div>
                                            <p class="project-type text-xs text-gray-400 font-semibold mb-4" data-editable>${project.type}</p>
                                            <p class="project-desc text-sm text-gray-300 leading-relaxed font-light mb-4" data-editable>${project.description}</p>
                                            <div class="space-y-2 border-t border-gray-850 pt-4">
                                                <span class="text-xs text-gray-500 font-bold uppercase tracking-wider block">หน้าที่ความรับผิดชอบ:</span>
                                                <ul class="text-xs text-gray-400 space-y-1.5 list-disc pl-4 font-light">
                                                    ${project.responsibilities.map(item => `
                                                        <li class="project-responsibility flex justify-between items-start gap-1 font-light">
                                                            <span class="responsibility-text" data-editable>${item}</span>
                                                            <button class="edit-control text-red-500 hover:text-red-400 font-bold delete-responsibility-btn cursor-pointer ml-1" style="font-size: 10px;">×</button>
                                                        </li>
                                                    `).join('')}
                                                    <button class="edit-control px-2 py-0.5 bg-orange-500/20 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/30 text-[10px] font-bold rounded cursor-pointer add-responsibility-btn">+ Add</button>
                                                </ul>
                                            </div>
                                        </div>
                                        ${project.link && project.link !== "#" ? `
                                            <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-gray-950/60 hover:bg-orange-500 text-orange-400 hover:text-white border border-orange-500/20 hover:border-orange-500 font-bold rounded-xl transition-all duration-300 text-xs">
                                                ดูหน้าร้านค้าเกม
                                                <div class="w-3.5 h-3.5">${Icons.ExternalLink}</div>
                                            </a>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <div class="edit-control w-full flex justify-center mt-12">
                            <button id="add-project-btn" class="px-8 py-4 bg-gray-900 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 border border-gray-800 hover:border-orange-500/30 font-bold rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-2">
                                + Add New Project Card
                            </button>
                        </div>
                    </div>
                </section>

                <!-- Contact Section -->
                <section id="contact" class="py-24 px-6 bg-black relative border-t border-gray-900">
                    <div class="container mx-auto max-w-4xl text-center">
                        <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-6 relative after:content-[''] after:block after:w-12 after:h-1 after:bg-orange-500 after:mx-auto after:mt-4">
                            <span id="edit-title-contact" data-editable>${data.titles.contact || "Contact Me"}</span>
                        </h2>
                        <p class="text-gray-400 mb-16 max-w-lg mx-auto text-sm font-light">
                            ยินดีพูดคุยและร่วมงานด้วยเสมอ สามารถติดต่อผมได้ตามช่องทางต่างๆ ด้านล่างนี้ครับ
                        </p>
                        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                            <a href="mailto:${data.personalInfo.email}" class="bg-gray-950 border border-gray-900/60 p-6 rounded-2xl flex items-center gap-4 hover:border-orange-500/20 transition-all duration-300 shadow-md">
                                <div class="p-3 bg-orange-500/10 text-orange-500 rounded-xl w-11 h-11 flex items-center justify-center">${Icons.Mail}</div>
                                <div>
                                    <span class="text-xs text-gray-500 uppercase font-bold tracking-wider">Email</span>
                                    <p id="edit-email" class="text-sm font-semibold text-white break-all" data-editable>${data.personalInfo.email}</p>
                                </div>
                            </a>
                            <a href="tel:${data.personalInfo.phone}" class="bg-gray-950 border border-gray-900/60 p-6 rounded-2xl flex items-center gap-4 hover:border-orange-500/20 transition-all duration-300 shadow-md">
                                <div class="p-3 bg-orange-500/10 text-orange-500 rounded-xl w-11 h-11 flex items-center justify-center">${Icons.Phone}</div>
                                <div>
                                    <span class="text-xs text-gray-500 uppercase font-bold tracking-wider">Phone</span>
                                    <p id="edit-phone" class="text-sm font-semibold text-white" data-editable>${data.personalInfo.phone}</p>
                                </div>
                            </a>
                            ${data.personalInfo.line ? `
                                <a href="${data.personalInfo.line}" target="_blank" rel="noopener noreferrer" class="bg-gray-950 border border-gray-900/60 p-6 rounded-2xl flex items-center gap-4 hover:border-orange-500/20 transition-all duration-300 shadow-md" id="edit-line-url">
                                    <div class="p-3 bg-orange-500/10 text-orange-500 rounded-xl w-11 h-11 flex items-center justify-center">${Icons.ExternalLink}</div>
                                    <div>
                                        <span class="text-xs text-gray-500 uppercase font-bold tracking-wider">Line</span>
                                        <p id="edit-line" class="text-sm font-semibold text-white" data-editable>แอดไลน์ที่นี่</p>
                                    </div>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </section>

                <!-- Footer -->
                <footer class="bg-black py-8 border-t border-gray-950">
                    <div class="container mx-auto px-6 text-center">
                        <p class="text-gray-600 text-xs font-medium">© ${new Date().getFullYear()} <span id="edit-footname" data-editable>${data.personalInfo.engName || "Your Name"}</span>. All Rights Reserved.</p>
                    </div>
                </footer>

                <!-- Floating Admin Control Panel -->
                <div id="admin-panel" class="edit-control fixed bottom-6 right-6 z-50 bg-gray-900/95 border border-orange-500 p-5 rounded-2xl shadow-2xl flex flex-col gap-3 backdrop-blur max-w-xs animate-fade-in">
                    <div class="text-orange-500 font-black tracking-widest text-center text-[10px] border-b border-gray-800 pb-2">PORTFOLIO EDIT MODE</div>
                    <button id="admin-save-btn" class="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2">
                        บันทึกการแก้ไข (Save Locally)
                    </button>
                    <button id="admin-download-btn" class="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2">
                        ดาวน์โหลดสคริปต์ (Download data.js)
                    </button>
                    <button id="admin-exit-btn" class="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-2">
                        ออกจากโหมดแก้ไข (Exit)
                    </button>
                </div>
            </div>
        `;

        bindEvents();
    };

    // Scrape updated DOM elements back into a data object
    const scrapeData = () => {
        // Scrape personalInfo
        const personalInfo = {
            name: document.getElementById('edit-name').innerText.trim(),
            engName: document.getElementById('edit-engName').innerText.trim(),
            nickname: document.getElementById('edit-nickname').innerText.trim(),
            role: document.getElementById('edit-role').innerText.trim(),
            email: document.getElementById('edit-email').innerText.trim(),
            phone: document.getElementById('edit-phone').innerText.trim(),
            address: document.getElementById('edit-address').innerText.trim(),
            line: document.getElementById('edit-line-url') ? document.getElementById('edit-line-url').getAttribute('href') : (data.personalInfo.line || ""),
            facebook: data.personalInfo.facebook || "",
            itch: data.personalInfo.itch || "",
            profileImage: document.getElementById('profile-image-view') ? document.getElementById('profile-image-view').getAttribute('src') : (data.personalInfo.profileImage || null),
            aboutDesc: document.getElementById('edit-about-desc').innerText.trim(),
            heroDesc: document.getElementById('edit-hero-desc').innerText.trim()
        };

        // Scrape titles
        const titles = {
            about: document.getElementById('edit-title-about').innerText.trim(),
            skills: document.getElementById('edit-title-skills').innerText.trim(),
            projects: document.getElementById('edit-title-projects').innerText.trim(),
            contact: document.getElementById('edit-title-contact').innerText.trim()
        };

        // Scrape skill categories
        const skillCategories = [];
        document.querySelectorAll('.skill-card').forEach(card => {
            const title = card.querySelector('.skill-category-title').innerText.trim();
            const iconType = card.dataset.iconType || "Cpu";
            const items = [];
            card.querySelectorAll('.skill-tag').forEach(tag => {
                const text = tag.querySelector('.skill-text').innerText.trim();
                if (text) items.push(text);
            });
            skillCategories.push({ title, iconType, items });
        });

        // Scrape projects
        const projects = [];
        document.querySelectorAll('.project-card').forEach((card, index) => {
            const id = parseInt(card.dataset.id) || (index + 1);
            const title = card.querySelector('.project-title').innerText.trim();
            const engine = card.querySelector('.project-engine').innerText.trim();
            const type = card.querySelector('.project-type').innerText.trim();
            const description = card.querySelector('.project-desc').innerText.trim();
            const imageColor = card.dataset.imageColor || "bg-gray-800";
            const image = card.querySelector('img') ? card.querySelector('img').getAttribute('src') : null;
            
            const responsibilities = [];
            card.querySelectorAll('.project-responsibility').forEach(li => {
                const text = li.querySelector('.responsibility-text').innerText.trim();
                if (text) responsibilities.push(text);
            });

            const link = card.dataset.link || "#";
            const embedUrl = card.dataset.embedUrl || "";
            const gallery = [];

            projects.push({
                id, title, type, engine, description, responsibilities, link, embedUrl, imageColor, image, gallery
            });
        });

        return { personalInfo, titles, projects, skillCategories };
    };

    // Download updated folio-data.js file
    const downloadDataJS = (updatedData) => {
        const fileContent = `// Pre-rendered Portfolio Data
window.PortfolioApp.DEFAULT_DATA = ${JSON.stringify(updatedData, null, 4)};
`;
        const blob = new Blob([fileContent], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'folio-data.js';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Bind event handlers
    const bindEvents = () => {
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        let isMobileMenuOpen = false;

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                isMobileMenuOpen = !isMobileMenuOpen;
                if (isMobileMenuOpen) {
                    mobileMenu.classList.remove('hidden');
                    mobileMenuBtn.innerHTML = Icons.X;
                } else {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.innerHTML = Icons.Menu;
                }
            });
        }

        // Scroll to section function
        const scrollToSection = (id) => {
            const element = document.getElementById(id);
            if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (isMobileMenuOpen && mobileMenuBtn && mobileMenu) {
                    isMobileMenuOpen = false;
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.innerHTML = Icons.Menu;
                }
            }
        };

        // Bind scroll down buttons
        const scrollDownBtn = document.getElementById('scroll-down-btn');
        if (scrollDownBtn) {
            scrollDownBtn.addEventListener('click', () => scrollToSection('about'));
        }

        const heroViewWorkBtn = document.getElementById('hero-view-work');
        if (heroViewWorkBtn) {
            heroViewWorkBtn.addEventListener('click', () => scrollToSection('projects'));
        }

        const heroContactBtn = document.getElementById('hero-contact');
        if (heroContactBtn) {
            heroContactBtn.addEventListener('click', () => scrollToSection('contact'));
        }

        // Bind Desktop Nav
        const desktopNavLinks = document.querySelectorAll('#nav-links-desktop button');
        desktopNavLinks.forEach(btn => {
            btn.addEventListener('click', () => {
                scrollToSection(btn.dataset.target);
            });
        });

        // Bind Mobile Nav
        const mobileNavLinks = document.querySelectorAll('#mobile-menu button');
        mobileNavLinks.forEach(btn => {
            btn.addEventListener('click', () => {
                scrollToSection(btn.dataset.target);
            });
        });

        // Logo click checks for Edit Mode (Secret Password Hook)
        const navLogo = document.getElementById('nav-logo');
        if (navLogo) {
            navLogo.addEventListener('click', (e) => {
                // If already in edit mode, it scrolls to home. Otherwise check password
                if (document.body.classList.contains('edit-mode-active')) {
                    scrollToSection('home');
                    return;
                }

                const password = prompt("กรุณากรอกรหัสผ่านเพื่อเปิดโหมดแก้ไข (Edit Mode):");
                if (password === "Pas#od15BeSt_2881") {
                    document.body.classList.add('edit-mode-active');
                    // Force designated edit fields to be editable
                    document.querySelectorAll('[data-editable]').forEach(el => {
                        el.contentEditable = "true";
                    });
                    alert("ยินดีต้อนรับสู่โหมดแก้ไข! คุณสามารถคลิกพิมพ์แก้ไขเนื้อหาบนเว็ปไซต์ได้ทันที");
                } else if (password !== null) {
                    alert("รหัสผ่านไม่ถูกต้อง!");
                    scrollToSection('home');
                }
            });
        }

        // Admin Save Locally
        const saveLocallyBtn = document.getElementById('admin-save-btn');
        if (saveLocallyBtn) {
            saveLocallyBtn.addEventListener('click', () => {
                const updated = scrapeData();
                localStorage.setItem('portfolio_local_data', JSON.stringify(updated));
                data = updated;
                alert("บันทึกการแก้ไขในบราวเซอร์เครื่องนี้สำเร็จ! ข้อมูลจะยังคงอยู่แม้รีเฟรชหน้าเว็บ");
            });
        }

        // Admin Download JS File
        const downloadJSBtn = document.getElementById('admin-download-btn');
        if (downloadJSBtn) {
            downloadJSBtn.addEventListener('click', () => {
                const updated = scrapeData();
                downloadDataJS(updated);
                alert("ดาวน์โหลดไฟล์ folio-data.js สำเร็จ! นำไฟล์นี้ไปทับในโฟลเดอร์ js/ แล้วคอมมิต/ดีพลอยเพื่ออัปเดตเว็ปไซต์จริงได้เลยครับ");
            });
        }

        // Admin Exit Edit Mode
        const exitBtn = document.getElementById('admin-exit-btn');
        if (exitBtn) {
            exitBtn.addEventListener('click', () => {
                document.body.classList.remove('edit-mode-active');
                document.querySelectorAll('[data-editable]').forEach(el => {
                    el.contentEditable = "false";
                });
                alert("ออกจากโหมดแก้ไขแล้ว");
                render(); // Re-render to clear temporary UI modifications
            });
        }

        // Edit Profile Image Button
        const editProfileImgBtn = document.getElementById('edit-profile-img-btn');
        if (editProfileImgBtn) {
            editProfileImgBtn.addEventListener('click', () => {
                const current = data.personalInfo.profileImage || "";
                const url = prompt("วางลิงก์รูปโปรไฟล์ใหม่ (Image URL):", current);
                if (url !== null) {
                    data.personalInfo.profileImage = url.trim() || null;
                    render();
                    document.body.classList.add('edit-mode-active');
                    document.querySelectorAll('[data-editable]').forEach(el => el.contentEditable = "true");
                }
            });
        }

        // Add Skill Category
        const addSkillCategoryBtn = document.getElementById('add-skill-category-btn');
        if (addSkillCategoryBtn) {
            addSkillCategoryBtn.addEventListener('click', () => {
                const name = prompt("ป้อนชื่อหมวดหมู่ทักษะใหม่:");
                if (name && name.trim()) {
                    data.skillCategories.push({
                        title: name.trim(),
                        iconType: "Cpu",
                        items: ["New Skill"]
                    });
                    render();
                    document.body.classList.add('edit-mode-active');
                    document.querySelectorAll('[data-editable]').forEach(el => el.contentEditable = "true");
                }
            });
        }

        // Add Project Card
        const addProjectBtn = document.getElementById('add-project-btn');
        if (addProjectBtn) {
            addProjectBtn.addEventListener('click', () => {
                const name = prompt("ป้อนชื่อโครงการผลงานใหม่:");
                if (name && name.trim()) {
                    data.projects.push({
                        id: Date.now(),
                        title: name.trim(),
                        type: "Game Type (e.g. 2D Platformer)",
                        engine: "Unity",
                        description: "คำอธิบายรายละเอียดผลงานเกมสั้นๆ...",
                        responsibilities: ["เขียนระบบการทำงานเบื้องหลัง (Core Gameplay)"],
                        link: "#",
                        embedUrl: "",
                        imageColor: "bg-gray-800",
                        image: null,
                        gallery: []
                    });
                    render();
                    document.body.classList.add('edit-mode-active');
                    document.querySelectorAll('[data-editable]').forEach(el => el.contentEditable = "true");
                }
            });
        }

        // Scroll Spy handler
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 220;

            sections.forEach(section => {
                const element = document.getElementById(section);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        desktopNavLinks.forEach(btn => {
                            if (btn.dataset.target === section) {
                                btn.classList.add('text-orange-400');
                                btn.classList.remove('text-gray-400');
                            } else {
                                btn.classList.remove('text-orange-400');
                                btn.classList.add('text-gray-400');
                            }
                        });
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
    };

    // Global listener for dynamic edit mode UI operations (Delete item, add tag inline)
    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('edit-mode-active')) return;

        // 1. Delete skill category
        if (e.target.classList.contains('delete-skill-category-btn')) {
            const card = e.target.closest('.skill-card');
            if (card && confirm("ต้องการลบหมวดหมู่ทักษะนี้ใช่หรือไม่?")) {
                card.remove();
            }
        }

        // 2. Delete individual skill tag
        if (e.target.classList.contains('delete-skill-btn')) {
            const tag = e.target.closest('.skill-tag');
            if (tag) tag.remove();
        }

        // 3. Add skill tag
        if (e.target.classList.contains('add-skill-btn')) {
            const btn = e.target;
            const container = btn.closest('.skill-tags-container');
            const text = prompt("พิมพ์ทักษะที่ต้องการเพิ่ม:");
            if (text && text.trim()) {
                const newTag = document.createElement('span');
                newTag.className = "skill-tag px-3 py-1.5 bg-gray-900/60 text-gray-300 rounded-lg text-xs font-semibold border border-gray-800 hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/20 transition-all duration-300 flex items-center gap-1.5";
                newTag.innerHTML = `
                    <span class="skill-text" data-editable contenteditable="true">${text.trim()}</span>
                    <button class="edit-control text-red-500 hover:text-red-400 font-bold delete-skill-btn cursor-pointer" style="font-size: 10px; display: inline-flex;">×</button>
                `;
                container.insertBefore(newTag, btn);
            }
        }

        // 4. Delete Project card
        if (e.target.classList.contains('delete-project-btn')) {
            const card = e.target.closest('.project-card');
            if (card && confirm("ต้องการลบโครงการผลงานชิ้นนี้ใช่หรือไม่?")) {
                card.remove();
            }
        }

        // 5. Delete project responsibility bullet
        if (e.target.classList.contains('delete-responsibility-btn')) {
            const li = e.target.closest('.project-responsibility');
            if (li) li.remove();
        }

        // 6. Add project responsibility bullet
        if (e.target.classList.contains('add-responsibility-btn')) {
            const btn = e.target;
            const ul = btn.closest('ul');
            const text = prompt("พิมพ์หน้าที่ความรับผิดชอบใหม่:");
            if (text && text.trim()) {
                const li = document.createElement('li');
                li.className = "project-responsibility flex justify-between items-start gap-1 font-light";
                li.innerHTML = `
                    <span class="responsibility-text" data-editable contenteditable="true">${text.trim()}</span>
                    <button class="edit-control text-red-500 hover:text-red-400 font-bold delete-responsibility-btn cursor-pointer ml-1" style="font-size: 10px; display: inline-flex;">×</button>
                `;
                ul.insertBefore(li, btn);
            }
        }

        // 7. Change project image URL
        if (e.target.classList.contains('change-project-img-btn')) {
            const card = e.target.closest('.project-card');
            const imgContainer = card.querySelector('.project-image-container');
            let currentImg = imgContainer.querySelector('img') ? imgContainer.querySelector('img').getAttribute('src') : "";
            const url = prompt("วางลิงก์รูปภาพของโครงการ (Image URL):", currentImg);
            if (url !== null) {
                if (url.trim()) {
                    imgContainer.innerHTML = `
                        <img src="${url.trim()}" alt="Project Image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300 link-overlay">
                            ${card.dataset.link && card.dataset.link !== "#" ? `
                                <a href="${card.dataset.link}" target="_blank" rel="noopener noreferrer" class="p-3 bg-orange-500 text-white rounded-full hover:scale-110 transition-transform shadow-lg w-11 h-11 flex items-center justify-center project-link-anchor">
                                    ${Icons.ExternalLink}
                                </a>
                            ` : ''}
                        </div>
                        <div class="edit-control absolute top-2 right-2 flex gap-1.5 z-20" style="display: flex;">
                            <button class="bg-gray-900/90 hover:bg-orange-600 text-white border border-gray-700 text-[10px] font-bold px-2.5 py-1 rounded shadow cursor-pointer change-project-img-btn">Img</button>
                            <button class="bg-gray-900/90 hover:bg-orange-600 text-white border border-gray-700 text-[10px] font-bold px-2.5 py-1 rounded shadow cursor-pointer change-project-link-btn">Link</button>
                        </div>
                    `;
                } else {
                    imgContainer.innerHTML = `
                        <div class="text-center p-6 text-white/50 project-placeholder">
                            <div class="w-11 h-11 mx-auto mb-2 opacity-40 group-hover:scale-105 transition-transform">${Icons.Gamepad2}</div>
                            <span class="text-xs uppercase font-extrabold tracking-widest project-engine-badge">${card.querySelector('.project-engine').innerText}</span>
                        </div>
                        <div class="edit-control absolute top-2 right-2 flex gap-1.5 z-20" style="display: flex;">
                            <button class="bg-gray-900/90 hover:bg-orange-600 text-white border border-gray-700 text-[10px] font-bold px-2.5 py-1 rounded shadow cursor-pointer change-project-img-btn">Img</button>
                            <button class="bg-gray-900/90 hover:bg-orange-600 text-white border border-gray-700 text-[10px] font-bold px-2.5 py-1 rounded shadow cursor-pointer change-project-link-btn">Link</button>
                        </div>
                    `;
                }
            }
        }

        // 8. Change project store/external link URL
        if (e.target.classList.contains('change-project-link-btn')) {
            const card = e.target.closest('.project-card');
            const currentLink = card.dataset.link || "#";
            const url = prompt("วางลิงก์ร้านค้า/ดาวน์โหลดของโครงการ (Store/Play Link):", currentLink);
            if (url !== null) {
                card.dataset.link = url.trim() || "#";
                // Update overlay anchor
                const anchor = card.querySelector('.project-link-anchor');
                if (anchor) anchor.setAttribute('href', card.dataset.link);
                // Update bottom anchor
                const bottomAnchor = card.querySelector('a.inline-flex');
                if (bottomAnchor) bottomAnchor.setAttribute('href', card.dataset.link);
            }
        }
    });

    // Initial render
    render();
});