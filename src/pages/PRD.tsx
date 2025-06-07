
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PRD() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-blue-500 border-2">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-3xl font-bold text-center">
              Product Requirements Document (PRD)
            </CardTitle>
            <p className="text-center text-blue-100 text-lg">
              UAE B2B Hub - Digital Business Marketplace Platform
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Project Overview</h3>
                <p className="text-gray-600">
                  A comprehensive B2B marketplace platform designed specifically for UAE businesses,
                  featuring multilingual support, real-time communication, and secure transactions.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Target Market</h3>
                <p className="text-gray-600">
                  UAE-based suppliers, manufacturers, and buyers seeking verified business connections
                  and streamlined procurement processes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Executive Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              The UAE B2B Hub is a modern, secure, and user-friendly digital marketplace that connects 
              verified businesses across the United Arab Emirates. The platform addresses the growing 
              need for trusted B2B connections in the region's rapidly expanding economy.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-600">Target Users</h4>
                <p className="text-sm text-gray-600">UAE Businesses</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-600">Market Size</h4>
                <p className="text-sm text-gray-600">Growing B2B Sector</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-600">Revenue Model</h4>
                <p className="text-sm text-gray-600">Subscription + Commission</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Core Features & Capabilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Authentication & Security</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Firebase Authentication Integration
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Email/Password Login System
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Secure User Session Management
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Anonymous Guest Access
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Business Registration</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Supplier Registration Form
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Business Profile Verification
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Real-time Form Validation
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Firestore Database Integration
                  </li>
                </ul>
              </div>
            </div>

            <Separator />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Communication System</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Real-time Chat Messaging
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Message History & Timestamps
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    User Identification System
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Support Team Integration
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Dashboard Analytics</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Supplier Dashboard View
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Buyer Dashboard Interface
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    Analytics & Reporting Module
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">✓</Badge>
                    MongoDB Integration Ready
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Architecture */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Technical Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Frontend Stack</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• React 18 with TypeScript</li>
                  <li>• Vite Build Tool</li>
                  <li>• Tailwind CSS Styling</li>
                  <li>• Shadcn/UI Components</li>
                  <li>• React Router DOM</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Backend Services</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Firebase Authentication</li>
                  <li>• Firestore Database</li>
                  <li>• Real-time Data Sync</li>
                  <li>• MongoDB Ready Integration</li>
                  <li>• RESTful API Architecture</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Development Tools</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• ESLint Code Quality</li>
                  <li>• PostCSS Processing</li>
                  <li>• GitHub Integration</li>
                  <li>• Lovable AI Platform</li>
                  <li>• Hot Module Replacement</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Experience Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">User Experience Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Multilingual Support</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700">English Interface</span>
                    <Badge variant="secondary">Primary</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700">Arabic Interface (RTL)</span>
                    <Badge variant="secondary">Secondary</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Complete translation system with right-to-left text support for Arabic users.
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsive Design</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span className="text-gray-700">Mobile Optimized</span>
                    <Badge variant="outline">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Tablet Compatible</span>
                    <Badge variant="outline">✓</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span className="text-gray-700">Desktop Optimized</span>
                    <Badge variant="outline">✓</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Success Metrics & KPIs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700">User Registration Rate</span>
                    <Badge variant="secondary">Target: 15%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700">Business Verification Rate</span>
                    <Badge variant="secondary">Target: 80%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700">Monthly Active Users</span>
                    <Badge variant="secondary">Target: 1000+</Badge>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700">Page Load Time</span>
                    <Badge variant="secondary">Target: &lt;2s</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700">System Uptime</span>
                    <Badge variant="secondary">Target: 99.9%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700">User Session Duration</span>
                    <Badge variant="secondary">Target: 8+ min</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Development Roadmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">✓</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phase 1: Core Platform (Completed)</h3>
                      <p className="text-gray-600 text-sm">Authentication, registration, basic UI, multilingual support</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phase 2: Advanced Features</h3>
                      <p className="text-gray-600 text-sm">Product listings, search filters, payment integration, rating system</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Phase 3: Enterprise Features</h3>
                      <p className="text-gray-600 text-sm">Advanced analytics, API integrations, mobile app, enterprise dashboard</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Summary */}
        <Card className="border-green-500 border-2">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-2xl text-center">Portfolio Demonstration</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700">
                This UAE B2B Hub demonstrates advanced full-stack development capabilities including:
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <ul className="space-y-2 text-gray-600">
                  <li>• Modern React Architecture with TypeScript</li>
                  <li>• Firebase Integration & Real-time Database</li>
                  <li>• Responsive Design with Tailwind CSS</li>
                  <li>• Component-based UI with Shadcn/UI</li>
                </ul>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multilingual Support (English/Arabic)</li>
                  <li>• Secure Authentication Systems</li>
                  <li>• Real-time Communication Features</li>
                  <li>• Professional UX/UI Design Patterns</li>
                </ul>
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-semibold">
                  Ready for production deployment with scalable architecture and enterprise-grade features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
