import React from "react";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 ms-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">SmartGallery AI</span>
            </div>
            <p className="text-sm text-gray-500">
              Your smart, secure photo companion powered by AI.
            </p>
          </div>

          {/* Product */}
          <div className="ms-6">
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#features" className="hover:text-gray-800 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-gray-800 transition-colors">Pricing</a></li>
              <li><a href="#gallery" className="hover:text-gray-800 transition-colors">Gallery</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Mobile App</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="ms-6">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#about" className="hover:text-gray-800 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="ms-6">
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-gray-800 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-gray-800 transition-colors">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SmartGallery AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
