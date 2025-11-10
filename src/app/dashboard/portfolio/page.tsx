"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Globe,
  ExternalLink,
  Edit,
  CheckCircle,
  Building2,
  Code,
  GraduationCap,
  Award,
  Link as LinkIcon,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { apiClient } from "@/lib/api";
import { mockPortfolio } from "@/lib/mock-data";
import { Portfolio } from "@/types";

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await apiClient.getPortfolio("portfolio-1");
        if (response.success && response.data) {
          setPortfolio(response.data as Portfolio);
        } else {
          setPortfolio(mockPortfolio);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio:", error);
        setPortfolio(mockPortfolio);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await apiClient.generatePortfolio("resume-1");
      if (response.success && response.data) {
        setPortfolio(response.data as Portfolio);
      }
    } catch (error) {
      console.error("Failed to generate portfolio:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading portfolio...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const content = portfolio?.content;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
            <p className="mt-2 text-gray-600">
              Your professional portfolio website
            </p>
          </div>
          {!portfolio && (
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Portfolio"}
            </Button>
          )}
        </div>
      </div>

      {portfolio ? (
        <div className="space-y-6">
          {/* Portfolio Status */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Portfolio Status
                  </CardTitle>
                  <CardDescription>
                    Your portfolio is{" "}
                    {portfolio.status === "deployed"
                      ? "live and deployed"
                      : portfolio.status}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  {portfolio.domain_name && (
                    <Button variant="outline" asChild>
                      <a
                        href={`https://${portfolio.domain_name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live
                      </a>
                    </Button>
                  )}
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-gray-600">
                  Status:{" "}
                  <span className="font-medium capitalize">
                    {portfolio.status}
                  </span>
                </span>
                {portfolio.domain_name && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">
                      Domain:{" "}
                      <span className="font-medium">
                        {portfolio.domain_name}
                      </span>
                    </span>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          {content && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {content.personal_info.name}
                    </h3>
                    <p className="text-lg text-gray-600 mt-1">
                      {content.personal_info.title}
                    </p>
                    <p className="text-gray-600 mt-3">
                      {content.personal_info.summary}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{content.personal_info.email}</span>
                    </div>
                    {content.personal_info.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{content.personal_info.phone}</span>
                      </div>
                    )}
                    {content.personal_info.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{content.personal_info.location}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {content.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {skill.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Experience
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {content.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-200 pl-4 space-y-2"
                    >
                      <div>
                        <h4 className="font-semibold text-lg">
                          {exp.position}
                        </h4>
                        <p className="text-gray-600">{exp.company}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(exp.start_date).toLocaleDateString(
                            "en-US",
                            { month: "short", year: "numeric" }
                          )}{" "}
                          -{" "}
                          {exp.end_date
                            ? new Date(exp.end_date).toLocaleDateString(
                                "en-US",
                                { month: "short", year: "numeric" }
                              )
                            : "Present"}
                        </p>
                      </div>
                      <p className="text-gray-700">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Projects
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.projects.map((project, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 space-y-3"
                      >
                        <h4 className="font-semibold text-lg">
                          {project.name}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2 pt-2">
                          {project.github_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LinkIcon className="mr-2 h-3 w-3" />
                                GitHub
                              </a>
                            </Button>
                          )}
                          {project.live_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-3 w-3" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.education.map((edu, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-semibold">
                        {edu.degree} in {edu.field}
                      </h4>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(edu.start_date).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {edu.end_date
                          ? new Date(edu.end_date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          : "Present"}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              {content.certifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {content.certifications.map((cert, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start"
                        >
                          <div>
                            <h4 className="font-semibold">{cert.name}</h4>
                            <p className="text-sm text-gray-600">
                              {cert.issuer}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(cert.date).toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          {cert.url && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Social Links */}
              {content.social_links.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {content.social_links.map((social, index) => (
                        <Button key={index} variant="outline" asChild>
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <LinkIcon className="mr-2 h-4 w-4" />
                            {social.platform}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No portfolio yet
            </h3>
            <p className="text-gray-600 mb-4">
              Generate your professional portfolio from your resume
            </p>
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Portfolio"}
            </Button>
          </CardContent>
        </Card>
      )}
    </DashboardLayout>
  );
}
