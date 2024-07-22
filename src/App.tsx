import React, {ChangeEvent, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ChevronRight, Upload, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {t} from "i18next";

// Components

const Header = () => {
    const { t, i18n } = useTranslation();

    // Function to toggle the language
    const toggleLanguage = () => {
        const currentLanguage = i18n.language;
        i18n.changeLanguage(currentLanguage === 'en' ? 'es' : 'en');
    };

    return (
        <header className="absolute top-0 left-0 right-0 z-10 p-6">
            <nav className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <img src="/logo.svg" alt="App Name Logo" className="h-8" />
                    <h1 className="text-2xl font-bold text-white">{t('App Name')}</h1>
                </div>
                <ul className="flex space-x-6 text-white">
                    <li><a href="#about" className="hover:text-teal-300 transition-colors">{t('About')}</a></li>
                    <li><a href="#services" className="hover:text-teal-300 transition-colors">{t('Services')}</a></li>
                    <li><a href="#contact" className="hover:text-teal-300 transition-colors">{t('Contact')}</a></li>
                    {/* Language toggle button */}
                    <li>
                        <button onClick={toggleLanguage} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-1 px-4 rounded transition-colors">
                            {t('Language')}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

const Hero = () => {
    const {t} = useTranslation();

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 text-white p-8">
            <div className="max-w-4xl text-center">
                <h2 className="text-5xl font-bold mb-6">{t('Revolutionizing Healthcare with AI')}</h2>
                <p className="text-xl mb-8">{t("Discover how App Name's cutting-edge technology detects diseases with unparalleled accuracy.")}</p>
                <a href="#demo" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors">
                    {t('Try Demo')} <ChevronRight className="ml-2" />
                </a>
            </div>
        </section>
    );
};


const About = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">{t('About App Name')}</h2>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto text-center">
                    {t("About App Name Content")}
                </p>
            </div>
        </section>
    );
};


const Services = () => {
    const { t } = useTranslation();

    return (
        <section id="services" className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center">{t('Our Services')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ServiceCard
                        title={t('Malaria Detection')}
                        description={t("AI-powered analysis of blood samples for rapid malaria parasite detection.")}
                        icon={<Activity className="w-12 h-12 text-teal-500" />}
                    />
                    {/* Add more ServiceCard components for other services */}
                </div>
            </div>
        </section>
    );
};


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
            setError(t('Failed to process image. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="demo" className="py-20 bg-gradient-to-br from-teal-900 via-teal-800 to-blue-900 text-white">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">{t('Try Our Demo')}</h2>
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <label className="block mb-2">{t('Upload an image for malaria parasite detection:')}</label>
                        <div className="flex items-center space-x-4">
                            <label className="cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center transition-colors">
                                <Upload className="mr-2" />
                                <span>{t('Upload Image')}</span>
                                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </label>
                            <button
                                onClick={handleSubmit}
                                disabled={!image || loading}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center disabled:opacity-50 transition-colors"
                            >
                                {t('Analyze')}
                            </button>
                        </div>
                    </div>

                    {image && (
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-2">{t('Uploaded Image:')}</h3>
                            <img src={image} alt={t('Uploaded')} className="max-w-full rounded shadow-lg" />
                        </div>
                    )}

                    {loading && <p className="text-center">{t('Processing image...')}</p>}

                    {error && (
                        <div className="bg-red-500 text-white p-4 rounded mb-8">
                            <p>{error}</p>
                        </div>
                    )}

                    {result && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">{t('Results:')}</h3>
                            <img src={result} alt={t('Processed')} className="max-w-full rounded shadow-lg" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-teal-900 text-white py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">{t('App Name')}</h3>
                        <p>{t('Revolutionizing healthcare with AI')}</p>
                    </div>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-lg font-semibold mb-2">{t('Quick Links')}</h4>
                        <ul>
                            <li><a href="#about" className="hover:text-teal-300 transition-colors">{t('About')}</a></li>
                            <li><a href="#services" className="hover:text-teal-300 transition-colors">{t('Services')}</a></li>
                            <li><a href="#demo" className="hover:text-teal-300 transition-colors">{t('Demo')}</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3">
                        <h4 className="text-lg font-semibold mb-2">{t('Contact Us')}</h4>
                        <p>{t('Email')}: info@diagnosticaai.com</p>
                        <p>{t('Phone')}: (123) 456-7890</p>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p>&copy; 2024 {t('App Name')} {t('All rights reserved.')}</p>
                </div>
            </div>
        </footer>
    );
};

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