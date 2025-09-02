import { useEffect, useState } from "react";
import { fetchWeather } from "../api/weather";

function useDebounce<T>(value: T, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounceValue;
}

export function WeatherApp() {
    const [cityInput, setCityInput] = useState("");
    const [weatherData, setWeatherData] = useState<{ city: string; temperature: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const debounceCity = useDebounce(cityInput, 1000);

    useEffect(() => {
        if (!debounceCity) {
            setWeatherData(null);
            setError(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        setWeatherData(null);

        fetchWeather(debounceCity)
            .then((data) => {
                setWeatherData(data);
            })
            .catch((_err) => {
                setError(`Gagal mengambil data cuaca untuk "${debounceCity}". Mohon periksa kembali nama kota.`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [debounceCity]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCityInput(e.target.value);
    };

    return (
        <>
            <h1>Cuaca Hari Ini 🌦️</h1>
            <input
                type="text"
                placeholder="Masukkan nama kota"
                value={cityInput}
                onChange={handleOnChange}
            />

            {loading && <p>Memuat data...</p>}

            {error && !loading && <p style={{ color: 'red' }}>{error}</p>}

            {weatherData && !loading && (
                <>
                    <h2>{weatherData.city}</h2>
                    <h2>{weatherData.temperature}°C</h2>
                </>
            )}

            {!loading && !error && !weatherData && cityInput === "" && (
                <p>Silakan masukkan nama kota untuk memulai pencarian.</p>
            )}
        </>
    );
}