import React, { useState } from 'react';
import styles from './BodyMap.module.css';

export interface BodyRegion {
  id: string;
  name: string;
  relatedAreas?: string[];
}

export interface BodyMapProps {
  onSelectRegion: (region: BodyRegion) => void;
  selectedRegions?: string[];
  className?: string;
}

// Define body regions for interaction
const BODY_REGIONS: BodyRegion[] = [
  { id: 'head', name: 'Head', relatedAreas: ['Brain', 'Scalp'] },
  { id: 'face', name: 'Face', relatedAreas: ['Eyes', 'Nose', 'Mouth', 'Jaw', 'Ears'] },
  { id: 'neck', name: 'Neck', relatedAreas: ['Throat', 'Cervical spine'] },
  { id: 'chest', name: 'Chest', relatedAreas: ['Lungs', 'Heart', 'Ribs', 'Sternum'] },
  { id: 'abdomen', name: 'Abdomen', relatedAreas: ['Stomach', 'Intestines', 'Liver', 'Gallbladder'] },
  { id: 'back-upper', name: 'Upper Back', relatedAreas: ['Shoulder blades', 'Thoracic spine'] },
  { id: 'back-lower', name: 'Lower Back', relatedAreas: ['Lumbar spine', 'Sacrum'] },
  { id: 'pelvic', name: 'Pelvic Area', relatedAreas: ['Hips', 'Groin', 'Genitals', 'Bladder'] },
  { id: 'left-shoulder', name: 'Left Shoulder', relatedAreas: ['Left rotator cuff', 'Left collar bone'] },
  { id: 'right-shoulder', name: 'Right Shoulder', relatedAreas: ['Right rotator cuff', 'Right collar bone'] },
  { id: 'left-arm', name: 'Left Arm', relatedAreas: ['Left bicep', 'Left tricep', 'Left elbow'] },
  { id: 'right-arm', name: 'Right Arm', relatedAreas: ['Right bicep', 'Right tricep', 'Right elbow'] },
  { id: 'left-hand', name: 'Left Hand', relatedAreas: ['Left wrist', 'Left fingers', 'Left palm'] },
  { id: 'right-hand', name: 'Right Hand', relatedAreas: ['Right wrist', 'Right fingers', 'Right palm'] },
  { id: 'left-leg', name: 'Left Leg', relatedAreas: ['Left thigh', 'Left knee', 'Left calf'] },
  { id: 'right-leg', name: 'Right Leg', relatedAreas: ['Right thigh', 'Right knee', 'Right calf'] },
  { id: 'left-foot', name: 'Left Foot', relatedAreas: ['Left ankle', 'Left toes', 'Left heel'] },
  { id: 'right-foot', name: 'Right Foot', relatedAreas: ['Right ankle', 'Right toes', 'Right heel'] },
];

const BodyMap: React.FC<BodyMapProps> = ({ 
  onSelectRegion, 
  selectedRegions = [],
  className = '' 
}) => {
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (regionId: string) => {
    const region = BODY_REGIONS.find(r => r.id === regionId);
    if (region) {
      onSelectRegion(region);
    }
  };

  return (
    <div className={`${styles.bodyMapContainer} ${className}`}>
      <div className={styles.viewToggle}>
        <button 
          className={`${styles.viewButton} ${activeView === 'front' ? styles.activeView : ''}`}
          onClick={() => setActiveView('front')}
        >
          Front View
        </button>
        <button 
          className={`${styles.viewButton} ${activeView === 'back' ? styles.activeView : ''}`}
          onClick={() => setActiveView('back')}
        >
          Back View
        </button>
      </div>
      
      <div className={styles.bodyMapWrapper}>
        {activeView === 'front' ? (
          <svg 
            viewBox="0 0 200 400" 
            className={styles.bodySvg}
            aria-label="Front view body map"
          >
            {/* Head */}
            <circle 
              cx="100" 
              cy="40" 
              r="30" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('head') ? styles.selectedRegion : ''} ${hoveredRegion === 'head' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('head')}
              onMouseEnter={() => setHoveredRegion('head')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="head"
            />
            
            {/* Face */}
            <ellipse 
              cx="100" 
              cy="45" 
              rx="20" 
              ry="25" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('face') ? styles.selectedRegion : ''} ${hoveredRegion === 'face' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('face')}
              onMouseEnter={() => setHoveredRegion('face')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="face"
            />
            
            {/* Neck */}
            <rect 
              x="90" 
              y="70" 
              width="20" 
              height="15" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('neck') ? styles.selectedRegion : ''} ${hoveredRegion === 'neck' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('neck')}
              onMouseEnter={() => setHoveredRegion('neck')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="neck"
            />
            
            {/* Chest */}
            <rect 
              x="70" 
              y="85" 
              width="60" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('chest') ? styles.selectedRegion : ''} ${hoveredRegion === 'chest' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('chest')}
              onMouseEnter={() => setHoveredRegion('chest')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="chest"
            />
            
            {/* Abdomen */}
            <rect 
              x="70" 
              y="135" 
              width="60" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('abdomen') ? styles.selectedRegion : ''} ${hoveredRegion === 'abdomen' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('abdomen')}
              onMouseEnter={() => setHoveredRegion('abdomen')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="abdomen"
            />
            
            {/* Pelvic Area */}
            <rect 
              x="70" 
              y="185" 
              width="60" 
              height="30" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('pelvic') ? styles.selectedRegion : ''} ${hoveredRegion === 'pelvic' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('pelvic')}
              onMouseEnter={() => setHoveredRegion('pelvic')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="pelvic"
            />
            
            {/* Left Shoulder */}
            <circle 
              cx="60" 
              cy="85" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-shoulder') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-shoulder' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-shoulder')}
              onMouseEnter={() => setHoveredRegion('left-shoulder')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-shoulder"
            />
            
            {/* Right Shoulder */}
            <circle 
              cx="140" 
              cy="85" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-shoulder') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-shoulder' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-shoulder')}
              onMouseEnter={() => setHoveredRegion('right-shoulder')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-shoulder"
            />
            
            {/* Left Arm */}
            <rect 
              x="40" 
              y="95" 
              width="15" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-arm') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-arm' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-arm')}
              onMouseEnter={() => setHoveredRegion('left-arm')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-arm"
            />
            
            {/* Right Arm */}
            <rect 
              x="145" 
              y="95" 
              width="15" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-arm') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-arm' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-arm')}
              onMouseEnter={() => setHoveredRegion('right-arm')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-arm"
            />
            
            {/* Left Hand */}
            <circle 
              cx="47" 
              cy="155" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-hand') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-hand' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-hand')}
              onMouseEnter={() => setHoveredRegion('left-hand')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-hand"
            />
            
            {/* Right Hand */}
            <circle 
              cx="153" 
              cy="155" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-hand') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-hand' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-hand')}
              onMouseEnter={() => setHoveredRegion('right-hand')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-hand"
            />
            
            {/* Left Leg */}
            <rect 
              x="70" 
              y="215" 
              width="25" 
              height="100" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-leg') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-leg' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-leg')}
              onMouseEnter={() => setHoveredRegion('left-leg')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-leg"
            />
            
            {/* Right Leg */}
            <rect 
              x="105" 
              y="215" 
              width="25" 
              height="100" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-leg') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-leg' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-leg')}
              onMouseEnter={() => setHoveredRegion('right-leg')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-leg"
            />
            
            {/* Left Foot */}
            <rect 
              x="70" 
              y="315" 
              width="25" 
              height="15" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-foot') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-foot' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-foot')}
              onMouseEnter={() => setHoveredRegion('left-foot')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-foot"
            />
            
            {/* Right Foot */}
            <rect 
              x="105" 
              y="315" 
              width="25" 
              height="15" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-foot') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-foot' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-foot')}
              onMouseEnter={() => setHoveredRegion('right-foot')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-foot"
            />
          </svg>
        ) : (
          <svg 
            viewBox="0 0 200 400" 
            className={styles.bodySvg}
            aria-label="Back view body map"
          >
            {/* Head (back) */}
            <circle 
              cx="100" 
              cy="40" 
              r="30" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('head') ? styles.selectedRegion : ''} ${hoveredRegion === 'head' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('head')}
              onMouseEnter={() => setHoveredRegion('head')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="head"
            />
            
            {/* Neck (back) */}
            <rect 
              x="90" 
              y="70" 
              width="20" 
              height="15" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('neck') ? styles.selectedRegion : ''} ${hoveredRegion === 'neck' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('neck')}
              onMouseEnter={() => setHoveredRegion('neck')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="neck"
            />
            
            {/* Upper Back */}
            <rect 
              x="70" 
              y="85" 
              width="60" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('back-upper') ? styles.selectedRegion : ''} ${hoveredRegion === 'back-upper' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('back-upper')}
              onMouseEnter={() => setHoveredRegion('back-upper')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="back-upper"
            />
            
            {/* Lower Back */}
            <rect 
              x="70" 
              y="135" 
              width="60" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('back-lower') ? styles.selectedRegion : ''} ${hoveredRegion === 'back-lower' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('back-lower')}
              onMouseEnter={() => setHoveredRegion('back-lower')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="back-lower"
            />
            
            {/* Pelvic (back) */}
            <rect 
              x="70" 
              y="185" 
              width="60" 
              height="30" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('pelvic') ? styles.selectedRegion : ''} ${hoveredRegion === 'pelvic' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('pelvic')}
              onMouseEnter={() => setHoveredRegion('pelvic')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="pelvic"
            />
            
            {/* Left Shoulder (back) */}
            <circle 
              cx="60" 
              cy="85" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-shoulder') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-shoulder' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-shoulder')}
              onMouseEnter={() => setHoveredRegion('left-shoulder')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-shoulder"
            />
            
            {/* Right Shoulder (back) */}
            <circle 
              cx="140" 
              cy="85" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-shoulder') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-shoulder' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-shoulder')}
              onMouseEnter={() => setHoveredRegion('right-shoulder')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-shoulder"
            />
            
            {/* Left Arm (back) */}
            <rect 
              x="40" 
              y="95" 
              width="15" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-arm') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-arm' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-arm')}
              onMouseEnter={() => setHoveredRegion('left-arm')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-arm"
            />
            
            {/* Right Arm (back) */}
            <rect 
              x="145" 
              y="95" 
              width="15" 
              height="50" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-arm') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-arm' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-arm')}
              onMouseEnter={() => setHoveredRegion('right-arm')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-arm"
            />
            
            {/* Left Hand (back) */}
            <circle 
              cx="47" 
              cy="155" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-hand') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-hand' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-hand')}
              onMouseEnter={() => setHoveredRegion('left-hand')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-hand"
            />
            
            {/* Right Hand (back) */}
            <circle 
              cx="153" 
              cy="155" 
              r="10" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-hand') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-hand' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-hand')}
              onMouseEnter={() => setHoveredRegion('right-hand')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-hand"
            />
            
            {/* Left Leg (back) */}
            <rect 
              x="70" 
              y="215" 
              width="25" 
              height="100" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-leg') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-leg' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-leg')}
              onMouseEnter={() => setHoveredRegion('left-leg')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-leg"
            />
            
            {/* Right Leg (back) */}
            <rect 
              x="105" 
              y="215" 
              width="25" 
              height="100" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-leg') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-leg' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-leg')}
              onMouseEnter={() => setHoveredRegion('right-leg')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-leg"
            />
            
            {/* Left Foot (back) */}
            <rect 
              x="70" 
              y="315" 
              width="25" 
              height="15" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('left-foot') ? styles.selectedRegion : ''} ${hoveredRegion === 'left-foot' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('left-foot')}
              onMouseEnter={() => setHoveredRegion('left-foot')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="left-foot"
            />
            
            {/* Right Foot (back) */}
            <rect 
              x="105" 
              y="315" 
              width="25" 
              height="15" 
              className={`${styles.bodyRegion} ${selectedRegions.includes('right-foot') ? styles.selectedRegion : ''} ${hoveredRegion === 'right-foot' ? styles.hoveredRegion : ''}`} 
              onClick={() => handleRegionClick('right-foot')}
              onMouseEnter={() => setHoveredRegion('right-foot')}
              onMouseLeave={() => setHoveredRegion(null)}
              data-region="right-foot"
            />
          </svg>
        )}
        
        {hoveredRegion && (
          <div className={styles.regionTooltip}>
            {BODY_REGIONS.find(r => r.id === hoveredRegion)?.name}
          </div>
        )}
      </div>
      
      <div className={styles.selectedRegionsContainer}>
        {selectedRegions.length > 0 ? (
          <>
            <h4 className={styles.selectedTitle}>Selected Body Regions:</h4>
            <div className={styles.selectedRegionsGrid}>
              {selectedRegions.map(regionId => {
                const region = BODY_REGIONS.find(r => r.id === regionId);
                return region && (
                  <div key={region.id} className={styles.selectedRegionItem}>
                    <div className={styles.selectedRegionName}>{region.name}</div>
                    {region.relatedAreas && region.relatedAreas.length > 0 && (
                      <div className={styles.relatedAreas}>
                        <small>Related areas: {region.relatedAreas.join(', ')}</small>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className={styles.noSelectionsMessage}>
            Click on the body image to select regions affected by your symptoms
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyMap;
