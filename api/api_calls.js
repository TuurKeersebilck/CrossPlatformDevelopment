const BASE_URL = "https://music-api-java-e4ee3f7354b0.herokuapp.com/api";
//const BASE_URL = "http://localhost:8080/api";

// GETTERS
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
};

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

export const getTracksFromAlbum = async (albumId) => {
	try {
		const response = await fetch(`${BASE_URL}/albums/${albumId}/tracks`, {
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
		console.error("Error fetching tracks from album:", error.message);
		throw error;
	}
};

export const fetchArtistSingles = async (artistId) => {
	try {
		const response = await fetch(`${BASE_URL}/artists/${artistId}/singles`);
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}
		const artistSingles = await response.json();
		return artistSingles;
	} catch (error) {
		console.error("Error fetching singles:", error);
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
				const tracksResponse = await fetch(
					`${BASE_URL}/albums/${album.id}/tracks`
				);
				if (!tracksResponse.ok) {
					throw new Error(
						`Network response was not ok: ${tracksResponse.statusText}`
					);
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

export const fetchTrackDetails = async (trackId) => {
	try {
		const response = await fetch(`${BASE_URL}/tracks/${trackId}`, {
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
		console.error("Error fetching track details:", error.message);
		throw error;
	}
};

export const getFavoriteArtists = async () => {
	try {
		const response = await fetch(`${BASE_URL}/artists/favorites`, {
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
		console.error("Error fetching favorite artists:", error.message);
		throw error;
	}
};

export const getFavoriteTracks = async () => {
	try {
		const response = await fetch(`${BASE_URL}/tracks/favorites`, {
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
		console.error("Error fetching favorite tracks:", error.message);
		throw error;
	}
};

export const getFavoriteAlbums = async () => {
	try {
		const response = await fetch(`${BASE_URL}/albums/favorites`, {
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
		console.error("Error fetching favorite albums:", error.message);
		throw error;
	}
};

export const getAlbums = async () => {
	try {
		const response = await fetch(`${BASE_URL}/albums`, {
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
		console.error("Error fetching albums:", error.message);
		throw error;
	}
};

// --------------------------------------------------------------------------------------------

// PATCHES
export const toggleArtistFavorite = async (artistId, isFavorited) => {
	try {
		const response = await fetch(`${BASE_URL}/artists/${artistId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ favorite: isFavorited }),
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

export const toggleAlbumFavorite = async (albumId, isFavorited) => {
	try {
		const response = await fetch(`${BASE_URL}/albums/${albumId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ favorite: isFavorited }),
		});
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}
		const data = await response.json();
		return { success: true, isFavorited: data.favorite };
	} catch (error) {
		console.error("Error toggling album favorite:", error.message);
		return { success: false, error: error.message };
	}
};

export const toggleTrackFavorite = async (trackId, isFavorited) => {
	try {
		const response = await fetch(`${BASE_URL}/tracks/${trackId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ favorite: isFavorited }),
		});
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}
		const data = await response.json();
		return { success: true, isFavorited: data.favorite };
	} catch (error) {
		console.error("Error toggling track favorite:", error.message);
		return { success: false, error: error.message };
	}
};
// --------------------------------------------------------------------------------------------

// POSTS
export const addArtist = async (artist) => {
	try {
		const response = await fetch(`${BASE_URL}/artists`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(artist),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return { success: false, error: errorData };
		}
		const data = response;
		return { success: true, data };
	} catch (error) {
		console.error("Error adding artist:", error.message);
		return { success: false, error: { message: error.message } };
	}
};

export const addAlbum = async (album) => {
	try {
		const response = await fetch(`${BASE_URL}/albums`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(album),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return { success: false, error: errorData };
		}
		const data = response;
		return { success: true, data };
	} catch (error) {
		console.error("Error adding album:", error.message);
		return { success: false, error: { message: error.message } };
	}
};

export const addTrack = async (track) => {
	try {
		const response = await fetch(`${BASE_URL}/tracks`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(track),
		});
		if (!response.ok) {
			const errorData = await response.json();
			return { success: false, error: errorData };
		}
		const data = response;
		return { success: true, data };
	} catch (error) {
		console.error("Error adding track", error.message);
		return { success: false, error: { message: error.message } };
	}
};
// --------------------------------------------------------------------------------------------
