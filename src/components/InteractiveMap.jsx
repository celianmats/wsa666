import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix pour les icônes Leaflet avec Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Coordonnées du quartier de l'Ariane à Nice
const ARIANE_CENTER = [43.7, 7.256]

// Points d'intérêt du quartier de l'Ariane
const pointsInteret = [
  {
    id: 1,
    nom: "Centre commercial Jean Médecin",
    position: [43.7034, 7.2659], // Centre-ville
    type: "commerce",
    description: "Centre commercial majeur dans le cœur de Nice"
  },
  {
    id: 2,
    nom: "École primaire des Baumettes",
    position: [43.6906, 7.2417], // Quartier Les Baumettes
    type: "education",
    description: "École primaire du quartier des Baumettes"
  },
  {
    id: 3,
    nom: "Parc Chambrun",
    position: [43.7217, 7.2653], // Nord-Est de Nice
    type: "espaces_verts",
    description: "Parc avec temple de l'amour, calme et verdoyant"
  },
  {
    id: 4,
    nom: "Mairie annexe de Fabron",
    position: [43.6885, 7.2261], // Quartier Fabron
    type: "administration",
    description: "Services municipaux dans l'ouest de Nice"
  },
  {
    id: 5,
    nom: "Centre de santé Saint-Roch",
    position: [43.7133, 7.2847], // Quartier Saint-Roch
    type: "sante",
    description: "Centre médical desservant l'est de Nice"
  }
]

// Projets de rénovation urbaine
const projetsRenovation = [
  {
    id: 1,
    nom: "Rénovation Place Garibaldi",
    position: [43.7012, 7.2761], // Quartier Garibaldi
    statut: "en_cours",
    description: "Réaménagement de la place historique avec plus d’espaces verts"
  },
  {
    id: 2,
    nom: "Nouveau complexe sportif Pasteur",
    position: [43.7250, 7.2900], // Quartier Pasteur
    statut: "planifie",
    description: "Construction d'un complexe sportif moderne et accessible"
  },
  {
    id: 3,
    nom: "Résidence éco-responsable Cimiez",
    position: [43.7201, 7.2629], // Quartier Cimiez
    statut: "en_cours",
    description: "Logements durables dans un quartier résidentiel"
  }
]


// Icônes personnalisées pour différents types de points
const createCustomIcon = (color, symbol) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        font-weight: bold;
      ">${symbol}</div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}
// Icônes personnalisées pour différents types de points
const createCustomSVG = (color, logoUrl) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: white;
        font-weight: bold;
      "><img src="${logoUrl}" alt="icon" style="width: 100%; height: 100%;" /></div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  })
}

const typeIcons = {
  commerce: createCustomIcon('#3B82F6', '🛒'),
  education: createCustomIcon('#3B82F6', '🎓'),
  espaces_verts: createCustomIcon('#3B82F6', '🌳'),
  administration: createCustomIcon('#3B82F6', '🏛️'),
  sante: createCustomIcon('#3B82F6', '🏥'),
  projet_en_cours: createCustomIcon('#3B82F6', '🚧'),
  projet_planifie: createCustomIcon('#3B82F6', '📋')
}

function MapUpdater({ center, zoom }) {
  const map = useMap()
  
  useEffect(() => {
    map.setView(center, zoom)
  }, [map, center, zoom])
  
  return null
}

export default function InteractiveMap({ 
  signalements = [], 
  showSignalements = true,
  onSignalementClick = null,
  height = "400px" 
}) {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg" style={{ height }}>
      <MapContainer
        center={ARIANE_CENTER}
        zoom={15}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Points d'intérêt */}
        {pointsInteret.map((point) => (
          <Marker
            key={`poi-${point.id}`}
            position={point.position}
            icon={typeIcons[point.type]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{point.nom}</h3>
                <p className="text-xs text-gray-600 mt-1">{point.description}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {point.type.replace('_', ' ')}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Projets de rénovation */}
        {projetsRenovation.map((projet) => (
          <Marker
            key={`projet-${projet.id}`}
            position={projet.position}
            icon={typeIcons[`projet_${projet.statut}`]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{projet.nom}</h3>
                <p className="text-xs text-gray-600 mt-1">{projet.description}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                  projet.statut === 'en_cours' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {projet.statut === 'en_cours' ? 'En cours' : 'Planifié'}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
        
        {/* Signalements citoyens */}
        {showSignalements && signalements.map((signalement) => (
          <Marker
            key={`signalement-${signalement.id}`}
            position={[signalement.latitude, signalement.longitude]}
            icon={createCustomSVG(
              signalement.status === 'resolu' ? '#22C55E' : 
              signalement.status === 'en_cours' ? '#F59E0B' : '#4038da',
                '/logo.svg'
            )}
            eventHandlers={{
              click: () => onSignalementClick && onSignalementClick(signalement)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{signalement.category}</h3>
                <p className="text-xs text-gray-600 mt-1">{signalement.description}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                  signalement.status === 'resolu' ? 'bg-green-100 text-green-800' :
                  signalement.status === 'en_cours' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {signalement.status === 'resolu' ? 'Résolu' :
                   signalement.status === 'en_cours' ? 'En cours' : 'Ouvert'}
                </span>
                {signalement.imageUrl && (
                  <img 
                    src={signalement.imageUrl} 
                    alt="Signalement" 
                    className="w-full h-20 object-cover rounded mt-2"
                  />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

