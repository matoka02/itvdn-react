import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export function createMapWidget(containerDomNode: HTMLElement) {
  const map = L.map(containerDomNode);
  map.setView([62.835, 27.626], 6);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
}

export function addPopupToMapWidget(map: L.Map) {
  const popupDiv = document.createElement('div');
  L.popup().setLatLng([62.8351, 27.6256]).setContent(popupDiv).openOn(map);

  return popupDiv;
}
