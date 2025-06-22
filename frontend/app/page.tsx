import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Star, Users, Shield, Clock } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              특별한 경험을 <br />
              <span className="text-yellow-300">1:1로 거래하세요</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">전문가와 함께하는 프리미엄 경험 마켓플레이스</p>
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                <Link href="/apply">셀러 지원하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">왜 TimeShare인가요?</h2>
            <p className="text-xl text-gray-600">검증된 전문가들과 함께하는 특별한 경험</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <CardTitle>프리미엄 품질</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">전문가가 제공하는 고품질 경험</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle>1:1 맞춤</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">개인 맞춤형 1:1 경험으로 최대 효과</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle>안전한 거래</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">검증된 셀러와 안전한 예약 시스템</CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle>유연한 시간</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">원하는 시간에 맞춤형 스케줄링</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">당신의 전문성을 공유하세요</h2>
          <p className="text-xl text-gray-300 mb-8">TimeShare 셀러가 되어 특별한 경험을 제공하고 수익을 창출하세요</p>
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/apply">지금 셀러 지원하기</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-4">TimeShare</div>
            <p className="text-gray-600">© 2025 TimeShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 