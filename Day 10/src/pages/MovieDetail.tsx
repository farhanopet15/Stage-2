import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface MovieDetail {
  title: string;
  year: number;
  poster: string;
  description: string;
}

export default function MovieDetail() {
  const { imdbid } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imdbid) return;
    fetch(`https://search.imdbot.workers.dev/?tt=${imdbid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.short) {
          setMovie({
            title: data.short.title,
            year: data.short.year,
            poster: data.short.image,
            description: data.short.description,
          });
        }
        setLoading(false);
      });
  }, [imdbid]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (!movie) return <div className="text-center text-xl">Movie not found.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md p-6">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-600 mb-4">Year: {movie.year}</p>
      <p>{movie.description}</p>
    </div>
  );
}
