## Queries

Bijna al het debuggen met ChatGPT

Hoe kan ik mijn errors displayen ipv altijd een network error te tonen ->

```javascript
if (!result.success) {
	const errorMessages = Object.entries(result.error)
		.map(([key, value]) => `${key}: ${value}`)
		.join("\n");
	setErrorMessage(errorMessages);
	return;
}
```

Hoe kan ik zorgen dat ze duration alleen in xx:xx formaat kunnen ingeven ->

```javascript
const handleDurationChange = (text) => {
	const cleaned = text.replace(/[^0-9]/g, "");

	let formatted = cleaned;
	if (cleaned.length >= 2) {
		formatted = `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
	}

	setDuration(formatted);
};
```

Kan je mij een hook schrijven die controleert of iets een geldige URL is ->

```javascript
import { useCallback } from "react";

const useValidUrl = () => {
	const isValidUrl = useCallback((url) => {
		const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]\*$/i;
		return regex.test(url);
	}, []);

	return isValidUrl;
};

export default useValidUrl;
```
