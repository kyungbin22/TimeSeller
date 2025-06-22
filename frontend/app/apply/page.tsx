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
import { Navbar } from "@/components/navbar"
import { useToast } from "@/hooks/use-toast"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/seller/apply`, formData)

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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">셀러 지원하기</CardTitle>
            <CardDescription>TimeSeller에서 당신의 전문성을 공유하고 수익을 창출하세요.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">연락처</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일 *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kakaoId">카카오톡 ID</Label>
                <Input
                  id="kakaoId"
                  value={formData.kakaoId}
                  onChange={(e) => setFormData({ ...formData, kakaoId: e.target.value })}
                  placeholder="카카오톡 ID를 입력해주세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceTitle">제공할 경험 제목 *</Label>
                <Input
                  id="experienceTitle"
                  value={formData.experienceTitle}
                  onChange={(e) => setFormData({ ...formData, experienceTitle: e.target.value })}
                  placeholder="예: 프로 셰프와 함께하는 이탈리안 요리 클래스"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceCategory">카테고리 *</Label>
                <Select
                  value={formData.experienceCategory}
                  onValueChange={(value: string) => setFormData({ ...formData, experienceCategory: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerHour">시간당 가격 (원)</Label>
                <Input
                  id="pricePerHour"
                  type="number"
                  value={formData.pricePerHour}
                  onChange={(e) => setFormData({ ...formData, pricePerHour: e.target.value })}
                  placeholder="50000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceDescription">경험 상세 설명 *</Label>
                <Textarea
                  id="experienceDescription"
                  value={formData.experienceDescription}
                  onChange={(e) => setFormData({ ...formData, experienceDescription: e.target.value })}
                  placeholder="제공할 경험에 대해 자세히 설명해주세요. 포함 내용, 준비물, 진행 방식 등을 포함해주세요."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "제출 중..." : "셀러 지원하기"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 