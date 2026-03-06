import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Mail, BookOpen, Settings, LogOut } from 'lucide-react';
import { useLocation } from 'wouter';

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
        // Check our profiles table
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

    if (!session || !isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-16">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-center">Admin Access Restricted</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 items-center">
                        <p className="text-muted-foreground text-center">You must be logged in as an administrator to access this dashboard.</p>
                        <Button className="w-full gradient-purple" onClick={handleLogin}>Log In to Admin</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-background flex flex-col md:flex-row gap-6 container">
            {/* Admin Sidebar */}
            <div className="w-full md:w-64 flex flex-col gap-2">
                <Button variant="secondary" className="justify-start"><Users className="w-4 h-4 mr-2" /> Users</Button>
                <Button variant="ghost" className="justify-start opacity-70"><BookOpen className="w-4 h-4 mr-2" /> Content (Courses)</Button>
                <Button variant="ghost" className="justify-start opacity-70"><Mail className="w-4 h-4 mr-2" /> Email Automation</Button>
                <Button variant="ghost" className="justify-start opacity-70"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                <div className="flex-1" />
                <Button variant="destructive" onClick={handleLogout} className="justify-start"><LogOut className="w-4 h-4 mr-2" /> Log Out</Button>
            </div>

            {/* Admin Content */}
            <div className="flex-1 flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Platform Overview</h1>
                    <p className="text-muted-foreground">Manage your users, content, and data pipelines.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="glass">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle></CardHeader>
                        <CardContent><div className="text-3xl font-bold">{subscribers.length}</div></CardContent>
                    </Card>
                    <Card className="glass">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle></CardHeader>
                        <CardContent><div className="text-3xl font-bold">3</div></CardContent>
                    </Card>
                    <Card className="glass">
                        <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle></CardHeader>
                        <CardContent><div className="text-3xl font-bold text-primary">LYD 4,200</div></CardContent>
                    </Card>
                </div>

                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Recent Email Subscribers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {subscribers.length === 0 ? (
                            <p className="text-muted-foreground text-sm">No subscribers yet or waiting for database connection.</p>
                        ) : (
                            <div className="space-y-4">
                                {subscribers.map((sub, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 rounded-lg border border-border/50 bg-secondary/20">
                                        <span className="font-medium">{sub.email}</span>
                                        <Badge variant="outline">{new Date(sub.created_at).toLocaleDateString()}</Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
