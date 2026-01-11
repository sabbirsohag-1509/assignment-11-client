import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import xImg from "../../assets/x-logo.png";
import Logo from "../../pages/Home/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-base-100 card-text-primary border-t border-gray-300 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
        {/* --- Left Section: Logo & Brand --- */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-4">
            <Logo />
          </div>
          <p className="card-text-primary leading-relaxed max-w-sm">
            ScholarStream is your trusted platform for discovering verified
            scholarship opportunities, submitting applications, and tracking
            progress — all in one unified place.
          </p>
        </div>

        {/* --- Middle Section: Contact Info --- */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="card-text-primary text-xl font-semibold mb-4">
            Contact Us
          </h3>
          <div className="space-y-2 card-text-primary">
            <p className="flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              Dhaka, Bangladesh
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} className="text-primary" />
              support@scholarstream.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="text-primary" />
              +8801723473804
            </p>
          </div>
        </div>

        {/* --- Right Section: Links & Social --- */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="card-text-primary text-xl font-semibold mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 mb-6">
            <li>
              <a href="#" className="hover:text-primary transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition">
                Privacy Policy
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/sabbir.hossainsohag.5/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary hover:bg-blue-600 rounded-full text-white transition"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-primary hover:bg-blue-600 rounded-full transition"
            >
              <img className="w-4 invert" src={xImg} alt="X" />
            </a>
            <a
              href="https://www.instagram.com/sabbir__shs/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary hover:bg-blue-600 rounded-full text-white transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/sabbirhossainsohag/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-primary hover:bg-blue-600 rounded-full text-white transition"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* --- Bottom Bar --- */}
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm card-text-primary">
        © {new Date().getFullYear()}-
        <span className="text-primary font-semibold">ScholarStream</span>. All
        Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
