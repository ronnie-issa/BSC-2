import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function OrderTracker() {
  const [orderNumber, setOrderNumber] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);
    setLoading(true);
    if (!user) {
      setError('You must be logged in.');
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('orders')
      .select('status')
      .eq('order_number', orderNumber)
      .eq('user_id', user.id)
      .single();
    if (error) setError(error.message);
    else setStatus(data?.status ?? 'Not found');
    setLoading(false);
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto p-6 rounded-xl bg-zinc-900 shadow-lg border border-zinc-800">
      <h2 className="text-2xl font-semibold mb-2 text-white text-center">Track Your Order</h2>
      <form onSubmit={handleTrack} className="space-y-4">
        <Label htmlFor="order-number" className="text-zinc-200">Order Number</Label>
        <Input
          id="order-number"
          type="text"
          placeholder="Order Number"
          value={orderNumber}
          onChange={e => setOrderNumber(e.target.value)}
          required
          className="bg-zinc-800 text-zinc-100 placeholder-zinc-500 border-zinc-700 focus:ring-2 focus:ring-primary"
        />
        <Button type="submit" className="w-full" variant="default" disabled={loading}>
          {loading ? 'Checking...' : 'Track Order'}
        </Button>
      </form>
      {status && <div className="text-green-400 text-sm mt-2 font-medium text-center">Status: {status}</div>}
      {error && <div className="text-red-400 text-sm mt-2 font-medium text-center">{error}</div>}
    </div>
  );
} 