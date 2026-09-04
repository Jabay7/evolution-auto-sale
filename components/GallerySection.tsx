import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Editorial photo break. Swap the four files in /public/images/lifestyle/
 * to change the spread — the layout adapts to whatever is dropped in.
 */
const shots = [
  {
    src: "/images/lifestyle/lifestyle-01.webp",
    alt: "White Kia K4 sedan from the Evolution Auto Sale fleet",
    sizes: "(min-width: 768px) 58vw, 92vw",
  },
  {
    src: "/images/lifestyle/lifestyle-02.webp",
    alt: "Grey Kia Telluride SUV parked on a quiet residential street",
    sizes: "(min-width: 768px) 40vw, 92vw",
  },
  {
    src: "/images/lifestyle/lifestyle-03.webp",
    alt: "Silver Hyundai Kona compact SUV in a North County San Diego parking lot",
    sizes: "(min-width: 768px) 40vw, 92vw",
  },
];

export function GallerySection() {
  return (
    <section aria-label="Fleet photography" className="evo-section border-t border-line">
      <div className="evo-container">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7 md:row-span-2">
            <div className="relative aspect-[4/5] h-full overflow-hidden border border-line bg-card md:aspect-auto md:min-h-full">
              <Image
                src={shots[0].src}
                alt={shots[0].alt}
                fill
                loading="lazy"
                sizes={shots[0].sizes}
                className="object-cover"
              />
            </div>
          </Reveal>

          {shots.slice(1).map((shot) => (
            <Reveal key={shot.src} className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-card">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  loading="lazy"
                  sizes={shot.sizes}
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="relative mt-4 aspect-[21/9] overflow-hidden border border-line bg-card">
            <Image
              src="/images/lifestyle/lifestyle-04.webp"
              alt="Chevrolet Equinox SUV from the Evolution Auto Sale rental fleet"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
