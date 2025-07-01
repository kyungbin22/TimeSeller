'use client';

import { useState } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { Search, Filter, Star, Clock, MapPin, Users, Sparkles, Award, TrendingUp, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const categories = [
  "전체",
  "요리/베이킹",
  "운동/피트니스",
  "음악/악기",
  "미술/공예",
  "언어/회화",
  "비즈니스/컨설팅",
  "IT/프로그래밍",
  "사진/영상",
  "기타",
];

export default function ExperienceListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('최신순');

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/experience`,
    fetcher
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-700 mb-2">에러가 발생했습니다</div>
        <div className="text-gray-500">잠시 후 다시 시도해주세요</div>
      </div>
    </div>
  );

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <div className="text-xl font-semibold text-gray-700">전문가들을 불러오는 중...</div>
      </div>
    </div>
  );

  // 필터링 및 정렬
  let filteredData = data.filter((exp: any) => {
    const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.seller?.nickname?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || exp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 정렬
  filteredData.sort((a: any, b: any) => {
    switch (sortBy) {
      case '최신순':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case '인기순':
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      case '가격순':
        return (a.pricePerHour || 0) - (b.pricePerHour || 0);
      default:
        return 0;
    }
  });

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
        <div className="text-center mb-12">
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
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-bold text-blue-800">전문가 둘러보기</span>
          </div>

          <h1 className="text-5xl font-black mb-6">
            <span className="text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-slate-800 bg-clip-text">
              검증된 전문가들과
            </span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
              특별한 경험을 만나보세요
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 font-medium max-w-3xl mx-auto">
            TimeSeller에서 프리미엄 경험을 제공하는 전문가들을 만나보세요.
            <br />
            안전하고 신뢰할 수 있는 1:1 맞춤형 경험을 제공합니다.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="전문가나 경험을 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-xl bg-white/50 backdrop-blur-sm border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="rounded-xl bg-white/50 backdrop-blur-sm border-gray-200 focus:ring-2 focus:ring-blue-500">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="카테고리 선택" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="rounded-xl bg-white/50 backdrop-blur-sm border-gray-200 focus:ring-2 focus:ring-blue-500">
                <TrendingUp className="w-4 h-4 mr-2" />
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="최신순">최신순</SelectItem>
                <SelectItem value="인기순">인기순</SelectItem>
                <SelectItem value="가격순">가격순</SelectItem>
              </SelectContent>
            </Select>

            {/* Results Count */}
            <div className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-200">
              <span className="text-sm font-semibold text-blue-800">
                {filteredData.length}개의 경험
              </span>
            </div>
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredData.map((exp: any) => (
            <Link key={exp.id} href={`/experience/${exp.id}`}>
              <div className="group bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl border border-white/20 p-6 transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500"></div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60"></div>
                
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {exp.seller?.nickname || exp.seller?.name || '전문가'}
                      </div>
                      <div className="text-sm text-gray-500">{exp.category || '기타'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {exp.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>1시간</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{exp.reviews?.length || 0}명</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
                      ₩{exp.pricePerHour?.toLocaleString() || '50,000'}
                    </div>
                    <div className="text-sm text-gray-500">시간당</div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-teal-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600 mb-6">다른 검색어나 카테고리를 시도해보세요</p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('전체');
              }}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl px-6 py-3 font-semibold transition-all duration-300"
            >
              전체 보기
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-slate-900 rounded-3xl shadow-2xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-teal-600/20"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-blue-400"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white mb-4">
                당신도 전문가가 되어보세요!
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                TimeSeller에서 당신의 전문성을 공유하고 수익을 창출하세요
              </p>
              <Link href="/apply">
                <Button className="group bg-gradient-to-r from-yellow-400 to-teal-400 hover:from-yellow-500 hover:to-teal-500 text-gray-900 rounded-2xl px-8 py-4 text-lg font-bold shadow-xl transition-all duration-300 transform hover:scale-105">
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
  );
} 