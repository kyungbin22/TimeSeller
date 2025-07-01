"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, Award, User, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useEffect, useState } from "react"

export function Navbar() {
  const { user, logout } = useAuth()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem('token')
      const userData = localStorage.getItem('user')
      if (token && userData) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }
  }, [user])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    // 로그아웃 후 홈페이지로 리다이렉트
    window.location.href = '/'
  }

  // 디버깅용 콘솔 로그
  if (typeof window !== "undefined") {
    console.log('Navbar - user:', user)
    console.log('Navbar - isLoggedIn:', isLoggedIn)
    console.log('Navbar - localStorage token:', localStorage.getItem('token'))
  }

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white/50 to-teal-50/50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-teal-600 to-emerald-600 flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-black text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text leading-tight">
              TimeSeller
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/experience" 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300"
            >
              전문가 찾기
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300"
            >
              이용방법
            </Link>
            <Link 
              href="/support" 
              className="text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300"
            >
              고객센터
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {(user || isLoggedIn) ? (
              // 로그인된 상태: 마이페이지와 로그아웃 버튼
              <>
                <Link href="/mypage" passHref legacyBehavior>
                  <Button 
                    variant="ghost" 
                    className="hidden md:inline-flex text-gray-700 hover:text-blue-600 bg-transparent hover:bg-blue-50/50 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-transparent hover:border-blue-200"
                  >
                    <User className="w-4 h-4 mr-2" />
                  마이페이지
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="hidden md:inline-flex text-gray-700 hover:text-red-600 bg-transparent hover:bg-red-50/50 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-transparent hover:border-red-200"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  로그아웃
                </Button>
              </>
            ) : (
              // 로그인되지 않은 상태: 로그인 버튼
              <Link href="/login" passHref legacyBehavior>
                <Button 
                  variant="ghost" 
                  className="hidden md:inline-flex text-gray-700 hover:text-blue-600 bg-transparent hover:bg-blue-50/50 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-transparent hover:border-blue-200"
                >
                  로그인
                </Button>
                </Link>
            )}
            
            <Link href="/apply" passHref legacyBehavior>
              <Button 
                variant="default" 
                className="group relative bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
              >
                <Award className="w-4 h-4 mr-2" />
                셀러 등록
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all duration-300"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 
