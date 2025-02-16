'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

type ProcessingStep = 'idle' | 'processing' | 'segmenting' | 'applying' | 'completed';

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  { title: 'Uploading', description: 'Processing your images...' },
  { title: 'Segmentation', description: 'Identifying body position...' },
  { title: 'Garment Fitting', description: 'Adjusting garment to body shape...' },
  { title: 'Final Rendering', description: 'Generating final result...' }
];

const ProcessingSteps = ({ currentStep }: { currentStep: number }) => (
  <div className="mt-6 px-4">
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={step.title} className="relative">
          <motion.div
            className={`p-3 rounded-lg border ${
              currentStep === index
                ? 'border-indigo-500 bg-indigo-50'
                : currentStep > index
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  currentStep > index
                    ? 'bg-green-500'
                    : currentStep === index
                    ? 'bg-indigo-500'
                    : 'bg-gray-200'
                }`}
              >
                {currentStep > index ? (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-white text-sm">{index + 1}</span>
                )}
              </div>
              <div>
                <h3 className={`font-medium ${
                  currentStep === index ? 'text-indigo-700' : 
                  currentStep > index ? 'text-green-700' : 'text-gray-700'
                }`}>
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            </div>
          </motion.div>
          {index < steps.length - 1 && (
            <div className="absolute left-7 top-14 bottom-0 w-0.5 bg-gray-200" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default function StudioPage() {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<ProcessingStep>('idle');
  const [statusText, setStatusText] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'model' | 'garment') => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (type === 'model') setModelImage(imageUrl);
      else setGarmentImage(imageUrl);
    }
  };

  const handleGenerate = async (): Promise<void> => {
    try {
      if (!modelImage || !garmentImage) {
        throw new Error('Please upload both model and garment images');
      }

      // Reset states
      setProcessingStep('processing');
      setStatusText('Starting process...');
      setResultImage(null);
      setCurrentStep(0);
      
      // Step 1: Initial Processing
      await new Promise(resolve => setTimeout(resolve, 6000));
      setResultImage('/images/model-to-segment.png');
      setStatusText('Analyzing body structure...');
      setProcessingStep('segmenting');
      setCurrentStep(1);
      
      // Step 2: Segmentation
      await new Promise(resolve => setTimeout(resolve, 7000));
      setResultImage('/images/model-segmented.png');
      setStatusText('Fitting garment to body...');
      setProcessingStep('applying');
      setCurrentStep(2);
      
      // Step 3: Final Processing
      await new Promise(resolve => setTimeout(resolve, 8000));
      setResultImage('/images/model-result.png');
      setStatusText('Result generated successfully!');
      setCurrentStep(3);
      setProcessingStep('completed');
    } catch (error) {
      console.error('Processing error:', error);
      setStatusText(error instanceof Error ? error.message : 'Error occurred during processing');
      setProcessingStep('idle');
      setCurrentStep(0);
    } finally {
      // Cleanup any resources if needed
      if (processingStep === 'completed') {
        // Optional: Clean up old image URLs
        if (modelImage) URL.revokeObjectURL(modelImage);
        if (garmentImage) URL.revokeObjectURL(garmentImage);
      }
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup function to revoke object URLs when component unmounts
      if (modelImage) URL.revokeObjectURL(modelImage);
      if (garmentImage) URL.revokeObjectURL(garmentImage);
    };
  }, [modelImage, garmentImage]); // Add dependencies to avoid stale closures

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Virtual Try-On
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Try-On Studio</h1>
          <p className="text-gray-600">Upload your photo and the garment to generate the try-on result.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Model Upload Box */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Photo</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {modelImage ? (
                <div className="space-y-4">
                  <div className="relative w-full h-64">
                    <Image
                      src={modelImage}
                      alt="Model preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <button 
                    onClick={() => setModelImage(null)}
                    className="text-red-500 text-sm hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 'model')}
                    className="hidden"
                    id="model-upload"
                  />
                  <label 
                    htmlFor="model-upload"
                    className="cursor-pointer block p-4 text-gray-500 hover:text-indigo-500"
                  >
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Upload Photo</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Garment Upload Box */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Garment Photo</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {garmentImage ? (
                <div className="space-y-4">
                  <div className="relative w-full h-64">
                    <Image
                      src={garmentImage}
                      alt="Garment preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <button 
                    onClick={() => setGarmentImage(null)}
                    className="text-red-500 text-sm hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 'garment')}
                    className="hidden"
                    id="garment-upload"
                  />
                  <label 
                    htmlFor="garment-upload"
                    className="cursor-pointer block p-4 text-gray-500 hover:text-indigo-500"
                  >
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Upload Garment</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Result Box */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Result</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-[calc(100%-2rem)]">
              {processingStep !== 'idle' ? (
                <div className="space-y-4">
                  <div className="relative w-full h-64">
                    {resultImage ? (
                      <Image
                        src={resultImage || ''}
                        alt="Processing result"
                        fill
                        className="object-contain rounded-lg transition-all duration-1000 ease-in-out"
                        style={{
                          transform: `scale(${processingStep === 'completed' ? '1' : '0.95'})`,
                          opacity: processingStep === 'completed' ? '1' : '0.9',
                        }}
                        unoptimized
                        priority
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          console.error('Image failed to load:', resultImage);
                          const imgElement = e.currentTarget;
                          imgElement.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mt-20"></div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-indigo-600 font-medium">{statusText}</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
                        style={{
                          width: 
                            processingStep === 'processing' ? '25%' :
                            processingStep === 'segmenting' ? '50%' :
                            processingStep === 'applying' ? '75%' :
                            processingStep === 'completed' ? '100%' : '0%'
                        }}
                      ></div>
                    </div>
                  </div>
                  <ProcessingSteps currentStep={currentStep} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  Result will appear here
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="mt-8 bg-indigo-500 text-white px-8 py-4 rounded-lg w-full 
                     hover:bg-indigo-600 transition-colors disabled:bg-gray-300
                     disabled:cursor-not-allowed text-lg font-medium"
          disabled={!modelImage || !garmentImage || processingStep !== 'idle'}
          onClick={handleGenerate}
        >
          {processingStep !== 'idle' && processingStep !== 'completed' ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            processingStep === 'completed' ? 'Try Another' : 'Generate Try-On'
          )}
        </button>
      </main>

      <footer className="border-t mt-16 py-6 text-center text-gray-600">
        <p>© 2024 Virtual Try-On Project - Work in Progress</p>
      </footer>
    </div>
  );
}