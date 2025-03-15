"use client"  // This file will be executed on frontend 
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function LoginPage(){
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false) 
    
    const [loading, setLoading] = useState(false);
    
    const onLogin = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            router.push("/profile");
        }catch(err: any){
            console.log("Login Fialed",err)
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user]);

    
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading? "Processing" : "Login"}</h1>
            <hr className="w-full mb-4" />
            <label htmlFor="username" className="mb-2">User Name:</label>
            <input 
                type="text" 
                className="border white p-2 mb-4 w-64" 
                value={user.username} 
                onChange={(e) => setUser({...user, username: e.target.value})}
            />
            <label htmlFor="password" className="mb-2">Password:</label>
            <input 
                type="password" 
                className="border white p-2 mb-4 w-64" 
                value={user.password} 
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <button 
                className="border white bg-gray-500 text-white py-2 px-4 mb-4 hover:bg-gray-700" 
                onClick={onLogin}
            >
                {buttonDisabled? "Enter full details" : "Login"}
            </button>
            <Link href="/signup" className="text-blue-500 hover:underline">
                New to this page? Signup
            </Link>
        </div>
    )
}