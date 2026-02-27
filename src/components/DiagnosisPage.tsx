import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Camera, X, Upload, Loader2, Leaf, Clock, ChevronRight, Stethoscope, Trash2, History, FileText } from 'lucide-react';
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

type ViewMode = 'REPORT' | 'HISTORY';

export default function DiagnosisPage({ selectedImage, onImageUpload, fileInputRef, isAnalyzing, diagnosisResult, onReset, isLoggedIn }: DiagnosisPageProps) {
    const { t } = useTranslation();
    const [history, setHistory] = useState<DiagnosisRecord[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [caseId] = useState(() => generateCaseId());
    const [saved, setSaved] = useState(false);
    const [viewingRecord, setViewingRecord] = useState<DiagnosisRecord | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>('REPORT');

    // Fetch history on mount if logged in
    useEffect(() => {
        if (isLoggedIn) fetchHistory();
    }, [isLoggedIn]);

    // Auto-save to MongoDB when diagnosisResult becomes available
    useEffect(() => {
        if (diagnosisResult && selectedImage && isLoggedIn && !saved && !diagnosisResult.startsWith('Error')) {
            saveAndRefresh();
        }
    }, [diagnosisResult]);

    // If new diagnosis comes in, switch to report view
    useEffect(() => {
        if (diagnosisResult) {
            setViewMode('REPORT');
            setViewingRecord(null); // Clear viewing historical record to show current
        }
    }, [diagnosisResult]);

    const saveAndRefresh = async () => {
        await saveDiagnosis();
        await fetchHistory();
    };

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

    const selectHistoryRecord = (record: DiagnosisRecord) => {
        setViewingRecord(record);
        setViewMode('REPORT');
    };

    // Determine what report to display in the big screen
    const activeReport = viewingRecord || (diagnosisResult ? {
        _id: 'current',
        imageBase64: selectedImage!,
        diagnosisResult: diagnosisResult,
        caseId: caseId,
        createdAt: new Date().toISOString()
    } : null);

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-gray-50/30">
            <div className="max-w-[1600px] mx-auto h-[calc(100vh-160px)] flex flex-col lg:flex-row gap-8">

                {/* ── LEFT SIDE: ACTION PANEL ────────────────────────────────── */}
                <div className="lg:w-[360px] flex flex-col gap-6 flex-shrink-0">
                    <header className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#00ab55]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                                <Stethoscope className="text-[#00ab55]" size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 leading-none">{t('diagnosis.title')}</h2>
                                <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">{t('diagnosis.subtitle')}</p>
                            </div>
                        </div>
                    </header>

                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 space-y-6">
                        {!selectedImage ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-100 rounded-[24px] py-16 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-50 hover:border-[#00ab55]/30 transition-all"
                            >
                                <div className="w-14 h-14 bg-[#00ab55]/10 rounded-2xl flex items-center justify-center">
                                    <Upload className="text-[#00ab55]" size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-gray-900">{t('diagnosis.scan_crop')}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">{t('diagnosis.tap_to_select')}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="aspect-square rounded-[24px] overflow-hidden border border-gray-100 bg-gray-50 relative group">
                                    <img src={selectedImage} alt="Crop" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button onClick={() => fileInputRef.current?.click()} className="p-3 bg-white rounded-full text-gray-900 shadow-lg">
                                            <Camera size={18} />
                                        </button>
                                        <button onClick={onReset} className="p-3 bg-white rounded-full text-red-500 shadow-lg">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full py-3.5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                                >
                                    {t('diagnosis.rescan')}
                                </button>
                            </div>
                        )}

                        <div className="pt-4 border-t border-gray-50">
                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-4">{t('diagnosis.diagnostics_console')}</p>
                            {isAnalyzing ? (
                                <div className="flex items-center gap-3 text-[#00ab55]">
                                    <Loader2 className="animate-spin" size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest animate-pulse">{t('diagnosis.analyzing')}</span>
                                </div>
                            ) : diagnosisResult ? (
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-gray-500">{t('diagnosis.scan_complete')}</span>
                                    {saved && <span className="text-[9px] font-black text-[#00ab55] bg-[#00ab55]/10 px-2 py-0.5 rounded-full">{t('diagnosis.saved')}</span>}
                                </div>
                            ) : (
                                <span className="text-[10px] font-bold text-gray-400 italic">{t('diagnosis.waiting')}</span>
                            )}
                        </div>
                    </div>

                    <input type="file" ref={fileInputRef} onChange={onImageUpload} className="hidden" accept="image/*" />
                </div>

                {/* ── RIGHT SIDE: DYNAMIC WORKSPACE (REPORT OR HISTORY) ────────────────── */}
                <div className="flex-1 bg-white rounded-[40px] shadow-xl border border-gray-100 flex flex-col overflow-hidden">

                    {/* Workspace Header Tabs */}
                    <div className="flex items-center px-8 pt-8 border-b border-gray-50">
                        <div className="flex gap-8">
                            <button
                                onClick={() => setViewMode('REPORT')}
                                className={`pb-4 px-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${viewMode === 'REPORT' ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <FileText size={16} />
                                    {t('diagnosis.diagnosis_report')}
                                </div>
                                {viewMode === 'REPORT' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#00ab55] rounded-t-full" />}
                            </button>
                            <button
                                onClick={() => setViewMode('HISTORY')}
                                className={`pb-4 px-2 text-[10px] font-black uppercase tracking-widest transition-all relative ${viewMode === 'HISTORY' ? 'text-gray-900' : 'text-gray-300 hover:text-gray-500'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <History size={16} />
                                    {t('diagnosis.history_records')}
                                </div>
                                {viewMode === 'HISTORY' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#00ab55] rounded-t-full" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-white">
                        <AnimatePresence mode="wait">
                            {viewMode === 'REPORT' ? (
                                <motion.div
                                    key="report-view"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="max-w-[1000px] mx-auto h-full"
                                >
                                    {activeReport ? (
                                        <div className="space-y-10">
                                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                                <div className="w-full md:w-[320px] aspect-square rounded-[32px] overflow-hidden border border-gray-100 shadow-xl flex-shrink-0">
                                                    <img src={activeReport.imageBase64} alt="Diagnosis record" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 space-y-6 py-4">
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-[10px] font-black text-[#00ab55] uppercase tracking-[0.2em]">{viewingRecord ? 'HISTORICAL RECORD' : 'NEW SCAN REPORT'}</span>
                                                        <h4 className="text-4xl font-black text-gray-900">Crop Health Analysis</h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4">
                                                        <div className="bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
                                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Case ID</p>
                                                            <p className="text-xs font-bold text-gray-900">{activeReport.caseId}</p>
                                                        </div>
                                                        <div className="bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100">
                                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Analysis Time</p>
                                                            <p className="text-xs font-bold text-gray-900">
                                                                {new Date(activeReport.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="bg-green-50/50 rounded-2xl p-4 border border-green-100/50 flex gap-3">
                                                        <Leaf className="text-[#00ab55] shrink-0" size={18} />
                                                        <p className="text-[11px] leading-relaxed text-green-900/70 font-medium">
                                                            This diagnostic report uses search-grounded analysis via Perplexity Sonar and Vision for maximum precision.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="markdown-body prose prose-slate max-w-none bg-gray-50/30 rounded-[48px] p-12 border border-gray-100 shadow-inner">
                                                <Markdown>{activeReport.diagnosisResult}</Markdown>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                            <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mb-8 border border-gray-100">
                                                <Leaf size={40} className="text-gray-200" />
                                            </div>
                                            <h3 className="text-3xl font-black text-gray-900 mb-4">No Active Diagnosis</h3>
                                            <p className="text-gray-400 max-w-sm mx-auto font-medium italic">
                                                Upload or capture a crop image on the left, or select a previous record from your history to view the report.
                                            </p>
                                            <button
                                                onClick={() => setViewMode('HISTORY')}
                                                className="mt-10 px-8 py-3.5 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all"
                                            >
                                                {t('diagnosis.history_records')}
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="history-view"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full"
                                >
                                    {!isLoggedIn ? (
                                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-300 py-20">
                                            <History size={64} className="mb-4 opacity-10" />
                                            <p className="text-lg font-bold text-gray-400">Login Required</p>
                                            <p className="text-sm">Please log in to browse your saved reports.</p>
                                        </div>
                                    ) : isLoadingHistory ? (
                                        <div className="h-full flex flex-col items-center justify-center py-20 gap-4">
                                            <Loader2 className="animate-spin text-[#00ab55]" size={40} />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Scanning History Vault...</p>
                                        </div>
                                    ) : history.length === 0 ? (
                                        <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                                                <Clock size={32} className="text-gray-200" />
                                            </div>
                                            <h4 className="text-xl font-bold text-gray-400">{t('diagnosis.no_history')}</h4>
                                            <p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto italic">Your successfully analyzed crops will appear here.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                            {history.map((record, idx) => (
                                                <motion.button
                                                    key={record._id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    onClick={() => selectHistoryRecord(record)}
                                                    className="group flex flex-col bg-gray-50/50 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 border border-gray-100/50 hover:border-[#00ab55]/20 rounded-[32px] transition-all p-5 text-left"
                                                >
                                                    <div className="aspect-[4/3] rounded-[24px] overflow-hidden mb-5 bg-gray-100 flex-shrink-0">
                                                        <img src={record.imageBase64} alt="Crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] font-black text-gray-900 tracking-tighter">CASE {record.caseId}</span>
                                                            <div className="bg-white/50 px-2 py-0.5 rounded-lg border border-gray-100 flex items-center gap-1">
                                                                <Clock size={10} className="text-gray-400" />
                                                                <span className="text-[8px] font-bold text-gray-500">{new Date(record.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                        <div className="text-[11px] font-medium text-gray-500 line-clamp-2 leading-relaxed opacity-80 italic">
                                                            {record.diagnosisResult.replace(/[#*]/g, '').substring(0, 80)}...
                                                        </div>
                                                        <div className="pt-2 flex items-center gap-1 text-[9px] font-black text-[#00ab55] uppercase tracking-widest group-hover:gap-2 transition-all">
                                                            Detailed Report <ChevronRight size={12} />
                                                        </div>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
