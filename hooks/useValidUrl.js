import { useCallback } from "react";

const useValidUrl = () => {
	const isValidUrl = useCallback((url) => {
		const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
		return regex.test(url);
	}, []);

	return isValidUrl;
};

export default useValidUrl;
