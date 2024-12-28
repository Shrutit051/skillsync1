import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react'

export function AboutSection() {
  return (
    <section className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <Image
              src="/placeholder.svg?height=80&width=160"
              alt="SkillSync Logo"
              width={160}
              height={80}
              className="bg-white rounded-lg p-2"
            />
            <nav className="space-y-2">
              <Link href="/privacy" className="block hover:text-blue-200">
                Privacy Policy
              </Link>
              <Link href="/accessibility" className="block hover:text-blue-200">
                Accessibility Statement
              </Link>
              <Link href="/admin" className="block hover:text-blue-200">
                ADMIN
              </Link>
              <Link href="/sitemap" className="block hover:text-blue-200">
                Sitemap
              </Link>
            </nav>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="SkillSync Accessibility Logo"
              width={120}
              height={120}
              className="bg-white rounded-full p-2"
            />
            <div className="space-y-2">
              <Image
                src="/placeholder.svg?height=60&width=200"
                alt="WCAG 2.1 (A & AA) Compliance Confirmation"
                width={200}
                height={60}
                className="bg-white rounded-lg p-2"
              />
              <Image
                src="/placeholder.svg?height=60&width=200"
                alt="WAI-AA WCAG 2.1 Certification"
                width={200}
                height={60}
                className="bg-white rounded-lg p-2"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">SkillSync Foundation</h2>
              <address className="not-italic text-sm space-y-1">
                <p>Plot no: 4, 8-2-686/D/1/G/4,</p>
                <p>Kanchi Thatti Khana Road No. 12,</p>
                <p>Banjara Hills, Hyderabad - 500 034</p>
                <p>Telangana, India.</p>
              </address>
            </div>
            <div className="space-y-1">
              <p>
                <a href="mailto:contact@skillsync.org" className="hover:text-blue-200">
                  contact@skillsync.org
                </a>
              </p>
              <p>General Enquiries: <a href="tel:+917714815974" className="hover:text-blue-200">+91 07714815974</a></p>
              <p>Speech and Hearing Impaired | Deaf | Hard of Hearing: <a href="tel:+917714815974" className="hover:text-blue-200">+91 07714815974</a></p>
            </div>
            <div>
              <p className="mb-2">Follow us on social media</p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-blue-200">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="hover:text-blue-200">
                  <Youtube className="h-6 w-6" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p>&copy; {new Date().getFullYear()} SkillSync - A Youth 4 Jobs platform. All Rights Reserved.</p>
        </div>
      </div>
    </section>
  )
}

