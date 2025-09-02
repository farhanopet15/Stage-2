export async function fetchWeather(city: string): Promise<{ city: string; temperature: number }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (city.toLowerCase() === 'error') {
                reject(new Error("Kota tidak ditemukan atau terjadi kesalahan server."));
            } else {
                resolve({
                    city,
                    temperature: Math.floor(Math.random() * 30) + 10,
                });
            }
        }, 1000);
    });
}