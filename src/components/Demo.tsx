import React, { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

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

export default Demo;
