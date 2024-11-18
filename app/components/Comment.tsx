'use client';

import Image from 'next/image';
import Rating from './Rating';
import { FaUserCircle } from 'react-icons/fa';

interface CommentProps {
  review: string;
  name: string;
}

const Comment = ({ review, name }: CommentProps) => {
  const getRandomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="flex gap-[16px] items-center">
      <FaUserCircle size={'56px'} fill={'orange'} />
      <div className="max-h-[56px] leading-[1.3] w-full">
        <strong className="flex items-center w-full">{name}</strong>
        <p className="line-clamp-2 text-[14px] text-[#747483]">{review}</p>
      </div>
    </div>
  );
};

export default Comment;
