"use client";
import { Camera, Heart, Award, Users } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FA6868] to-[#91C6BC] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About PhotoPro</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Passionate about capturing life's most precious moments through the
            art of photography
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                PhotoPro was founded in 2015 with a simple mission: to make
                professional photography accessible to everyone. What started as
                a small studio with two photographers has grown into a
                full-service photography company serving hundreds of clients
                every year.
              </p>
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                We believe that every moment deserves to be captured
                beautifully. Whether it's a wedding, portrait session, or
                product photography, our team brings creativity,
                professionalism, and passion to every shoot.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we're proud to offer not just photography services, but
                also workshops and courses to help aspiring photographers
                develop their skills and pursue their passion.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800"
                alt="Photography Studio"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#FA6868] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Passion</h3>
              <p className="text-gray-600">
                We love what we do and it shows in every photograph we capture
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#91C6BC] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for perfection in every detail, from composition to
                editing
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#FA6868] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Creativity
              </h3>
              <p className="text-gray-600">
                Every project is unique and we bring fresh, creative
                perspectives
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#91C6BC] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Client Focus
              </h3>
              <p className="text-gray-600">
                Your satisfaction and vision are at the heart of everything we
                do
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-[#FA6868] to-[#91C6BC] rounded-2xl p-12 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10+</div>
              <div className="text-lg">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-lg">Happy Clients</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-lg">Workshops Taught</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">25+</div>
              <div className="text-lg">Awards Won</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
                alt="Team Member"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                John Smith
              </h3>
              <p className="text-[#FA6868] font-semibold mb-2">
                Lead Photographer
              </p>
              <p className="text-gray-600 text-sm">
                Specializes in wedding and portrait photography with 15 years of
                experience
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
                alt="Team Member"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Sarah Johnson
              </h3>
              <p className="text-[#FA6868] font-semibold mb-2">
                Commercial Photographer
              </p>
              <p className="text-gray-600 text-sm">
                Expert in product and commercial photography for brands and
                e-commerce
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
                alt="Team Member"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover shadow-lg"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Mike Davis
              </h3>
              <p className="text-[#FA6868] font-semibold mb-2">
                Workshop Instructor
              </p>
              <p className="text-gray-600 text-sm">
                Award-winning photographer and passionate educator teaching the
                next generation
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gray-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Let's create something beautiful together
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-[#FA6868] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#e85555] transition-colors"
            >
              View Services
            </a>
            <a
              href="/contact"
              className="bg-[#91C6BC] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#7ab0a6] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
