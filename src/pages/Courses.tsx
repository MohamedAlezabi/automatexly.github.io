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
        <div className="min-h-screen pt-24 pb-20">
            <div className="container max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <Badge variant="secondary" className="mb-4">AutomateX Academy</Badge>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Master Systems & AI</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            ALX-style cohort-based learning. Go from beginner to automation architect through practical, peer-reviewed engineering projects.
                        </p>
                    </div>
                    <Button className="mt-6 md:mt-0 gradient-purple">My Dashboard</Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, i) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="h-full group hover:border-primary/50 transition-all overflow-hidden flex flex-col">
                                <div className={`h-32 bg-gradient-to-br ${course.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <Badge variant="outline">{course.level}</Badge>
                                    </div>
                                    <CardTitle className="text-2xl">{course.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col">
                                    <CardDescription className="mb-6 flex-1 text-base">
                                        {course.description}
                                    </CardDescription>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {course.duration}</span>
                                        <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.modules} Modules</span>
                                    </div>
                                    <Button asChild className="w-full" variant="secondary">
                                        <Link href={`/courses/${course.id}`}>
                                            <PlayCircle className="w-4 h-4 mr-2" /> Start Course
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
