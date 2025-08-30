'use client';
import { IMAGES } from '@/data/images';
import Image, { ImageProps } from 'next/image';
import { useState, useEffect } from 'react';

interface MyImageProps extends ImageProps {
  defaultSrc?: string;
  minWidth?: number;
  minHeight?: number;
}

export default function MyImage({
  src,
  alt,
  className,
  defaultSrc,
  minWidth,
  minHeight,
  ...props
}: MyImageProps) {
  const [imageSrc, setImageSrc] = useState(() => {
    if (src && src !== '') {
      return src;
    }
    if (defaultSrc && defaultSrc !== '') {
      return defaultSrc;
    }
    return IMAGES.DEFAULT_COURSE.src;
  });

  // Cập nhật imageSrc khi src prop thay đổi
  useEffect(() => {
    if (src && src !== '') {
      setImageSrc(src);
    } else if (defaultSrc && defaultSrc !== '') {
      setImageSrc(defaultSrc);
    } else {
      setImageSrc(IMAGES.DEFAULT_COURSE.src);
    }
  }, [src, defaultSrc]);

  const handleError = () => {
    setImageSrc(defaultSrc ?? IMAGES.DEFAULT_COURSE.src);
  };

  return (
    <Image
      src={imageSrc ?? IMAGES.DEFAULT_COURSE.src}
      alt={alt}
      className={`${className} min-w-[${minWidth}px] min-h-[${minHeight}px]`}
      onError={handleError}
      {...props}
    />
  );
}
