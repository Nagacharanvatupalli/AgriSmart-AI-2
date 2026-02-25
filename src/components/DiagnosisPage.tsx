import React from 'react';
import { Camera, X, Upload, Loader2, Leaf } from 'lucide-react';
import Markdown from 'react-markdown';

interface DiagnosisPageProps {
    selectedImage: string | null;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    isAnalyzing: boolean;
    diagnosisResult: string | null;
    onReset: () => void;
}

export default function DiagnosisPage({ selectedImage, onImageUpload, fileInputRef, isAnalyzing, diagnosisResult, onReset }: DiagnosisPageProps) {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-white">
            <div className="max-w-[1200px] mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900">Crop Doctor</h2>
                        <p className="text-gray-400 mt-2 font-medium italic">Instant identification of crop diseases and pests.</p>
                    </div>
                    {selectedImage && (
                        <button onClick={onReset} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} />
                        </button>
                    )}
                </header>

                {!selectedImage ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-4 border-dashed border-gray-100 rounded-[40px] p-24 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-gray-50 transition-all border-spacing-4"
                    >
                        <div className="w-20 h-20 bg-[#00ab55]/10 rounded-3xl flex items-center justify-center">
                            <Upload className="text-[#00ab55]" size={32} />
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-gray-900">Drop your crop image here</p>
                            <p className="text-gray-400 text-sm mt-1">Supports JPG, PNG, WEBP (Max 10MB)</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        <div className="space-y-4">
                            <div className="aspect-square rounded-[40px] overflow-hidden border border-gray-100 bg-gray-50 shadow-inner">
                                <img src={selectedImage} alt="Crop to analyze" className="w-full h-full object-cover" />
                            </div>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors"
                            >
                                SCAN NEW IMAGE
                            </button>
                        </div>
                        <div className="bg-white rounded-[40px] p-10 shadow-xl border border-gray-100 min-h-[400px]">
                            {isAnalyzing ? (
                                <div className="h-full flex flex-col items-center justify-center gap-4">
                                    <div className="relative">
                                        <Loader2 className="animate-spin text-[#00ab55]" size={64} />
                                        <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00ab55]/40" size={24} />
                                    </div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-4 animate-pulse">Running AI Diagnostics...</p>
                                </div>
                            ) : diagnosisResult ? (
                                <div className="markdown-body prose prose-slate max-w-none">
                                    <Markdown>{diagnosisResult}</Markdown>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center text-gray-300">
                                    <Camera size={48} className="mb-4 opacity-10" />
                                    <p className="font-medium italic">Ready to assist your plants.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onImageUpload}
                    className="hidden"
                    accept="image/*"
                />
            </div>
        </div>
    );
}
