import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ContactForm } from "@/components/contact-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="font-bold text-xl md:text-2xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">Cretio</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-sm font-medium transition-colors hover:text-primary">
                Testimonials
              </Link>
              <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact Us
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400">
              Cretio
            </h1>
            <div className="grid gap-6 lg:gap-12 items-center">
              <div className="flex flex-col justify-center items-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Empower Your Business Ecosystem
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                    Multivendor B2B2B SaaS Platform for Agencies, The ultimate platform to manage clients, build
                    funnels, and scale operations.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  <Link href="/auth/signup">
                    <Button size="lg" className="bg-pink-500 text-white hover:bg-pink-600">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/30 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our streamlined workflow helps you manage your business efficiently
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-4 w-full max-w-5xl">
                {/* Step 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white text-2xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Setup</h3>
                  <p className="text-muted-foreground mt-2">Create your account and configure your workspace</p>
                  <div className="mt-4 hidden md:block">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-muted-foreground ml-auto"
                    >
                      <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white text-2xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Build</h3>
                  <p className="text-muted-foreground mt-2">Create funnels and manage your media assets</p>
                  <div className="mt-4 hidden md:block">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-muted-foreground ml-auto"
                    >
                      <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white text-2xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Engage</h3>
                  <p className="text-muted-foreground mt-2">Capture and nurture leads with CRM tools</p>
                  <div className="mt-4 hidden md:block">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-muted-foreground ml-auto"
                    >
                      <path
                        d="M5 12H19M19 12L13 6M19 12L13 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-pink-500 text-white text-2xl font-bold mb-4">
                    4
                  </div>
                  <h3 className="text-xl font-bold">Scale</h3>
                  <p className="text-muted-foreground mt-2">Grow your business with analytics and insights</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background/30 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the perfect plan for your business needs. No hidden fees.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                {/* Starter Plan */}
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Starter</h3>
                    <p className="text-muted-foreground">Perfect for small agencies just getting started</p>
                  </div>
                  <div className="my-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">$49</span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                  </div>
                  <ul className="mb-6 space-y-2 text-sm text-left">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 3 team members</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>5 client sub-accounts</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>10 funnels</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>5GB media storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic CRM features</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup" className="mt-auto">
                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">Get Started</Button>
                  </Link>
                </div>

                {/* Professional Plan */}
                <div className="flex flex-col rounded-lg border bg-primary p-6 shadow-md transition-all hover:shadow-lg relative">
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary-foreground">Professional</h3>
                    <p className="text-primary-foreground/80">Ideal for growing agencies with multiple clients</p>
                  </div>
                  <div className="my-6">
                    <div className="flex items-baseline justify-center text-primary-foreground">
                      <span className="text-4xl font-bold">$149</span>
                      <span className="ml-1 text-primary-foreground/80">/month</span>
                    </div>
                  </div>
                  <ul className="mb-6 space-y-2 text-sm text-left text-primary-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Up to 10 team members</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>25 client sub-accounts</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Unlimited funnels</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>50GB media storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Advanced CRM with email campaigns</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup" className="mt-auto">
                    <Button className="w-full bg-background text-primary hover:bg-background/90">Get Started</Button>
                  </Link>
                </div>

                {/* Enterprise Plan */}
                <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Enterprise</h3>
                    <p className="text-muted-foreground">For large agencies with advanced requirements</p>
                  </div>
                  <div className="my-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold">$399</span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                  </div>
                  <ul className="mb-6 space-y-2 text-sm text-left">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited team members</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited client sub-accounts</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited funnels</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>500GB media storage</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Full CRM suite with automation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>24/7 dedicated support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      <span>White labeling</span>
                    </li>
                  </ul>
                  <Link href="/auth/signup" className="mt-auto">
                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white">Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-muted-foreground">
                  Need a custom plan?{" "}
                  <Link href="/contact" className="font-medium text-primary hover:underline">
                    Contact us
                  </Link>{" "}
                  for a tailored solution.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Don't just take our word for it. Here's what our clients have to say about Cretio.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Testimonial 1 */}
                <div className="flex flex-col items-center gap-4 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <img src="/placeholder.svg?height=64&width=64" alt="Sarah Johnson" className="object-cover" />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-muted-foreground italic">
                      "Cretio has transformed how we manage our client relationships. The CRM features are intuitive and
                      the media library makes asset management a breeze."
                    </p>
                    <div>
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Marketing Director, TechFlow</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="flex flex-col items-center gap-4 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <img src="/placeholder.svg?height=64&width=64" alt="Michael Chen" className="object-cover" />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-muted-foreground italic">
                      "The funnel builder is a game-changer. We've increased our conversion rates by 35% since switching
                      to Cretio. The support team is also incredibly responsive."
                    </p>
                    <div>
                      <h4 className="font-semibold">Michael Chen</h4>
                      <p className="text-sm text-muted-foreground">CEO, GrowthLabs</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div className="flex flex-col items-center gap-4 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full">
                    <img src="/placeholder.svg?height=64&width=64" alt="Emily Rodriguez" className="object-cover" />
                  </div>
                  <div className="space-y-2 text-center">
                    <p className="text-muted-foreground italic">
                      "Managing our agency has never been easier. The multi-level account structure allows us to keep
                      everything organized while giving clients just the right level of access."
                    </p>
                    <div>
                      <h4 className="font-semibold">Emily Rodriguez</h4>
                      <p className="text-sm text-muted-foreground">Agency Owner, DigitalEdge</p>
                    </div>
                  </div>
                  <div className="flex text-amber-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-muted-foreground">Join thousands of satisfied customers using Cretio</p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Have questions or need assistance? We're here to help. Reach out to our team.
                </p>
              </div>
              <div className="w-full max-w-md">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
        <footer className="w-full border-t py-12 bg-muted/30 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Company Info */}
              <div className="space-y-4">
                <Link href="/" className="inline-block">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-400 text-2xl font-bold">
                    Cretio
                  </span>
                </Link>
                <p className="text-muted-foreground">
                  The ultimate platform for agencies to manage clients, build funnels, and scale operations.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonials"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                      Help Center
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mt-1"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a1616 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +91 99999 99999
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mt-1"
                    >
                      <polyline points="22 12 16 12 14.5 15 10 15 8.5 12 2 12" />
                      <path d="M22 5H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z" />
                    </svg>
                    info@cretio.com
                  </li>
                  <li className="flex items-start space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground mt-1"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                    123 Main Street, India
                  </li>
                </ul>
              </div>

              {/* Newsletter */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
                <p className="text-muted-foreground">
                  Stay up to date with our latest news, updates, and special offers.
                </p>
                <div className="flex flex-col space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button>Subscribe</Button>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Cretio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
