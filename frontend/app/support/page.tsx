'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, HelpCircle, Mail, Phone, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: '서비스 이용 중 문제가 발생했어요. 어떻게 문의하나요?',
    answer: '페이지 하단의 문의하기 버튼을 통해 실시간 채팅 또는 이메일로 문의하실 수 있습니다. 빠르게 답변드리겠습니다.'
  },
  {
    question: '예약 취소/환불은 어떻게 하나요?',
    answer: '마이페이지 > 예약내역에서 직접 취소 요청이 가능하며, 환불은 정책에 따라 처리됩니다. 자세한 내용은 FAQ 또는 고객센터로 문의해주세요.'
  },
  {
    question: '전문가 등록/승인 절차가 궁금해요.',
    answer: '셀러 등록 후 관리자의 검토를 거쳐 승인됩니다. 추가 서류가 필요할 경우 별도 안내드립니다.'
  },
  {
    question: '결제는 안전한가요?',
    answer: 'TimeSeller는 안전한 결제 시스템을 사용하며, 결제 내역은 마이페이지에서 확인하실 수 있습니다.'
  },
  {
    question: '후기/평점은 어떻게 남기나요?',
    answer: '경험이 완료된 후 마이페이지에서 해당 거래에 대한 후기와 평점을 남길 수 있습니다.'
  },
  {
    question: '기타 문의는 어디로 하나요?',
    answer: '아래 이메일 또는 실시간 채팅을 통해 언제든 문의해 주세요.'
  }
];

export default function SupportPage() {
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
              <span className="text-2xl font-bold text-blue-800">고객센터</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200 w-fit mx-auto mb-6">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-bold text-blue-800">무엇을 도와드릴까요?</span>
          </div>
          <h1 className="text-5xl font-black mb-6">
            <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text">
              고객센터
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
              자주 묻는 질문 & 문의
            </span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto">
            궁금한 점이 있으신가요? 아래 FAQ를 확인하거나, 언제든 문의해 주세요.<br />
            빠르고 친절하게 답변드리겠습니다.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
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

        {/* Contact Section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black mb-4 text-gray-900">문의하기</h2>
          <p className="text-lg text-gray-600 mb-6">아래 방법으로 언제든 문의해 주세요. 빠르게 답변드리겠습니다.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-xl px-6 py-4 border border-white/20 shadow-md">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">support@timeseller.co.kr</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-xl px-6 py-4 border border-white/20 shadow-md">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">02-1234-5678</span>
            </div>
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-xl px-6 py-4 border border-white/20 shadow-md">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">실시간 채팅상담 (오전 10시~오후 6시)</span>
            </div>
          </div>
          <Button className="group bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-2xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
            <MessageSquare className="w-5 h-5 mr-2" />
            문의하기
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-slate-900 rounded-3xl shadow-2xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-400"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-6">
                TimeSeller와 함께 특별한 경험을 시작하세요!
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                궁금한 점이 있다면 언제든 문의해 주세요. 프리미엄 경험 거래의 새로운 기준을 만나보실 수 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/experience">
                  <Button className="group bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-2xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
                    전문가 둘러보기
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/apply">
                  <Button className="group bg-gradient-to-r from-yellow-400 to-emerald-400 hover:from-yellow-500 hover:to-emerald-500 text-gray-900 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
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