import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const {login} = useAuth();
    const navigate = useNavigate(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, seterrorMsg] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "admin" && password === "admin") {
            login("token_abc")
            navigate("/products")
        } else {
            seterrorMsg("username atau password salah!")
        }
    }

    return (
        <div className="flex item-center justify-center min-h-screen p-4">
            <form onSubmit={handleLogin} className="w-full max-w-sm bg-white dark:bg-zinc-900 p-6 rounded shadow space-y-4">
            <h1 className="text-21 font-bold text-center">Login</h1>
            <div className="">
                <Label htmlFor="username">Username</Label>
                <Input id="" type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            {errorMsg && (
                <p>{errorMsg}</p>
            )}
            <Button type="submit" className="w-full">Login</Button>
            </form>
        </div>

    )
}