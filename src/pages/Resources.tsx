import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Bot } from 'lucide-react';

export default function Resources() {
    const templates = [
        { title: 'Restaurant Chatbot Flow', type: 'VoiceFlow Template', icon: Bot, link: '#' },
        { title: 'Lead Qualification Prompt', type: 'PDF Guide', icon: FileText, link: '#' },
        { title: 'Social Media Automation System', type: 'Make.com Blueprint', icon: Download, link: '#' }
    ];

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Free Resources</h1>
                <p className="text-xl text-muted-foreground text-center mb-12">
                    Download blueprints, prompts, and templates to start automating today.
                </p>

                <div className="grid gap-6">
                    {templates.map((temp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="flex flex-col sm:flex-row items-center justify-between p-6 glass hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-6 mb-4 sm:mb-0">
                                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                                        <temp.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{temp.title}</h3>
                                        <p className="text-sm text-muted-foreground">{temp.type}</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full sm:w-auto">Download</Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
