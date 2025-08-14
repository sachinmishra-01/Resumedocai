import { Mail, Twitter, Github, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-customBlue text-white px-6 py-8">
      <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-4 text-sm">
        
        {/* Logo */}
        <div>
          <h2 className="text-xl font-bold mb-2">Resume Doc AI</h2>
          <p className="text-gray-400">Building better web experiences.</p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-400">
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="/Contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-gray-400 flex items-center gap-2">
            <Mail size={16} /> resumedoc@gmail.com
          </p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <a href="https://twitter.com" aria-label="Twitter"><Twitter className="hover:text-white" /></a>
            <a href="https://github.com" aria-label="GitHub"><Github className="hover:text-white" /></a>
            <a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin className="hover:text-white" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 text-center text-gray-500 text-xs border-t border-gray-700 pt-4">
        © 2025 Resumedocai. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
