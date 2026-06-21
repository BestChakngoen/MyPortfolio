# 📜 Professional Software Development Rules & Best Practices

---

## 1. 🧼 Clean Code & Code Quality (คุณภาพของโค้ด)
* **KISS (Keep It Simple, Stupid):** เขียนโค้ดให้เรียบง่ายที่สุด ไม่ซับซ้อนโดยไม่จำเป็น เพื่อให้ผู้อื่นอ่านและดูแลต่อได้ง่าย
* **DRY (Don't Repeat Yourself):** หลีกเลี่ยงการเขียนโค้ดซ้ำซ้อน หากมีส่วนไหนที่ทำงานเหมือนกัน ให้แยกเป็น **Reusable Function** หรือ **Module**
* **Meaningful Naming:** ตั้งชื่อ ตัวแปร (**Variables**), ฟังก์ชัน (**Functions**), และ คลาส (**Classes**) ให้สื่อความหมายชัดเจน และใช้ภาษาอังกฤษที่เป็นสากล เช่น `getUserData()` แทน `getDetails()`

---

## 2. 🌿 Version Control & Git Workflow (การจัดการโค้ด)
* **Feature Branching:** ห้าม Commit หรือ Push โค้ดลง `main` หรือ `master` โดยตรง ให้สร้าง Branch ใหม่สำหรับทุกๆ ฟีเจอร์เสมอ
* **Small & Frequent Commits:** แบ่งการ Commit เป็นก้อนเล็กๆ ตามฟังก์ชันที่ทำเสร็จ ไม่ดองโค้ดไว้เยอะๆ แล้ว Commit ทีเดียว
* **Conventional Commits:** ใช้ข้อความ Commit ที่มีรูปแบบชัดเจน เพื่อให้ง่ายต่อการย้อนดูประวัติ (Rollback) เช่น:
  * `feat: add Google login button`
  * `fix: resolve memory leak on dashboard`

---

## 3. 🧪 Testing & Automation (การทดสอบระบบ)
* **Automated Testing:** เขียน **Unit Tests** และ **Integration Tests** เสมอในส่วนที่เป็น Logic สำคัญเพื่อลดการเกิด Bugs 
* **CI/CD Pipeline:** ใช้เครื่องมืออัตโนมัติในการรัน Test และตรวจเช็คความปลอดภัยของโค้ดทุกครั้งที่มีการเปิด **Pull Request (PR)** ก่อนจะทำการ Deploy

---

## 4. 📝 Documentation (การทำเอกสาร)
* **Self-Documenting Code:** เขียนโค้ดให้สะอาดจนตัวโค้ดอธิบายตัวเองได้ หากจำเป็นต้องใส่ **Comment** ให้เน้นอธิบาย **"ทำไม (Why)"** ถึงเขียนแบบนี้ แทนการอธิบายว่าโค้ดทำ **"อะไร (What)"**
* **Up-to-date README:** ไฟล์ `README.md` ของโปรเจกต์ต้องอัพเดทเสมอ และต้องมีข้อมูลวิธี Setup, การรันสภาพแวดล้อมจำลอง (**Local Environment**), และวิธีสั่งรัน Test อย่างชัดเจน

---

## 5. 🛡️ Security & Performance (ความปลอดภัยและประสิทธิภาพ)
* **Zero Hardcoded Secrets:** ห้ามใส่ข้อมูลสำคัญ เช่น API Keys, Passwords, หรือ Tokens ลงในโค้ดเด็ดขาด ให้ใช้ **Environment Variables (`.env`)** เสมอ
* **Code Review:** โค้ดทุกบรรทัดต้องผ่านการตรวจทานและอนุมัติ (**Approve**) จากเพื่อนร่วมทีมผ่าน **Pull Request** ก่อนจะทำการ **Merge** เข้าสู่ Branch หลัก

## 💳 6. Smart Credit Management & Economy (การประหยัดเครดิตในงานทั่วไป)
* **Right-sizing Models/Services:** เลือกใช้ขนาดทรัพยากรให้เหมาะกับงาน สำหรับงานง่ายๆ (เช่น การจัดฟอร์แมตข้อความ, การแยกหมวดหมู่คำ) ให้ใช้โมเดลรุ่นประหยัด (เช่น **Lightweight / Flash Models**) แทนการใช้โมเดลตัวท็อปที่มีราคาแพง
* **Local Mocking for Testing:** ในขั้นตอนการพัฒนาและทดสอบระบบ (**Development & Testing**) ให้ใช้ **Mock Data** หรือจำลอง Response ภายในเครื่องแทนการยิง API จริงทุกครั้ง เพื่อไม่ให้เสียเครดิตระหว่างการดีบั๊ก โค้ด
* **Caching Response:** ใช้ระบบ **Caching** (เช่น Redis หรือ Local Cache) เพื่อเก็บผลลัพธ์ของข้อมูลที่ถูกเรียกบ่อยๆ หลีกเลี่ยงการส่ง Request ซ้ำไปยังระบบภายนอกโดยไม่จำเป็น
* **Input Optimization:** ออกแบบโครงสร้างข้อมูลและ **Prompt** ให้กระชับ ตัดสิ่งที่ไม่จำเป็นออกก่อนส่ง เพื่อลดจำนวน **Tokens** หรือปริมาณ Data Transfer ที่ต้องจ่ายเงิน
* **Budget Alerts & Hard Limits:** ตั้งค่าระบบแจ้งเตือนเมื่อใช้เครดิตถึงโควตา (**Budget Alerts**) และตั้งเพดานการจ่ายเงินสูงสุด (**Hard Limits**) ไว้เสมอ เพื่อป้องกันเครดิตรั่วไหลหากเกิดโค้ดรันวนลูปไม่สิ้นสุด (**Infinite Loop Bugs**)

## 🧱 7. OOP & SOLID Principles (การออกแบบโค้ดด้วยหลักการ OOP และ SOLID)

### 🟢 4 Pillars of OOP (เสาหลักของ Object-Oriented Programming)
* **Encapsulation (การห่อหุ้มข้อมูล):** ซ่อนข้อมูลและสถานะภายในคลาสด้วย `private` หรือ `protected` และจำกัดการเข้าถึงผ่าน Getter/Setter เพื่อป้องกันการแก้ไขโครงสร้างภายในโดยตรงจากภายนอก
* **Abstraction (การซ่อนรายละเอียด):** แสดงเฉพาะฟังก์ชันที่จำเป็นต่อผู้ใช้งาน และซ่อนความซับซ้อนของการทำงานไว้เบื้องหลัง โดยใช้ **Interface** หรือ **Abstract Class** เป็นตัวกำหนดโครงสร้าง
* **Inheritance (การสืบทอดคุณสมบัติ):** นำโค้ดเก่ากลับมาใช้ซ้ำโดยการสืบทอดคุณสมบัติจากคลาสแม่สู่คลาสลูก แต่ให้เน้นใช้เพื่อแสดงความสัมพันธ์แบบ "Is-A" และระวังการทำ Deep Inheritance (สืบทอดหลายชั้นเกินไป)
* **Polymorphism (การพหุสัณฐาน):** รองรับการทำงานที่หลากหลายผ่านฟังก์ชันชื่อเดียวกัน แต่มีพฤติกรรมต่างกันไปตามวัตถุ (**Method Overriding** และ **Method Overloading**)

### 🔵 SOLID Principles (5 กฎเหล็กของการเขียนโค้ดให้ยืดหยุ่น)
* **S - Single Responsibility Principle (SRP):** หนึ่งคลาสหรือหนึ่งโมดูล ควรมีหน้าที่รับผิดชอบเพียง **"อย่างเดียว"** และมีเหตุผลเดียวเท่านั้นที่จะต้องถูกแก้ไข
* **O - Open/Closed Principle (OCP):** โค้ดที่ดีควร **"เปิด"** สำหรับการขยายฟีเจอร์ใหม่ (Extension) แต่ **"ปิด"** สำหรับการแก้ไขโค้ดเก่าที่ทำงานดีอยู่แล้ว (Modification) โดยนิยมใช้ Interface มาช่วยรองรับการขยายงาน
* **L - Liskov Substitution Principle (LSP):** คลาสลูก (Subclass) ต้องสามารถนำไปใช้แทนที่คลาสแม่ (Base Class) ได้ทุกจุด โดยไม่ทำให้พฤติกรรมของโปรแกรมทำงานผิดเพี้ยนไปจากเดิม
* **I - Interface Segregation Principle (ISP):** อย่าบังคับให้คลาสใดๆ ต้อง Implement หรือพึ่งพา Interface ในส่วนที่คลาสนั้นไม่ได้ใช้งาน ควรแยก Interface ให้มีขนาดเล็กและเฉพาะเจาะจงกับงานนั้นๆ
* **D - Dependency Inversion Principle (DIP):** โมดูลระดับสูง (High-level) ไม่ควรขึ้นตรงกับโมดูลระดับต่ำ (Low-level) แต่ทั้งคู่ควรพึ่งพา **Abstraction** (เน้นเชื่อมต่อผ่าน Interface แทนการเขียนสถาปัตยกรรมแบบผูกติดกันหรือ Tight Coupling)