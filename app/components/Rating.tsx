import StarSVG from '../../public/Star.svg';
import HalfStarSVG from '../../public/Half-Star.svg';
import EmptyStarSVG from '../../public/Empty-Star.svg';
import Image from 'next/image';

interface RatingProps {
  point: number; // 0 to 10
  isReviewMode?: boolean;
}

const Rating: React.FC<RatingProps> = ({ point }) => {
  const totalStars = 5;
  const filledStars = Math.floor(point / 2);
  const halfStar = point % 2 >= 1 ? 1 : 0;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        if (index < filledStars) {
          return <FullStar key={index} />;
        } else if (index === filledStars && halfStar) {
          return <HalfStar key={index} />;
        } else {
          return <EmptyStar key={index} />;
        }
      })}
    </div>
  );
};

const FullStar = () => <Image src={StarSVG} alt="full star" />; // 채워진 별
const HalfStar = () => <Image src={HalfStarSVG} alt="half star" />; // 반 채워진 별
const EmptyStar = () => <Image src={EmptyStarSVG} alt="empty star" />; // 빈 별

export default Rating;
