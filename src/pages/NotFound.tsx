import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-background text-foreground gap-6 relative overflow-hidden">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center z-10"
            >
                <h1 className="text-9xl font-bold gradient-purple text-transparent bg-clip-text mb-4">404</h1>
                <p className="text-2xl text-muted-foreground mb-8">Signal Lost</p>
                <Link href="/">
                    <a className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all hover:-translate-y-1 shadow-[0_0_40px_rgba(106,0,255,0.4)]">
                        Return to OS
                    </a>
                </Link>
            </motion.div>
        </div>
    );
}
