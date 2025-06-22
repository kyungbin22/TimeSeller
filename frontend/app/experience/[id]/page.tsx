'use client';
import { use } from 'react';
import ReserveButton from './ReserveButton';
import ReviewForm from './ReviewForm';

async function getExperience(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experience/${id}`);
  if (!res.ok) throw new Error('경험을 불러올 수 없습니다');
  return res.json();
}

export default function ExperienceDetailPage({ params }: { params: { id: string } }) {
  const exp = use(getExperience(params.id));
  return (
    <div>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <h2>{exp.title}</h2>
        <p><strong>셀러</strong>: {exp.seller?.nickname || exp.seller?.id}</p>
        <p style={{ lineHeight: 1.6 }}>{exp.description}</p>
        <ReserveButton experienceId={exp.id} />
      </div>

      <div>
        <h3>후기</h3>
        <ReviewForm experienceId={exp.id} />
        {exp.reviews.length === 0 ? (
          <p>아직 후기가 없습니다.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {exp.reviews.map((r: any) => (
              <li key={r.id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                <strong>{r.rating}점</strong>
                <p style={{ margin: '0.5rem 0 0' }}>{r.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 