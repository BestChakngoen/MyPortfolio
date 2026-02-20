const { Icons, EditableText } = window.PortfolioApp;

// เพิ่ม personalInfo = {} มารับค่าเพื่อให้ดึงข้อมูลมาแสดงได้
window.PortfolioApp.AboutSection = ({ titles, personalInfo = {}, isEditing, onUpdate }) => (
    <section id="about" className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="md:w-1/2 space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Icons.BookOpen className="text-orange-500" size={32} />
                        <h2 className="text-3xl font-bold text-white">
                            <EditableText value={titles.about} onChange={(val) => onUpdate(['titles', 'about'], val)} isEditing={isEditing} />
                        </h2>
                    </div>
                    <div className="text-gray-300 leading-relaxed text-lg">
                        <EditableText 
                            value={personalInfo?.aboutDesc1 ?? "ข้าพเจ้ามีความสนใจและความตั้งใจในการพัฒนาตนเองสู่สายอาชีพ Game Programmer โดยมุ่งเน้นการพัฒนาเกมเป็นหลัก ผ่านการใช้งาน Unity และ Unreal Engine ในการสร้างระบบเกม กลไกการเล่น (Game Mechanics) และการจัดการโครงสร้างข้อมูลของโปรเจกต์เกมให้มีประสิทธิภาพ"} 
                            onChange={(val) => onUpdate(['personalInfo', 'aboutDesc1'], val)} 
                            isEditing={isEditing} 
                            multiline={true} 
                        />
                    </div>
                    <div className="text-gray-300 leading-relaxed text-lg">
                        <EditableText 
                            value={personalInfo?.aboutDesc2 ?? "ระหว่างการศึกษา ข้าพเจ้าได้มีโอกาสพัฒนาเกมในรูปแบบโครงงานและการทำงานเป็นทีม โดยรับผิดชอบในส่วนของการเขียนโปรแกรม พัฒนาระบบหลักของเกม แก้ไขข้อผิดพลาด (Bug Fixing) และปรับปรุงประสิทธิภาพของเกม เพื่อให้สามารถทำงานได้บนหลากหลายแพลตฟอร์ม"} 
                            onChange={(val) => onUpdate(['personalInfo', 'aboutDesc2'], val)} 
                            isEditing={isEditing} 
                            multiline={true} 
                        />
                    </div>
                </div>
                <div className="md:w-1/2 bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Icons.Layers className="text-orange-500" /> ประวัติการศึกษา</h3>
                    <div className="space-y-8 relative pl-6 border-l-2 border-gray-700">
                        {/* การศึกษาที่ 1 */}
                        <div className="relative">
                            <div className="absolute -left-[33px] bg-orange-500 h-4 w-4 rounded-full border-4 border-gray-900"></div>
                            <h4 className="text-lg font-semibold text-white">
                                <EditableText value={personalInfo?.edu1Name ?? "มหาวิทยาลัยเชียงใหม่"} onChange={(val) => onUpdate(['personalInfo', 'edu1Name'], val)} isEditing={isEditing} />
                            </h4>
                            <p className="text-orange-400 text-sm">
                                <EditableText value={personalInfo?.edu1Year ?? "2022 - ปัจจุบัน"} onChange={(val) => onUpdate(['personalInfo', 'edu1Year'], val)} isEditing={isEditing} />
                            </p>
                            <p className="text-gray-400 mt-1">
                                <EditableText value={personalInfo?.edu1Faculty ?? "วิทยาลัยศิลปะ สื่อ และเทคโนโลยี (CAMT)"} onChange={(val) => onUpdate(['personalInfo', 'edu1Faculty'], val)} isEditing={isEditing} />
                            </p>
                            <p className="text-gray-500 text-sm">
                                <EditableText value={personalInfo?.edu1Major ?? "สาขา Digital Game"} onChange={(val) => onUpdate(['personalInfo', 'edu1Major'], val)} isEditing={isEditing} />
                            </p>
                        </div>
                        {/* การศึกษาที่ 2 */}
                        <div className="relative">
                            <div className="absolute -left-[33px] bg-gray-600 h-4 w-4 rounded-full border-4 border-gray-900"></div>
                            <h4 className="text-lg font-semibold text-white">
                                <EditableText value={personalInfo?.edu2Name ?? "โรงเรียนพานพิทยาคม"} onChange={(val) => onUpdate(['personalInfo', 'edu2Name'], val)} isEditing={isEditing} />
                            </h4>
                            <p className="text-gray-400 text-sm">
                                <EditableText value={personalInfo?.edu2Year ?? "2019 - 2022"} onChange={(val) => onUpdate(['personalInfo', 'edu2Year'], val)} isEditing={isEditing} />
                            </p>
                            <p className="text-gray-400 mt-1">
                                <EditableText value={personalInfo?.edu2Major ?? "แผนการเรียน วิทย์ - คณิต"} onChange={(val) => onUpdate(['personalInfo', 'edu2Major'], val)} isEditing={isEditing} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);