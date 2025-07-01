import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Star, Users, Shield, Clock, Briefcase, ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-20 px-4 relative z-10">
        {/* Main Hero Card */}
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12 text-center mb-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-80"></div>
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full opacity-60"></div>

          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 flex items-center justify-center shadow-lg transform rotate-3">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text leading-tight">
                  TimeSeller
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-800">프리미엄 경험 거래소</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text">
              경험을{" "}
            </span>
            <span className="text-transparent bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text">
              안전하게 거래
            </span>
            <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text">
              하고,
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text">
              실력으로{" "}
            </span>
            <span className="text-transparent bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text">
              수익을 만드세요
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
            신뢰할 수 있는 전문가와 직접 거래, 안전한 정산, 실시간 예약까지.
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text font-bold">
              TimeSeller
            </span>
            는 프리미엄 경험 거래의 새로운 기준입니다.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="group relative py-4 px-8 text-lg font-bold bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 text-white border-0 overflow-hidden"
            >
              <Link href="/apply" className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                셀러로 수익 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="py-4 px-8 text-lg font-bold border-2 border-gray-300 hover:border-blue-500 rounded-2xl transition-all duration-300 hover:shadow-lg bg-white/50 backdrop-blur-sm"
            >
              <Link href="/experience" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                <Users className="w-5 h-5" />
                전문가 둘러보기
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mb-16">
          {[
            {
              icon: Star,
              title: "프리미엄 전문가",
              description: "검증된 전문가와 직접 거래",
              gradient: "from-yellow-400 to-orange-500",
              bgGradient: "from-yellow-50 to-orange-50",
            },
            {
              icon: Briefcase,
              title: "1:1 안전 거래",
              description: "실명 인증, 안전 결제 시스템",
              gradient: "from-blue-500 to-teal-600",
              bgGradient: "from-blue-50 to-teal-50",
            },
            {
              icon: Shield,
              title: "정산/환불 보장",
              description: "거래 내역 투명, 안전한 정산",
              gradient: "from-emerald-500 to-teal-600",
              bgGradient: "from-emerald-50 to-teal-50",
            },
            {
              icon: Clock,
              title: "실시간 예약",
              description: "원하는 시간에 즉시 거래",
              gradient: "from-slate-500 to-gray-600",
              bgGradient: "from-slate-50 to-gray-50",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br ${feature.bgGradient} rounded-2xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center transition-all duration-500 transform hover:-translate-y-2 border border-white/50 backdrop-blur-sm relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div
                className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <div className="relative z-10 text-xl font-bold mb-3 text-gray-900 group-hover:text-gray-800 transition-colors">
                {feature.title}
              </div>
              <div className="relative z-10 text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors">
                {feature.description}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="w-full max-w-4xl bg-gradient-to-r from-gray-900 via-blue-900 to-slate-900 rounded-3xl shadow-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-400"></div>

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-bold text-white">지금 시작하세요</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              전문가로 등록하고{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-400 to-emerald-400 bg-clip-text">
                수익을 시작
              </span>
              하세요!
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              TimeSeller는 신뢰와 실적을 기반으로 한 프리미엄 경험 거래 플랫폼입니다.
            </p>

            <Button
              asChild
              className="group py-4 px-10 text-lg font-bold bg-gradient-to-r from-yellow-400 to-teal-400 hover:from-yellow-500 hover:to-teal-500 text-gray-900 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 border-0 relative overflow-hidden"
            >
              <Link href="/apply" className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                전문가 등록하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-gray-200/50 py-16 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="relative group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text leading-tight">
                  TimeSeller
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6 text-lg">© 2025 TimeSeller. All rights reserved.</p>
            <div className="flex justify-center gap-8 text-gray-500 text-sm">
              <Link href="/terms" className="hover:text-blue-600 transition-colors font-medium">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-blue-600 transition-colors font-medium">
                개인정보처리방침
              </Link>
              <Link href="/support" className="hover:text-blue-600 transition-colors font-medium">
                고객센터
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
