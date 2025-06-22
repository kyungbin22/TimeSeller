'use client';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ExperienceListPage() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/experience`,
    fetcher
  );

  if (error) return <div>에러가 발생했습니다.</div>;
  if (!data) return <div>로딩 중...</div>;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>경험 리스트</h2>
        <Link href="/experience/new" className="button">경험 등록하기</Link>
      </div>
      <div className="card-list">
        {data.map((exp: any) => (
          <div key={exp.id} className="card">
            <h3><Link href={`/experience/${exp.id}`}>{exp.title}</Link></h3>
            <p style={{ color: 'var(--secondary-color)' }}>{exp.description.slice(0, 80)}...</p>
            <div><strong>셀러</strong>: {exp.seller?.nickname || exp.seller?.id}</div>
            <div><strong>후기</strong>: {exp.reviews.length}개</div>
          </div>
        ))}
      </div>
    </>
  );
} 