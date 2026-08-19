import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Tooltip, useMap } from 'react-leaflet';
import { useApp } from '../../store/AppContext';
import type { Pond, PondStatus } from '../../types';
import { SIMILARITY_GROUPS } from '../../data/demoData';
import { SourceBadge } from '../ui/SourceBadge';
import { Eye, Layers, AlertTriangle } from 'lucide-react';

const getStatusColor = (status: PondStatus): string => {
  switch (status) {
    case 'SUITABLE':
      return '#059669'; // Soft Green
    case 'CANDIDATE':
      return '#D97706'; // Muted Amber
    case 'FIELD CHECK':
      return '#E11D48'; // Muted Coral / Red
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
  activeGroupNumber?: number | null;
  onFilterChange: (mode: 'MY_PONDS' | 'ALL_PONDS') => void;
  onSelectGroup: (groupNum: number) => void;
}

export const PondMap: React.FC<PondMapProps> = ({
  filterMode,
  activeGroupNumber = 1,
  onFilterChange,
  onSelectGroup,
}) => {
  const { ponds, selectedPond, setSelectedPondId } = useApp();

  const center: [number, number] = [8.9080, 78.1610];

  return (
    <div className="relative w-full h-[600px] lg:h-[calc(100vh-10rem)] rounded-3xl overflow-hidden border-2 border-stone-300 shadow-md select-none font-mono">
      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-md border-2 border-stone-300 p-1.5 rounded-2xl shadow-lg flex flex-wrap items-center gap-2 text-xs select-none">
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => onFilterChange('MY_PONDS')}
            className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${
              filterMode === 'MY_PONDS'
                ? 'bg-[#11100F] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            MY PONDS
          </button>

          <button
            onClick={() => onFilterChange('ALL_PONDS')}
            className={`px-3 py-1.5 rounded-lg font-extrabold transition-all cursor-pointer ${
              filterMode === 'ALL_PONDS'
                ? 'bg-[#11100F] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-200'
            }`}
          >
            ALL 50 PONDS
          </button>
        </div>

        {/* Group Selector Pill Overlay */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-xs sm:max-w-none scrollbar-none py-0.5">
          {SIMILARITY_GROUPS.map((g) => {
            const isGroupActive = activeGroupNumber === g.groupNumber;
            return (
              <button
                key={g.id}
                onClick={() => onSelectGroup(g.groupNumber)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition-all cursor-pointer shrink-0 ${
                  isGroupActive
                    ? 'bg-pink-600 text-white shadow-sm border border-pink-700'
                    : 'bg-white text-stone-800 border border-stone-300 hover:bg-stone-100'
                }`}
              >
                Group 0{g.groupNumber} ({g.pondCount})
              </button>
            );
          })}
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors & Sentinel-1/Sentinel-2 L2A GIS'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController selectedPond={selectedPond} />

        {ponds.map((pond) => {
          const isSelected = selectedPond?.id === pond.id;
          const isMyPond = pond.isMyPond ?? (pond.id === 'TTK-042' || pond.id === 'TTK-001' || pond.id === 'TTK-007' || pond.id === 'TTK-015' || pond.id === 'TTK-023');
          const isGroupMatched = activeGroupNumber ? pond.groupNumber === activeGroupNumber : true;
          const color = getStatusColor(pond.status);

          const positions = pond.polygon.map((pt) => [pt.lat, pt.lng] as [number, number]);

          // Visual Hierarchy & Similarity Group Dimming Rules
          let opacity = 0.5;
          let strokeColor = color;
          let weight = 1.5;

          if (activeGroupNumber && !isGroupMatched) {
            opacity = 0.12; // Dim unrelated group ponds
            strokeColor = '#D1D5DB';
            weight = 1;
          } else if (pond.isAnomaly) {
            opacity = 0.85;
            strokeColor = '#E11D48'; // Bright Red/Coral warning outline for Anomaly
            weight = 4;
          } else if (pond.isRepresentative) {
            opacity = 0.8;
            strokeColor = '#059669'; // Emerald outline for Representative Pond
            weight = 3.5;
          } else if (filterMode === 'MY_PONDS' && isMyPond) {
            opacity = isSelected ? 0.9 : 0.7;
            strokeColor = '#D946EF'; // Strong PANNAI magenta brand outline
            weight = isSelected ? 4 : 2.5;
          } else {
            opacity = isSelected ? 0.85 : 0.45;
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
                dashArray: pond.isAnomaly ? '4, 4' : undefined,
              }}
              eventHandlers={{
                click: () => {
                  if (pond.groupNumber) onSelectGroup(pond.groupNumber);
                  setSelectedPondId(pond.id);
                },
              }}
            >
              {/* Special Marker Tooltips */}
              {pond.isAnomaly ? (
                <Tooltip permanent direction="center">
                  <span className="font-mono text-[10px] font-extrabold bg-rose-600 text-white px-2 py-0.5 rounded shadow-md flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-white" /> ⚠️ ANOMALY {pond.id}
                  </span>
                </Tooltip>
              ) : pond.isRepresentative ? (
                <Tooltip permanent direction="center">
                  <span className="font-mono text-[10px] font-extrabold bg-emerald-800 text-white px-2 py-0.5 rounded shadow-sm">
                    REPRESENTATIVE {pond.id} ✓
                  </span>
                </Tooltip>
              ) : isMyPond ? (
                <Tooltip permanent direction="center">
                  <span className="font-mono text-[10px] font-extrabold bg-[#11100F] text-white px-1.5 py-0.5 rounded shadow-sm">
                    MY POND {pond.id}
                  </span>
                </Tooltip>
              ) : null}

              <Popup>
                <div className="p-2 space-y-2 min-w-[220px] text-[#11100F]">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-extrabold text-sm text-[#11100F]">
                      {pond.id} ({pond.localName || 'Salt Pan'})
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-extrabold bg-pink-100 text-pink-900 rounded">
                      {pond.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-stone-700 font-bold">
                    <span>Group 0{pond.groupNumber}</span>
                    {pond.isRepresentative && <span className="text-emerald-700 font-extrabold block">● Group Representative Pond</span>}
                    {pond.isAnomaly && <span className="text-rose-700 font-extrabold block">⚠️ Pattern Anomaly Flagged</span>}
                  </div>

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
                    className="w-full mt-2 bg-[#11100F] hover:bg-pink-600 text-white text-xs font-mono font-extrabold py-1.5 rounded-xl transition-colors flex items-center justify-center space-x-1 cursor-pointer"
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

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-md border-2 border-stone-300 p-3.5 rounded-2xl shadow-lg space-y-2 text-xs font-mono select-none max-w-sm">
        <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
          <div className="flex items-center space-x-1.5 font-extrabold text-[#11100F]">
            <Layers className="w-4 h-4 text-pink-600" />
            <span>50-POND SIMILARITY MAP</span>
          </div>
          <SourceBadge source="MODEL" timestamp="Random Forest" />
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-bold">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs border-2 border-emerald-600 bg-emerald-100" />
            <span className="text-emerald-900">REPRESENTATIVE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs border-2 border-rose-600 bg-rose-100" />
            <span className="text-rose-900">⚠️ ANOMALY</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#059669]" />
            <span>SUITABLE</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-xs bg-[#E11D48]" />
            <span>FIELD CHECK</span>
          </div>
        </div>

        <div className="pt-2 border-t border-stone-200 text-[10px] text-stone-700 leading-tight">
          <p className="font-extrabold text-[#11100F]">SATELLITE & GIS PATTERN CLUSTERING</p>
          <p className="text-[9.5px] font-bold text-stone-600 mt-0.5">
            Sentinel-1 + Sentinel-2 identify spatial patterns. Field probes validate representative ponds.
          </p>
        </div>
      </div>
    </div>
  );
};
