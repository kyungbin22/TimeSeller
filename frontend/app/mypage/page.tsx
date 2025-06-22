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
import { Calendar, Clock, Star, Plus, Eye } from "lucide-react"

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
  const { user } = useAuth()
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

      // Check if user is seller
      const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, config)
      const isSellerUser = userResponse.data.isSeller || false
      setIsSeller(isSellerUser)

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

  if (!user) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">로딩 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">마이페이지</h1>
          <p className="text-gray-600">{isSeller ? "셀러 및 구매자" : "구매자"} 대시보드</p>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">내 예약</TabsTrigger>
            <TabsTrigger value="reviews">내 후기</TabsTrigger>
            {isSeller && <TabsTrigger value="experiences">내 경험</TabsTrigger>}
            {isSeller && <TabsTrigger value="seller-bookings">받은 예약</TabsTrigger>}
          </TabsList>

          {/* Buyer Bookings */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>내 예약</CardTitle>
                <CardDescription>예약한 경험들을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                {buyerBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">아직 예약한 경험이 없습니다.</p>
                    <Button asChild>
                      <Link href="/experience">경험 둘러보기</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {buyerBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{booking.experience.title}</h3>
                              <p className="text-sm text-gray-600">셀러: {booking.seller?.name}</p>
                              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {booking.bookingDate}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {booking.bookingTime}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
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
                              >
                                {booking.status === "pending" && "대기중"}
                                {booking.status === "confirmed" && "확정"}
                                {booking.status === "completed" && "완료"}
                                {booking.status === "cancelled" && "취소"}
                              </Badge>
                              <p className="text-sm font-semibold mt-1">{booking.totalPrice.toLocaleString()}원</p>
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
            <Card>
              <CardHeader>
                <CardTitle>내 후기</CardTitle>
                <CardDescription>작성한 후기들을 확인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">아직 작성한 후기가 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{review.experience.title}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
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
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>내 경험</CardTitle>
                    <CardDescription>등록한 경험들을 관리하세요</CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/experience/new">
                      <Plus className="h-4 w-4 mr-2" />새 경험 등록
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent>
                  {experiences.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-4">아직 등록한 경험이 없습니다.</p>
                      <Button asChild>
                        <Link href="/experience/new">첫 경험 등록하기</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {experiences.map((experience) => (
                        <Card key={experience.id}>
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{experience.title}</h3>
                                <Badge variant="secondary" className="mt-1">
                                  {experience.category}
                                </Badge>
                                <p className="text-sm text-gray-500 mt-2">
                                  등록일: {new Date(experience.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge variant={experience.isActive ? "default" : "secondary"}>
                                  {experience.isActive ? "활성" : "비활성"}
                                </Badge>
                                <p className="text-sm font-semibold mt-1">
                                  {experience.pricePerHour.toLocaleString()}원/시간
                                </p>
                                <Button asChild size="sm" variant="outline" className="mt-2">
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
              <Card>
                <CardHeader>
                  <CardTitle>받은 예약</CardTitle>
                  <CardDescription>고객들의 예약 요청을 확인하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  {sellerBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">아직 받은 예약이 없습니다.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sellerBookings.map((booking) => (
                        <Card key={booking.id}>
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{booking.experience.title}</h3>
                                <p className="text-sm text-gray-600">구매자: {booking.buyer?.name}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {booking.bookingDate}
                                  </div>
                                  <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {booking.bookingTime}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
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
                                >
                                  {booking.status === "pending" && "대기중"}
                                  {booking.status === "confirmed" && "확정"}
                                  {booking.status === "completed" && "완료"}
                                  {booking.status === "cancelled" && "취소"}
                                </Badge>
                                <p className="text-sm font-semibold mt-1">{booking.totalPrice.toLocaleString()}원</p>
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