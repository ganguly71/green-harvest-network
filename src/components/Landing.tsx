import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShoppingBag, TruckIcon, DollarSign, Handshake, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section
        className="relative py-20 md:py-32 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Green Harvest Network
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Connecting farmers directly with retail buyers for fresher produce and fair prices
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/login">
              <Button
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6 rounded-lg shadow-lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-700">Farmers Register</h3>
              <p className="text-gray-600">
                Farmers register with their produce information and harvest seasons to connect with retailers.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-yellow-700">Create Selling Requests</h3>
              <p className="text-gray-600">
                Farmers select shops and create selling requests with their produce details and pricing.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Handshake className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-green-700">Direct Connection</h3>
              <p className="text-gray-600">
                Retailers review and accept requests, connecting directly with farmers for negotiations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-green-800">
            Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-green-700">Better Prices</h3>
                <p className="text-gray-600">
                  Farmers get fair prices by eliminating middlemen and connecting directly with retail buyers.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-700">Fresher Produce</h3>
                <p className="text-gray-600">
                  Retailers get fresher produce directly from farms, improving quality for their customers.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-green-700">Wider Market Access</h3>
                <p className="text-gray-600">
                  Farmers gain access to a wider market of retailers, while shops find more diverse suppliers.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <TruckIcon className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-700">Transparent Logistics</h3>
                <p className="text-gray-600">
                  Clear transportation costs and delivery expectations between farmers and retailers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-green-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to connect with the Green Harvest Network?
          </h2>
          <Link to="/login">
            <Button
              className="bg-white text-green-600 hover:bg-yellow-50 text-lg px-8 py-6 rounded-lg shadow-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Green Harvest Network</h3>
              <p className="text-gray-400">Connecting Farmers and Retailers</p>
            </div>
            
            <div className="flex gap-6">
              <Link to="/" className="text-white hover:text-green-400">Home</Link>
              <Link to="/register-buyer" className="text-white hover:text-green-400">For Buyers</Link>
              <Link to="/register-seller" className="text-white hover:text-green-400">For Farmers</Link>
            </div>
          </div>
          
          <div className="flex justify-center space-x-6 mt-6">
            <a 
              href="https://facebook.com/greenharvest" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-green-400"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="https://instagram.com/greenharvest" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-green-400"
            >
              <Instagram size={24} />
            </a>
            <a 
              href="https://twitter.com/greenharvest" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-green-400"
            >
              <Twitter size={24} />
            </a>
            <a 
              href="https://linkedin.com/company/greenharvest" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white hover:text-green-400"
            >
              <Linkedin size={24} />
            </a>
          </div>
          
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Green Harvest Network. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
