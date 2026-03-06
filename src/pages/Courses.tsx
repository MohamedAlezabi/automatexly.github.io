import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlayCircle, Clock, BookOpen } from 'lucide-react';
import { Link } from 'wouter';

// Dummy data for ALX-style courses
const DUMMY_COURSES = [
    {
        id: 'c1',
        title: 'AI Automation Foundations',
        description: 'Master the basics of AI workflows, API connections, and Zapier/Make to automate repetitive business tasks.',
        level: 'Beginner',
        duration: '4 Weeks',
        modules: 12,
        color: 'from-[#8F75D3] to-[#6A00FF]'
    },
    {
        id: 'c2',
        title: 'Advanced Chatbot Engineering',
        description: 'Build robust AI agents using VoiceFlow and Dialogflow capable of natural lead qualification and CRM updates.',
        level: 'Intermediate',
        duration: '6 Weeks',
        modules: 18,
        color: 'from-[#FF5A7A] to-[#FF8A00]'
    },
    {
        id: 'c3',
        title: 'Systems Architecture',
        description: 'Design comprehensive technical architectures for large-scale corporate operations and data pipelines.',
        level: 'Advanced',
        duration: '8 Weeks',
        modules: 24,
        color: 'from-[#00E5FF] to-[#6AFFC3]'
    }
];

export default function Courses() {
    const [courses, setCourses] = useState(DUMMY_COURSES);

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden bg-background">
            <div className="aurora-bg" />

            <div className="container max-w-7xl mx-auto relative z-10 px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                            <span className="text-sm font-bold text-white/70 tracking-widest uppercase">AutomateX Academy</span>
                        </motion.div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Master Systems <br /><span className="text-gradient">& AI Architecture.</span></h1>
                        <p className="text-xl text-white/50 max-w-2xl font-light">
                            ALX-style cohort-based learning. Go from beginner to automation architect through practical, peer-reviewed engineering projects.
                        </p>
                    </div>
                    <Link href="/">
                        <Button size="lg" className="mt-8 md:mt-0 h-14 px-8 rounded-xl bg-gradient-brand text-white font-bold glow-brand hover:scale-105 transition-all">
                            Return to OS
                        </Button>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full"
                        >
                            <div className="bento-card h-full p-8 flex flex-col group relative overflow-hidden">
                                <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br ${course.color} blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.color} bg-opacity-10 flex items-center justify-center border border-white/10 shadow-lg`}>
                                        <BookOpen className="w-5 h-5 text-white" />
                                    </div>
                                    <Badge variant="outline" className="border-white/10 bg-white/5 backdrop-blur-md text-white/80">{course.level}</Badge>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 relative z-10">{course.title}</h3>

                                <p className="text-white/50 text-sm mb-8 flex-1 relative z-10 leading-relaxed">
                                    {course.description}
                                </p>

                                <div className="flex items-center gap-6 text-sm text-white/40 mb-8 font-medium font-mono border-t border-white/5 pt-6 relative z-10">
                                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-white/60" /> {course.duration}</span>
                                    <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-white/60" /> {course.modules} Modules</span>
                                </div>

                                <Button asChild className="relative z-10 w-full h-12 rounded-xl bg-white text-black hover:bg-white/90 font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                    <Link href={`/courses/${course.id}`}>
                                        <div className="flex items-center justify-center w-full"><PlayCircle className="w-5 h-5 mr-2" /> Start Course</div>
                                    </Link>
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
