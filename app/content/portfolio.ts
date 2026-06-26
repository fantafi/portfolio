export type Language = "en" | "vi";

export type ContactLink = {
  label: string;
  href: string;
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Service = {
  title: string;
  body: string;
  tags: string[];
};

export type Project = {
  title: string;
  category: string;
  body: string;
  outcomes: string[];
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type ServicesPageCopy = {
  nav: {
    name: string;
    links: NavLink[];
  };
  languageToggle: Record<Language, string>;
  accessibility: {
    primaryNavigation: string;
    languageSelector: string;
    serviceTagsLabel: string;
    orbitLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    secondaryCta: string;
  };
  contactLinks: ContactLink[];
  pillars: {
    eyebrow: string;
    title: string;
    body: string;
    items: Service[];
  };
  packages: {
    eyebrow: string;
    title: string;
    body: string;
    items: Service[];
  };
  process: {
    eyebrow: string;
    title: string;
    body: string;
    steps: ProcessStep[];
  };
  fit: {
    eyebrow: string;
    title: string;
    body: string;
    items: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export type PortfolioCopy = {
  nav: {
    name: string;
    links: NavLink[];
  };
  languageToggle: Record<Language, string>;
  accessibility: {
    primaryNavigation: string;
    languageSelector: string;
    serviceTagsLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    availability: string;
  };
  contactLinks: ContactLink[];
  expertise: {
    eyebrow: string;
    title: string;
    body: string;
    items: Service[];
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    items: Service[];
  };
  work: {
    eyebrow: string;
    title: string;
    body: string;
    items: Project[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
    principlesTitle: string;
    principles: string[];
    stackTitle: string;
    stack: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
  };
};

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    description: "Replace with your primary work email.",
  },
  {
    label: "GitHub",
    href: "https://github.com/your-github",
    description: "Replace with your GitHub profile.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-linkedin",
    description: "Replace with your LinkedIn profile.",
  },
];

const vietnameseContactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:hello@example.com",
    description: "Thay bằng email công việc chính của bạn.",
  },
  {
    label: "GitHub",
    href: "https://github.com/your-github",
    description: "Thay bằng hồ sơ GitHub của bạn.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/your-linkedin",
    description: "Thay bằng hồ sơ LinkedIn của bạn.",
  },
];

export const portfolioContent: Record<Language, PortfolioCopy> = {
  en: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Expertise", href: "#expertise" },
        { label: "Services", href: "/services" },
        { label: "Work", href: "#work" },
        { label: "Contact", href: "#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    accessibility: {
      primaryNavigation: "Primary navigation",
      languageSelector: "Language selector",
      serviceTagsLabel: "Tags for",
    },
    hero: {
      eyebrow: "Full-stack Software Engineer / AI Tooling",
      title: "I build reliable products and practical AI workflows.",
      body: "I help teams turn product ideas into stable web apps, internal tools, and automation systems that are clear to maintain and ready to ship.",
      availability: "Available for software engineering roles, freelance builds, and project-based collaboration.",
    },
    contactLinks,
    expertise: {
      eyebrow: "Expertise",
      title: "Engineering range with product judgment.",
      body: "A focused mix of full-stack delivery, AI workflow design, and cloud-aware implementation.",
      items: [
        {
          title: "Full-stack product delivery",
          body: "Design and build web apps from interface to API, with clear state, data, and deployment boundaries.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "AI tooling and automation",
          body: "Create workflows that reduce repetitive work, connect tools, and make AI useful inside real product operations.",
          tags: ["AI workflows", "Automation", "Internal tools"],
        },
        {
          title: "Cloud-ready systems",
          body: "Ship practical systems with a bias for reliability, maintainability, and simple operational handoff.",
          tags: ["Cloudflare", "Databases", "Deployment"],
        },
      ],
    },
    services: {
      eyebrow: "Freelance services",
      title: "Focused project help from idea to launch.",
      body: "Small, well-scoped engagements for teams that need senior execution without unnecessary process.",
      cta: "Explore services",
      items: [
        {
          title: "MVP web app build",
          body: "Turn a validated idea into a polished first release with product structure, UI, and deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "AI workflow integration",
          body: "Add AI-assisted flows to existing products, dashboards, support processes, or knowledge work.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
        {
          title: "Modernization sprint",
          body: "Refactor brittle UI, improve developer experience, and prepare an app for safer iteration.",
          tags: ["React", "DX", "Performance"],
        },
      ],
    },
    work: {
      eyebrow: "Selected work areas",
      title: "Project cards ready for real case studies.",
      body: "These cards describe representative work areas and can be replaced with named projects when details are available.",
      items: [
        {
          title: "AI operations assistant",
          category: "Automation / AI tooling",
          body: "A workflow concept for summarizing requests, drafting responses, and routing tasks with human review.",
          outcomes: ["Reduced repetitive review", "Clear audit trail", "Human-in-the-loop checks"],
        },
        {
          title: "Client project dashboard",
          category: "Full-stack web app",
          body: "A product dashboard concept for tracking project health, deliverables, and client communication.",
          outcomes: ["Role-based views", "Status clarity", "Reusable component system"],
        },
        {
          title: "Legacy UI modernization",
          category: "Frontend / product quality",
          body: "A modernization concept for improving a dated interface while preserving core product behavior.",
          outcomes: ["Cleaner navigation", "Responsive layouts", "Lower maintenance cost"],
        },
      ],
    },
    about: {
      eyebrow: "About",
      title: "Calm execution, clear systems, practical AI.",
      body: "I enjoy building software that people can understand, use, and keep improving. My strongest work sits between product thinking, full-stack implementation, and useful automation.",
      principlesTitle: "Principles",
      principles: ["Keep scope sharp", "Make interfaces obvious", "Prefer maintainable systems", "Use AI where it creates real leverage"],
      stackTitle: "Stack",
      stack: ["TypeScript", "React", "Next.js", "Node.js", "Cloudflare", "Drizzle", "Postgres", "Three.js", "AI tooling"],
    },
    contact: {
      eyebrow: "Contact",
      title: "Have a role, project, or workflow to discuss?",
      body: "Reach out directly by email or connect through GitHub and LinkedIn.",
    },
  },
  vi: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Năng lực", href: "#expertise" },
        { label: "Dịch vụ", href: "/services" },
        { label: "Dự án", href: "#work" },
        { label: "Liên hệ", href: "#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    accessibility: {
      primaryNavigation: "Điều hướng chính",
      languageSelector: "Chọn ngôn ngữ",
      serviceTagsLabel: "Nhãn cho",
    },
    hero: {
      eyebrow: "Full-stack Software Engineer / AI Tooling",
      title: "Tôi xây dựng sản phẩm ổn định và workflow AI thực dụng.",
      body: "Tôi giúp đội ngũ biến ý tưởng sản phẩm thành web app, internal tool và hệ thống automation rõ ràng, dễ bảo trì, sẵn sàng triển khai.",
      availability: "Sẵn sàng cho vị trí software engineer, freelance build và hợp tác theo project.",
    },
    contactLinks: vietnameseContactLinks,
    expertise: {
      eyebrow: "Năng lực",
      title: "Kỹ thuật full-stack với tư duy sản phẩm.",
      body: "Tập trung vào delivery full-stack, thiết kế workflow AI và triển khai hệ thống dễ vận hành.",
      items: [
        {
          title: "Full-stack product delivery",
          body: "Thiết kế và xây dựng web app từ giao diện tới API, với ranh giới rõ cho state, data và deployment.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "AI tooling và automation",
          body: "Tạo workflow giảm việc lặp lại, kết nối công cụ và đưa AI vào vận hành sản phẩm một cách hữu ích.",
          tags: ["AI workflows", "Automation", "Internal tools"],
        },
        {
          title: "Hệ thống sẵn sàng triển khai",
          body: "Xây dựng hệ thống thực tế, ưu tiên độ ổn định, khả năng bảo trì và bàn giao đơn giản.",
          tags: ["Cloudflare", "Databases", "Deployment"],
        },
      ],
    },
    services: {
      eyebrow: "Dịch vụ freelance",
      title: "Hỗ trợ project từ ý tưởng tới bản chạy được.",
      body: "Các gói hợp tác gọn, rõ phạm vi, phù hợp với đội ngũ cần tốc độ và chất lượng kỹ thuật.",
      cta: "Xem dịch vụ",
      items: [
        {
          title: "Xây dựng MVP web app",
          body: "Biến ý tưởng đã được kiểm chứng thành bản release đầu tiên với UI, cấu trúc sản phẩm và deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "Tích hợp workflow AI",
          body: "Thêm luồng AI-assisted vào sản phẩm, dashboard, quy trình hỗ trợ hoặc công việc tri thức.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
        {
          title: "Modernization sprint",
          body: "Cải thiện UI cũ, developer experience và chuẩn bị app để phát triển an toàn hơn.",
          tags: ["React", "DX", "Performance"],
        },
      ],
    },
    work: {
      eyebrow: "Nhóm dự án tiêu biểu",
      title: "Card dự án sẵn sàng để thay bằng case study thật.",
      body: "Các card này mô tả nhóm công việc đại diện và có thể thay bằng dự án cụ thể khi có nội dung.",
      items: [
        {
          title: "AI operations assistant",
          category: "Automation / AI tooling",
          body: "Concept workflow để tóm tắt yêu cầu, soạn phản hồi và điều phối task với bước review của con người.",
          outcomes: ["Giảm việc review lặp lại", "Có dấu vết xử lý rõ", "Kiểm tra bởi con người"],
        },
        {
          title: "Client project dashboard",
          category: "Full-stack web app",
          body: "Concept dashboard theo dõi tình trạng project, deliverable và giao tiếp với khách hàng.",
          outcomes: ["Giao diện theo vai trò", "Trạng thái rõ ràng", "Component system tái sử dụng"],
        },
        {
          title: "Legacy UI modernization",
          category: "Frontend / product quality",
          body: "Concept cải thiện giao diện cũ trong khi giữ nguyên hành vi cốt lõi của sản phẩm.",
          outcomes: ["Điều hướng sạch hơn", "Responsive layouts", "Giảm chi phí bảo trì"],
        },
      ],
    },
    about: {
      eyebrow: "Giới thiệu",
      title: "Làm việc điềm tĩnh, hệ thống rõ ràng, AI thực dụng.",
      body: "Tôi thích xây dựng phần mềm dễ hiểu, dễ dùng và dễ tiếp tục cải thiện. Điểm mạnh của tôi nằm ở giao điểm giữa tư duy sản phẩm, full-stack implementation và automation hữu ích.",
      principlesTitle: "Nguyên tắc làm việc",
      principles: ["Giữ scope sắc nét", "Làm giao diện dễ hiểu", "Ưu tiên hệ thống dễ bảo trì", "Dùng AI khi tạo ra leverage thật"],
      stackTitle: "Công nghệ",
      stack: ["TypeScript", "React", "Next.js", "Node.js", "Cloudflare", "Drizzle", "Postgres", "Three.js", "AI tooling"],
    },
    contact: {
      eyebrow: "Liên hệ",
      title: "Bạn có role, project hoặc workflow muốn trao đổi?",
      body: "Liên hệ trực tiếp qua email hoặc kết nối qua GitHub và LinkedIn.",
    },
  },
};

export const servicesPageContent: Record<Language, ServicesPageCopy> = {
  en: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Home", href: "/" },
        { label: "Services", href: "/services" },
        { label: "Work", href: "/#work" },
        { label: "Contact", href: "/#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    accessibility: {
      primaryNavigation: "Primary navigation",
      languageSelector: "Language selector",
      serviceTagsLabel: "Tags for",
      orbitLabel: "Service orbit showing web app, mobile app, and AI tooling",
    },
    hero: {
      eyebrow: "Freelance product development",
      title: "Build web apps, mobile apps, and AI tools that are ready to ship.",
      body: "I partner with founders and teams to turn clear ideas into usable products, practical automation, and maintainable software systems.",
      cta: "Discuss your idea",
      secondaryCta: "View portfolio",
    },
    contactLinks,
    pillars: {
      eyebrow: "Services",
      title: "Three ways I help teams move faster.",
      body: "Each engagement is scoped around a concrete outcome, a maintainable codebase, and a clean handoff.",
      items: [
        {
          title: "Web app development",
          body: "Design and build responsive web apps, dashboards, portals, and internal tools with reliable frontend and API foundations.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "Mobile app development",
          body: "Create mobile-first product experiences, companion apps, and cross-platform flows that feel focused and practical.",
          tags: ["Mobile UX", "Product flows", "Launch support"],
        },
        {
          title: "AI tooling and automation",
          body: "Add AI-assisted workflows, internal assistants, and review loops that reduce repetitive work without hiding control.",
          tags: ["AI workflows", "Automation", "Human review"],
        },
      ],
    },
    packages: {
      eyebrow: "Engagement models",
      title: "Focused packages for common project needs.",
      body: "Choose a shape that matches where your product is today.",
      items: [
        {
          title: "MVP / Product build",
          body: "Take a validated concept from scope to a polished first release with UI, product structure, and deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "Modernization sprint",
          body: "Improve brittle screens, refactor risky frontend areas, and make the app easier to extend safely.",
          tags: ["UX cleanup", "Refactor", "Performance"],
        },
        {
          title: "AI workflow integration",
          body: "Introduce AI into support, operations, dashboards, or knowledge workflows with clear review boundaries.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "A clear path from idea to shipped product.",
      body: "The process stays lightweight, but every phase has a concrete output.",
      steps: [
        {
          title: "Discover",
          body: "Clarify the goal, users, constraints, success signals, and the smallest useful release.",
        },
        {
          title: "Design",
          body: "Shape the core flows, information architecture, data boundaries, and implementation plan.",
        },
        {
          title: "Build",
          body: "Implement the product in focused iterations with regular checkpoints and working previews.",
        },
        {
          title: "Launch",
          body: "Prepare deployment, polish the handoff, and leave the codebase ready for the next iteration.",
        },
      ],
    },
    fit: {
      eyebrow: "Good fit",
      title: "Reach out when the project needs senior execution without heavy process.",
      body: "The best projects have a clear business goal, an owner who can give feedback, and room to make pragmatic product decisions.",
      items: [
        "You need a web app, mobile app, or AI workflow built from a defined idea.",
        "You have an existing product that needs modernization or clearer UX.",
        "You want AI automation that still keeps human review and operational clarity.",
        "You value maintainable code and a clean handoff as much as the first launch.",
      ],
    },
    contact: {
      eyebrow: "Start",
      title: "Have an idea worth turning into a real product?",
      body: "Send a short note about the goal, timeline, and current state. I will help shape the next practical step.",
    },
  },
  vi: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Trang chủ", href: "/" },
        { label: "Dịch vụ", href: "/services" },
        { label: "Dự án", href: "/#work" },
        { label: "Liên hệ", href: "/#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    accessibility: {
      primaryNavigation: "Điều hướng chính",
      languageSelector: "Chọn ngôn ngữ",
      serviceTagsLabel: "Nhãn cho",
      orbitLabel: "Mô hình orbit cho web app, mobile app và AI tooling",
    },
    hero: {
      eyebrow: "Freelance product development",
      title: "Xây dựng web app, mobile app và AI tool sẵn sàng triển khai.",
      body: "Tôi đồng hành với founder và team để biến ý tưởng rõ ràng thành sản phẩm dùng được, automation thực tế và hệ thống phần mềm dễ bảo trì.",
      cta: "Trao đổi ý tưởng",
      secondaryCta: "Xem portfolio",
    },
    contactLinks: vietnameseContactLinks,
    pillars: {
      eyebrow: "Dịch vụ",
      title: "Ba cách tôi giúp team đi nhanh hơn.",
      body: "Mỗi engagement được scope quanh một outcome rõ, codebase dễ bảo trì và bàn giao gọn.",
      items: [
        {
          title: "Phát triển web app",
          body: "Thiết kế và xây dựng web app, dashboard, portal và internal tool với frontend và API foundation ổn định.",
          tags: ["React", "Next.js", "TypeScript", "APIs"],
        },
        {
          title: "Phát triển mobile app",
          body: "Tạo trải nghiệm mobile-first, companion app và flow cross-platform tập trung vào tính thực dụng.",
          tags: ["Mobile UX", "Product flows", "Launch support"],
        },
        {
          title: "AI tooling và automation",
          body: "Thêm workflow AI-assisted, internal assistant và review loop để giảm việc lặp lại mà vẫn giữ quyền kiểm soát.",
          tags: ["AI workflows", "Automation", "Human review"],
        },
      ],
    },
    packages: {
      eyebrow: "Mô hình hợp tác",
      title: "Các gói tập trung cho nhu cầu project phổ biến.",
      body: "Chọn hình thức phù hợp với trạng thái hiện tại của sản phẩm.",
      items: [
        {
          title: "MVP / Product build",
          body: "Đưa concept đã rõ scope thành bản release đầu tiên với UI, cấu trúc sản phẩm và deployment.",
          tags: ["Discovery", "Build", "Launch"],
        },
        {
          title: "Modernization sprint",
          body: "Cải thiện màn hình cũ, refactor vùng frontend rủi ro và giúp app dễ mở rộng an toàn hơn.",
          tags: ["UX cleanup", "Refactor", "Performance"],
        },
        {
          title: "Tích hợp workflow AI",
          body: "Đưa AI vào support, operations, dashboard hoặc knowledge workflow với ranh giới review rõ ràng.",
          tags: ["Prompts", "Pipelines", "Review loops"],
        },
      ],
    },
    process: {
      eyebrow: "Quy trình",
      title: "Đường đi rõ từ ý tưởng tới sản phẩm chạy thật.",
      body: "Quy trình gọn nhẹ, nhưng mỗi giai đoạn đều có đầu ra cụ thể.",
      steps: [
        {
          title: "Discover",
          body: "Làm rõ mục tiêu, người dùng, ràng buộc, tín hiệu thành công và bản release nhỏ nhất có giá trị.",
        },
        {
          title: "Design",
          body: "Định hình flow chính, kiến trúc thông tin, ranh giới dữ liệu và kế hoạch triển khai.",
        },
        {
          title: "Build",
          body: "Xây dựng theo các vòng lặp tập trung, có checkpoint đều và bản preview chạy được.",
        },
        {
          title: "Launch",
          body: "Chuẩn bị deployment, hoàn thiện bàn giao và để lại codebase sẵn sàng cho vòng tiếp theo.",
        },
      ],
    },
    fit: {
      eyebrow: "Phù hợp",
      title: "Liên hệ khi project cần senior execution nhưng không muốn quy trình nặng.",
      body: "Project phù hợp nhất khi có mục tiêu kinh doanh rõ, người phụ trách feedback và không gian cho quyết định sản phẩm thực dụng.",
      items: [
        "Bạn cần xây web app, mobile app hoặc AI workflow từ một ý tưởng đã rõ.",
        "Bạn có sản phẩm hiện tại cần modernization hoặc UX rõ ràng hơn.",
        "Bạn muốn AI automation nhưng vẫn giữ review của con người và vận hành minh bạch.",
        "Bạn coi trọng code dễ bảo trì và bàn giao gọn ngang với bản launch đầu tiên.",
      ],
    },
    contact: {
      eyebrow: "Bắt đầu",
      title: "Bạn có ý tưởng đáng để biến thành sản phẩm thật?",
      body: "Gửi vài dòng về mục tiêu, timeline và trạng thái hiện tại. Tôi sẽ giúp xác định bước thực tế tiếp theo.",
    },
  },
};
