/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Globe, Crown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { mockResumes, mockPortfolio } from "@/lib/mock-data";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalResumes: 0,
    aiGenerations: 0,
    portfolios: 0,
    subscriptionStatus: "Free",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch mock data
        const resumesResponse = await apiClient.getResumes();
        const resumes = resumesResponse.data || mockResumes;

        // Count AI-generated resumes
        const aiGenerated = resumes.filter(
          (r: any) => r.ai_generated_content
        ).length;

        // Check for portfolio
        const hasPortfolio = mockPortfolio ? 1 : 0;

        setStats({
          totalResumes: resumes.length,
          aiGenerations: aiGenerated,
          portfolios: hasPortfolio,
          subscriptionStatus: session?.user?.subscription_status || "Free",
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        // Fallback to mock data
        setStats({
          totalResumes: mockResumes.length,
          aiGenerations: mockResumes.filter((r) => r.ai_generated_content)
            .length,
          portfolios: 1,
          subscriptionStatus: session?.user?.subscription_status || "Free",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchStats();
    }
  }, [status, session]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session.user?.name || "User"}!
        </h1>
        <p className="mt-2 text-gray-600">
          Ready to create your AI-optimized resume? Here&apos;s what you can do
          today.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalResumes}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalResumes > 0
                ? `+${stats.totalResumes} total`
                : "No resumes yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Generations
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aiGenerations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.aiGenerations > 0
                ? "AI-optimized resumes"
                : "No AI generations yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolios</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.portfolios}</div>
            <p className="text-xs text-muted-foreground">
              {stats.portfolios > 0 ? "Active portfolio" : "No portfolios yet"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {stats.subscriptionStatus}
            </div>
            <p className="text-xs text-muted-foreground">Plan status</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              Upload Resume
            </CardTitle>
            <CardDescription>
              Upload your existing resume to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/upload">
              <Button className="w-full">Upload Resume</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Create New Resume
            </CardTitle>
            <CardDescription>
              Start from scratch with our AI builder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/resumes">
              <Button className="w-full">Create Resume</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-purple-600" />
              Generate Portfolio
            </CardTitle>
            <CardDescription>
              Create a professional portfolio website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/portfolio">
              <Button className="w-full">Create Portfolio</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest resume and portfolio activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.totalResumes > 0 ? (
                <>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Resume uploaded</p>
                      <p className="text-xs text-gray-500">
                        Software Engineer Resume - 2 days ago
                      </p>
                    </div>
                  </div>
                  {stats.aiGenerations > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          AI optimization completed
                        </p>
                        <p className="text-xs text-gray-500">
                          92% compatibility score - 1 day ago
                        </p>
                      </div>
                    </div>
                  )}
                  {stats.portfolios > 0 && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Portfolio generated
                        </p>
                        <p className="text-xs text-gray-500">
                          Portfolio deployed successfully - 3 days ago
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">No recent activity</p>
                    <p className="text-xs text-gray-500">
                      Start by uploading your first resume
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Tips</CardTitle>
            <CardDescription>
              Get the most out of AI Resume Builder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-green-600">1</span>
                </div>
                <p className="text-sm text-gray-600">
                  Upload your existing resume to get started quickly
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-green-600">2</span>
                </div>
                <p className="text-sm text-gray-600">
                  Paste job descriptions to optimize your resume with AI
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-green-600">3</span>
                </div>
                <p className="text-sm text-gray-600">
                  Generate a professional portfolio to showcase your work
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
