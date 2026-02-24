const { Icons, EditableText } = window.PortfolioApp;

window.PortfolioApp.ContactSection = ({ titles, personalInfo, isEditing, onUpdate }) => (
    <section id="contact" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 md:p-16 border border-gray-700 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-6">ร่วมงานกับผม <br/><span className="text-orange-500"><EditableText value={titles.contact} onChange={(val) => onUpdate(['titles', 'contact'], val)} isEditing={isEditing} /></span></h2>
                        <div className="text-gray-400 mb-8 text-lg">
                            <EditableText 
                                value={personalInfo?.contactDescription ?? "หากคุณกำลังมองหา Game Programmer ที่มีความมุ่งมั่น พร้อมเรียนรู้ และสามารถทำงานเป็นทีมได้ สามารถติดต่อผมได้ตามช่องทางด้านล่างครับ"} 
                                onChange={(val) => onUpdate(['personalInfo', 'contactDescription'], val)} 
                                isEditing={isEditing} 
                                multiline={true} 
                            />
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group"><div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300"><Icons.Phone className="text-white" size={20} /></div><div><p className="text-gray-400 text-sm">เบอร์โทรศัพท์</p><p className="text-white font-medium text-lg"><EditableText value={personalInfo?.phone} onChange={(val) => onUpdate(['personalInfo', 'phone'], val)} isEditing={isEditing} /></p></div></div>
                            <div className="flex items-center gap-4 group"><div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300"><Icons.Mail className="text-white" size={20} /></div><div><p className="text-gray-400 text-sm">อีเมล</p><div className="text-white font-medium text-lg"><EditableText value={personalInfo?.email} onChange={(val) => onUpdate(['personalInfo', 'email'], val)} isEditing={isEditing} /></div></div></div>
                            <div className="flex items-center gap-4 group"><div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300"><Icons.ExternalLink className="text-white" size={20} /></div><div><p className="text-gray-400 text-sm">Line ID</p><a href={personalInfo?.line || "#"} target="_blank" rel="noreferrer" className="text-white font-medium text-lg hover:underline">Click to Add Line</a>{isEditing && <div className="mt-1"><span className="text-xs text-gray-500">Line Link:</span><EditableText value={personalInfo?.line} onChange={(val) => onUpdate(['personalInfo', 'line'], val)} isEditing={isEditing} /></div>}</div></div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-gray-900/50 p-8 rounded-2xl border border-gray-700">
                        <h3 className="text-white font-bold mb-6">Social Media</h3>
                        <div className="flex gap-6">
                            {/* อัปเดต: เพิ่มการลิงก์ข้อมูลให้ Facebook */}
                            <a href={personalInfo?.facebook || "#"} target="_blank" rel="noreferrer" className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"><Icons.Facebook size={28} /></a>
                            
                            <a href={personalInfo?.itch || "#"} target="_blank" rel="noreferrer" className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"><Icons.Gamepad2 size={28} /></a>
                            
                            {/* อัปเดต: เพิ่มการลิงก์ข้อมูลให้ Instagram */}
                            <a href={personalInfo?.instagram || "#"} target="_blank" rel="noreferrer" className="w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"><Icons.Instagram size={28} /></a>
                        </div>
                        
                        {/* อัปเดต: เพิ่มช่องกรอก Facebook และ IG และ itch.io ในโหมด Edit */}
                        {isEditing && (
                            <div className="mt-6 w-full flex flex-col gap-3 p-4 bg-gray-800 rounded-xl border border-gray-700 shadow-inner">
                                <div>
                                    <span className="text-xs text-blue-400 block mb-1">Facebook Link:</span>
                                    <EditableText value={personalInfo?.facebook} onChange={(val) => onUpdate(['personalInfo', 'facebook'], val)} isEditing={isEditing} placeholder="https://facebook.com/..." />
                                </div>
                                <div>
                                    <span className="text-xs text-red-400 block mb-1">Itch.io Link:</span>
                                    <EditableText value={personalInfo?.itch} onChange={(val) => onUpdate(['personalInfo', 'itch'], val)} isEditing={isEditing} placeholder="https://itch.io/..." />
                                </div>
                                <div>
                                    <span className="text-xs text-pink-400 block mb-1">Instagram Link:</span>
                                    <EditableText value={personalInfo?.instagram} onChange={(val) => onUpdate(['personalInfo', 'instagram'], val)} isEditing={isEditing} placeholder="https://instagram.com/..." />
                                </div>
                            </div>
                        )}
                        
                        <div className="mt-8 text-center w-full"><p className="text-gray-400 text-sm mb-2">ที่อยู่ปัจจุบัน</p><p className="text-gray-300 text-center"><EditableText value={personalInfo?.address} onChange={(val) => onUpdate(['personalInfo', 'address'], val)} isEditing={isEditing} /></p></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);