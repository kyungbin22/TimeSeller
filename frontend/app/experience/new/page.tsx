'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ExperienceNewPage() {
  const [form, setForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/experience`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/experience');
    } catch (err: any) {
      setError(err.response?.data?.error || '등록 실패');
    }
  };

  return (
    <>
      <h2>경험 등록</h2>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input name="title" required value={form.title} onChange={handleChange} />
        </label>
        <label>
          설명
          <textarea name="description" required value={form.description} onChange={handleChange} />
        </label>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <button type="submit">등록하기</button>
      </form>
    </>
  );
} 