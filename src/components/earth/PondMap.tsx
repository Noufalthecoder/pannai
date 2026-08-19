import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, useMap } from 'react-leaflet';
import { useApp } from '../../store/AppContext';
import type { Pond, PondStatus } from '../../types';
import { SourceBadge } from '../ui/SourceBadge';
import { Eye, Layers } from 'lucide-react';

const getStatusColor = (status: PondStatus): string => {
  switch (status) {
    case 'SUITABLE':
      return '#059669'; // Muted Green
    case 'CANDIDATE':
      return '#D97706'; // Muted Amber
    case 'FIELD CHECK':
      return '#E11D48'; // Muted Coral
    case 'HARVEST WINDOW':
      return '#D946EF'; // PANNAI Magenta Accent
    case 'APPROACHING':
      return '#2563EB'; // Blue
    case 'TOO DILUTE':
    default:
      return '#6B7280'; // Neutral Grey
  }
};

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

interface PondMapProps {
  filterMode: 'MY_PONDS' | 'ALL_PONDS';
  onFilterChange: (mode: 'MY_PONDS' | 'ALL_PONDS') => void;
}

export const PondMap: React.FC<PondMapProps> = ({ filterMode, onFilterChange }) => {
  const { ponds, selectedPond, setSelectedPondId } = useApp();

  const center: [number, number] = [8.9124, 78.1685];

  return (
    <div className="relative w-full h-[600px] lg:h-[calc(100vh-10rem)] rounded-2xl overflow-hidden border border-stone-300 shadow-md">
      {/* Top Segmented Filter Overlay (Section 2 & 3 Requirement) */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md border border-stone-300 p-1.5 rounded-xl shadow-lg flex items-center gap-1 text-xs font-mono select-none">
        <button
          onClick={() => onFilterChange('MY_PONDS')}
          className={`px-3.5 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${
            filterMode === 'MY_PONDS'
              ? 'bg-[#11100F] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          MY PONDS
        </button>

        <button
          onClick={() => onFilterChange('ALL_PONDS')}
          className={`px-3.5 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${
            filterMode === 'ALL_PONDS'
              ? 'bg-[#11100F] text-white shadow-xs'
              : 'text-stone-600 hover:bg-stone-100'
          }`}
        >
          ALL PONDS
        </button>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors & Sentinel-2 L2A GIS'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedPond={selectedPond} />

        {ponds.map((pond) => {
          const isSelected = selectedPond?.id === pond.id;
          const isMyPond = pond.isMyPond ?? (pond.id === 'TTK-042' || pond.id === 'TTK-001' || pond.id === 'TTK-007' || pond.id === 'TTK-015' || pond.id === 'TTK-023');
          const color = getStatusColor(pond.status);

          const positions = pond.polygon.map((pt) => [pt.lat, pt.lng] as [number, number]);

          // Visual Hierarchy Styling (Section 3 & 10 Requirement)
          let opacity = 0.5;
          let strokeColor = color;
          let weight = 1.5;

          if (filterMode === 'MY_PONDS') {
            if (isMyPond) {
              opacity = isSelected ? 0.85 : 0.65;
              strokeColor = '#D946EF'; // Strong PANNAI magenta brand outline
              weight = isSelected ? 4 : 2.5;
            } else {
              opacity = 0.15; // Muted fill for other ponds
              strokeColor = '#9CA3AF';
              weight = 1;
            }
          } else {
            opacity = isSelected ? 0.85 : 0.5;
            strokeColor = isSelected ? '#D946EF' : color;
            weight = isSelected ? 3.5 : 1.5;
          }

          return (
            <Polygon
              key={pond.id}
              positions={positions}
              pathOptions={{
                color: strokeColor,
                fillColor: color,
                fillOpacity: opacity,
                weight: weight,
              }}
              eventHandlers={{
                click: () => setSelectedPondId(pond.id),
              }}
            >
              {/* Permanent tooltip label for MY PONDS */}
              {isMyPond && (
                <Tooltip permanent direction="center" className="my-pond-label">
                  <span className="font-mono text-[10px] font-extrabold bg-[#11100F] text-white px-1.5 py-0.5 rounded shadow-sm">
                    MY POND ✓ {pond.id}
                  </span>
                </Tooltip>
              )}

              <Popup>
                <div className="p-2 space-y-2 min-w-[200px] text-[#11100F]">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-sm text-[#11100F]">
                      {isMyPond ? 'MY POND ✓ ' : ''}{pond.id}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-pink-100 text-pink-800 rounded">
                      {pond.status}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-mono">{pond.name}</p>

                  <div className="grid grid-cols-2 gap-1 text-[11px] font-mono pt-1 border-t border-stone-200">
                    <div>
                      <span className="text-stone-500">Salinity:</span>{' '}
                      <span className="font-extrabold">{pond.salinityPpt} ppt</span>
                    </div>
                    <div>
                      <span className="text-stone-500">Area:</span>{' '}
                      <span className="font-extrabold">{pond.areaAcres} acres</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPondId(pond.id)}
                    className="w-full mt-2 bg-[#11100F] hover:bg-pink-600 text-white text-xs font-mono font-bold py-1.5 rounded-lg transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-pink-400" />
                    <span>INSPECT POND INTELLIGENCE</span>
                  </button>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay (Section 10 & 11 Requirement) */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md border border-stone-300 p-3.5 rounded-2xl shadow-lg space-y-2 text-xs font-mono select-none max-w-sm">
        <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
          <div className="flex items-center space-x-1.5 font-bold text-[#11100F]">
            <Layers className="w-4 h-4 text-pink-600" />
            <span>MAP COLOR SYSTEM</span>
          </div>
          <SourceBadge source="FIELD" />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs border-2 border-pink-500 bg-pink-100" />
            <span className="font-extrabold text-pink-900">MY POND ✓</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#059669]" />
            <span>SUITABLE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#D97706]" />
            <span>CANDIDATE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#E11D48]" />
            <span>FIELD CHECK</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#D946EF]" />
            <span className="font-extrabold text-pink-600">HARVEST WINDOW</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#6B7280]" />
            <span>NOT SUITABLE</span>
          </div>
        </div>

        {/* Multi-Sensor Intelligence Legend (Section 11 Requirement) */}
        <div className="pt-2 border-t border-stone-200 text-[10px] text-stone-600 space-y-0.5">
          <p className="font-bold text-[#11100F]">SATELLITE INTELLIGENCE</p>
          <p className="text-[9px] leading-tight text-stone-500">
            Used to understand boundaries, spatial conditions & temporal changes over time.
          </p>
          <p className="text-[9px] font-bold text-pink-700 pt-0.5">
            SATELLITE + SMART PAN DEVICE + WEATHER + HISTORY → PANNAI INTELLIGENCE
          </p>
        </div>
      </div>
    </div>
  );
};
