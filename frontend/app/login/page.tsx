"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Sparkles, Mail, Lock, ArrowRight, Award } from "lucide-react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, formData)
      login(response.data.token, response.data.user)
      toast({
        title: "로그인 성공!",
        description: "TimeSeller에 오신 것을 환영합니다.",
      })
      window.location.href = "/"
    } catch (error: any) {
      toast({
        title: "로그인 실패",
        description: error.response?.data?.error || "로그인 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="flex flex-1 items-center justify-center py-12 px-4 relative z-10">
        <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-60"></div>
          
          <CardHeader className="text-center mb-8 relative z-10">
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-2xl font-black text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text leading-tight">
                    TimeSeller
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200">
                <Award className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-800">로그인</span>
              </div>
            </div>
            
            <CardTitle className="text-3xl font-black mb-3 text-gray-900">
              <span className="text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                TimeSeller
              </span>
              에 로그인하세요
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 font-medium">
              프리미엄 경험 거래 플랫폼
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  이메일
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  비밀번호
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
                />
              </div>
              
              <Button 
                type="submit"
                className="group relative w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 text-white border-0 overflow-hidden"
                disabled={loading}
              >
                <Award className="w-5 h-5 mr-2" />
                {loading ? "로그인 중..." : "로그인 완료"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-medium">
                계정이 없으신가요?{" "}
                <Link href="/register" className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text font-bold hover:from-blue-700 hover:to-teal-700 transition-all duration-300">
                  회원가입하기
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  )
} 