import Image from "next/image";

export default function AnimatedBackground() {
  const bg = "";
  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      <Image
        src={"/img/albums/arcane.png"}
        alt="background"
        fill
        className="animate-wave scale-150 object-cover blur-3xl"
        priority
      />
    </div>
  );
}
