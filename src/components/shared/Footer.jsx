import React from 'react';
import { Link } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Discover Clubs", to: "/clubs" },
        { name: "Upcoming Events", to: "/events" },
        { name: "Become a Manager", to: "/becomeClubManager" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", to: "/about" },
        { name: "Contact", to: "/contact" },
        { name: "Privacy Policy",  },
        { name: "Terms of Service", },
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", },
        { name: "FAQs",  },
        { name: "Report Issue",  },
      ]
    }
  ];

  return (
    <footer className="bg-[#100061] text-white md:w-10/12 md:mx-auto rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:justify-items-center">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold mb-4 text-white">ClubNest</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Connecting passionate people through real communities. Discover, join, and lead clubs that matter.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-main transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-main transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-main transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-11 h-11 bg-gray-800 rounded-full flex items-center justify-center hover:bg-main transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-6 text-white">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="text-gray-400 hover:text-white transition duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-500  gap-6">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} ClubNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;