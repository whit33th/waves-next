import Image from "next/image";
import { PlayCircle, Clock } from "lucide-react";

const PodcastCard = ({ title, author, duration, imageUrl, episode }: any) => (
  <div className="bg-card/40 hover:bg-card/60 group relative flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-all">
    <div className="relative h-16 w-16 shrink-0 rounded-lg">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-all group-hover:scale-105"
      />
    </div>
    <div className="flex-1 space-y-1">
      <h3 className="font-medium leading-tight">{title}</h3>
      <p className="text-muted-foreground text-sm">{author}</p>
      <div className="text-muted-foreground flex items-center gap-3 text-xs">
        <span>Episode {episode}</span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {duration}
        </span>
      </div>
    </div>
    <button className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
      <PlayCircle className="text-primary h-10 w-10" />
    </button>
  </div>
);

const FeaturedPodcast = ({
  title,
  description,
  imageUrl = "/img/albums/arcane.png",
  episodes,
}: any) => (
  <div className="from-primary/20 relative rounded-2xl bg-gradient-to-br to-background p-6">
    <div className="relative z-10 grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        <button className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-full border-2 border-neutral-50 px-6 py-3 font-medium">
          <PlayCircle size={20} /> Play Latest
        </button>
      </div>
      <div className="relative aspect-square w-full md:w-64">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  </div>
);

export default function PodcastPage() {
  return (
    <div className="space-y-8 p-6">
      <header className="pb-6">
        <h1 className="text-3xl font-bold">Podcasts</h1>
        <p className="text-muted-foreground">
          Your favorite episodes and shows
        </p>
      </header>

      <FeaturedPodcast
        title="Design Matters"
        description="Explore the creative world with leading designers and artists"
        imageUrl="/img/albums/arcane.png"
        episodes={124}
      />

      <section>
        <h2 className="mb-4 text-xl font-semibold">Continue Listening</h2>
        <div className="space-y-3">
          <PodcastCard
            title="The Future of AI in Creative Industries"
            author="Tech Talks Daily"
            duration="45 min"
            episode="234"
            imageUrl="/img/albums/arcane.png"
          />
          <PodcastCard
            title="Music Production Masterclass"
            author="Studio Sessions"
            duration="62 min"
            episode="45"
            imageUrl="/img/albums/arcane.png"
          />
          {/* Add more podcast episodes */}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Popular Shows</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Add popular shows grid here */}
        </div>
      </section>
    </div>
  );
}
