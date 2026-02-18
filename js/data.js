const { useState, useEffect, useCallback } = React;

// Navbar Component
const NavBar = ({ titles, activeSection, scrollToSection, isMenuOpen, setIsMenuOpen, Icons }) => (
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
                {titles && Object.keys(titles).map((key) => (
                    <button key={key} onClick={() => scrollToSection(key === 'skills' || key === 'projects' ? key : key === 'contact' ? 'contact' : 'about')} className={`text-sm font-medium transition-colors duration-300 hover:text-orange-400 uppercase`}>{key}</button>
                ))}
            </div>
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-300 hover:text-white">
                    {isMenuOpen ? <Icons.X size={28} /> : <Icons.Menu size={28} />}
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

// Main Controller Component
const Portfolio = () => {
    // Dependency Injection / Module Loading
    const modules = window.PortfolioApp || {};
    const { 
        portfolioService, Icons, GameModal, Lightbox, AdminControls,
        HeroSection, AboutSection, SkillsSection, ProjectsSection, ContactSection,
        DEFAULT_DATA, firebaseApp
    } = modules;

    // State Management
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isEditing, setIsEditing] = useState(false);
    const [playingProject, setPlayingProject] = useState(null); 
    const [viewingMedia, setViewingMedia] = useState(null); 
    const [data, setData] = useState(DEFAULT_DATA);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Initialize Firebase & Auth Listener
    useEffect(() => {
        // Inject Firebase dependencies into Service
        if (firebaseApp && portfolioService) {
            portfolioService.initFirebase(firebaseApp);
            
            // Listen for Auth Changes
            const unsubscribe = firebaseApp.onAuthStateChanged(firebaseApp.auth, async (currentUser) => {
                setUser(currentUser);
                setLoading(true);
                // Load data based on user context
                const loadedData = await portfolioService.loadData(currentUser ? currentUser.uid : null);
                setData(loadedData);
                setLoading(false);
            });
            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [firebaseApp, portfolioService]);

    // 2. Scroll Logic
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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 3. Handlers (Controller Logic)
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(id);
            setIsMenuOpen(false);
        }
    };

    const handleDataChange = useCallback((path, value) => {
        setData(prev => portfolioService.updateField(prev, path, value));
    }, [portfolioService]);

    const handleSave = async () => {
        if (!user) return alert("Please login first.");
        const success = await portfolioService.saveData(data, user.uid);
        if (success) {
            setIsEditing(false);
            alert("บันทึกข้อมูลลง Cloud เรียบร้อยแล้ว!");
        } else {
            alert("เกิดข้อผิดพลาดในการบันทึก");
        }
    };

    const handleCancel = async () => {
        setIsEditing(false);
        // Revert to last saved state
        const originalData = await portfolioService.loadData(user ? user.uid : null);
        setData(originalData);
    };

    const handleLogin = async () => {
        try {
            await portfolioService.login();
        } catch (e) {
            alert("Login Failed");
        }
    };

    const handleLogout = async () => {
        await portfolioService.logout();
        setIsEditing(false);
    };

    const handleImageUpload = (e, path) => {
        portfolioService.processFile(e.target.files[0], (result) => {
            handleDataChange(path, result);
        });
    };

    // Gallery Actions
    const handleAddGalleryImage = (e, projectIndex) => {
        portfolioService.processFile(e.target.files[0], (result) => {
            const newProjects = [...data.projects];
            if (!newProjects[projectIndex].gallery) newProjects[projectIndex].gallery = [];
            newProjects[projectIndex].gallery.push({ type: 'image', src: result, id: Date.now() });
            handleDataChange(['projects'], newProjects);
        });
    };

    const handleAddGalleryVideo = (projectIndex) => {
        const url = prompt("Please enter the Video URL:", "");
        if (url) {
            const newProjects = [...data.projects];
            if (!newProjects[projectIndex].gallery) newProjects[projectIndex].gallery = [];
            newProjects[projectIndex].gallery.push({ type: 'video', src: url, id: Date.now() });
            handleDataChange(['projects'], newProjects);
        }
    };

    const handleRemoveGalleryItem = (projectIndex, itemIndex) => {
        const newProjects = [...data.projects];
        newProjects[projectIndex].gallery.splice(itemIndex, 1);
        handleDataChange(['projects'], newProjects);
    };

    // Loading View
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

            <HeroSection 
                personalInfo={data.personalInfo} 
                isEditing={isEditing} 
                onUpdate={handleDataChange} 
                onImageUpload={handleImageUpload}
                scrollToSection={scrollToSection}
            />

            <AboutSection 
                titles={data.titles} 
                isEditing={isEditing} 
                onUpdate={handleDataChange} 
            />

            <SkillsSection 
                titles={data.titles} 
                skillCategories={data.skillCategories} 
                isEditing={isEditing} 
                onUpdate={handleDataChange} 
            />

            <ProjectsSection 
                titles={data.titles} 
                projects={data.projects} 
                isEditing={isEditing} 
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
                isEditing={isEditing} 
                onUpdate={handleDataChange} 
            />

            <footer className="bg-black py-8 border-t border-gray-800">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">© {new Date().getFullYear()} {data.personalInfo.engName}. All Rights Reserved.</p>
                </div>
            </footer>

            <AdminControls 
                isEditing={isEditing} 
                setIsEditing={setIsEditing} 
                onSave={handleSave} 
                onCancel={handleCancel} 
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />

            {playingProject && <GameModal project={playingProject} onClose={() => setPlayingProject(null)} />}
            {viewingMedia && <Lightbox media={viewingMedia} onClose={() => setViewingMedia(null)} />}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Portfolio />);