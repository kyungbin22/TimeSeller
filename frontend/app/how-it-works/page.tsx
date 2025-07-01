'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Sparkles, 
  Award, 
  Users, 
  Search, 
  Calendar, 
  MessageSquare, 
  Star, 
  Shield, 
  Clock, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle,
  TrendingUp,
  Zap,
  Heart
} from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "전문가 찾기",
    description: "원하는 분야의 전문가를 검색하고 프로필을 확인하세요",
    details: "카테고리별 필터링, 평점, 리뷰를 통해 신뢰할 수 있는 전문가를 선택할 수 있습니다."
  },
  {
    icon: Calendar,
    title: "예약하기",
    description: "원하는 날짜와 시간에 1:1 경험을 예약하세요",
    details: "전문가와 직접 일정을 조율하고, 안전한 결제 시스템을 통해 예약을 완료합니다."
  },
  {
    icon: MessageSquare,
    title: "경험하기",
    description: "전문가와 함께 특별한 경험을 만들어보세요",
    details: "실시간 채팅, 화상 통화, 또는 대면으로 전문가의 노하우를 배워보세요."
  },
  {
    icon: Star,
    title: "후기 남기기",
    description: "경험 후 솔직한 후기와 평점을 남겨주세요",
    details: "다른 사용자들을 위한 참고가 되며, 전문가의 성장에도 도움이 됩니다."
  }
];

const sellerSteps = [
  {
    icon: Award,
    title: "전문가 등록",
    description: "TimeSeller에 전문가로 등록하고 프로필을 완성하세요",
    details: "간단한 신청서 작성 후 검토를 거쳐 승인됩니다."
  },
  {
    icon: TrendingUp,
    title: "경험 등록",
    description: "제공할 경험의 상세 정보와 가격을 설정하세요",
    details: "매력적인 제목과 상세한 설명으로 고객의 관심을 끌어보세요."
  },
  {
    icon: Users,
    title: "고객 매칭",
    description: "관심 있는 고객들과 매칭되고 예약을 받으세요",
    details: "실시간으로 예약 요청을 확인하고 일정을 조율할 수 있습니다."
  },
  {
    icon: Zap,
    title: "수익 창출",
    description: "경험 제공 후 안전하게 수익을 받으세요",
    details: "정산 시스템을 통해 안전하고 투명하게 수익을 받을 수 있습니다."
  }
];

const faqs = [
  {
    question: "TimeSeller는 어떤 서비스인가요?",
    answer: "TimeSeller는 전문가와 일반 사용자를 연결하는 프리미엄 경험 거래 플랫폼입니다. 요리, 운동, 음악, 미술 등 다양한 분야의 전문가들이 1:1 맞춤형 경험을 제공합니다."
  },
  {
    question: "예약은 어떻게 하나요?",
    answer: "원하는 전문가를 찾은 후, 해당 전문가의 프로필에서 예약 버튼을 클릭하세요. 원하는 날짜와 시간을 선택하고 결제를 완료하면 예약이 확정됩니다."
  },
  {
    question: "결제는 안전한가요?",
    answer: "네, TimeSeller는 안전한 결제 시스템을 사용합니다. 경험이 완료된 후에 전문가에게 정산되며, 문제가 있을 경우 환불 보장 서비스를 제공합니다."
  },
  {
    question: "전문가가 되려면 어떻게 해야 하나요?",
    answer: "홈페이지의 '셀러 등록' 버튼을 클릭하여 신청서를 작성하세요. 검토 후 승인되면 경험을 등록하고 고객과 매칭을 시작할 수 있습니다."
  },
  {
    question: "취소 및 환불 정책은 어떻게 되나요?",
    answer: "예약 24시간 전까지는 무료 취소가 가능합니다. 24시간 이내 취소 시 수수료가 발생할 수 있으며, 전문가와의 합의 하에 환불이 진행됩니다."
  },
  {
    question: "문제가 발생하면 어떻게 해야 하나요?",
    answer: "고객센터를 통해 문의하거나, 실시간 채팅 상담을 이용하세요. 빠른 시간 내에 해결해드리겠습니다."
  }
];

const features = [
  {
    icon: Shield,
    title: "안전한 거래",
    description: "검증된 전문가와 안전한 결제 시스템으로 안심하고 이용하세요"
  },
  {
    icon: Clock,
    title: "실시간 예약",
    description: "원하는 시간에 즉시 예약하고 전문가와 일정을 조율하세요"
  },
  {
    icon: Star,
    title: "검증된 전문가",
    description: "평점과 리뷰를 통해 신뢰할 수 있는 전문가를 선택하세요"
  },
  {
    icon: Heart,
    title: "맞춤형 경험",
    description: "개인에게 최적화된 1:1 맞춤형 경험을 제공합니다"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 flex items-center justify-center shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text leading-tight">
                TimeSeller
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 w-fit mx-auto mb-6">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-bold text-blue-800">이용방법</span>
          </div>

          <h1 className="text-5xl font-black mb-6">
            <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text">
              TimeSeller
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
              이용방법 가이드
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            TimeSeller를 처음 이용하시는 분들을 위한 상세한 가이드입니다.
            <br />
            간단한 4단계로 특별한 경험을 시작하세요.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center text-center transition-all duration-500 transform hover:-translate-y-2 border border-white/20 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/5 to-teal-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* User Journey Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              <span className="text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                경험을 찾는 분들을 위한
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
                4단계 가이드
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              전문가와의 특별한 경험을 시작하는 방법을 알려드립니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-2 border border-white/20 relative overflow-hidden"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Journey Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              <span className="text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                전문가가 되고 싶은 분들을 위한
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
                4단계 가이드
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              당신의 전문성을 공유하고 수익을 창출하는 방법을 알려드립니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sellerSteps.map((step, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl p-8 transition-all duration-500 transform hover:-translate-y-2 border border-white/20 relative overflow-hidden"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {step.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">
              <span className="text-transparent bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text">
                자주 묻는 질문
              </span>
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              TimeSeller 이용에 궁금한 점들을 모았습니다
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-slate-900 rounded-3xl shadow-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-400"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-6">
                지금 바로 시작해보세요!
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                TimeSeller에서 특별한 경험을 찾거나, 당신의 전문성을 공유해보세요.
                프리미엄 경험 거래의 새로운 기준을 만나보실 수 있습니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/experience">
                  <Button className="group bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-2xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Search className="w-5 h-5 mr-2" />
                    전문가 둘러보기
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/apply">
                  <Button className="group bg-gradient-to-r from-yellow-400 to-emerald-400 hover:from-yellow-500 hover:to-emerald-500 text-gray-900 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Award className="w-5 h-5 mr-2" />
                    전문가 등록하기
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 