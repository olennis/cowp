'use client';

import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface CommentProps {
  review: string;
  name: string;
  date: string;
}

const Comment = ({ review, name, date }: CommentProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRandomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  const formatDate = (date: string): string => {
    const convertDate = new Date(date);
    const year = convertDate.getFullYear();
    const month = String(convertDate.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  };

  // 리뷰가 긴지 확인 (2줄 초과 여부)
  const isLongReview = review.length > 50; // 글자 수로 판단

  return (
    <div className="flex gap-[16px] items-start">
      <FaUserCircle size={'56px'} fill={'orange'} />
      <div className="leading-[1.3] w-full">
        <strong className="flex items-end justify-between w-full mb-[4px]">
          <span>{name}</span>
          <small className="text-[10px] text-[#999]">{formatDate(date)}</small>
        </strong>
        <p
          className={`text-[14px] text-[#747483] ${
            isExpanded ? '' : 'line-clamp-2'
          }`}
        >
          {review}
        </p>
        {isLongReview && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[10px] text-[#999] hover:text-[#666] mt-[4px] block text-right w-full"
          >
            {isExpanded ? '접기' : '더보기'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Comment;
