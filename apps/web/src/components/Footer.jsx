import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold text-[#FA6868] mb-4">PhotoPro</h3>
            <p className="text-gray-400 text-sm">
              Professional photography services for every occasion. Capturing
              your perfect moments with creativity and passion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/shop"
                  className="text-gray-400 hover:text-[#91C6BC] transition-colors text-sm"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/workshops"
                  className="text-gray-400 hover:text-[#91C6BC] transition-colors text-sm"
                >
                  Workshops
                </a>
              </li>
              <li>
                <a
                  href="/courses"
                  className="text-gray-400 hover:text-[#91C6BC] transition-colors text-sm"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-[#91C6BC] transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/track-order"
                  className="text-gray-400 hover:text-[#91C6BC] transition-colors text-sm"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-[#91C6BC] transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-gray-400 hover:text-[#91C6BC] transition-colors text-sm"
                >
                  Shopping Cart
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 text-sm">
                <Mail className="w-4 h-4 mr-2 text-[#91C6BC]" />
                info@photopro.com
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <Phone className="w-4 h-4 mr-2 text-[#91C6BC]" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mr-2 text-[#91C6BC]" />
                123 Photo Street, NY
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                className="text-gray-400 hover:text-[#91C6BC] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#91C6BC] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#91C6BC] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 PhotoPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
