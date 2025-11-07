import { User, Resume, Portfolio, PortfolioContent } from '@/types'

// Demo user credentials
export const DEMO_USER = {
  email: 'demo@example.com',
  password: 'demo123',
  name: 'Demo User',
  id: 'demo-user-123',
}

// Mock user data
export const mockUser: User = {
  id: DEMO_USER.id,
  email: DEMO_USER.email,
  name: DEMO_USER.name,
  subscription_status: 'premium',
  usage_count: 45,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-15T10:30:00Z',
}

// Mock resumes data
export const mockResumes: Resume[] = [
  {
    id: 'resume-1',
    user_id: DEMO_USER.id,
    original_content: 'Software Engineer with 5+ years of experience...',
    job_description: 'Senior Software Engineer at Google - Full-stack development, React, Node.js',
    ai_generated_content: 'Experienced Software Engineer with 5+ years of expertise in full-stack development...',
    template_used: 'tech-focused',
    compatibility_score: 92,
    s3_file_path: '/resumes/resume-1.pdf',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T14:45:00Z',
  },
  {
    id: 'resume-2',
    user_id: DEMO_USER.id,
    original_content: 'Product Manager with experience in agile methodologies...',
    job_description: 'Product Manager at Microsoft - Agile, Product Strategy',
    ai_generated_content: 'Strategic Product Manager with proven track record in agile product development...',
    template_used: 'modern',
    compatibility_score: 87,
    s3_file_path: '/resumes/resume-2.pdf',
    created_at: '2024-01-10T09:15:00Z',
    updated_at: '2024-01-12T16:20:00Z',
  },
  {
    id: 'resume-3',
    user_id: DEMO_USER.id,
    original_content: 'UX Designer portfolio and experience...',
    job_description: 'UX Designer - User research',
    ai_generated_content: undefined,
    template_used: 'creative',
    compatibility_score: undefined,
    s3_file_path: '/resumes/resume-3.pdf',
    created_at: '2024-01-08T11:00:00Z',
    updated_at: '2024-01-08T11:00:00Z',
  },
]

// Mock portfolio content
const mockPortfolioContent: PortfolioContent = {
  personal_info: {
    name: 'Demo User',
    title: 'Senior Software Engineer',
    email: 'demo@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with a passion for building scalable web applications and leading technical teams. Specialized in full-stack development with modern JavaScript frameworks.',
  },
  skills: [
    { name: 'React', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 90, category: 'Backend' },
    { name: 'TypeScript', level: 88, category: 'Language' },
    { name: 'Python', level: 85, category: 'Language' },
    { name: 'AWS', level: 80, category: 'Cloud' },
    { name: 'Docker', level: 75, category: 'DevOps' },
    { name: 'PostgreSQL', level: 85, category: 'Database' },
    { name: 'GraphQL', level: 82, category: 'API' },
  ],
  experience: [
    {
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      start_date: '2022-01-01',
      end_date: undefined,
      description: 'Leading development of customer-facing web applications using React and Node.js',
      achievements: [
        'Increased application performance by 40% through optimization',
        'Led migration to microservices architecture',
        'Mentored 5 junior developers',
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
    },
    {
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      start_date: '2020-06-01',
      end_date: '2021-12-31',
      description: 'Developed and maintained multiple web applications from scratch',
      achievements: [
        'Built MVP in 3 months',
        'Implemented CI/CD pipeline',
        'Reduced deployment time by 60%',
      ],
      technologies: ['React', 'Python', 'PostgreSQL', 'Docker'],
    },
  ],
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and inventory management',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github_url: 'https://github.com/demo/ecommerce',
      live_url: 'https://demo-ecommerce.com',
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      technologies: ['React', 'GraphQL', 'WebSockets'],
      github_url: 'https://github.com/demo/taskapp',
      live_url: 'https://demo-tasks.com',
    },
    {
      name: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard with data visualization',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
      github_url: 'https://github.com/demo/analytics',
    },
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      start_date: '2016-09-01',
      end_date: '2020-05-31',
      gpa: 3.8,
    },
  ],
  certifications: [
    {
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-03-15',
      url: 'https://aws.amazon.com/certification',
    },
    {
      name: 'React Advanced Patterns',
      issuer: 'Frontend Masters',
      date: '2022-11-20',
    },
  ],
  social_links: [
    { platform: 'GitHub', url: 'https://github.com/demo', icon: 'github' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/demo', icon: 'linkedin' },
    { platform: 'Twitter', url: 'https://twitter.com/demo', icon: 'twitter' },
  ],
}

// Mock portfolio
export const mockPortfolio: Portfolio = {
  id: 'portfolio-1',
  user_id: DEMO_USER.id,
  amplify_app_id: 'demo-portfolio-app',
  domain_name: 'demo-portfolio.example.com',
  content: mockPortfolioContent,
  status: 'deployed',
  created_at: '2024-01-12T10:00:00Z',
}

// Mock analytics data
export const mockAnalytics = {
  totalViews: 1247,
  uniqueVisitors: 892,
  avgTimeOnSite: 245, // seconds
  bounceRate: 32.5,
  topPages: [
    { path: '/', views: 456 },
    { path: '/experience', views: 312 },
    { path: '/projects', views: 289 },
    { path: '/contact', views: 190 },
  ],
  viewsOverTime: [
    { date: '2024-01-01', views: 45 },
    { date: '2024-01-02', views: 52 },
    { date: '2024-01-03', views: 38 },
    { date: '2024-01-04', views: 67 },
    { date: '2024-01-05', views: 89 },
    { date: '2024-01-06', views: 102 },
    { date: '2024-01-07', views: 95 },
    { date: '2024-01-08', views: 78 },
    { date: '2024-01-09', views: 112 },
    { date: '2024-01-10', views: 134 },
    { date: '2024-01-11', views: 156 },
    { date: '2024-01-12', views: 178 },
    { date: '2024-01-13', views: 145 },
    { date: '2024-01-14', views: 167 },
  ],
  referrers: [
    { source: 'Direct', count: 456 },
    { source: 'Google', count: 312 },
    { source: 'LinkedIn', count: 289 },
    { source: 'GitHub', count: 190 },
  ],
  devices: [
    { type: 'Desktop', count: 678 },
    { type: 'Mobile', count: 412 },
    { type: 'Tablet', count: 157 },
  ],
}

// Helper function to simulate API delay
export const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms))

