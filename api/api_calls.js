const BASE_URL = "http://localhost:8080/api";

export const getArtists = async () => {
    try {
        const response = await fetch(`${BASE_URL}/artists`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching artist details:", error.message);
        throw error;
    }
};

export const fetchArtistAlbums = async (artistId) => {
    try {
        const response = await fetch(`${BASE_URL}/albums/artist/${artistId}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const artistAlbums = await response.json();
        return artistAlbums.map((album) => ({
            title: album.title,
            imgUrl: album.imgUrl,
            data: album.tracks,
        }));
    } catch (error) {
        console.error("Error fetching albums:", error);
        throw error;
    }
};