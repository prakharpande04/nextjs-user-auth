"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useState} from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async() => {
    try{
      const response = await axios.get('/api/users/logout');
      console.log("Logout Successful");
      router.push('/login');
    }
    catch(error : any){
      console.error(error);
    }
  }
  
  const getUserDetails = async() => {
    const response = await axios.get('/api/users/me');
    console.log(response.data);
    setData(response.data.data._id);
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Profile</h1>
        <hr />
        <h2>
          {data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>

        <hr />
        <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>

        <button onClick={getUserDetails} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Get Details</button>
    </div>
  );
}
