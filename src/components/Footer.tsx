
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-seo-gradient">SEO.ai</span>
            </Link>
            <p className="text-gray-600 mb-4 max-w-md">
              AI-powered SEO platform that helps businesses grow their organic traffic with smart keyword research, content optimization, and performance tracking.
            </p>
          </div>

          {/* Links column 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-gray-600 hover:text-seo-purple">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-seo-purple">Pricing</Link></li>
              <li><Link to="/integrations" className="text-gray-600 hover:text-seo-purple">Integrations</Link></li>
              <li><Link to="/roadmap" className="text-gray-600 hover:text-seo-purple">Roadmap</Link></li>
            </ul>
          </div>

          {/* Links column 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-gray-600 hover:text-seo-purple">Blog</Link></li>
              <li><Link to="/guides" className="text-gray-600 hover:text-seo-purple">Guides</Link></li>
              <li><Link to="/academy" className="text-gray-600 hover:text-seo-purple">SEO Academy</Link></li>
              <li><Link to="/tools" className="text-gray-600 hover:text-seo-purple">Free Tools</Link></li>
            </ul>
          </div>

          {/* Links column 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-seo-purple">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-seo-purple">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-seo-purple">Contact</Link></li>
              <li><Link to="/legal" className="text-gray-600 hover:text-seo-purple">Legal</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SEO.ai. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-seo-purple">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-seo-purple">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-seo-purple">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
