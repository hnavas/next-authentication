"use client";

import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

function RegisterPage() {
  const [error, setError] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const signupRes = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname"),
      });
      console.log(signupRes);

      const res = await signIn("credentials", {
        email: signupRes.data.email,
        password: formData.get("password"),
        redirect: false,
      });

      if (res?.ok) return router.push("/");
      console.log(res);
    } catch (error) {
      // console.log(error)
      if (error instanceof AxiosError) {
        setError(error.response?.data.message.toUpperCase());
      }
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-orange-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-3xl font-semibold text-gray-400">
                  SIGN UP
                </h1>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="divide-y divide-gray-200">
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-470 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        name="fullname"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 text-xs border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="FullName"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        FullName
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        name="email"
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 text-xs border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        name="password"
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 text-xs border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-orange-500 text-white rounded-md px-2 py-1"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {error && (
              <div className="left-0 -top-3.5 text-red-600 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
