const { Icons, EditableText } = window.PortfolioApp;

window.PortfolioApp.SkillsSection = ({ titles, skillCategories, isEditing, onUpdate }) => {
    // ฟังก์ชันดึงไอคอนมาแสดง
    const getIcon = (iconName) => {
        const Component = Icons[iconName] || Icons.Terminal;
        return <Component size={24} />;
    };

    // ดึงรายชื่อไอคอนทั้งหมดที่มีในระบบ
    const availableIconNames = Object.keys(Icons);

    return (
        <section id="skills" className="py-20 bg-gray-900 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        <EditableText value={titles.skills} onChange={(val) => onUpdate(['titles', 'skills'], val)} isEditing={isEditing} />
                    </h2>
                    <p className="text-gray-400">Stack & Technologies</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {skillCategories.map((category, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 flex flex-col h-full relative z-0 hover:z-20">
                            {isEditing && (
                                <button onClick={() => {
                                    const newSkills = skillCategories.filter((_, i) => i !== index);
                                    onUpdate(['skillCategories'], newSkills);
                                }} className="absolute top-2 right-2 text-red-500 hover:bg-red-500/20 p-1 rounded-full"><Icons.Trash2 size={16} /></button>
                            )}
                            
                            <div className="flex items-center gap-3 mb-4 relative">
                                {/* ส่วนไอคอนหลัก */}
                                <div className="relative group/icon cursor-pointer" title={isEditing ? "Hover to change icon" : ""}>
                                    <div className="p-3 bg-gray-900 rounded-xl text-orange-500 border border-gray-700 transition-colors group-hover/icon:border-orange-500 relative z-10">
                                        {getIcon(category.iconType)}
                                    </div>
                                    
                                    {/* Custom Icon Picker (แสดงไอคอนจริงเมื่อนำเมาส์ไปชี้) */}
                                    {isEditing && (
                                        <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl z-[60] w-[280px] opacity-0 invisible group-hover/icon:opacity-100 group-hover/icon:visible transition-all duration-200">
                                            {/* สะพานเชื่อมไม่ให้ hover หลุด */}
                                            <div className="absolute -top-4 left-0 w-full h-4 bg-transparent"></div>
                                            <div className="p-2 grid grid-cols-5 gap-1 max-h-48 overflow-y-auto bg-gray-800 rounded-xl relative">
                                                {availableIconNames.map(name => {
                                                    const IconComp = Icons[name] || Icons.Terminal;
                                                    const isSelected = category.iconType === name;
                                                    return (
                                                        <button
                                                            key={name}
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                const newSkills = [...skillCategories];
                                                                newSkills[index].iconType = name;
                                                                onUpdate(['skillCategories'], newSkills);
                                                            }}
                                                            className={`p-2 rounded-lg flex justify-center items-center transition-colors ${isSelected ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                                                            title={name}
                                                        >
                                                            <IconComp size={20} />
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* ไอคอน Settings เล็กๆ */}
                                    {isEditing && (
                                        <div className="absolute -bottom-1 -right-1 bg-gray-800 border border-gray-700 text-orange-500 rounded-full w-4 h-4 flex items-center justify-center pointer-events-none shadow-lg z-20">
                                            <Icons.Settings size={10} />
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-lg font-bold text-white"><EditableText value={category.title} onChange={(val) => {
                                    const newSkills = [...skillCategories]; newSkills[index].title = val; onUpdate(['skillCategories'], newSkills);
                                }} isEditing={isEditing} /></h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="relative group/item">
                                        <span className="px-3 py-1 bg-gray-900/50 text-gray-300 rounded-md text-sm border border-gray-700/50 hover:border-orange-500/30 hover:text-orange-400 transition-colors cursor-default block">
                                            <EditableText value={item} onChange={(val) => {
                                                const newSkills = [...skillCategories]; newSkills[index].items[idx] = val; onUpdate(['skillCategories'], newSkills);
                                            }} isEditing={isEditing} />
                                        </span>
                                        {isEditing && (
                                            <button onClick={() => {
                                                const newSkills = [...skillCategories]; newSkills[index].items = newSkills[index].items.filter((_, i) => i !== idx); onUpdate(['skillCategories'], newSkills);
                                            }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity z-10">x</button>
                                        )}
                                    </div>
                                ))}
                                {isEditing && (
                                    <button onClick={() => {
                                        const newSkills = [...skillCategories]; newSkills[index].items.push("New Skill"); onUpdate(['skillCategories'], newSkills);
                                    }} className="px-2 py-1 bg-green-600/50 hover:bg-green-600 text-white rounded-md text-xs flex items-center gap-1"><Icons.Plus size={12} /> Add</button>
                                )}
                            </div>
                        </div>
                    ))}
                    {isEditing && (
                        <button onClick={() => {
                            const newSkills = [...skillCategories, { title: "New Category", iconType: "Terminal", items: ["Skill 1"] }];
                            onUpdate(['skillCategories'], newSkills);
                        }} className="bg-gray-800/50 border border-dashed border-gray-600 rounded-2xl flex items-center justify-center p-6 hover:bg-gray-800 hover:border-orange-500 text-gray-500 hover:text-orange-500 transition-all min-h-[150px]"><Icons.Plus size={32} /><span className="ml-2">Add Category</span></button>
                    )}
                </div>
            </div>
        </section>
    );
};