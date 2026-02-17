const { Icons, EditableText } = window.PortfolioApp;

window.PortfolioApp.AboutSection = ({ titles, isEditing, onUpdate }) => (
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
                    <p className="text-gray-300 leading-relaxed text-lg">ข้าพเจ้ามีความสนใจและความตั้งใจในการพัฒนาตนเองสู่สายอาชีพ <span className="text-orange-400 font-semibold">Game Programmer</span> โดยมุ่งเน้นการพัฒนาเกมเป็นหลัก ผ่านการใช้งาน Unity และ Unreal Engine ในการสร้างระบบเกม กลไกการเล่น (Game Mechanics) และการจัดการโครงสร้างข้อมูลของโปรเจกต์เกมให้มีประสิทธิภาพ</p>
                    <p className="text-gray-300 leading-relaxed text-lg">ระหว่างการศึกษา ข้าพเจ้าได้มีโอกาสพัฒนาเกมในรูปแบบโครงงานและการทำงานเป็นทีม โดยรับผิดชอบในส่วนของการเขียนโปรแกรม พัฒนาระบบหลักของเกม แก้ไขข้อผิดพลาด (Bug Fixing) และปรับปรุงประสิทธิภาพของเกม เพื่อให้สามารถทำงานได้บนหลากหลายแพลตฟอร์ม</p>
                </div>
                <div className="md:w-1/2 bg-gray-900 p-8 rounded-2xl border border-gray-700 shadow-xl">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><Icons.Layers className="text-orange-500" /> ประวัติการศึกษา</h3>
                    <div className="space-y-8 relative pl-6 border-l-2 border-gray-700">
                        <div className="relative">
                            <div className="absolute -left-[33px] bg-orange-500 h-4 w-4 rounded-full border-4 border-gray-900"></div>
                            <h4 className="text-lg font-semibold text-white">มหาวิทยาลัยเชียงใหม่</h4>
                            <p className="text-orange-400 text-sm">2022 - ปัจจุบัน</p>
                            <p className="text-gray-400 mt-1">วิทยาลัยศิลปะ สื่อ และเทคโนโลยี (CAMT)</p>
                            <p className="text-gray-500 text-sm">สาขา Digital Game</p>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[33px] bg-gray-600 h-4 w-4 rounded-full border-4 border-gray-900"></div>
                            <h4 className="text-lg font-semibold text-white">โรงเรียนพานพิทยาคม</h4>
                            <p className="text-gray-400 text-sm">2019 - 2022</p>
                            <p className="text-gray-400 mt-1">แผนการเรียน วิทย์ - คณิต</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);