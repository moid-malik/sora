"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to register");
            }

            setFormData({
                email: "",
                username: "",
                password: "",
            });
            
            router.push('/blog');
        } catch (error) {
            console.error("Error:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
            <div className="w-full max-w-md space-y-8 p-8 rounded-2xl border bg-card shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold tracking-tight">Create Account</h1>
                    <p className="text-muted-foreground">
                        Join our community of developers
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            name="username"
                            type="text"
                            placeholder="Username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="h-12"
                        />
                    </div>

                    <div className="space-y-2">
                        <Input
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="h-12"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-base"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                            or
                        </span>
                    </div>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Page;
