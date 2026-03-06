import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Bot } from 'lucide-react';

export default function Resources() {
    const templates = [
        { title: 'Restaurant Chatbot Flow', type: 'VoiceFlow Template', icon: Bot, color: 'text-[#6A00FF]' },
        { title: 'Lead Qualification Prompt', type: 'PDF Guide', icon: FileText, color: 'text-[#FF5A7A]' },
        { title: 'Social Media Automation System', type: 'Make.com Blueprint', icon: Download, color: 'text-[#00E5FF]' }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background relative overflow-hidden">
            <div className="aurora-bg" />
            <div className="container max-w-5xl mx-auto relative z-10 px-6">

                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                        <span className="text-sm font-bold text-white/70 tracking-widest uppercase">Open Source</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">System <span className="text-gradient">Blueprints.</span></h1>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
                        Download engineering files, prompts, and architecture nodes instantly. Plug our 1% systems directly into your stack.
                    </p>
                </div>

                <div className="grid gap-6 max-w-3xl mx-auto">
                    {templates.map((temp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <div className="bento-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between group cursor-pointer hover:border-white/20">
                                <div className="flex items-center gap-6 w-full md:w-auto mb-6 md:mb-0">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors shadow-lg shrink-0">
                                        <temp.icon className={`w-8 h-8 ${temp.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-1 text-white/90 group-hover:text-white transition-colors">{temp.title}</h3>
                                        <div className="flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-white/20" />
                                            <p className="text-sm text-white/40 font-mono tracking-wide">{temp.type}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full md:w-auto h-12 px-8 rounded-xl bg-white/10 text-white font-bold hover:bg-white border border-white/5 hover:text-black transition-all group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                    <Download className="w-4 h-4 mr-2" /> Inject Module
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
