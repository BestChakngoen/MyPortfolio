# Folio Rule (กฎและแนวทางปฏิบัติสำหรับการพัฒนา MyPortfolio - ฉบับปรับปรุง)

## 1. โครงสร้างไฟล์และสถาปัตยกรรม (Architecture & File Structure)
- **ลำดับการโหลดสคริปต์ใน [index.html](file:///C:/Users/patip/Fork repo/MyPortfolio/index.html):**
  สคริปต์ใน `./js` ถูกปรับปรุงให้เหลือเฉพาะไฟล์หลักเพื่อความคล่องตัวและลดความซับซ้อน (Simplicity & Simpler Deployment):
  1. **Data:** [folio-data.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-data.js) (เก็บโครงสร้างและข้อมูลจำลองเริ่มต้น `DEFAULT_DATA`)
  2. **Icons:** [folio-icons.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-icons.js) (เก็บ SVG/Lucide Icons)
  3. **Main App Controller & Sections:** [folio-app.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-app.js) (รวมคอมโพเนนต์การแสดงผลทั้งหมด NavBar, Hero, About, Skills, Projects, Contact และควบคุม React Root Rendering)

- **แยกขอบเขตการทำงาน (Separation of Concerns):**
  - [folio-data.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-data.js) ทำหน้าที่เป็น Single Source of Truth สำหรับข้อมูลการแสดงผลพอร์ตโฟลิโอทั้งหมด ห้ามใส่ฟังก์ชันการประมวลผลหรือ logic ใดๆ
  - [folio-app.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-app.js) ทำหน้าที่จัดการสถานะ UI ของแอปพลิเคชันและการแสดงผลทั้งหมด

## 2. ความปลอดภัยและการจัดเก็บข้อมูล
- **ไม่ต้องเชื่อมต่อฐานข้อมูลภายนอก (No Database / Firebase):**
  - ลบโมดูลและสคริปต์เชื่อมต่อ Firebase SDK ออกจากหน้าเว็บทั้งหมด เพื่อป้องกันการแชร์ข้อมูลส่วนบุคคลและข้อมูลรับรองความปลอดภัย (Credentials) ลงในซอร์สโค้ด (สอดคล้องกับหัวข้อ **Zero Hardcoded Secrets** ใน [README.md](file:///C:/Users/patip/Fork repo/MyPortfolio/README.md))
  - เปลี่ยนรูปแบบแอปพลิเคชันให้เป็น **Static Single-Page Application (SPA)** โดยอ่านข้อมูลจากไฟล์ไคลเอนต์และไม่มีระบบล็อกอิน

---

## รายงานผลการตรวจสอบโค้ดล่าสุด (Code Audit Report - 22 June 2026)

| รายการไฟล์ | ผลตรวจสอบ | รายละเอียดความถูกต้อง / สิ่งที่ได้แก้ไข |
| :--- | :--- | :--- |
| [index.html](file:///C:/Users/patip/Fork repo/MyPortfolio/index.html) | ผ่าน | ลบการโหลด Firebase SDK, โหลดโมดูลเสริมภายนอก และลดสคริปต์เหลือ 3 ไฟล์หลัก |
| [js/folio-app.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-app.js) | ผ่าน | **ปรับโครงสร้างใหม่ทั้งหมด:** ลบระบบล็อกอิน (Login), ส่วนจัดการข้อมูลแอดมิน (Admin Controls), โหมดแก้ไข (Edit Mode), และการอัปโหลดไฟล์ภาพ โดยยุบรวมส่วนการแสดงผล (Navbar, Hero, About, Skills, Projects, Contact) ไว้เป็น Static Component ที่อ่านข้อมูลจาก `folio-data.js` โดยตรง |
| [js/folio-data.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-data.js) | ผ่าน | คงเหลือไว้เฉพาะออบเจกต์ข้อมูล `DEFAULT_DATA` สำหรับหล่อเลี้ยงแอปพลิเคชัน |
| [js/folio-icons.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/folio-icons.js) | ผ่าน | คงโครงสร้าง SVG ไอคอนสำหรับใช้งานร่วมกับ Component ต่างๆ |
| [js/service.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/service.js) | **ลบออกแล้ว** | ลบไฟล์เนื่องจากไม่มีความจำเป็นต้องทำงานร่วมกับ API หรือ Firebase |
| [js/shared.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/shared.js) | **ลบออกแล้ว** | ลบไฟล์คอมโพเนนต์โหมดแก้ไขและแอดมินที่ไม่จำเป็นออก |
| โฟลเดอร์ `js/sections/` | **ลบออกแล้ว** | ยุบสคริปต์ย่อยทั้งหมดรวมเข้าสู่ [app.js](file:///C:/Users/patip/Fork repo/MyPortfolio/js/app.js) เพื่อความเรียบง่าย |
