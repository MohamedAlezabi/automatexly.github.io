import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ChevronLeft, ChevronRight, PlayCircle, Lock } from 'lucide-react';
import { Link } from 'wouter';

export default function Lesson({ params }: { params: { id: string } }) {
    const [activeModule, setActiveModule] = useState(0);

    const modules = [
        { title: '1. Introduction to AI Systems', duration: '12 min', completed: true },
        { title: '2. Setting up VoiceFlow', duration: '25 min', completed: false, active: true },
        { title: '3. Webhook Architecture', duration: '45 min', completed: false, locked: true },
        { title: '4. The Final Project', duration: '120 min', completed: false, locked: true },
    ];

    return (
        <div className="min-h-screen pt-20 bg-background flex flex-col md:flex-row">
            {/* Sidebar Curriculum */}
            <div className="w-full md:w-80 border-r border-border/50 glass z-10 flex flex-col h-[calc(100vh-80px)] md:sticky md:top-20">
                <div className="p-6 border-b border-border/50">
                    <Link href="/courses">
                        <a className="text-sm text-primary hover:underline flex items-center mb-4"><ChevronLeft className="w-4 h-4 mr-1" /> Back to Courses</a>
                    </Link>
                    <h2 className="text-lg font-bold">Advanced Chatbot Engineering</h2>
                    <div className="w-full bg-secondary h-1.5 mt-4 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-1/4 rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">25% Completed</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {modules.map((mod, i) => (
                        <button
                            key={i}
                            onClick={() => !mod.locked && setActiveModule(i)}
                            className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors ${mod.active ? 'bg-primary/10 border border-primary/20' : 'hover:bg-secondary'} ${mod.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {mod.completed ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" /> : mod.locked ? <Lock className="w-5 h-5 text-muted-foreground mt-0.5" /> : <PlayCircle className="w-5 h-5 text-primary mt-0.5" />}
                            <div>
                                <div className={`text-sm font-semibold ${mod.active ? 'text-primary' : ''}`}>{mod.title}</div>
                                <div className="text-xs text-muted-foreground">{mod.duration}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Video Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-border/50 relative mb-8 flex items-center justify-center">
                        {/* Fake video player */}
                        <div className="absolute inset-0 bg-secondary/20" />
                        <PlayCircle className="w-16 h-16 text-white opacity-80 cursor-pointer hover:scale-110 transition-transform" />
                        <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full">
                            <div className="h-full w-1/3 bg-primary rounded-full relative">
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                            </div>
                        </div>
                    </motion.div>

                    <h1 className="text-3xl font-bold mb-4">{modules[activeModule].title}</h1>
                    <div className="prose prose-invert max-w-none text-muted-foreground">
                        <p>In this lesson, we will cover the foundational nodes needed to prompt the AI and store user responses into variables. Follow along by opening your dashboard.</p>
                        <h3>Key Takeaways:</h3>
                        <ul>
                            <li>Understanding the Capture Node</li>
                            <li>Connecting LLM generation</li>
                            <li>Graceful fallbacks</li>
                        </ul>
                    </div>

                    <div className="mt-12 flex items-center justify-between border-t border-border/50 pt-8">
                        <Button variant="outline" disabled={activeModule === 0} onClick={() => setActiveModule(a => a - 1)}>
                            <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                        </Button>
                        <Button onClick={() => setActiveModule(a => Math.min(modules.length - 1, a + 1))}>
                            Next Lesson <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
