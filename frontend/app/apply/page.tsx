"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, User, Mail, Phone, MessageSquare, Briefcase, DollarSign, ArrowRight, Award, TrendingUp } from "lucide-react"

const categories = [
  "요리/베이킹",
  "운동/피트니스",
  "음악/악기",
  "미술/공예",
  "언어/회화",
  "비즈니스/컨설팅",
  "IT/프로그래밍",
  "사진/영상",
  "기타",
]

export default function SellerApplicationPage() {
  const [formData, setFormData] = useState({
    email: "",
    kakaoId: "",
    name: "",
    phone: "",
    experienceTitle: "",
    experienceDescription: "",
    experienceCategory: "",
    pricePerHour: "",
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  function formatPhoneNumber(value: string) {
    const numbersOnly = value.replace(/[^0-9]/g, "");
    if (numbersOnly.length < 4) return numbersOnly;
    if (numbersOnly.length < 8)
      return numbersOnly.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    return numbersOnly.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/apply`, formData)

      toast({
        title: "지원 완료!",
        description: "셀러 지원이 성공적으로 제출되었습니다. 검토 후 연락드리겠습니다.",
      })

      router.push("/")
    } catch (error) {
      console.error("Error submitting application:", error)
      toast({
        title: "오류 발생",
        description: "지원서 제출 중 오류가 발생했습니다. 다시 시도해주세요.",
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
        <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 relative overflow-hidden">
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
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-800">셀러 지원</span>
              </div>
            </div>
            
            <CardTitle className="text-3xl font-black mb-3 text-gray-900">
              <span className="text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                TimeSeller
              </span>
              에서 전문가가 되세요
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 font-medium">
              당신의 전문성을 공유하고 수익을 창출하세요
            </CardDescription>
          </CardHeader>
          
          <CardContent className="relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    이름 *
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
                  <Label htmlFor="phone" className="text-gray-700 font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-600" />
                    연락처
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                    placeholder="010-1234-5678"
                    className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  이메일 *
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
                <Label htmlFor="kakaoId" className="text-gray-700 font-semibold flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  카카오톡 ID
                </Label>
                <Input
                  id="kakaoId"
                  value={formData.kakaoId}
                  onChange={(e) => setFormData({ ...formData, kakaoId: e.target.value })}
                  placeholder="카카오톡 ID를 입력해주세요"
                  className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceTitle" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  제공할 경험 제목 *
                </Label>
                <Input
                  id="experienceTitle"
                  value={formData.experienceTitle}
                  onChange={(e) => setFormData({ ...formData, experienceTitle: e.target.value })}
                  placeholder="예: 프로 셰프와 함께하는 이탈리안 요리 클래스"
                  required
                  className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceCategory" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  카테고리 *
                </Label>
                <Select
                  value={formData.experienceCategory}
                  onValueChange={(value: string) => setFormData({ ...formData, experienceCategory: value })}
                >
                  <SelectTrigger className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 transition-all duration-300 hover:bg-white/70 focus:bg-white">
                    <SelectValue placeholder="카테고리를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="rounded-xl">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerHour" className="text-gray-700 font-semibold flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  시간당 가격 (원)
                </Label>
                <Input
                  id="pricePerHour"
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                  placeholder="50000"
                  className="rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm border-gray-200 text-gray-900 placeholder-gray-400 transition-all duration-300 hover:bg-white/70 focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceDescription" className="text-gray-700 font-semibold flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  경험 상세 설명 *
                </Label>
                <Textarea
                  id="experienceDescription"
                  value={formData.experienceDescription}
                  onChange={(e) => setFormData({ ...formData, experienceDescription: e.target.value })}
                  placeholder="제공할 경험에 대해 자세히 설명해주세요. 포함 내용, 준비물, 진행 방식 등을 포함해주세요."
                  rows={6}
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
                {loading ? "제출 중..." : "셀러 지원 완료"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </form>
          </CardContent>
        </div>
      </div>
    </div>
  )
} 