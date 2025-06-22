'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ReviewForm({ experienceId }: { experienceId: number }) {
  const [form, setForm] = useState({ rating: 5, comment: '' });
  const [msg, setMsg] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/review`,
        { experienceId, ...form, rating: Number(form.rating) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg('후기가 등록되었습니다!');
      // TODO: 후기 목록 새로고침
    } catch (err: any) {
      setMsg(err.response?.data?.error || '후기 등록 실패');
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ background: '#f9f9f9' }}>
      <h4>후기 작성</h4>
      <label>
        평점
        <select name="rating" value={form.rating} onChange={handleChange}>
          <option value={5}>5점 (최고)</option>
          <option value={4}>4점 (좋음)</option>
          <option value={3}>3점 (보통)</option>
          <option value={2}>2점 (별로)</option>
          <option value={1}>1점 (나쁨)</option>
        </select>
      </label>
      <label>
        내용
        <textarea name="comment" required value={form.comment} onChange={handleChange} placeholder="경험에 대한 솔직한 후기를 남겨주세요." />
      </label>
      <button type="submit">후기 등록</button>
      {msg && <div style={{ marginTop: '1rem', color: 'var(--primary-color)' }}>{msg}</div>}
    </form>
  );
} 