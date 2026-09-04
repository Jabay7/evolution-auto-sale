import Image from "next/image";

type BrandMarkProps = {
  /**
   * Rendered edge length in CSS pixels. The source is 150px square, so 50 is
   * the ceiling before a 3x screen starts upscaling it.
   */
  size?: number;
  className?: string;
};

/**
 * Circular brand mark. The source photograph is square, so the circle is a
 * plain border-radius crop rather than a cover fit — nothing is lost.
 * The hairline ring keeps the light body of the car off the dark header.
 */
export function BrandMark({ size = 48, className = "" }: BrandMarkProps) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-full ring-1 ring-line-strong ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/brand/mark.webp"
        alt=""
        aria-hidden="true"
        width={150}
        height={150}
        priority
        className="size-full object-cover"
      />
    </span>
  );
}
