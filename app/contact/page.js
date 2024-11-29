"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Github, MessageCircle } from "lucide-react";

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormData({ name: "", email: "", message: "" });
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto py-20 px-4">
                <div className="max-w-2xl mx-auto space-y-16">
                    <div className="space-y-4 text-center">
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            Let's discuss your project or just have a chat
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold tracking-tight">Connect With Me</h2>
                            <div className="space-y-4">
                                <Link 
                                    href="https://wa.me/+923126968917" 
                                    target="_blank"
                                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <MessageCircle size={20} />
                                    <span>WhatsApp</span>
                                </Link>
                                <Link 
                                    href="https://github.com/moid-malik" 
                                    target="_blank"
                                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Github size={20} />
                                    <span>GitHub</span>
                                </Link>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                name="name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="h-12"
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="h-12"
                            />
                            <Textarea
                                name="message"
                                placeholder="Your message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                className="min-h-[120px] resize-none"
                            />
                            <Button
                                type="submit"
                                className="w-full h-12"
                                disabled={isLoading}
                            >
                                {isLoading ? "Sending..." : "Send Message"}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
