"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Sparkles, User, Mail, Lock, ArrowRight, Award, Check, X, Search } from "lucide-react"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  })
  const [loading, setLoading] = useState(false)
  const [nicknameCheck, setNicknameCheck] = useState({
    checked: false,
    available: false,
    loading: false
  })
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  // 닉네임 중복 검사
  const checkNickname = async () => {
    if (!formData.nickname.trim()) {
      toast({
        title: "닉네임 입력 필요",
        description: "닉네임을 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    setNicknameCheck(prev => ({ ...prev, loading: true }))

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/check-nickname`, {
        nickname: formData.nickname
      })
      
      setNicknameCheck({
        checked: true,
        available: response.data.available,
        loading: false
      })

      if (response.data.available) {
        toast({
          title: "사용 가능한 닉네임",
          description: response.data.message,
        })
      } else {
        toast({
          title: "사용 불가능한 닉네임",
          description: response.data.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      setNicknameCheck(prev => ({ ...prev, loading: false }))
      toast({
        title: "중복 검사 실패",
        description: error.response?.data?.error || "닉네임 중복 검사 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    }
  }

  // 닉네임이 변경되면 중복 검사 상태 초기화
  useEffect(() => {
    setNicknameCheck({ checked: false, available: false, loading: false })
  }, [formData.nickname])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "비밀번호 불일치",
        description: "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        variant: "destructive",
      })
      return
    }

    // 비밀번호 조건: 8자리 이상, 영문+숫자 조합
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password)) {
      toast({
        title: "비밀번호 조건 오류",
        description: "비밀번호는 8자리 이상, 영문과 숫자를 모두 포함해야 합니다.",
        variant: "destructive",
      })
      return
    }

    // 닉네임 중복 검사 확인
    if (!nicknameCheck.checked || !nicknameCheck.available) {
      toast({
        title: "닉네임 중복 검사 필요",
        description: "닉네임 중복 검사를 완료해주세요.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
      })
      
      // AuthProvider의 login 함수 사용
      login(response.data.token, response.data.user)
      
      toast({
        title: "회원가입 완료!",
        description: "TimeSeller에 오신 것을 환영합니다.",
      })
      // 회원가입 성공 후 페이지 새로고침하여 navbar 업데이트
      window.location.href = "/"
    } catch (error: any) {
      toast({
        title: "회원가입 실패",
        description: error.response?.data?.error || "회원가입 중 오류가 발생했습니다.",
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
                <span className="text-sm font-bold text-blue-800">회원가입</span>
              </div>
            </div>
            
            <CardTitle className="text-3xl font-black mb-3 text-gray-900">
              <span className="text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
            TimeSeller
              </span>
              에 가입하세요
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 font-medium">
              프리미엄 경험 거래의 새로운 시작
            </CardDescription>
        </CardHeader>
          
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  이름
                </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                  className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
              />
            </div>
              
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-gray-700 font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  닉네임
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    required
                    className="flex-1 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
                    placeholder="닉네임을 입력하세요"
                  />
                  <Button
                    type="button"
                    onClick={checkNickname}
                    disabled={nicknameCheck.loading || !formData.nickname.trim()}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {nicknameCheck.loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {/* 닉네임 중복 검사 결과 표시 */}
                {nicknameCheck.checked && (
                  <div className={`flex items-center gap-2 text-sm font-medium ${
                    nicknameCheck.available ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {nicknameCheck.available ? (
                      <>
                        <Check className="w-4 h-4" />
                        사용 가능한 닉네임입니다
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        이미 사용 중인 닉네임입니다
                      </>
                    )}
                  </div>
                )}
              </div>
              
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
                <p className="text-xs text-gray-500 mt-1">8자리 이상, 영문과 숫자 조합</p>
            </div>
              
            <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  비밀번호 확인
                </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                  className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
              />
            </div>
              
              <Button 
                type="submit" 
                className="group relative w-full py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 text-white border-0 overflow-hidden" 
                disabled={loading || !nicknameCheck.checked || !nicknameCheck.available}
              >
                <Award className="w-5 h-5 mr-2" />
                {loading ? "가입 중..." : "회원가입 완료"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Button>
          </form>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 font-medium">
              이미 계정이 있으신가요?{" "}
                <Link href="/login" className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text font-bold hover:from-blue-700 hover:to-teal-700 transition-all duration-300">
                  로그인하기
              </Link>
            </p>
          </div>
        </CardContent>
        </div>
      </div>
    </div>
  )
} 