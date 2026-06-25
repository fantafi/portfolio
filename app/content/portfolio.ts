export type Language = "en" | "vi";

export type ContactLink = {
  label: string;
  href: string;
  description: string;
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

export type PortfolioCopy = {
  nav: {
    name: string;
    links: Array<{ label: string; href: string }>;
  };
  languageToggle: Record<Language, string>;
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
    principles: string[];
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

export const portfolioContent: Record<Language, PortfolioCopy> = {
  en: {
    nav: {
      name: "Tai Pham",
      links: [
        { label: "Expertise", href: "#expertise" },
        { label: "Services", href: "#services" },
        { label: "Work", href: "#work" },
        { label: "Contact", href: "#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
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
      principles: ["Keep scope sharp", "Make interfaces obvious", "Prefer maintainable systems", "Use AI where it creates real leverage"],
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
        { label: "Dịch vụ", href: "#services" },
        { label: "Dự án", href: "#work" },
        { label: "Liên hệ", href: "#contact" },
      ],
    },
    languageToggle: { en: "EN", vi: "VI" },
    hero: {
      eyebrow: "Full-stack Software Engineer / AI Tooling",
      title: "Tôi xây dựng sản phẩm ổn định và workflow AI thực dụng.",
      body: "Tôi giúp đội ngũ biến ý tưởng sản phẩm thành web app, internal tool và hệ thống automation rõ ràng, dễ bảo trì, sẵn sàng triển khai.",
      availability: "Sẵn sàng cho vị trí software engineer, freelance build và hợp tác theo project.",
    },
    contactLinks,
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
      principles: ["Giữ scope sắc nét", "Làm giao diện dễ hiểu", "Ưu tiên hệ thống dễ bảo trì", "Dùng AI khi tạo ra leverage thật"],
      stack: ["TypeScript", "React", "Next.js", "Node.js", "Cloudflare", "Drizzle", "Postgres", "Three.js", "AI tooling"],
    },
    contact: {
      eyebrow: "Liên hệ",
      title: "Bạn có role, project hoặc workflow muốn trao đổi?",
      body: "Liên hệ trực tiếp qua email hoặc kết nối qua GitHub và LinkedIn.",
    },
  },
};
