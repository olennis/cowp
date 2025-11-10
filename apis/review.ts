'use client';

import { createSupabaseBrowserClient } from '@/lib/client/supabase';

export const getReviews = async () => {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from('review')
    .select('*')
    .order('created_at', { ascending: false });

  return data;
};

export const addReview = async (
  rating: number,
  comment: string,
  name: string
) => {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from('review')
    .insert({ rating, comment, name })
    .select('');

  return data;
};
