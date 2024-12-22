## **Bronvermelding**

### **React Native**
- [KeyboardAvoidingView Documentation](https://reactnative.dev/docs/keyboardavoidingview)  
  Gebruikt voor het implementeren van `KeyboardAvoidingView` in bv `SearchScreen`. Ook deze documentatie gebruikt voor andere implementaties, als `Modal` in `components -> modalpicker`.

### **Internationalization (i18n)**
- [i18next Overview](https://www.i18next.com/overview/getting-started)  
- [i18next Browser Language Detector](https://github.com/i18next/i18next-browser-languagedetector)  
  Documentatie voor de vertaling

### **React Native Lists**
- [How to Handle Diversified Types in Lists](https://sanjanahumanintech.medium.com/how-to-handle-diversified-types-in-list-reactnative-c30d2c976967)  
  Gebruikt voor `renderItem` functie in `SearchScreen`.

### **Icons**
- [Ionicons Documentation](https://ionic.io/ionicons)  


## **Queries**

### **Debugging**  
- Tenzij de error duidelijk was heb ik chatGPT gebruikt voor te debuggen.  

### **Key Questions and Implementations**

1. **Weergeven van meer gedetailleerde error message ipv Network Error"**  
   ```javascript
   if (!result.success) {
       const errorMessages = Object.entries(result.error)
           .map(([key, value]) => `${key}: ${value}`)
           .join("\n");
       setErrorMessage(errorMessages);
       return;
   }
   ```

2. **Ervoor zorgen dat duration in `xx:xx` formaat word ingegeven**  
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

3. **Een react hook voor urls te valideren**  
   ```javascript
   import { useCallback } from "react";

   const useValidUrl = () => {
       const isValidUrl = useCallback((url) => {
           const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
           return regex.test(url);
       }, []);

       return isValidUrl;
   };

   export default useValidUrl;
   ```

4. **Vertaling `en.json` naar `nl.json`**  

5. **Toevoegen van 3de thema: Grandma Mode**  
