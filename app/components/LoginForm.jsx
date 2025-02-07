"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }

            router.replace("/");
        } catch (error) {
            console.log(error);
        }
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching or any async operation
        const fetchData = async () => {
            // Here you can fetch data, etc.
            // For now, let's just set a timeout to simulate a delay
            setTimeout(() => {
                setLoading(false); // Once data fetching is done, set loading to false
            }, 2000); // 2 seconds delay for demonstration purposes, you can adjust it as needed
        };

        fetchData();
    }, []);

    return (
        <div className="grid place-items-center h-screen">
            {loading ? (
                <Loader /> // Render your loader component while loading is true
            ) : (
                <div style={{ borderColor: "#248ccb" }} className="shadow-lg p-5 rounded-lg border-t-4">
                    <h1 className="text-xl font-bold my-4">Login</h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            className="py-2 px-6 border border-gray-200"
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                        />
                        <input
                            className="py-2 px-6 border border-gray-200"
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                        />
                        <button style={{ backgroundColor: "#248ccb" }} className="text-white font-bold cursor-pointer px-6 py-2">
                            Login
                        </button>
                        {error && (
                            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                                {error}
                            </div>
                        )}
                        <Link className="text-sm mt-3 text-right" href={"/register"}>
                            Don&apos;t have an account? <span className="underline">Register</span>
                        </Link>
                    </form>
                </div>
            )}
        </div>
    );
}
