import { cn } from "@/lib/utils";

type CourseVisualProps = {
  src: string;
  alt: string;
  caption: string;
  variant?: "default" | "wide";
};

export function CourseVisual({ src, alt, caption, variant = "default" }: CourseVisualProps) {
  return (
    <figure
      className={cn(
        "bg-muted my-8 overflow-hidden rounded-xl border p-3",
        variant === "wide" && "md:-mx-4",
      )}
    >
      <img
        src={src}
        alt={alt}
        className="bg-card aspect-[16/9] w-full rounded-lg object-cover"
        loading="lazy"
      />
      <figcaption className="text-muted-foreground px-2 pt-3 pb-1 text-sm leading-6">
        {caption}
      </figcaption>
    </figure>
  );
}
