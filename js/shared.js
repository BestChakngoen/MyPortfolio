const { Icons } = window.PortfolioApp;

// Editable Text Component
window.PortfolioApp.EditableText = ({ value, onChange, className, multiline = false, placeholder = "", isEditing }) => {
    if (!isEditing) return <span className={className}>{value || placeholder}</span>;
    if (multiline) {
        return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`w-full bg-gray-700/50 border border-orange-500/50 rounded px-2 py-1 text-white focus:outline-none focus:border-orange-500 ${className}`} rows={4} />;
    }
    return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`bg-gray-700/50 border border-orange-500/50 rounded px-2 py-1 text-white focus:outline-none focus:border-orange-500 w-full max-w-full ${className}`} />;
};

// Game Modal
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

// Lightbox
window.PortfolioApp.Lightbox = ({ media, onClose }) => (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md animate-fade-in" onClick={onClose}>
        <button className="absolute top-4 right-4 p-2 bg-gray-800 rounded-full text-white hover:bg-red-600 transition-colors z-50" onClick={onClose}><Icons.X size={24} /></button>
        <div className="max-w-6xl max-h-[90vh] w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {media.type === 'image' ? <img src={media.src} className="max-w-full max-h-full rounded shadow-2xl" /> : <div className="w-full aspect-video bg-black rounded shadow-2xl overflow-hidden"><iframe src={media.src} className="w-full h-full border-0" allowFullScreen></iframe></div>}
        </div>
    </div>
);

// Admin Controls
window.PortfolioApp.AdminControls = ({ isEditing, setIsEditing, onSave, onCancel }) => (
    <>
        <div className="fixed bottom-4 right-4 z-50 group">
            <button onClick={() => setIsEditing(!isEditing)} className="p-2 bg-gray-800 rounded-full text-gray-600 hover:text-white hover:bg-orange-500 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100" title="Toggle Admin Mode"><Icons.Settings size={20} /></button>
        </div>
        {isEditing && (
            <div className="fixed bottom-16 right-4 z-50 bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-700 flex flex-col gap-2 animate-fade-in-up">
                <div className="text-orange-500 font-bold mb-2 text-center">Admin Mode</div>
                <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"><Icons.Save size={16} /> Save Changes</button>
                <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"><Icons.X size={16} /> Cancel</button>
                <div className="text-xs text-gray-400 mt-2 text-center max-w-[150px]">Changes are saved to your browser's local storage.</div>
            </div>
        )}
    </>
);