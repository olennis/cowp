'use client';

import { addReview, getReviews } from '@/apis/review';
import Image from 'next/image';
import { FaAddressBook } from 'react-icons/fa';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import Rating from './components/Rating';
import Comment from './components/Comment';
import PointSlider from './components/PointSlider';

interface Review {
  id: number;
  created_at: string;
  name: string;
  rating: number;
  comment: string;
}

const Home = () => {
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [averagePoint, setAveragePoint] = useState(0);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

  const adjectives = useMemo(
    () => [
      '빠른',
      '느긋한',
      '용감한',
      '지혜로운',
      '행복한',
      '사랑스러운',
      '행운의',
      '평화로운',
      '시원한',
      '신비로운'
    ],
    []
  );

  const nouns = useMemo(
    () => [
      '호랑이',
      '토끼',
      '독수리',
      '고래',
      '사자',
      '코끼리',
      '기린',
      '팬더',
      '코알라',
      '오리'
    ],
    []
  );

  const changeInsert = () => {
    setIsReviewMode(true);
  };

  const handleTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) {
      return;
    }
    setComment(e.target.value);
  };

  const onGetReviews = async () => {
    try {
      setIsLoading(true);
      const fetchReviews = await getReviews();
      const total = fetchReviews?.length || 0;
      const sum = fetchReviews?.reduce((acc, cur) => acc + cur.rating, 0) || 0;
      const average = sum / total;

      fetchReviews && setReviews(fetchReviews);
      setAveragePoint(parseFloat(average.toFixed(2)));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomName = () => {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };

  const onAddReview = async () => {
    try {
      await addReview(rating, comment, generateRandomName());
      await onGetReviews();

      setIsReviewMode(false);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetReviews();
  }, []);

  return (
    <div className="w-full mx-auto max-w-[768px]">
      {/* 이미지 섹션 */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <Image
          src="/img_cover.jpeg"
          alt="cover image"
          fill
          className="object-cover" // 필요에 따라 object-fit 스타일 추가
        />
        <div className="flex items-center justify-between absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-black opacity-80 px-8">
          <div className="text-white">
            <span className="block">spacecloud</span>
            <strong>Donghun Kim</strong>
          </div>
          <FaAddressBook color="white" />
        </div>
      </div>
      {/* 평가 섹션 */}
      <div className="flex flex-col items-center p-[24px] gap-[12px]">
        <strong className="text-[48px]">{averagePoint}</strong>
        <Rating
          point={isReviewMode ? rating : averagePoint}
          isReviewMode={isReviewMode}
        />
        {isReviewMode && (
          <>
            <PointSlider onChange={(value) => setRating(value)} />
            <div className="relative">
              <textarea
                value={comment}
                placeholder="평가해 주신 점수보다 1점을 더 받으려면 어떤 것을 개선해야 할까요? (작성하지 않으셔도 좋아요!)"
                className="w-[360px]  h-[144px] text-[14px] text-[#9D9DAE] px-[12px] py-[8px] rounded-[8px] border border-[#E0E0E0] resize-none bg-[#fafafa]"
                onChange={handleTextArea}
              />
              <span className="absolute bottom-3 right-3 text-[8px] text-[#9D9DAE]">
                {comment.length}/100
              </span>
            </div>
          </>
        )}
      </div>
      {/* 코멘트 섹션 */}
      {!isReviewMode && (
        <div className="flex flex-col pb-[120px] gap-[20px] max-h-[440px] overflow-y-scroll px-[20px]">
          {reviews.map((review, idx) => (
            <Comment
              key={`${review.id}_${idx}`}
              name={review.name}
              review={review.comment}
            />
          ))}
        </div>
      )}
      {/* 제출버튼 */}
      <button
        onClick={isReviewMode ? onAddReview : changeInsert}
        className="w-[345px] h-[40px] bg-[#FF7B0A] text-white fixed bottom-[8px] left-1/2 -translate-x-1/2 hover:bg-[#E66A00] rounded-[8px]"
      >
        {isReviewMode ? '제출하기' : '평가하기'}
      </button>
    </div>
  );
};

export default Home;
