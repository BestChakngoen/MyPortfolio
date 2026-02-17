window.PortfolioApp.DEFAULT_DATA = {
    personalInfo: {
        name: "ปฏิภาณ จักรเงิน",
        engName: "Patiphan Chakngoen",
        nickname: "Best",
        role: "Game Programmer",
        email: "patipanbest2547@gmail.com",
        phone: "097-202-3329",
        address: "57 หมู่ 10 ต.ป่าหุ่ง อ.พาน จ.เชียงราย 57120",
        line: "https://line.me/ti/p/GcbbRjeplD",
        facebook: "ปฏิภาณ จักรเงิน",
        itch: "https://bestchakngoen.itch.io/",
        profileImage: null
    },
    titles: {
        about: "เกี่ยวกับผม (Preface)",
        skills: "Technical Skills",
        projects: "Featured Projects",
        contact: "Contact Me"
    },
    projects: [
        {
            id: 1,
            title: "SURASAK",
            type: "Horror Pixel Art / Side Scrolling",
            engine: "MonoGame / C#",
            description: "เกมแนว Horror Pixel Art ที่ผู้เล่นรับบทเป็น 'สุรศักดิ์' ที่ต้องหาทางออกจากบ้านร้างและหลบหนีฆาตกรต่อเนื่อง พร้อมไขปริศนาการหายตัวไปของเพื่อน",
            responsibilities: [
                "พัฒนาระบบการเคลื่อนที่และแอนิเมชัน",
                "ระบบกล้องติดตามตัว",
                "ระบบ Stamina และ Sanity",
                "AI ฆาตกร (FSM)",
                "ระบบ Inventory"
            ],
            link: "https://bestchakngoen.itch.io/surasak",
            embedUrl: "", 
            imageColor: "bg-emerald-900",
            image: null,
            gallery: []
        },
        {
            id: 2,
            title: "FURRY WAR",
            type: "2D Turn-base Shooting",
            engine: "Unity / C#",
            description: "เกมแนว Turn-base Shooting บนมือถือ ผู้เล่นรับบทนักรบ Furry ต่อสู้แย่งชิงอาณาเขต เน้นการคำนวณวิถีโค้งและการวางแผน",
            responsibilities: [
                "ระบบฟิสิกส์ Projectile",
                "ระบบ Turn-based Manager",
                "ระบบ Charge Bar",
                "AI ศัตรู (FSM)"
            ],
            link: "https://iiiwachi.itch.io/furrywar",
            embedUrl: "",
            imageColor: "bg-amber-700",
            image: null,
            gallery: []
        },
        {
            id: 3,
            title: "BUBBLOW",
            type: "Survival / Global Game Jam 2025",
            engine: "Unity",
            description: "เกมแนว Survival ธีม Bubble ผู้เล่นเป็นฟองน้ำที่ต้องยิงกำจัดสิ่งแปลกปลอมและขยายขนาดฟองน้ำเพื่อเอาชีวิตรอดจากการบีบอัด",
            responsibilities: [
                "Mechanic การหดตัวของวงฟองน้ำ",
                "ระบบ Enemy Spawning",
                "ระบบการยิงตามทิศทางเมาส์"
            ],
            link: "#",
            embedUrl: "",
            imageColor: "bg-indigo-900",
            image: null,
            gallery: []
        }
    ],
    skillCategories: [
        { title: "Game Engines", iconType: "Gamepad2", items: ["Unity", "Unreal Engine", "MonoGame"] },
        { title: "Programming Languages", iconType: "Code2", items: ["C#", "JavaScript", "CSS", "HTML", "C++ (Basic)"] },
        { title: "Core Competencies", iconType: "Cpu", items: ["Game Mechanics", "System Design", "OOP", "Data Structures", "Algorithm"] },
        { title: "Graphics & VFX", iconType: "Palette", items: ["Shader Graph", "VFX Graph", "Particle System", "Lighting"] },
        { title: "Tools & Version Control", iconType: "Terminal", items: ["Git", "GitHub", "GitLab", "Visual Studio", "VS Code", "Rider", "Windsurf"] },
        { title: "Web Development", iconType: "Globe", items: ["HTML5", "CSS3", "React Basic", "Responsive Design"] }
    ]
};