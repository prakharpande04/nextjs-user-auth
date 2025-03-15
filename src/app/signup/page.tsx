"use client"  // This file will be executed on frontend 
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axios from "axios"
// import { toast } from "react-hot-toast"

export default function SignupPage(){
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false) 

    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            // toast.success(response.data.message);
            router.push("/login");
        }catch(err:any){
            console.log("Signup failed", err);
            // toast.error(err.message);
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {
        if(user.username.length>0 && user.email.length>0 && user.password.length > 0){
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading? "Processing" : "SignUp"}</h1>
            <hr className="w-full mb-4" />
            <label htmlFor="username" className="mb-2">User Name:</label>
            <input 
                type="text" 
                className="border white p-2 mb-4 w-64" 
                value={user.username} 
                onChange={(e) => setUser({...user, username: e.target.value})}
            />
            <label htmlFor="email" className="mb-2">User Email:</label>
            <input 
                type="text" 
                className="border white p-2 mb-4 w-64" 
                value={user.email} 
                onChange={(e) => setUser({...user, email: e.target.value})}
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
                onClick={onSignup}
            >
                {buttonDisabled ? "Please fill all fields" : "Signup"}
            </button>
            <Link href="/login" className="text-blue-500 hover:underline">
                Already have an account? Login
            </Link>
        </div>
    )
}