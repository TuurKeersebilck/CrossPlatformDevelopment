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
        console.error("Error fetching artists", error.message);
        throw error;
    }
};

export const fetchArtistDetails = async (artistId) => {
    try {
        const response = await fetch(`${BASE_URL}/artists/${artistId}`, {
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
}

export const getTracks = async () => {
    try {
        const response = await fetch(`${BASE_URL}/tracks`, {
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
        console.error("Error fetching tracks:", error.message);
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

        const albumsWithTracks = await Promise.all(
            artistAlbums.map(async (album) => {
                const tracksResponse = await fetch(`${BASE_URL}/albums/${album.id}/tracks`);
                if (!tracksResponse.ok) {
                    throw new Error(`Network response was not ok: ${tracksResponse.statusText}`);
                }
                const tracks = await tracksResponse.json();
                return {
                    ...album,
                    tracks,
                };
            })
        );

        return albumsWithTracks.map((album) => ({
            id: album.id,
            title: album.title,
            imgUrl: album.imgUrl,
            artistId: album.artistId,
            releaseDate: album.releaseDate,
            tracks: album.tracks,
            favorite: album.favorite,
        }));
    } catch (error) {
        console.error("Error fetching albums:", error);
        throw error;
    }
};

export const toggleArtistFavorite = async (artistId) => {
    try {
        const response = await fetch(`${BASE_URL}/artists/${artistId}/toggle-favorite`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return { success: true, isFavorited: data.favorite };
    } catch (error) {
        console.error("Error toggling artist favorite:", error.message);
        return { success: false, error: error.message };
    }
};

export const toggleAlbumFavorite = async (albumId) => {
    try {
        const response = await fetch(`${BASE_URL}/albums/${albumId}/toggle-favorite`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error toggling album favorite:", error.message);
        throw error;
    }
}

export const toggleTrackFavorite = async (trackId) => {
    try {
        const response = await fetch(`${BASE_URL}/tracks/${trackId}/toggle-favorite`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error toggling artist favorite:", error.message);
        throw error;
    }
}
