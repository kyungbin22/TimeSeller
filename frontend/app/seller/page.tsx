'use client';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string, token: string) =>
  fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(res => res.json());

export default function SellerPage() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data: experiences, error: expError } = useSWR(token ? ['/api/sellerpage/my-experiences', token] : null, ([url, t]) => fetcher(`${process.env.NEXT_PUBLIC_API_URL}${url}`, t));
  const { data: reservations, error: resError } = useSWR(token ? ['/api/sellerpage/my-reservations', token] : null, ([url, t]) => fetcher(`${process.env.NEXT_PUBLIC_API_URL}${url}`, t));

  if (!token) return <div>로그인이 필요합니다. <Link href="/login">로그인</Link></div>;

  return (
    <>
      <h2>셀러 마이페이지</h2>
      <section className="card">
        <h3>내 경험</h3>
        {expError && <div>경험 목록을 불러오는데 실패했습니다.</div>}
        {!experiences ? '로딩 중...' : (
          experiences.length === 0 ? <p>등록한 경험이 없습니다. <Link href="/experience/new">경험 등록하기</Link></p> :
          <ul>
            {experiences.map((e: any) => (
              <li key={e.id}>
                <Link href={`/experience/${e.id}`}>{e.title}</Link> (예약: {e.reservations.length}건, 후기: {e.reviews.length}건)
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="card" style={{ marginTop: '2rem' }}>
        <h3>내 경험에 대한 예약</h3>
        {resError && <div>예약 목록을 불러오는데 실패했습니다.</div>}
        {!reservations ? '로딩 중...' : (
          reservations.length === 0 ? <p>예약 내역이 없습니다.</p> :
          <ul>
            {reservations.map((r: any) => (
              <li key={r.id}>
                <strong><Link href={`/experience/${r.experience?.id}`}>{r.experience?.title}</Link></strong> - 예약자: {r.user?.email} ({new Date(r.createdAt).toLocaleDateString()})
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
} 