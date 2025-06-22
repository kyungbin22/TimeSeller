'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ReserveButton({ experienceId }: { experienceId: number }) {
  const [msg, setMsg] = useState('');
  const handleReserve = async () => {
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('로그인이 필요합니다.');
        return;
      }
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/reservation`,
        { experienceId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg('예약이 완료되었습니다!');
    } catch (err: any) {
      setMsg(err.response?.data?.error || '예약 실패');
    }
  };
  return (
    <div style={{ marginTop: '1.5rem' }}>
      <button onClick={handleReserve}>예약하기</button>
      {msg && <div style={{ marginTop: '1rem', color: 'var(--primary-color)' }}>{msg}</div>}
    </div>
  );
} 