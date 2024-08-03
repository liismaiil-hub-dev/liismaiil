
l
export default function initMap(): void {
    
    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        
    });
}


declare global {
    interface Window {
        initMap: () => void;
    }
}

