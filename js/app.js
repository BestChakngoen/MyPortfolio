const { useState, useEffect, useCallback } = React;

// Navbar Component (Keep existing code structure)
const NavBar = ({ titles, activeSection, scrollToSection, isMenuOpen, setIsMenuOpen, Icons }) => {
    const safeTitles = titles || {};
    const MenuIcon = Icons && Icons.Menu ? Icons.Menu : () => <span>Menu</span>;
    const XIcon = Icons && Icons.X ? Icons.X : () => <span>X</span>;
    
    return (
        <nav className="fixed w-full z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-amber-700 rounded-lg flex items-center justify-center shadow-orange-500/20 shadow-lg">
                        <span className="text-white font-bold text-xl">P</span>
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">PORTFOLIO</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <button onClick={() => scrollToSection('home')} className={`text-sm font-medium transition-colors duration-300 hover:text-orange-400 uppercase`}>HOME</button>
                    {Object.keys(safeTitles).map((key) => (
                        <button key={key} onClick={() => scrollToSection(key === 'skills' || key === 'projects' ? key : key === 'contact' ? 'contact' : 'about')} className={`text-sm font-medium transition-colors duration-300 hover:text-orange-400 uppercase`}>{key}</button>
                    ))}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                        {isMenuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 border-t border-gray-700">
                    <div className="px-4 py-4 space-y-2">
                        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                            <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-orange-400 rounded-lg transition-colors">{item}</button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

// Main Controller Component
const Portfolio = () => {
    const modules = window.PortfolioApp || {};
    
    const { 
        portfolioService, 
        Icons = window.PortfolioApp.Icons || {}, 
        firebaseApp
    } = modules;

    // Default Components & Placeholders
    const ErrorComponent = ({ name }) => <div className="py-10 text-center text-red-500">Error loading {name}</div>;
    const HeroSection = modules.HeroSection || (() => <ErrorComponent name="HeroSection" />);
    const AboutSection = modules.AboutSection || (() => <ErrorComponent name="AboutSection" />);
    const SkillsSection = modules.SkillsSection || (() => <ErrorComponent name="SkillsSection" />);
    const ProjectsSection = modules.ProjectsSection || (() => <ErrorComponent name="ProjectsSection" />);
    const ContactSection = modules.ContactSection || (() => <ErrorComponent name="ContactSection" />);
    const GameModal = modules.GameModal || (() => null);
    const Lightbox = modules.Lightbox || (() => null);
    const AdminControls = modules.AdminControls || (() => null);

    const SAFE_INITIAL_DATA = window.PortfolioApp.DEFAULT_DATA || {
        personalInfo: {}, titles: {}, projects: [], skillCategories: []
    };

    // State
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isEditing, setIsEditing] = useState(false);
    const [playingProject, setPlayingProject] = useState(null); 
    const [viewingMedia, setViewingMedia] = useState(null); 
    const [data, setData] = useState(SAFE_INITIAL_DATA);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAdminUI, setShowAdminUI] = useState(false);
    
    // New State for View Mode
    const [targetUid, setTargetUid] = useState(null); // UID of the portfolio we are viewing
    const [isOwner, setIsOwner] = useState(false); // Are we the owner of this portfolio?

    // 1. Check URL for ?uid=... (Public View Logic)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const uidParam = params.get('uid');
        if (uidParam) {
            setTargetUid(uidParam);
        }
    }, []);

    // 2. Initialize Firebase & Auth Logic
    useEffect(() => {
        if (firebaseApp && portfolioService) {
            portfolioService.initFirebase(firebaseApp);
            
            // Start listening to Auth
            const unsubscribe = firebaseApp.onAuthStateChanged(firebaseApp.auth, async (currentUser) => {
                setUser(currentUser);
                setLoading(true);

                // Determine whose data to load
                let uidToLoad = targetUid;

                // If no URL uid, but user logged in, load user's own data
                if (!uidToLoad && currentUser) {
                    uidToLoad = currentUser.uid;
                    // Optional: Don't auto-set targetUid here to keep URL clean for owner
                }

                // Load Data
                try {
                    console.log("Loading data for UID:", uidToLoad || "Default");
                    const loadedData = await portfolioService.loadData(uidToLoad);
                    setData(loadedData || SAFE_INITIAL_DATA);
                } catch (err) {
                    console.error("Data load failed:", err);
                    setData(SAFE_INITIAL_DATA);
                }
                
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [firebaseApp, portfolioService, targetUid]); // Re-run if targetUid changes (e.g. navigation)

    // 3. Determine Ownership (Can I edit?)
    useEffect(() => {
        if (user && targetUid) {
            // Viewing specific page + Logged in -> Check match
            setIsOwner(user.uid === targetUid);
        } else if (user && !targetUid) {
            // Viewing home (no param) + Logged in -> Owner (Edit Self)
            setIsOwner(true);
        } else {
            // Not logged in -> Visitor
            setIsOwner(false);
        }
    }, [user, targetUid]);


    // Scroll & Key Listeners
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section);
                }
            }
        };
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
                e.preventDefault();
                setShowAdminUI(prev => !prev);
            }
        };
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Handlers
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setIsMenuOpen(false);
        }
    };

    const handleDataChange = useCallback((path, value) => {
        if (portfolioService && isOwner) { // Security check
            setData(prev => portfolioService.updateField(prev, path, value));
        }
    }, [portfolioService, isOwner]);

    const handleSave = async () => {
        if (!user) return alert("Please login first.");
        if (portfolioService) {
            // If viewing shared link but owned, save to that ID. If local, save to user.uid
            const saveId = targetUid || user.uid; 
            const success = await portfolioService.saveData(data, saveId);
            if (success) {
                setIsEditing(false);
                alert("บันทึกข้อมูลสำเร็จ!");
            } else {
                alert("บันทึกไม่สำเร็จ");
            }
        }
    };

    const handleCancel = async () => {
        setIsEditing(false);
        if (portfolioService) {
            setLoading(true);
            const uidToLoad = targetUid || (user ? user.uid : null);
            const originalData = await portfolioService.loadData(uidToLoad);
            setData(originalData);
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        if (portfolioService) {
            try {
                await portfolioService.login();
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleLogout = async () => {
        if (portfolioService) {
            await portfolioService.logout();
            setIsEditing(false);
            setShowAdminUI(false);
            // If we were viewing "my" page without UID, we might want to reload defaults, 
            // but the Auth listener will handle reloading data for null user.
        }
    };

    const handleImageUpload = (e, path) => {
        if (portfolioService && isOwner) {
            portfolioService.processFile(e.target.files[0], (result) => {
                handleDataChange(path, result);
            });
        }
    };

    // ... Gallery Handlers (Pass isOwner check implicitly by UI hiding) ...
    const handleAddGalleryImage = (e, idx) => {
        if(!isOwner) return;
        portfolioService.processFile(e.target.files[0], (res) => {
            const newProjs = [...data.projects];
            if (!newProjs[idx].gallery) newProjs[idx].gallery = [];
            newProjs[idx].gallery.push({ type: 'image', src: res, id: Date.now() });
            handleDataChange(['projects'], newProjs);
        });
    };
    
    const handleAddGalleryVideo = (idx) => {
        if(!isOwner) return;
        const url = prompt("Video URL:");
        if (url) {
            const newProjs = [...data.projects];
            if (!newProjs[idx].gallery) newProjs[idx].gallery = [];
            newProjs[idx].gallery.push({ type: 'video', src: url, id: Date.now() });
            handleDataChange(['projects'], newProjs);
        }
    };

    const handleRemoveGalleryItem = (pIdx, iIdx) => {
        if(!isOwner) return;
        const newProjs = [...data.projects];
        newProjs[pIdx].gallery.splice(iIdx, 1);
        handleDataChange(['projects'], newProjs);
    };

    if (loading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div></div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans selection:bg-orange-500 selection:text-white relative">
            <NavBar 
                titles={data.titles} 
                activeSection={activeSection} 
                scrollToSection={scrollToSection} 
                isMenuOpen={isMenuOpen} 
                setIsMenuOpen={setIsMenuOpen} 
                Icons={Icons}
            />

            {/* Pass isEditing ONLY if isOwner is true */}
            <HeroSection 
                personalInfo={data.personalInfo} 
                isEditing={isEditing && isOwner} 
                onUpdate={handleDataChange} 
                onImageUpload={handleImageUpload}
                scrollToSection={scrollToSection}
            />

            <AboutSection 
                titles={data.titles} 
                isEditing={isEditing && isOwner} 
                onUpdate={handleDataChange} 
            />

            <SkillsSection 
                titles={data.titles} 
                skillCategories={data.skillCategories} 
                isEditing={isEditing && isOwner} 
                onUpdate={handleDataChange} 
            />

            <ProjectsSection 
                titles={data.titles} 
                projects={data.projects} 
                isEditing={isEditing && isOwner} 
                onUpdate={handleDataChange}
                setPlayingProject={setPlayingProject}
                setViewingMedia={setViewingMedia}
                handleRemoveGalleryItem={handleRemoveGalleryItem}
                handleAddGalleryImage={handleAddGalleryImage}
                handleAddGalleryVideo={handleAddGalleryVideo}
            />

            <ContactSection 
                titles={data.titles} 
                personalInfo={data.personalInfo} 
                isEditing={isEditing && isOwner} 
                onUpdate={handleDataChange} 
            />

            <footer className="bg-black py-8 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">© {new Date().getFullYear()} {data.personalInfo.engName || "Your Name"}. All Rights Reserved.</p>
                </div>
            </footer>

            {/* Admin Controls Logic:
                1. If I am the Owner (isOwner = true), show controls.
                2. If I am a Visitor (isOwner = false), HIDE controls completely (Public View).
                3. Exception: If user is not logged in at all and not viewing a specific UID, show Login button (Default/Demo mode).
            */}
            {(isOwner || (!targetUid && !user)) && (
                <AdminControls 
                    isEditing={isEditing} 
                    setIsEditing={setIsEditing} 
                    onSave={handleSave} 
                    onCancel={handleCancel} 
                    user={user}
                    onLogin={handleLogin}
                    onLogout={handleLogout}
                    isOwner={isOwner}
                />
            )}

            {playingProject && <GameModal project={playingProject} onClose={() => setPlayingProject(null)} />}
            {viewingMedia && <Lightbox media={viewingMedia} onClose={() => setViewingMedia(null)} />}
        </div>
    );
};

const container = document.getElementById('root');
if (container) {
    if (!container._reactRoot) {
        container._reactRoot = ReactDOM.createRoot(container);
    }
    container._reactRoot.render(<Portfolio />);
}