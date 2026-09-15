/**
 * =====================================================================
 * PORTFOLIO PROJECTS CONFIGURATION
 * =====================================================================
 * To add a new card or replace an existing one:
 * 
 * 1. Place your screenshot in:
 *    public/assets/img/portfolio/ (e.g. "my-project.png" or "my-project.webp")
 * 
 * 2. Add an object to the PORTFOLIO_PROJECTS array below:
 *    {
 *      id: 'unique-id',
 *      title: 'Project Title',        // Main title shown on the card badge
 *      client: 'Client or Agency',     // Studio or company name
 *      image: '/assets/img/portfolio/my-project.png', // Path to your website screenshot
 *      icon: '/assets/img/portfolio/my-logo.png',     // (Optional) Logo for badge
 *      link: 'https://example.com',    // (Optional) Link when user clicks client name
 *      category: 'UI/UX Design'        // (Optional) Tag/Category
 *    }
 * =====================================================================
 */

export const PORTFOLIO_PROJECTS = [
  {
    id: 'p1',
    num: '01',
    title: 'Claude Science',
    client: 'Claude Science',
    category: 'UI/UX Design',
    image: '/assets/img/portfolio/slide-2.webp',
    icon: '/assets/img/portfolio/logo-2.png',
    link: 'https://claude.ai',
    description: 'A comprehensive scientific telemetry and research platform built for computational labs.'
  },
  {
    id: 'p2',
    num: '02',
    title: 'Clay',
    client: 'Clay',
    category: 'Application Design',
    image: '/assets/img/portfolio/slide-6.webp',
    icon: '/assets/img/portfolio/logo-3.png',
    link: 'https://clay.com',
    description: 'Enterprise data visualization and CRM suite rendering real-time international market feeds.'
  },
  {
    id: 'p3',
    num: '03',
    title: 'Trevor Noah',
    client: 'Off-brand',
    category: 'Creative Technology',
    image: '/assets/img/portfolio/slide-1.webp',
    icon: '/assets/img/portfolio/logo-4.png',
    link: 'https://www.itsoffbrand.com',
    description: 'Cinematic brand experience showcasing interactive media, comedy tour archives, and editorial layouts.'
  },
  {
    id: 'p4',
    num: '04',
    title: 'Greenhouse',
    client: 'Greenhouse',
    category: 'Productivity SaaS',
    image: '/assets/img/portfolio/slide-5.webp',
    icon: '/assets/img/portfolio/logo-5.png',
    link: '#',
    description: 'Collaborative analytics platform with real-time velocity tracking and team insights.'
  },
  {
    id: 'p5',
    num: '05',
    title: 'Luffu',
    client: 'Luffu',
    category: 'Fintech & Retail',
    image: '/assets/img/portfolio/slide-3.webp',
    icon: '/assets/img/portfolio/logo-6.png',
    link: '#',
    description: 'Ultra-fast headless commerce platform with biometric authentication and zero-fee checkout.'
  },
  {
    id: 'p6',
    num: '06',
    title: 'fauna robotics',
    client: 'O0',
    category: 'Creative Technology',
    image: '/assets/img/portfolio/slide-7.webp',
    icon: '/assets/img/portfolio/logo-7.png',
    link: 'https://www.ozero.design',
    description: 'Interactive hardware telemetry and autonomous robotics monitoring interface.'
  },
  {
    id: 'p7',
    num: '07',
    title: 'fuegofonts',
    client: 'Lit',
    category: 'Design & Typography',
    image: '/assets/img/portfolio/slide-8.webp',
    icon: '/assets/img/portfolio/logo-8.png',
    link: 'https://litcreate.com',
    description: 'Bespoke variable typography showcase and licensing ecommerce shop.'
  },
  {
    id: 'p8',
    num: '08',
    title: 'Radian',
    client: 'Uncommon',
    category: 'Audio & Motion',
    image: '/assets/img/portfolio/slide-4.webp',
    icon: '/assets/img/portfolio/logo-1.png',
    link: 'https://uncommon.nl',
    description: 'Experimental audio-reactive web landscape with spatial sound nodes and 3D wave visualization.'
  }
];
