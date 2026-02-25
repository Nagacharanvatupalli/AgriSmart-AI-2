import React, { useState, useEffect } from 'react';
import { Camera, X, Upload, Loader2, Leaf, Clock, ChevronRight, Stethoscope, Trash2, History } from 'lucide-react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

interface DiagnosisRecord {
    _id: string;
    imageBase64: string;
    diagnosisResult: string;
    caseId: string;
    createdAt: string;
}

interface DiagnosisPageProps {
    selectedImage: string | null;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement>;
    isAnalyzing: boolean;
    diagnosisResult: string | null;
    onReset: () => void;
    isLoggedIn: boolean;
}

function generateCaseId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export default function DiagnosisPage({ selectedImage, onImageUpload, fileInputRef, isAnalyzing, diagnosisResult, onReset, isLoggedIn }: DiagnosisPageProps) {
    const [showHistory, setShowHistory] = useState(false);
    const [history, setHistory] = useState<DiagnosisRecord[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [caseId] = useState(() => generateCaseId());
    const [saved, setSaved] = useState(false);
    const [viewingRecord, setViewingRecord] = useState<DiagnosisRecord | null>(null);

    // Auto-save to MongoDB when diagnosisResult becomes available
    useEffect(() => {
        if (diagnosisResult && selectedImage && isLoggedIn && !saved && !diagnosisResult.startsWith('Error')) {
            saveDiagnosis();
        }
    }, [diagnosisResult]);

    const saveDiagnosis = async () => {
        const token = localStorage.getItem('token');
        if (!token || !selectedImage || !diagnosisResult) return;

        try {
            const response = await fetch('/api/diagnosis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify({
                    imageBase64: selectedImage,
                    diagnosisResult,
                    caseId,
                }),
            });

            if (response.ok) {
                setSaved(true);
                console.log('Diagnosis saved successfully');
            } else {
                console.error('Failed to save diagnosis');
            }
        } catch (error) {
            console.error('Error saving diagnosis:', error);
        }
    };

    const fetchHistory = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        setIsLoadingHistory(true);
        try {
            const response = await fetch('/api/diagnosis/history', {
                headers: { 'x-auth-token': token },
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data);
            }
        } catch (error) {
            console.error('Error fetching history:', error);
        } finally {
            setIsLoadingHistory(false);
        }
    };

    const openHistory = () => {
        setShowHistory(true);
        setViewingRecord(null);
        fetchHistory();
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-white">
            <div className="max-w-[1200px] mx-auto space-y-8">
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#00ab55]/10 rounded-2xl flex items-center justify-center">
                            <Stethoscope className="text-[#00ab55]" size={28} />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">CROP DOCTOR</h2>
                            <p className="text-gray-400 mt-1 font-medium italic text-sm">Precision Diagnostics & Treatment Protocol</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {isLoggedIn && (
                            <button
                                onClick={openHistory}
                                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                            >
                                <History size={16} />
                                VIEW HISTORY
                            </button>
                        )}
                        {selectedImage && (
                            <button onClick={onReset} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        )}
                    </div>
                </header>

                {!selectedImage ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-4 border-dashed border-gray-100 rounded-[40px] p-24 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-gray-50 transition-all"
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
                            <div className="flex gap-3">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors"
                                >
                                    RESCAN SAMPLE
                                </button>
                                <button
                                    onClick={onReset}
                                    className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
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
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                                        <div className="w-10 h-10 bg-[#00ab55]/10 rounded-xl flex items-center justify-center">
                                            <Stethoscope className="text-[#00ab55]" size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Diagnosis Report</h3>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CASE ID: {caseId}</p>
                                        </div>
                                        {saved && (
                                            <span className="ml-auto text-[10px] font-bold text-[#00ab55] bg-[#00ab55]/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                                ✓ Saved
                                            </span>
                                        )}
                                    </div>
                                    <div className="markdown-body prose prose-slate max-w-none">
                                        <Markdown>{diagnosisResult}</Markdown>
                                    </div>
                                    <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-3 mt-6">
                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Leaf className="text-blue-600" size={16} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-blue-900">Disclaimer</p>
                                            <p className="text-xs text-blue-700/80 mt-0.5">AI diagnoses are for informational purposes. Consult a local agricultural expert for confirmed treatments and pesticide applications.</p>
                                        </div>
                                    </div>
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

            {/* ── History Slide-Out Panel ────────────────────────────────── */}
            <AnimatePresence>
                {showHistory && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
                            onClick={() => setShowHistory(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-full max-w-[520px] bg-white z-50 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#00ab55]/10 rounded-xl flex items-center justify-center">
                                        <Clock className="text-[#00ab55]" size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Diagnosis History</h3>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{history.length} Records</p>
                                    </div>
                                </div>
                                <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {isLoadingHistory ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                                        <Loader2 className="animate-spin text-[#00ab55]" size={32} />
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Loading records...</p>
                                    </div>
                                ) : history.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-300">
                                        <Camera size={48} className="mb-4 opacity-20" />
                                        <p className="font-medium">No diagnosis records yet.</p>
                                        <p className="text-sm text-gray-400 mt-1">Upload a crop image to get started.</p>
                                    </div>
                                ) : viewingRecord ? (
                                    <div className="space-y-4">
                                        <button
                                            onClick={() => setViewingRecord(null)}
                                            className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-gray-900 transition-colors"
                                        >
                                            ← BACK TO LIST
                                        </button>
                                        <div className="aspect-video rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                                            <img src={viewingRecord.imageBase64} alt="Crop" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <span className="font-bold">Case: {viewingRecord.caseId}</span>
                                            <span>•</span>
                                            <span>{new Date(viewingRecord.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="markdown-body prose prose-sm prose-slate max-w-none bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                            <Markdown>{viewingRecord.diagnosisResult}</Markdown>
                                        </div>
                                    </div>
                                ) : (
                                    history.map((record) => (
                                        <motion.button
                                            key={record._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={() => setViewingRecord(record)}
                                            className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all text-left group border border-gray-100"
                                        >
                                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
                                                <img src={record.imageBase64} alt="Crop" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 truncate">
                                                    Case: {record.caseId}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mt-1 font-medium">
                                                    {new Date(record.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                </p>
                                                <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">
                                                    {record.diagnosisResult.substring(0, 120)}...
                                                </p>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                                        </motion.button>
                                    ))
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
