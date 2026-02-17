const { Icons, EditableText } = window.PortfolioApp;

// Sub-Component: ProjectCard
const ProjectCard = ({ project, index, isEditing, onUpdate, setPlayingProject, setViewingMedia, handleRemoveGalleryItem, handleAddGalleryImage, handleAddGalleryVideo, allProjects }) => {
    return (
        <div className="group bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 flex flex-col h-full relative">
            {isEditing && (
                <button onClick={() => {
                    const newProjects = allProjects.filter((_, i) => i !== index);
                    onUpdate(['projects'], newProjects);
                }} className="absolute top-2 right-2 z-20 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-lg"><Icons.Trash2 size={16} /></button>
            )}
            <div className={`h-48 ${project.imageColor} relative overflow-hidden flex items-center justify-center bg-cover bg-center`} style={{ backgroundImage: project.image ? `url(${project.image})` : 'none' }}>
                {!project.image && <div className="text-center p-4"><h3 className="text-3xl font-black text-white/20 uppercase tracking-widest">{project.title}</h3></div>}
                <div className={`absolute inset-0 bg-black/20 ${!isEditing && 'group-hover:bg-transparent'} transition-colors duration-300`}></div>
                {isEditing && (
                    <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer hover:bg-black/70 transition-colors z-10">
                        <Icons.Upload className="text-orange-500 mb-2" /><span className="text-xs text-white">Upload Screenshot</span>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    const newProjects = [...allProjects]; newProjects[index].image = reader.result; onUpdate(['projects'], newProjects);
                                };
                                reader.readAsDataURL(file);
                            }
                        }} />
                    </label>
                )}
            </div>
            <div className="p-8 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1"><EditableText value={project.title} onChange={(val) => { const newP = [...allProjects]; newP[index].title = val; onUpdate(['projects'], newP); }} isEditing={isEditing} /></h3>
                    <p className="text-orange-400 text-sm font-medium"><EditableText value={project.type} onChange={(val) => { const newP = [...allProjects]; newP[index].type = val; onUpdate(['projects'], newP); }} isEditing={isEditing} /></p>
                    <p className="text-gray-500 text-xs mt-1 font-mono bg-gray-800 inline-block px-2 py-1 rounded"><EditableText value={project.engine} onChange={(val) => { const newP = [...allProjects]; newP[index].engine = val; onUpdate(['projects'], newP); }} isEditing={isEditing} /></p>
                </div>
                <div className="text-gray-300 text-sm mb-6 line-clamp-none"><EditableText value={project.description} multiline={true} onChange={(val) => { const newP = [...allProjects]; newP[index].description = val; onUpdate(['projects'], newP); }} isEditing={isEditing} /></div>
                <div className="mb-6 flex-grow">
                    <h4 className="text-white text-sm font-semibold mb-3 border-b border-gray-700 pb-2">Responsibilities:</h4>
                    <ul className="space-y-2">
                        {project.responsibilities.map((resp, i) => (
                            <li key={i} className="text-gray-400 text-sm flex items-start gap-2"><span className="text-orange-500 mt-1">•</span><div className="flex-1"><EditableText value={resp} multiline={true} onChange={(val) => { const newP = [...allProjects]; newP[index].responsibilities[i] = val; onUpdate(['projects'], newP); }} isEditing={isEditing} /></div>{isEditing && <button onClick={() => { const newP = [...allProjects]; newP[index].responsibilities = newP[index].responsibilities.filter((_, idx) => idx !== i); onUpdate(['projects'], newP); }} className="text-red-500 hover:text-red-400 ml-2"><Icons.Trash2 size={14} /></button>}</li>
                        ))}
                        {isEditing && <button onClick={() => { const newP = [...allProjects]; newP[index].responsibilities.push("New Responsibility"); onUpdate(['projects'], newP); }} className="text-xs text-green-500 hover:text-green-400 flex items-center gap-1 mt-2"><Icons.Plus size={14} /> Add Item</button>}
                    </ul>
                </div>
                {/* Gallery */}
                <div className="mt-4 border-t border-gray-700 pt-4 mb-4">
                    {(isEditing || (project.gallery && project.gallery.length > 0)) && <h5 className="text-white text-sm font-semibold mb-2">Media Gallery</h5>}
                    <div className="grid grid-cols-4 gap-2 mb-2">
                        {project.gallery && project.gallery.map((media, mIdx) => (
                            <div key={mIdx} className="relative aspect-square bg-black rounded overflow-hidden cursor-pointer group/media border border-gray-700 hover:border-orange-500 transition-colors" onClick={() => setViewingMedia(media)}>
                                {media.type === 'image' ? <img src={media.src} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-800 text-orange-500"><Icons.Play size={20} /></div>}
                                {isEditing && <button onClick={(e) => { e.stopPropagation(); handleRemoveGalleryItem(index, mIdx); }} className="absolute top-0 right-0 bg-red-600 text-white p-1 hover:bg-red-700"><Icons.X size={10} /></button>}
                            </div>
                        ))}
                    </div>
                    {isEditing && <div className="flex gap-2"><label className="cursor-pointer px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-white flex items-center gap-1 border border-gray-600"><Icons.Image size={12} /> Add Image<input type="file" accept="image/*" className="hidden" onChange={(e) => handleAddGalleryImage(e, index)} /></label><button onClick={() => handleAddGalleryVideo(index)} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-white flex items-center gap-1 border border-gray-600"><Icons.Video size={12} /> Add Video URL</button></div>}
                </div>
                <div className="flex gap-2">
                    <a href={project.link} target="_blank" rel="noreferrer" className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 text-white text-center rounded-lg transition-colors duration-300 font-medium flex items-center justify-center gap-2">Info <Icons.ExternalLink size={16} /></a>
                    {(project.embedUrl || isEditing) && <button onClick={() => setPlayingProject(project)} className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white text-center rounded-lg transition-colors duration-300 font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-900/20"><Icons.Play size={16} fill="currentColor" /> Play Demo</button>}
                </div>
                {isEditing && (
                    <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="mb-2"><label className="text-xs text-gray-400 block mb-1">External Link (Itch.io page):</label><EditableText value={project.link} onChange={(val) => { const newP = [...allProjects]; newP[index].link = val; onUpdate(['projects'], newP); }} isEditing={isEditing} placeholder="https://..." /></div>
                        <div><label className="text-xs text-orange-400 block mb-1">Game Embed URL (For Play Button):</label><EditableText value={project.embedUrl} onChange={(val) => { const newP = [...allProjects]; newP[index].embedUrl = val; onUpdate(['projects'], newP); }} isEditing={isEditing} placeholder="https://itch.io/embed-upload/..." /><p className="text-[10px] text-gray-500 mt-1">Paste the direct iframe src or index.html link here.</p></div>
                    </div>
                )}
            </div>
        </div>
    );
};

window.PortfolioApp.ProjectsSection = ({ titles, projects, isEditing, onUpdate, setPlayingProject, setViewingMedia, handleRemoveGalleryItem, handleAddGalleryImage, handleAddGalleryVideo }) => (
    <section id="projects" className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-6">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    <EditableText value={titles.projects} onChange={(val) => onUpdate(['titles', 'projects'], val)} isEditing={isEditing} />
                </h2>
                <div className="w-24 h-1 bg-orange-500 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard 
                        key={project.id} 
                        project={project} 
                        index={index}
                        allProjects={projects}
                        isEditing={isEditing} 
                        onUpdate={onUpdate}
                        setPlayingProject={setPlayingProject}
                        setViewingMedia={setViewingMedia}
                        handleRemoveGalleryItem={handleRemoveGalleryItem}
                        handleAddGalleryImage={handleAddGalleryImage}
                        handleAddGalleryVideo={handleAddGalleryVideo}
                    />
                ))}
                {isEditing && (
                    <button onClick={() => {
                        const newProject = { id: Date.now(), title: "NEW PROJECT", type: "Game Type", engine: "Engine", description: "Project Description...", responsibilities: ["Task 1"], link: "#", embedUrl: "", imageColor: "bg-gray-800", image: null, gallery: [] };
                        onUpdate(['projects'], [...projects, newProject]);
                    }} className="bg-gray-800/50 border border-dashed border-gray-600 rounded-2xl flex items-center justify-center p-6 hover:bg-gray-800 hover:border-orange-500 text-gray-500 hover:text-orange-500 transition-all min-h-[400px]"><div className="flex flex-col items-center"><Icons.Plus size={48} /><span className="mt-4 text-xl font-bold">Add Project</span></div></button>
                )}
            </div>
        </div>
    </section>
);