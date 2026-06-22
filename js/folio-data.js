// Pre-rendered Portfolio Data
window.PortfolioApp.DEFAULT_DATA = {
    "personalInfo": {
        "name": "ปฏิภาณ จักรเงิน",
        "engName": "Patiphan Chakngoen",
        "nickname": "Best",
        "role": "Game Programmer",
        "email": "patiphan.chak@gmail.com",
        "phone": "097-202-3329",
        "address": "xxx",
        "line": "https://line.me/ti/p/GcbbRjeplD",
        "lineText": "แอดไลน์ที่นี่",
        "emailIcon": "Mail",
        "phoneIcon": "Phone",
        "lineIcon": "Line",
        "facebook": "ปฏิภาณ จักรเงิน",
        "itch": "https://bestchakngoen.itch.io/",
        "profileImage": "https://github.com/BestChakngoen/MyPortfolio/blob/main/Assets/MyProfile.jpg?raw=true",
        "aboutDesc": "ผมตั้งใจที่จะพัฒนาทักษะด้าน Game Programming ให้เชี่ยวชาญยิ่งขึ้น โดยมีความตั้งใจในการร่วมออกแบบและพัฒนา Core Mechanics ที่ตอบสนองความต้องการของผู้เล่นได้อย่างยอดเยี่ยม และมุ่งหวังที่จะนำทักษะด้าน OOP, Data Structures และ Game Logic มาสร้างประสบการณ์ความสนุกแปลกใหม่ในผลงานทุกชิ้น",
        "heroDesc": "นักพัฒนาเกมที่มีความหลงใหลในการสร้าง Core Mechanics และ System Design เชี่ยวชาญ Unity และ C# พร้อมเรียนรู้และเติบโตในอุตสาหกรรมเกม"
    },
    "titles": {
        "about": "Preface",
        "skills": "Technical Skills",
        "projects": "Featured Projects",
        "contact": "Contact Me"
    },
    "projects": [
        {
            "id": 1,
            "title": "SURASAK",
            "type": "Horror Pixel Art / Side Scrolling",
            "engine": "MonoGame / C#",
            "description": "เกมแนว Horror Pixel Art ที่ผู้เล่นรับบทเป็น 'สุรศักดิ์' ที่ต้องหาทางออกจากบ้านร้างและหลบหนีฆาตกรต่อเนื่อง พร้อมไขปริศนาการหายตัวไปของเพื่อน",
            "responsibilities": [
                "พัฒนาระบบการเคลื่อนที่และแอนิเมชัน",
                "ระบบกล้องติดตามตัว",
                "ระบบ Stamina และ Sanity",
                "AI ฆาตกร (FSM)",
                "ระบบ Inventory"
            ],
            "link": "https://bestchakngoen.itch.io/surasak",
            "embedUrl": "",
            "imageColor": "bg-emerald-900",
            "image": "https://github.com/BestChakngoen/MyPortfolio/blob/main/Assets/Surasak.cov.png?raw=true",
            "gallery": []
        },
        {
            "id": 2,
            "title": "FURRY WAR",
            "type": "2D Turn-base Shooting",
            "engine": "Unity / C#",
            "description": "เกมแนว Turn-base Shooting บนมือถือ ผู้เล่นรับบทนักรบ Furry ต่อสู้แย่งชิงอาณาเขต เน้นการคำนวณวิถีโค้งและการวางแผน",
            "responsibilities": [
                "ระบบฟิสิกส์ Projectile",
                "ระบบ Turn-based Manager",
                "ระบบ Charge Bar",
                "AI ศัตรู (FSM)"
            ],
            "link": "https://iiiwachi.itch.io/furrywar",
            "embedUrl": "https://www.youtube.com/watch?v=rhrCG0Vtx3g",
            "imageColor": "bg-amber-700",
            "image": "https://github.com/BestChakngoen/MyPortfolio/blob/main/Assets/FurryWar.cov.png?raw=true",
            "gallery": []
        },
        {
            "id": 3,
            "title": "BUBBLOW",
            "type": "Survival / Global Game Jam 2025",
            "engine": "Unity",
            "description": "เกมแนว Survival ธีม Bubble ผู้เล่นเป็นฟองน้ำที่ต้องยิงกำจัดสิ่งแปลกปลอมและขยายขนาดฟองน้ำเพื่อเอาชีวิตรอดจากการบีบอัด",
            "responsibilities": [
                "Mechanic การหดตัวของวงฟองน้ำ",
                "ระบบ Enemy Spawning",
                "ระบบการยิงตามทิศทางเมาส์"
            ],
            "link": "https://itch.io/jam/global-game-jam-chiang-mai-2025/rate/3272811?fbclid=IwdGRjcASl6sdjbGNrBKXqsmV4dG4DYWVtAjExAHNydGMGYXBwX2lkDDM1MDY4NTUzMTcyOAABHjMVRibVOJto6TUrFpaNwFK8bW5PRv53B1WD57gqT4et_piGzzUaSXiC_l0d_aem_2AHFU-cQWXcZ9461eKDRhQ",
            "embedUrl": "",
            "imageColor": "bg-indigo-900",
            "image": "https://github.com/BestChakngoen/MyPortfolio/blob/main/Assets/Bubblew_cover.png?raw=true",
            "gallery": []
        }
    ],
    "skillCategories": [
        {
            "title": "Game Engines",
            "iconType": "Gamepad2",
            "items": [
                "Unity",
                "Unreal Engine",
                "MonoGame"
            ]
        },
        {
            "title": "Programming Languages",
            "iconType": "Code2",
            "items": [
                "C#",
                "JavaScript",
                "CSS",
                "HTML",
                "C++ (Basic)"
            ]
        },
        {
            "title": "Core Competencies",
            "iconType": "Cpu",
            "items": [
                "Game Mechanics",
                "System Design",
                "OOP",
                "Data Structures",
                "Algorithm"
            ]
        },
        {
            "title": "Graphics & VFX",
            "iconType": "Palette",
            "items": [
                "Shader Graph",
                "VFX Graph",
                "Particle System",
                "Lighting"
            ]
        },
        {
            "title": "Tools & Version Control",
            "iconType": "Terminal",
            "items": [
                "Git",
                "GitHub",
                "GitLab",
                "Visual Studio",
                "VS Code",
                "Rider"
            ]
        },
        {
            "title": "Web Development",
            "iconType": "Globe",
            "items": [
                "HTML5",
                "CSS3",
                "React Basic",
                "Responsive Design"
            ]
        }
    ]
};
