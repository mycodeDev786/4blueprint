import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-6 md:px-16 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* ✅ Logo & Short Description */}
        <div>
          <Link href="/">
            <Image src={assets.logo} alt="Logo" width={120} height={40} className="mb-4" />
          </Link>
          <p className="text-sm text-gray-400">
            Discover delicious recipes crafted by top chefs. Buy and explore premium recipes effortlessly.
          </p>
        </div>

        {/* ✅ Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/recipes" className="hover:text-white transition">All Recipes</Link></li>
            <li><Link href="/verifiedbakers" className="hover:text-white transition">Verified Bakers</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
          </ul>
        </div>

        {/* ✅ Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: support@example.com</p>
          <p className="text-sm text-gray-400 mb-4">Phone: +1 234 567 890</p>
          
          {/* ✅ Social Media Icons */}
          <div className="flex space-x-4 mt-3">
            <Link href="https://facebook.com" target="_blank">
              <Image src={assets.facebook_icon} alt="Facebook" width={24} height={24} className="hover:opacity-80" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Image src={assets.x_icon} alt="Twitter" width={24} height={24} className="hover:opacity-80" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Image src={assets.instagram_icon} alt="Instagram" width={24} height={24} className="hover:opacity-80" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Image src={assets.linkedin_icon} alt="LinkedIn" width={24} height={24} className="hover:opacity-80" />
            </Link>
          </div>
        </div>
      </div>

      {/* ✅ Copyright Section */}
      <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} 4Blueprints. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
