import { ApiResponse } from '@/types'
import { mockResumes, mockPortfolio, mockUser, mockAnalytics, delay, DEMO_USER } from './mock-data'

// Use mock mode if NEXT_PUBLIC_USE_MOCK is set to 'true' or if API URL is not configured
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null
    try {
      return localStorage.getItem('accessToken')
    } catch {
      return null
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    // If in mock mode, return mock data
    if (USE_MOCK) {
      await delay(300) // Simulate network delay
      return this.handleMockRequest<T>(endpoint, options)
    }

    // Real API request
    const url = `${this.baseUrl}${endpoint}`

    const token = this.getAccessToken()

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'An error occurred')
      }

      return data
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  private async handleMockRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const method = options.method || 'GET'
    const body = options.body ? JSON.parse(options.body as string) : {}

    // Auth endpoints
    if (endpoint === '/auth/login' && method === 'POST') {
      if (body.email === DEMO_USER.email && body.password === DEMO_USER.password) {
        return {
          success: true,
          data: {
            user: mockUser,
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
          },
        } as ApiResponse<T>
      }
      return {
        success: false,
        error: 'Invalid credentials',
      } as ApiResponse<T>
    }

    if (endpoint === '/auth/register' && method === 'POST') {
      return {
        success: true,
        data: {
          user: { ...mockUser, email: body.email, name: body.name },
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        },
        message: 'User registered successfully',
      } as ApiResponse<T>
    }

    // Resume endpoints
    if (endpoint === '/resumes' && method === 'GET') {
      return {
        success: true,
        data: mockResumes,
      } as ApiResponse<T>
    }

    if (endpoint === '/resumes' && method === 'POST') {
      const newResume = {
        id: `resume-${Date.now()}`,
        user_id: mockUser.id,
        original_content: body.originalContent || '',
        job_description: body.jobDescription || '',
        ai_generated_content: `AI-generated content for: ${body.jobDescription || 'No job description'}`,
        template_used: body.templateUsed || 'modern',
        compatibility_score: Math.floor(Math.random() * 20) + 80,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      return {
        success: true,
        data: newResume,
      } as ApiResponse<T>
    }

    if (endpoint.startsWith('/resumes/') && method === 'GET') {
      const id = endpoint.split('/resumes/')[1]
      const resume = mockResumes.find(r => r.id === id)
      if (resume) {
        return {
          success: true,
          data: resume,
        } as ApiResponse<T>
      }
      return {
        success: false,
        error: 'Resume not found',
      } as ApiResponse<T>
    }

    if (endpoint.startsWith('/resumes/') && method === 'DELETE') {
      return {
        success: true,
        message: 'Resume deleted successfully',
      } as ApiResponse<T>
    }

    // Portfolio endpoints
    if (endpoint === '/portfolios/generate' && method === 'POST') {
      return {
        success: true,
        data: mockPortfolio,
        message: 'Portfolio generated successfully',
      } as ApiResponse<T>
    }

    if (endpoint.startsWith('/portfolios/') && method === 'GET') {
      return {
        success: true,
        data: mockPortfolio,
      } as ApiResponse<T>
    }

    if (endpoint.startsWith('/portfolios/') && method === 'PUT') {
      return {
        success: true,
        data: { ...mockPortfolio, content: body.content },
        message: 'Portfolio updated successfully',
      } as ApiResponse<T>
    }

    // Subscription endpoints
    if (endpoint === '/subscriptions/status' && method === 'GET') {
      return {
        success: true,
        data: {
          status: mockUser.subscription_status,
          plan_type: mockUser.subscription_status,
        },
      } as ApiResponse<T>
    }

    // Default response
    return {
      success: true,
      data: {} as T,
    } as ApiResponse<T>
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async register(name: string, email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    })
  }

  // Resume endpoints
  async createResume(originalContent: string, jobDescription: string, templateUsed?: string) {
    return this.request('/resumes', {
      method: 'POST',
      body: JSON.stringify({ originalContent, jobDescription, templateUsed }),
    })
  }

  async getResumes() {
    return this.request('/resumes')
  }

  async getResume(id: string) {
    return this.request(`/resumes/${id}`)
  }

  async deleteResume(id: string) {
    return this.request(`/resumes/${id}`, {
      method: 'DELETE',
    })
  }

  // AI endpoints
  async rewriteResume(resumeId: string, jobDescription: string) {
    return this.request('/ai/rewrite-resume', {
      method: 'POST',
      body: JSON.stringify({ resumeId, jobDescription }),
    })
  }

  async generateCoverLetter(resumeId: string, companyName: string) {
    return this.request('/ai/generate-cover-letter', {
      method: 'POST',
      body: JSON.stringify({ resumeId, companyName }),
    })
  }

  async calculateCompatibility(resumeId: string, jobDescription: string) {
    return this.request('/ai/calculate-compatibility', {
      method: 'POST',
      body: JSON.stringify({ resumeId, jobDescription }),
    })
  }

  // Portfolio endpoints
  async generatePortfolio(resumeId: string) {
    return this.request('/portfolios/generate', {
      method: 'POST',
      body: JSON.stringify({ resumeId }),
    })
  }

  async getPortfolio(id: string) {
    return this.request(`/portfolios/${id}`)
  }

  async updatePortfolio(id: string, content: any) {
    return this.request(`/portfolios/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    })
  }

  // Subscription endpoints
  async createSubscription(priceId: string) {
    return this.request('/subscriptions/create', {
      method: 'POST',
      body: JSON.stringify({ priceId }),
    })
  }

  async getSubscriptionStatus() {
    return this.request('/subscriptions/status')
  }

  async cancelSubscription() {
    return this.request('/subscriptions/cancel', {
      method: 'POST',
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL) 