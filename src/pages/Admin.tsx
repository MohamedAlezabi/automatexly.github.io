import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Mail, BookOpen, Settings, LogOut, Activity, ArrowUpRight, BarChart3, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Admin() {
    const [session, setSession] = useState<any>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [, setLocation] = useLocation();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) checkAdminStatus(session.user.id);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) checkAdminStatus(session.user.id);
        });
    }, []);

    const checkAdminStatus = async (userId: string) => {
        const { data } = await supabase.from('profiles').select('role').eq('id', userId).single();
        if (data?.role === 'admin') {
            setIsAdmin(true);
            fetchSubscribers();
        }
    };

    const fetchSubscribers = async () => {
        const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
        if (data) setSubscribers(data);
    };

    const handleLogin = async () => {
        const email = prompt("Admin Email:");
        const password = prompt("Admin Password:");
        if (email && password) {
            await supabase.auth.signInWithPassword({ email, password });
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAdmin(false);
        setLocation('/');
    };

    // Mock visually stunning graph background for metrics
    const SparkleGraph = ({ color = "#6A00FF" }) => (
        <div className="absolute inset-x-0 bottom-0 h-24 opacity-20 pointer-events-none overflow-hidden rounded-b-xl border-b border-white/5">
            <svg preserveAspectRatio="none" viewBox="0 0 100 100" className="w-full h-full">
                <path d="M0,100 L0,80 Q10,70 20,80 T40,60 T60,70 T80,50 T100,55 L100,100 Z" fill={`url(#grad-${color})`} />
                <defs>
                    <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="1" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );

    if (!session || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="aurora-bg" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bento-card w-full max-w-md p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-brand blur-[80px] opacity-20" />
                    <div className="text-center mb-8 relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 glow-brand">
                            <LogOut className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-black tracking-tight mb-2">AutomateX Core</h1>
                        <p className="text-sm text-white/50">Restricted System Access</p>
                    </div>
                    <Button className="w-full h-14 rounded-xl font-bold bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]" onClick={handleLogin}>
                        Authenticate Identity
                    </Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white flex overflow-hidden">
            {/* 2026 Admin Full-Height Sidebar */}
            <div className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-2xl p-6 flex flex-col hidden md:flex shrink-0">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center glow-brand shadow-lg">
                        <span className="font-black text-white text-lg">AX</span>
                    </div>
                    <div>
                        <div className="font-bold tracking-tight text-white/90">System Control</div>
                        <div className="text-xs text-white/40 font-mono">v2.0.4.alpha</div>
                    </div>
                </div>

                <div className="space-y-2 flex-1">
                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 mt-8">Dashboards</div>
                    <Button variant="ghost" className="w-full justify-start h-12 bg-white/10 text-white rounded-xl border border-white/10 glow-brand"><Activity className="w-5 h-5 mr-3" /> Overview</Button>
                    <Button variant="ghost" className="w-full justify-start h-12 text-white/50 hover:text-white hover:bg-white/5 rounded-xl"><Users className="w-5 h-5 mr-3" /> User Identities</Button>
                    <Button variant="ghost" className="w-full justify-start h-12 text-white/50 hover:text-white hover:bg-white/5 rounded-xl"><Mail className="w-5 h-5 mr-3" /> Email Engine</Button>

                    <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 mt-12">Settings</div>
                    <Button variant="ghost" className="w-full justify-start h-12 text-white/50 hover:text-white hover:bg-white/5 rounded-xl"><BarChart3 className="w-5 h-5 mr-3" /> Analytics API</Button>
                    <Button variant="ghost" className="w-full justify-start h-12 text-white/50 hover:text-white hover:bg-white/5 rounded-xl"><Settings className="w-5 h-5 mr-3" /> Configurations</Button>
                </div>

                <Button variant="ghost" onClick={handleLogout} className="justify-start text-white/40 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 border border-transparent rounded-xl transition-colors">
                    <LogOut className="w-4 h-4 mr-2" /> Terminate Session
                </Button>
            </div>

            {/* Main App Content Area */}
            <div className="flex-1 overflow-y-auto bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center bg-fixed bg-no-repeat relative">
                <div className="absolute inset-0 bg-background/95 backdrop-blur-[100px]" />

                <div className="relative z-10 p-8 md:p-12 max-w-7xl mx-auto">
                    <header className="flex justify-between items-end mb-12">
                        <div>
                            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-4xl font-black tracking-tight mb-2">Command Center</motion.h1>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="text-white/50 text-lg">Real-time pulse on your automation pipelines.</motion.p>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-bold text-white/80">Mohamed Alezabi</div>
                                <div className="text-xs text-white/40 font-mono">Super Admin</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 p-1">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alezabi" alt="Admin" className="w-full h-full rounded-lg bg-black/50" />
                            </div>
                        </div>
                    </header>

                    {/* Premium Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bento-card p-6 relative">
                            <SparkleGraph color="#6A00FF" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-10 rounded-lg bg-[#6A00FF]/20 border border-[#6A00FF]/50 flex items-center justify-center">
                                    <Users className="w-5 h-5 text-[#6A00FF]" />
                                </div>
                                <Badge className="bg-white/10 text-white border-white/10">+12.5% <ArrowUpRight className="w-3 h-3 ml-1" /></Badge>
                            </div>
                            <div className="text-sm font-medium text-white/50 mb-1">Total Network Leads</div>
                            <div className="text-4xl font-black">{subscribers.length} <span className="text-lg text-white/30 font-normal">users</span></div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bento-card p-6 relative">
                            <SparkleGraph color="#00E5FF" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/20 border border-[#00E5FF]/50 flex items-center justify-center">
                                    <Activity className="w-5 h-5 text-[#00E5FF]" />
                                </div>
                                <Badge className="bg-white/10 text-white border-white/10">Active</Badge>
                            </div>
                            <div className="text-sm font-medium text-white/50 mb-1">Live Agents & Workflows</div>
                            <div className="text-4xl font-black">24 <span className="text-lg text-white/30 font-normal">systems</span></div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bento-card p-6 relative">
                            <SparkleGraph color="#FF5A7A" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-10 h-10 rounded-lg bg-[#FF5A7A]/20 border border-[#FF5A7A]/50 flex items-center justify-center">
                                    <BookOpen className="w-5 h-5 text-[#FF5A7A]" />
                                </div>
                                <Badge className="bg-white/10 text-white border-white/10">+2 this week</Badge>
                            </div>
                            <div className="text-sm font-medium text-white/50 mb-1">Academy Enrollments</div>
                            <div className="text-4xl font-black">156</div>
                        </motion.div>
                    </div>

                    {/* Data Tables */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bento-card lg:col-span-2 p-0 overflow-hidden">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Recent Email Capture</h2>
                                <Button variant="ghost" size="sm" className="text-white/50">View All <ChevronRight className="w-4 h-4 ml-1" /></Button>
                            </div>
                            <div className="p-0">
                                {subscribers.length === 0 ? (
                                    <div className="p-12 text-center text-white/30">Awaiting database pipeline injection...</div>
                                ) : (
                                    <div className="flex flex-col">
                                        {subscribers.slice(0, 5).map((sub, i) => (
                                            <div key={i} className="flex justify-between items-center p-4 px-6 border-b border-white/5 hover:bg-white/5 transition-colors group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/50 group-hover:bg-[#6A00FF]/20 group-hover:text-[#6A00FF] transition-colors">
                                                        {sub.email.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="font-medium text-white/90">{sub.email}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <Badge variant="outline" className="border-white/10 text-white/40 font-mono">{new Date(sub.created_at).toLocaleDateString()}</Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bento-card p-6">
                            <h2 className="text-xl font-bold mb-6">System Health</h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-white/60">Make.com API</span> <span className="text-green-400">99.9% Optimal</span></div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full w-[99%] bg-green-500 rounded-full" /></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-white/60">VoiceFlow Cluster</span> <span className="text-green-400">12ms Latency</span></div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full w-[100%] bg-green-500 rounded-full" /></div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2"><span className="text-white/60">Supabase DB Edge</span> <span className="text-[#00E5FF]">Syncing...</span></div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full w-[45%] bg-[#00E5FF] rounded-full animate-pulse" /></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
