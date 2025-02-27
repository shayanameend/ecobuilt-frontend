import { cn } from "~/lib/utils";

export default function HomePage() {
  return (
    <main>
      <section
        className={cn(
          "min-h-[calc(100svh_-_7rem)] flex items-center justify-center",
        )}
      >
        <h2>Home Page</h2>
      </section>
    </main>
  );
}
