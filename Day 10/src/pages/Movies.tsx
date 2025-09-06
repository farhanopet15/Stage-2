import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

interface Movie {
  imdbid: string;
  title: string;
  poster: string;
  year: number;
}

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://search.imdbot.workers.dev/?q=marvel")
      .then((res) => res.json())
      .then((data) => {
        if (data.description) {
          const mappedMovies = data.description.map((m: any) => ({
            imdbid: m["#IMDB_ID"],
            title: m["#TITLE"],
            poster: m["#IMG_POSTER"],
            year: m["#YEAR"],
          }));
          setMovies(mappedMovies);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-medium">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Our Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.imdbid}
            className="border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="h-72 w-full overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h2 className="text-lg font-semibold line-clamp-2">{movie.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{movie.year}</p>
              <div className="mt-auto pt-4">
                <Button asChild className="w-full">
                  <Link to={`/movies/${movie.imdbid}`}>View Details</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
