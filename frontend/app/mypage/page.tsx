"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/components/auth-provider"
import { 
  Calendar, 
  Clock, 
  Star, 
  Plus, 
  Eye, 
  User, 
  BookOpen, 
  MessageSquare, 
  TrendingUp,
  Settings,
  LogOut,
  Heart,
  Award
} from "lucide-react"

interface Experience {
  id: number
  title: string
  category: string
  pricePerHour: number
  isActive: boolean
  createdAt: string
}

interface Booking {
  id: number
  bookingDate: string
  bookingTime: string
  status: string
  totalPrice: number
  experience: {
    title: string
  }
  buyer?: {
    name: string
  }
  seller?: {
    name: string
  }
}

interface Review {
  id: number
  rating: number
  comment: string
  createdAt: string
  experience: {
    title: string
  }
  reviewer?: {
    name: string
  }
}

export default function DashboardPage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [buyerBookings, setBuyerBookings] = useState<Booking[]>([])
  const [sellerBookings, setSellerBookings] = useState<Booking[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [isSeller, setIsSeller] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
      return
    }
    fetchDashboardData()
  }, [user])

  const fetchDashboardData = async () => {
    if (!user) return

    try {
      const token = localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      // Check if user is seller and get profile
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, config)
      const isSellerUser = userResponse.data.isSeller || false
      setIsSeller(isSellerUser)
      setUserProfile(userResponse.data)

      // Fetch buyer bookings
      const buyerBookingsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations/my`, config)
      setBuyerBookings(buyerBookingsResponse.data || [])

      // Fetch reviews written by user
      const reviewsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reviews/my`, config)
      setReviews(reviewsResponse.data || [])

      // If seller, fetch seller-specific data
      if (isSellerUser) {
        // Fetch experiences
        const experiencesResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/experience/my`, config)
        setExperiences(experiencesResponse.data || [])

        // Fetch seller bookings
        const sellerBookingsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reservations/received`, config)
        setSellerBookings(sellerBookingsResponse.data || [])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            <span className="ml-3 text-blue-900 text-lg">로딩 중...</span>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: "총 예약",
      value: buyerBookings.length,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "작성한 후기",
      value: reviews.length,
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    ...(isSeller ? [
      {
        title: "등록한 경험",
        value: experiences.length,
        icon: BookOpen,
        color: "text-purple-600",
        bgColor: "bg-purple-100"
      },
      {
        title: "받은 예약",
        value: sellerBookings.length,
        icon: TrendingUp,
        color: "text-orange-600",
        bgColor: "bg-orange-100"
      }
    ] : [])
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-900 to-purple-900 bg-clip-text text-transparent mb-2">
                마이페이지
              </h1>
              <p className="text-gray-600 text-lg">
                {isSeller ? "셀러 및 구매자" : "구매자"} 대시보드에 오신 것을 환영합니다
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                로그아웃
              </Button>
            </div>
          </div>

          {/* User Profile Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {userProfile?.name || user?.name || "사용자"}
                  </h2>
                  <p className="text-gray-600">{userProfile?.email || user?.email}</p>
                  {isSeller && (
                    <Badge className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      <Award className="h-3 w-3 mr-1" />
                      인증된 셀러
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-1 mb-6 shadow-lg">
            <TabsTrigger value="bookings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-purple-900 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-full transition-all duration-300">
              내 예약
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-purple-900 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-full transition-all duration-300">
              내 후기
            </TabsTrigger>
            {isSeller && (
              <TabsTrigger value="experiences" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-purple-900 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-full transition-all duration-300">
                내 경험
              </TabsTrigger>
            )}
            {isSeller && (
              <TabsTrigger value="seller-bookings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-900 data-[state=active]:to-purple-900 data-[state=active]:text-white data-[state=inactive]:text-gray-700 rounded-full transition-all duration-300">
                받은 예약
              </TabsTrigger>
            )}
          </TabsList>

          {/* Buyer Bookings */}
          <TabsContent value="bookings">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-6 w-6 mr-3 text-blue-600" />
                  내 예약
                </CardTitle>
                <CardDescription className="text-gray-600">예약한 경험들을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                {buyerBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-10 w-10 text-blue-600" />
                    </div>
                    <p className="text-gray-500 mb-4 text-lg">아직 예약한 경험이 없습니다.</p>
                    <Button asChild className="bg-gradient-to-r from-blue-900 to-purple-900 hover:from-purple-900 hover:to-blue-900 text-white rounded-full px-8 py-3 transition-all duration-300 hover:scale-105">
                      <Link href="/experience">경험 둘러보기</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {buyerBookings.map((booking) => (
                      <Card key={booking.id} className="bg-white/60 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-lg mb-2">{booking.experience.title}</h3>
                              <p className="text-sm text-gray-600 mb-3">셀러: {booking.seller?.name}</p>
                              <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                                  {booking.bookingDate}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-2 text-purple-600" />
                                  {booking.bookingTime}
                                </div>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <Badge
                                variant={
                                  booking.status === "confirmed"
                                    ? "default"
                                    : booking.status === "completed"
                                      ? "secondary"
                                      : booking.status === "cancelled"
                                        ? "destructive"
                                        : "outline"
                                }
                                className="mb-2"
                              >
                                {booking.status === "pending" && "대기중"}
                                {booking.status === "confirmed" && "확정"}
                                {booking.status === "completed" && "완료"}
                                {booking.status === "cancelled" && "취소"}
                              </Badge>
                              <p className="text-lg font-bold text-blue-900">{booking.totalPrice.toLocaleString()}원</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                  <MessageSquare className="h-6 w-6 mr-3 text-green-600" />
                  내 후기
                </CardTitle>
                <CardDescription className="text-gray-600">작성한 후기들을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="h-10 w-10 text-green-600" />
                    </div>
                    <p className="text-gray-500 text-lg">아직 작성한 후기가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id} className="bg-white/60 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-semibold text-gray-900 text-lg">{review.experience.title}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">{review.comment}</p>
                          <p className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Seller Experiences */}
          {isSeller && (
            <TabsContent value="experiences">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                      <BookOpen className="h-6 w-6 mr-3 text-purple-600" />
                      내 경험
                    </CardTitle>
                    <CardDescription className="text-gray-600">등록한 경험들을 관리하세요</CardDescription>
                  </div>
                  <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105">
                    <Link href="/experience/new">
                      <Plus className="h-4 w-4 mr-2" />
                      새 경험 등록
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {experiences.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="h-10 w-10 text-purple-600" />
                      </div>
                      <p className="text-gray-500 mb-4 text-lg">아직 등록한 경험이 없습니다.</p>
                      <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white rounded-full px-8 py-3 transition-all duration-300 hover:scale-105">
                        <Link href="/experience/new">첫 경험 등록하기</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {experiences.map((experience) => (
                        <Card key={experience.id} className="bg-white/60 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg mb-2">{experience.title}</h3>
                                <Badge variant="secondary" className="mb-3 bg-purple-100 text-purple-800">
                                  {experience.category}
                                </Badge>
                                <p className="text-sm text-gray-500">
                                  등록일: {new Date(experience.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right ml-4">
                                <Badge variant={experience.isActive ? "default" : "secondary"} className="mb-2">
                                  {experience.isActive ? "활성" : "비활성"}
                                </Badge>
                                <p className="text-lg font-bold text-purple-900 mb-3">
                                  {experience.pricePerHour.toLocaleString()}원/시간
                                </p>
                                <Button asChild size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                                  <Link href={`/experience/${experience.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    보기
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Seller Bookings */}
          {isSeller && (
            <TabsContent value="seller-bookings">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="h-6 w-6 mr-3 text-orange-600" />
                    받은 예약
                  </CardTitle>
                  <CardDescription className="text-gray-600">고객들의 예약 요청을 확인하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  {sellerBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="h-10 w-10 text-orange-600" />
                      </div>
                      <p className="text-gray-500 text-lg">아직 받은 예약이 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sellerBookings.map((booking) => (
                        <Card key={booking.id} className="bg-white/60 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg mb-2">{booking.experience.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">구매자: {booking.buyer?.name}</p>
                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-orange-600" />
                                    {booking.bookingDate}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-2 text-orange-600" />
                                    {booking.bookingTime}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <Badge
                                  variant={
                                    booking.status === "confirmed"
                                      ? "default"
                                      : booking.status === "completed"
                                        ? "secondary"
                                        : booking.status === "cancelled"
                                          ? "destructive"
                                          : "outline"
                                  }
                                  className="mb-2"
                                >
                                  {booking.status === "pending" && "대기중"}
                                  {booking.status === "confirmed" && "확정"}
                                  {booking.status === "completed" && "완료"}
                                  {booking.status === "cancelled" && "취소"}
                                </Badge>
                                <p className="text-lg font-bold text-orange-900">{booking.totalPrice.toLocaleString()}원</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
} 