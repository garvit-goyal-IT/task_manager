import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

const Register = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [name,setName]=useState("")

    const navigate= useNavigate()

    const handleRegister= async(e)=>{
        e.preventDefault()

        try {
            const res= await api.post("/auth/register", {
                email,name,password
            })

            localStorage.setItem("token", res.data.token)
            navigate('/')
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message || "Login failed");
        }   
    }
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 mx-4">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Register
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none border border-gray-600 focus:border-blue-500"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none border border-gray-600 focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none border border-gray-600 focus:border-blue-500"
          />

          <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white cursor-pointer active:scale-95 font-semibold hover:bg-blue-700 transition">
            Register
          </button>
        </form>

        <p className="text-center text-gray-300 mt-6">
          Already a Member?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;