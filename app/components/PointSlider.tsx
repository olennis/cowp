'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { useState, useRef, useEffect } from 'react';

const PointSlider = ({
  onChange
}: { onChange?: (value: number) => void } = {}) => {
  const [value, setValue] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);

      setValue((prevValue) => {
        const newValue = Math.min(Math.max(prevValue - delta, 0), 9);

        onChange?.(newValue);

        return newValue;
      });
    };

    const slider = sliderRef.current;

    if (slider) {
      slider.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (slider) {
        slider.removeEventListener('wheel', handleWheel);
      }
    };
  }, [onChange]);

  const handleSliderChange = (newValue: number[]) => {
    setValue(newValue[0]);
    onChange?.(newValue[0]);
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-3 bg-white rounded-xl"
      ref={sliderRef}
    >
      <SliderPrimitive.Root
        min={0}
        max={9}
        step={1}
        value={[value]}
        onValueChange={handleSliderChange}
        className="relative flex items-center select-none touch-none w-full h-5"
        aria-label="0부터 9 사이의 숫자 선택"
      >
        <SliderPrimitive.Track className="bg-gray-200 relative grow rounded-full h-2">
          <SliderPrimitive.Range className="absolute bg-[#FF7B0A] rounded-full h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block relative w-7 h-7 bg-white rounded-full border-2 border-[#FF7B0A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF7B0A] focus:ring-offset-2 transition-transform hover:scale-110">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-[#FF7B0A]">
            {value}
          </span>
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
};

export default PointSlider;
