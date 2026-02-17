const { Icons, EditableText } = window.PortfolioApp;

window.PortfolioApp.HeroSection = ({ personalInfo, isEditing, onUpdate, onImageUpload, scrollToSection }) => (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left space-y-6">
                <div className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-semibold mb-2">Available for Internship / Work</div>
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    สวัสดีครับ, ผม <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-600">
                        <EditableText value={personalInfo.name} onChange={(val) => onUpdate(['personalInfo', 'name'], val)} isEditing={isEditing} />
                    </span>
                </h1>
                <h2 className="text-2xl md:text-3xl text-gray-400 font-light">
                    <EditableText value={personalInfo.engName} onChange={(val) => onUpdate(['personalInfo', 'engName'], val)} isEditing={isEditing} />
                </h2>
                <div className="text-xl md:text-2xl text-gray-300 font-medium flex items-center justify-center md:justify-start gap-2">
                    <Icons.Gamepad2 className="text-orange-500" />
                    <EditableText value={personalInfo.role} onChange={(val) => onUpdate(['personalInfo', 'role'], val)} isEditing={isEditing} />
                </div>
                <p className="text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">นักพัฒนาเกมที่มีความหลงใหลในการสร้าง Core Mechanics และ System Design เชี่ยวชาญ Unity และ C# พร้อมเรียนรู้และเติบโตในอุตสาหกรรมเกม</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                    <button onClick={() => scrollToSection('projects')} className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold rounded-lg shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform duration-300">ดูผลงานของผม</button>
                    <button onClick={() => scrollToSection('contact')} className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors duration-300 flex items-center justify-center gap-2"><Icons.Mail size={18} /> ติดต่อ</button>
                </div>
            </div>
            <div className="flex-1 flex justify-center relative">
                <div className="relative w-64 h-64 md:w-80 md:h-80 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-purple-600 rounded-full blur-lg opacity-70 animate-pulse"></div>
                    <div className="absolute inset-1 bg-gray-900 rounded-full flex items-center justify-center overflow-hidden border-4 border-gray-800">
                        {personalInfo.profileImage ? (
                            <img src={personalInfo.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <div className="flex flex-col items-center text-gray-500"><Icons.User size={80} className="mb-2 opacity-50"/><span className="text-xs">รูปโปรไฟล์ของคุณ</span></div>
                        )}
                        {isEditing && (
                            <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center cursor-pointer hover:bg-black/70 transition-colors rounded-full z-10">
                                <Icons.Upload className="text-orange-500 mb-2" />
                                <span className="text-xs text-white">Change Photo</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => onImageUpload(e, ['personalInfo', 'profileImage'])} />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500"><Icons.ChevronDown size={32} /></div>
    </section>
);