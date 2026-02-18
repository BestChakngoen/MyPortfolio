const { Icons } = window.PortfolioApp;

// Editable Text Component (Reuse เดิม)
window.PortfolioApp.EditableText = ({ value, onChange, className, multiline = false, placeholder = "", isEditing }) => {
    if (!isEditing) return <span className={className}>{value || placeholder}</span>;
    if (multiline) {
        return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`w-full bg-gray-700/50 border border-orange-500/50 rounded px-2 py-1 text-white focus:outline-none focus:border-orange-500 ${className}`} rows={4} />;
    }
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`bg-gray-700/50 border border-orange-500/50 rounded px-2 py-1 text-white focus:outline-none focus:border-orange-500 w-full max-w-full ${className}`} />;
};

// Game Modal (Reuse เดิม)
window.PortfolioApp.GameModal = ({ project, onClose }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in">
        <div className="bg-gray-800 w-full max-w-6xl aspect-video rounded-xl overflow-hidden relative shadow-2xl border border-gray-700 flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-3"><Icons.Gamepad2 className="text-orange-500"/><div><h3 className="text-white font-bold">{project.title}</h3><p className="text-xs text-gray-400">Browser Play Mode</p></div></div>
                <button onClick={onClose} className="p-2 bg-gray-800 hover:bg-red-600 rounded-lg text-gray-400 hover:text-white transition-colors"><Icons.X size={20} /></button>
            </div>
            <div className="flex-grow bg-black relative">
                {project.embedUrl ? <iframe src={project.embedUrl} className="w-full h-full border-0" allowFullScreen title={project.title}></iframe> : <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4"><Icons.Gamepad2 size={48} className="opacity-50"/><p>No Embed URL provided for this project.</p><p className="text-sm">Please add a WebGL/Itch.io embed link in Admin Mode.</p></div>}
            </div>
        </div>
    </div>
);

// Lightbox (Reuse เดิม)
window.PortfolioApp.Lightbox = ({ media, onClose }) => (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in" onClick={onClose}>
        <button className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full text-white hover:bg-red-600 transition-colors z-50" onClick={onClose}><Icons.X size={24} /></button>
        <div className="max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {media.type === 'image' ? <img src={media.src} className="max-w-full max-h-full rounded shadow-2xl" /> : <div className="w-full aspect-video bg-black rounded shadow-2xl overflow-hidden"><iframe src={media.src} className="w-full h-full border-0" allowFullScreen></iframe></div>}
        </div>
    </div>
);

// --- Admin Controls (Updated for Auth & Sharing) ---
window.PortfolioApp.AdminControls = ({ isEditing, setIsEditing, onSave, onCancel, user, onLogin, onLogout, isOwner }) => {
    
    const copyShareLink = () => {
        if (!user) return;
        // Construct URL: current origin + path + ?uid=USER_ID
        const url = `${window.location.origin}${window.location.pathname}?uid=${user.uid}`;
        navigator.clipboard.writeText(url).then(() => {
            alert("Copied Public Link to clipboard:\n" + url);
        });
    };

    return (
        <>
            {/* Toggle / Login Button */}
            <div className="fixed bottom-4 right-4 z-50 group">
                <button 
                    onClick={() => user ? setIsEditing(!isEditing) : onLogin()} 
                    className={`p-3 rounded-full transition-all duration-300 shadow-lg ${user ? (isEditing ? 'bg-orange-500 text-white' : 'bg-green-600 text-white') : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                    title={user ? "Toggle Admin Mode" : "Login to Edit"}
                >
                    {user ? <Icons.Settings size={20} /> : <Icons.LogIn size={20} />}
                </button>
            </div>

            {/* Login Status Panel */}
            {user && !isEditing && (
                <div className="fixed bottom-4 right-20 z-50 bg-gray-800/90 backdrop-blur px-4 py-2 rounded-full border border-gray-700 flex items-center gap-3 animate-fade-in">
                    {user.photoURL && <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full border border-gray-500" />}
                    <span className="text-xs text-gray-300 hidden md:inline">Logged in as {user.displayName}</span>
                    
                    {/* Share Button */}
                    <button onClick={copyShareLink} className="text-gray-400 hover:text-blue-400 p-1 border-l border-gray-600 pl-2 ml-1 flex items-center gap-1" title="Copy Public Link">
                        <Icons.Globe size={14} /> <span className="text-[10px] uppercase font-bold">Share</span>
                    </button>

                    <button onClick={onLogout} className="text-gray-400 hover:text-red-400 p-1 border-l border-gray-600 pl-2" title="Logout"><Icons.LogOut size={14} /></button>
                </div>
            )}

            {/* Edit Actions Panel */}
            {isEditing && (
                <div className="fixed bottom-16 right-4 z-50 bg-gray-800 p-4 rounded-xl shadow-xl border border-orange-500/50 flex flex-col gap-2 animate-fade-in-up">
                    <div className="text-orange-500 font-bold mb-2 text-center text-sm">ADMIN MODE</div>
                    <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"><Icons.Save size={16} /> Save to Cloud</button>
                    <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"><Icons.X size={16} /> Discard</button>
                </div>
            )}
        </>
    );
}