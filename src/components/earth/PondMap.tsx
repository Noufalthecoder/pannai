import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import { useApp } from '../../store/AppContext';
import type { Pond, PondStatus } from '../../types';
import { DemoBadge, StatusBadge } from '../ui/Badge';
import { Layers, Eye } from 'lucide-react';

const getPondColor = (status: PondStatus): string => {
  switch (status) {
    case 'TOO DILUTE':
      return '#8FBFB4';
    case 'APPROACHING':
      return '#3E8B7A';
    case 'CANDIDATE':
      return '#D9A441';
    case 'FIELD CHECK':
      return '#DE6A45';
    case 'SUITABLE':
      return '#3E8B7A';
    case 'HARVEST WINDOW':
      return '#C42A6B';
    default:
      return '#69615B';
  }
};

// Component to handle auto-zooming map to selected pond
const MapController: React.FC<{ selectedPond: Pond | null }> = ({ selectedPond }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPond) {
      map.flyTo([selectedPond.lat, selectedPond.lng], 15, {
        duration: 1.2,
      });
    }
  }, [selectedPond, map]);

  return null;
};

export const PondMap: React.FC = () => {
  const { ponds, selectedPond, setSelectedPondId } = useApp();

  const center: [number, number] = [8.9124, 78.1685]; // Center of Tharuvaikulam / Thoothukudi Salt Pans

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] rounded-2xl overflow-hidden border border-[#E6DFD5] shadow-xs">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & Sentinel-2 L2A'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedPond={selectedPond} />

        {ponds.map((pond) => {
          const isSelected = selectedPond?.id === pond.id;
          const color = getPondColor(pond.status);

          const positions = pond.polygon.map((pt) => [pt.lat, pt.lng] as [number, number]);

          return (
            <Polygon
              key={pond.id}
              positions={positions}
              pathOptions={{
                color: isSelected ? '#C42A6B' : color,
                fillColor: color,
                fillOpacity: isSelected ? 0.75 : 0.45,
                weight: isSelected ? 3 : 1.5,
                dashArray: pond.status === 'FIELD CHECK' ? '4, 4' : undefined,
              }}
              eventHandlers={{
                click: () => setSelectedPondId(pond.id),
              }}
            >
              <Popup>
                <div className="p-2 space-y-2 min-w-[200px]">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-[#14100E]">{pond.id}</span>
                    <StatusBadge status={pond.status} />
                  </div>

                  <p className="text-xs text-[#69615B]">{pond.name}</p>

                  <div className="grid grid-cols-2 gap-1 text-[11px] pt-1 border-t border-[#E6DFD5]">
                    <div>
                      <span className="text-[#69615B]">Salinity:</span>{' '}
                      <span className="font-semibold">{pond.salinityPpt} ppt</span>
                    </div>
                    <div>
                      <span className="text-[#69615B]">Area:</span>{' '}
                      <span className="font-semibold">{pond.areaAcres} acres</span>
                    </div>
                    <div>
                      <span className="text-[#69615B]">Model Conf:</span>{' '}
                      <span className="font-semibold">{pond.modelConfidencePercent}% DEMO</span>
                    </div>
                    <div>
                      <span className="text-[#69615B]">Village:</span>{' '}
                      <span className="font-semibold">{pond.village}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPondId(pond.id)}
                    className="w-full mt-2 bg-[#14100E] hover:bg-[#C42A6B] text-white text-xs font-semibold py-1.5 rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Pond Details</span>
                  </button>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-[#FFFCF7]/95 backdrop-blur-sm border border-[#E6DFD5] p-3 rounded-xl shadow-md space-y-2 text-xs">
        <div className="flex items-center justify-between font-heading font-bold text-[#14100E] border-b border-[#E6DFD5] pb-1.5">
          <div className="flex items-center space-x-1.5">
            <Layers className="w-4 h-4 text-[#3E8B7A]" />
            <span>POND INTELLIGENCE STATUS</span>
          </div>
          <DemoBadge />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-[#8FBFB4]" />
            <span>TOO DILUTE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-[#3E8B7A]" />
            <span>APPROACHING</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-[#D9A441]" />
            <span>CANDIDATE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-[#DE6A45]" />
            <span>FIELD CHECK</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-[#3E8B7A]" />
            <span>SUITABLE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-sm bg-[#C42A6B]" />
            <span className="font-bold text-[#C42A6B]">HARVEST WINDOW</span>
          </div>
        </div>

        <div className="pt-1 border-t border-[#E6DFD5] text-[10px] text-[#69615B] flex items-center justify-between">
          <span>Satellite-assisted · Field-validated</span>
          <span>Sentinel-2 L2A · Thoothukudi</span>
        </div>
      </div>
    </div>
  );
};
