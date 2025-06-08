
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function PRD() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-green-500 border-2">
          <CardHeader className="bg-green-600 text-white">
            <CardTitle className="text-3xl font-bold text-center">
              🗂 Product Requirements Document (PRD)
            </CardTitle>
            <p className="text-center text-green-100 text-lg">
              UAE HUB – Portfolio Website for Trading & Supplying
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Owner</h3>
                <p className="text-gray-600">Mohamed Mustafa</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Date</h3>
                <p className="text-gray-600">2025-06-08</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Version</h3>
                <p className="text-gray-600">1.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">🔍 1. Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Purpose</h3>
              <p className="text-gray-700 leading-relaxed">
                Create a professional, modern, and scalable portfolio website for UAE HUB, representing its 
                role in trading, product sourcing, manufacturing connections, and regional supply chain services. 
                The site will serve as both an online portfolio and an introductory B2B gateway.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Audience</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">•</Badge>
                    Business buyers in the UAE and GCC
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">•</Badge>
                    International manufacturers seeking UAE distribution
                  </li>
                </ul>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">•</Badge>
                    Local businesses looking for supply chain support
                  </li>
                  <li className="flex items-center">
                    <Badge variant="outline" className="mr-2">•</Badge>
                    Government procurement officers
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">🎯 2. Objectives</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <Badge variant="secondary" className="mr-3 mt-1">✓</Badge>
                Showcase UAE HUB's products, partnerships, and services
              </li>
              <li className="flex items-start">
                <Badge variant="secondary" className="mr-3 mt-1">✓</Badge>
                Present an attractive portfolio of manufacturers and product lines
              </li>
              <li className="flex items-start">
                <Badge variant="secondary" className="mr-3 mt-1">✓</Badge>
                Highlight the HUB's regional logistics and supply capabilities
              </li>
              <li className="flex items-start">
                <Badge variant="secondary" className="mr-3 mt-1">✓</Badge>
                Enable easy inquiry and contact through call-to-action forms
              </li>
              <li className="flex items-start">
                <Badge variant="secondary" className="mr-3 mt-1">✓</Badge>
                SEO-optimized for B2B visibility in the UAE and MENA region
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Core Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">🧱 3. Core Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Home Page */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 Home Page</h3>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Hero section with tagline (e.g., "Connecting Global Products to UAE Markets")</li>
                <li>• Overview of UAE HUB mission</li>
                <li>• Quick links to Products, Partners, and Contact</li>
                <li>• Clean, modern layout with interactive visual elements</li>
              </ul>
            </div>

            <Separator />

            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 About Us</h3>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Company background</li>
                <li>• Vision & mission</li>
                <li>• Regional and global focus</li>
                <li>• Leadership profile (Mohamed Mustafa)</li>
              </ul>
            </div>

            <Separator />

            {/* Product Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3.3 Product Categories</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 mb-3">Display key trading segments such as:</p>
                <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <span>• Building Materials</span>
                  <span>• Packaging Supplies</span>
                  <span>• Plastic Raw Materials</span>
                  <span>• Consumer Goods</span>
                  <span>• Machinery & Equipment</span>
                </div>
              </div>
              <p className="text-gray-600 mb-2">Each category includes:</p>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Photos</li>
                <li>• Key specs</li>
                <li>• Supplier or origin country</li>
                <li>• MOQ, lead time, and certifications</li>
              </ul>
            </div>

            <Separator />

            {/* Partners & Manufacturers */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3.4 Our Partners & Manufacturers</h3>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Logos and short bios of key manufacturing partners</li>
                <li>• UAE, China, India, Turkey, Germany, etc.</li>
                <li>• Certifications or trade awards</li>
                <li>• Import/export license verifications (optional PDFs)</li>
              </ul>
            </div>

            <Separator />

            {/* Supply Chain & Logistics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3.5 Supply Chain & Logistics</h3>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Distribution capacity in UAE</li>
                <li>• Warehousing or local stocking</li>
                <li>• Documentation & compliance capabilities</li>
                <li>• Regional coverage (UAE, KSA, Oman, etc.)</li>
              </ul>
            </div>

            <Separator />

            {/* Contact & Inquiry */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">3.6 Contact & Inquiry</h3>
              <ul className="space-y-2 text-gray-600 ml-4">
                <li>• Embedded contact form (Name, Company, Email, Message)</li>
                <li>• WhatsApp click-to-chat</li>
                <li>• Google Maps location</li>
                <li>• Email and phone info</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Functional Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">🧩 4. Functional Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700 font-medium">CMS Integration</span>
                    <Badge variant="secondary">WordPress/Webflow</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700 font-medium">Multi-language</span>
                    <Badge variant="secondary">English + Arabic</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700 font-medium">Responsive Design</span>
                    <Badge variant="secondary">Mobile/Tablet/Desktop</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700 font-medium">SEO Integration</span>
                    <Badge variant="secondary">Google-friendly</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700 font-medium">Contact Form</span>
                    <Badge variant="secondary">Email routing</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="text-gray-700 font-medium">Analytics</span>
                    <Badge variant="secondary">Google Analytics</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Design Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">🎨 5. Design Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Theme & Colors</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Modern, professional B2B theme</li>
                  <li>• UAE flag inspired colors (green, red, black, white)</li>
                  <li>• Industrial grays for accents</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Visual Elements</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Typography: Clean sans-serif (Inter, Roboto)</li>
                  <li>• Imagery: Real product photos, logistics themes</li>
                  <li>• Iconography: Clear and minimalistic</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">⏱ 6. Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-300"></div>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Planning & Content Gathering</h3>
                      <p className="text-gray-600 text-sm">1 week</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Wireframing & Design</h3>
                      <p className="text-gray-600 text-sm">1 week</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Development</h3>
                      <p className="text-gray-600 text-sm">2 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Testing & QA</h3>
                      <p className="text-gray-600 text-sm">1 week</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">🚀</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Launch</h3>
                      <p className="text-gray-600 text-sm">Target: Within 5 weeks from start</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deliverables */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">📦 7. Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <Badge variant="outline" className="mr-3 mt-1">✓</Badge>
                Fully functional UAE HUB portfolio website
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-3 mt-1">✓</Badge>
                Admin credentials
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-3 mt-1">✓</Badge>
                Website documentation (PDF)
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-3 mt-1">✓</Badge>
                SEO launch checklist
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-3 mt-1">✓</Badge>
                Google Business Profile setup (optional)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Future Add-ons */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">📌 8. Future Add-ons (Phase 2)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-gray-600">
                <li>• Client dashboard for order tracking</li>
                <li>• E-commerce integration for selected products</li>
                <li>• Arabic language support</li>
              </ul>
              <ul className="space-y-2 text-gray-600">
                <li>• Supplier portal for adding/updating product info</li>
                <li>• News & blog section for trade updates</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Approval */}
        <Card className="border-red-500 border-2">
          <CardHeader className="bg-red-600 text-white">
            <CardTitle className="text-2xl text-center">📝 9. Approval</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <p className="text-lg text-gray-700">
                <strong>Prepared by:</strong> Mohamed Mustafa
              </p>
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <p className="text-red-800 font-semibold">
                  UAE HUB Trading & Supply Portfolio Website - Professional B2B Platform
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
