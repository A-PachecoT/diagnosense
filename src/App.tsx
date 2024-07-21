import React, {ChangeEvent, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ChevronRight, Upload, Activity } from 'lucide-react';

// Components
const Header = () => (
    <header className="absolute top-0 left-0 right-0 z-10 p-6">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">AXIOME</h1>
        <ul className="flex space-x-6 text-white">
          <li><a href="#about" className="hover:text-teal-300 transition-colors">About</a></li>
          <li><a href="#services" className="hover:text-teal-300 transition-colors">Services</a></li>
          <li><a href="#contact" className="hover:text-teal-300 transition-colors">Contact</a></li>
        </ul>
      </nav>
    </header>
);

const Hero = () => (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 text-white p-8">
      <div className="max-w-4xl text-center">
        <h2 className="text-5xl font-bold mb-6">Revolutionizing Healthcare with AI</h2>
        <p className="text-xl mb-8">Discover how AXIOME's cutting-edge technology detects diseases with unparalleled accuracy.</p>
        <a href="#demo" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors">
          Try Demo <ChevronRight className="ml-2" />
        </a>
      </div>
    </section>
);

const About = () => (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">About AXIOME</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
          AXIOME Medicare Center uses cutting-edge technology to revolutionize healthcare diagnostics.
          Our AI-powered solutions provide accurate and rapid disease detection, starting with our
          Malaria parasite detection MVP.
        </p>
      </div>
    </section>
);

const Services = () => (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard
              title="Malaria Detection"
              description="AI-powered analysis of blood samples for rapid malaria parasite detection."
              icon={<Activity className="w-12 h-12 text-teal-500" />}
          />
          {/* Add more ServiceCard components for other services */}
        </div>
      </div>
    </section>
);

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode; // This assumes 'icon' can be any valid React node
}

const ServiceCard = ({ title, description, icon }: ServiceCardProps) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
    </div>
);


const Demo = () => {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            setImage(URL.createObjectURL(file)); // Display the image
        } else {
            console.log('No file selected');
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setResult('https://example.com/processed-image.jpg');
        } catch (err) {
            setError('Failed to process image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="demo" className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Try Our Demo</h2>
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <label className="block mb-2">Upload an image for malaria parasite detection:</label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors">
                                <Upload className="mr-2" />
                                <span>Upload Image</span>
                                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </label>
                            <button
                                onClick={handleSubmit}
                                disabled={!image || loading}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center disabled:opacity-50 transition-colors"
                            >
                                <span>Analyze</span>
                            </button>
                        </div>
                    </div>

                    {image && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">Uploaded Image:</h3>
                            <img src={image} alt="Uploaded" className="max-w-full rounded shadow-lg" />
                        </div>
                    )}

                    {loading && <p className="text-center">Processing image...</p>}

                    {error && (
                        <div className="bg-red-500 text-white p-4 rounded mb-8">
                            <p>{error}</p>
                        </div>
                    )}

                    {result && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Results:</h3>
                            <img src={result} alt="Processed" className="max-w-full rounded shadow-lg" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-teal-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">AXIOME</h3>
            <p>Revolutionizing healthcare with AI</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li><a href="#about" className="hover:text-teal-300 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-teal-300 transition-colors">Services</a></li>
              <li><a href="#demo" className="hover:text-teal-300 transition-colors">Demo</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p>Email: info@axiome.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 AXIOME Medicare Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
);

const App = () => (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Services />
                <Demo />
              </>
            } />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
);

export default App;