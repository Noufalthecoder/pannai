import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { StatusBadge, DemoBadge } from '../components/ui/Badge';
import {
  Play,
  ArrowRight,
  Droplets,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  Globe,
  ShoppingBag,
  Calculator,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { startGuidedDemo } = useApp();

  // State for interactive Economic Impact Calculator
  const [pondAcres, setPondAcres] = useState<number>(5);
  const estimatedIncomeINR = pondAcres * 24000; // ~₹24,000 additional bioeconomy income per acre (DEMO)

  // State for Interactive Product Layer Tab Switcher
  const [activeTab, setActiveTab] = useState<'earth' | 'farmer' | 'certified' | 'market'>('earth');

  const handleStartDemo = () => {
    startGuidedDemo();
    navigate('/earth');
  };

  return (
    <div className="space-y-24 pb-24">
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 max-w-[1320px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#FAF0F4] border border-[#F3CBDC] rounded-full text-xs font-mono text-[#C42A6B]">
              <span className="w-2 h-2 rounded-full bg-[#C42A6B] animate-ping" />
              <span className="font-bold">THOOTHUKUDI · TAMIL NADU · SALT BELT</span>
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-6xl text-[#14100E] leading-[1.06] tracking-tight">
              A SALT PAN <br />
              CAN PRODUCE <br />
              <span className="text-[#C42A6B]">MORE THAN SALT.</span>
            </h1>

            <p className="text-lg sm:text-xl text-[#69615B] font-medium max-w-2xl leading-relaxed">
              The operating system for India's salt-pan bioeconomy. Starting with Artemia.
            </p>

            <p className="text-sm text-[#69615B] leading-relaxed max-w-xl">
              PANNAI turns fragmented pond-level information into operational decisions, guides producers in Tamil, certifies every batch, and connects verified supply with buyers.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/earth')}
                className="py-3.5 px-7 bg-[#14100E] hover:bg-[#C42A6B] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center space-x-2"
              >
                <span>EXPLORE PANNAI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleStartDemo}
                className="py-3.5 px-7 bg-[#C42A6B] hover:bg-[#A8225A] text-white text-xs font-bold rounded-xl transition-transform active:scale-95 shadow-md flex items-center space-x-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>OPEN LIVE DEMO</span>
              </button>
            </div>
          </div>

          {/* Right Column Aerial Salt-Pan Visual Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#FFFCF7] border-2 border-[#E6DFD5] rounded-3xl p-5 shadow-2xl relative space-y-4 overflow-hidden">
              <div className="h-72 rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#E6DFD5]">
                {/* Authentic Aerial Salt Pan Drone Photography */}
                <img
                  src="/assets/salt_pan_aerial.png"
                  alt="Thoothukudi Coastal Salt Pan Aerial View"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14100E]/70 via-transparent to-black/20" />
                
                {/* Active Pond Callout Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10 bg-[#FFFCF7]/95 backdrop-blur-md p-4 rounded-2xl border border-[#E6DFD5] shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-[#14100E]">POND TTK-042</span>
                    <StatusBadge status="CANDIDATE" />
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#69615B]">MODEL CONFIDENCE:</span>
                      <span className="font-bold text-[#C42A6B]">82% · DEMO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#69615B]">SALINITY (FIELD):</span>
                      <span className="font-bold text-[#14100E]">92 ppt</span>
                    </div>
                  </div>

                  <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-2 rounded-lg text-[11px] font-bold text-[#C42A6B]">
                    RECOMMENDATION: FIELD CHECK FRIDAY
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#69615B]">
                <span className="flex items-center space-x-1">
                  <Droplets className="w-4 h-4 text-[#3E8B7A]" />
                  <span>Satellite-assisted · Field-validated</span>
                </span>
                <DemoBadge label="DEMO INTELLIGENCE" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 1: THE UNTOLD LANDSCAPE (TRADITIONAL VS BIOECONOMY) */}
      <section className="bg-[#FFFCF7] border-y border-[#E6DFD5] py-20 px-4 sm:px-6">
        <div className="max-w-[1320px] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#C42A6B] uppercase tracking-widest">
              CHAPTER 01 · THE OPPORTUNITY
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#14100E]">
              ONE LANDSCAPE. MORE VALUE POSSIBILITIES.
            </h2>
            <p className="text-sm text-[#69615B]">
              PANNAI does not replace salt production. It unlocks high-margin biological value in suitable ponds during optimal salinity windows.
            </p>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Traditional Salt */}
            <div className="bg-[#F7F3EC] border border-[#E6DFD5] rounded-3xl p-8 space-y-5">
              <span className="text-xs font-mono font-bold text-[#69615B] uppercase block">
                TRADITIONAL MODEL
              </span>
              <h3 className="font-heading font-bold text-2xl text-[#14100E]">
                Salt Production Only
              </h3>
              <ul className="space-y-3 text-xs text-[#69615B]">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE6A45] mt-1.5 shrink-0" />
                  <span>Low commodity pricing (~₹2.50 / kg raw industrial salt).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE6A45] mt-1.5 shrink-0" />
                  <span>High weather & monsoon risk causing complete seasonal shutdown.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DE6A45] mt-1.5 shrink-0" />
                  <span>Biological crustacean growth historically treated as unwanted waste.</span>
                </li>
              </ul>
            </div>

            {/* Right: PANNAI Bioeconomy */}
            <div className="bg-[#FFFCF7] border-2 border-[#C42A6B] rounded-3xl p-8 space-y-5 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#C42A6B] uppercase">
                  PANNAI OPERATING MODEL
                </span>
                <span className="text-xs font-bold bg-[#FAF0F4] text-[#C42A6B] px-3 py-1 rounded-full border border-[#F3CBDC]">
                  SALT + BIOLOGICAL VALUE
                </span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#14100E]">
                Dual Harvest: Salt + Artemia
              </h3>
              <ul className="space-y-3 text-xs text-[#69615B]">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E8B7A] shrink-0 mt-0.5" />
                  <span>High-value commercial Artemia cysts (~₹5,200 / kg Grade A).</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E8B7A] shrink-0 mt-0.5" />
                  <span>Satellite-assisted salinity monitoring flags exact production windows.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#3E8B7A] shrink-0 mt-0.5" />
                  <span>Direct B2B marketplace contracts with shrimp & fish hatcheries.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 2: MEET ARTEMIA — THE AQUACULTURE GOLD */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-[#3E8B7A] uppercase tracking-widest">
            CHAPTER 02 · COMMERCIAL BIOLOGY
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#14100E]">
            MEET ARTEMIA: THE BABY FOOD OF AQUACULTURE.
          </h2>
          <p className="text-base text-[#69615B]">
            Artemia (brine shrimp) is a microscopic organism inhabiting hypersaline salt pans. Its cyst lifecycle powers global aquaculture larviculture.
          </p>
        </div>

        {/* 3 Interactive Visual Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 01: Cysts */}
          <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="h-56 relative overflow-hidden bg-[#14100E]">
                <img
                  src="/assets/artemia_cysts.png"
                  alt="Macro photography of Artemia Cysts"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#14100E]/80 backdrop-blur-md text-amber-300 font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-amber-500/30">
                  STAGE 01 · CYSTS
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-xl text-[#14100E]">ARTEMIA CYSTS</h3>
                <p className="text-xs text-[#69615B] leading-relaxed">
                  Dormant, high-protein metabolic cysts produced naturally when salt-pan salinity exceeds 90 ppt. Harvested directly from water surfaces.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <span className="text-[11px] font-mono text-[#3E8B7A] font-bold block bg-[#E2F4EE] p-2.5 rounded-xl border border-[#3E8B7A]/20">
                POND HARVEST → LAB CERTIFICATION
              </span>
            </div>
          </div>

          {/* Card 02: Nauplii */}
          <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="h-56 relative overflow-hidden bg-[#14100E]">
                <img
                  src="/assets/artemia_nauplii.png"
                  alt="Scientific micro photography of Artemia Nauplii swimming"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#14100E]/80 backdrop-blur-md text-[#8FBFB4] font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-[#3E8B7A]/40">
                  STAGE 02 · NAUPLII HATCH
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-xl text-[#14100E]">SWIMMING NAUPLII</h3>
                <p className="text-xs text-[#69615B] leading-relaxed">
                  Cysts hatch within 24 hours of hydration into free-swimming, nutrient-rich nauplii larvae essential for early-stage aquatic feeding.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <span className="text-[11px] font-mono text-[#3E8B7A] font-bold block bg-[#E2F4EE] p-2.5 rounded-xl border border-[#3E8B7A]/20">
                24-HOUR LAB HATCHABILITY TEST (≥80%)
              </span>
            </div>
          </div>

          {/* Card 03: Hatchery Feeding */}
          <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="h-56 relative overflow-hidden bg-[#14100E]">
                <img
                  src="/assets/shrimp_hatchery.png"
                  alt="Modern commercial aquaculture shrimp hatchery tanks"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#14100E]/80 backdrop-blur-md text-[#C42A6B] font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-[#C42A6B]/40">
                  STAGE 03 · HATCHERY FEED
                </span>
              </div>

              <div className="p-6 space-y-2">
                <h3 className="font-heading font-bold text-xl text-[#14100E]">COMMERCIAL FEEDING</h3>
                <p className="text-xs text-[#69615B] leading-relaxed">
                  Used by Penaeus vannamei shrimp and Seabass hatcheries across India as mandatory live food for post-larval development.
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <span className="text-[11px] font-mono text-[#C42A6B] font-bold block bg-[#FAF0F4] p-2.5 rounded-xl border border-[#F3CBDC]">
                VERIFIED B2B HATCHERY PROCUREMENT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: THE FIELD & CERTIFICATION STORY (HUMAN + LAB VERIFICATION) */}
      <section className="bg-[#FFFCF7] border-y border-[#E6DFD5] py-20 px-4 sm:px-6">
        <div className="max-w-[1320px] mx-auto space-y-16">
          {/* Story A: Farmer Field Check */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono font-bold text-[#3E8B7A] uppercase tracking-widest">
                HUMAN-CENTERED TAMIL UX
              </span>
              <h2 className="font-heading font-bold text-3xl text-[#14100E]">
                SATELLITE FLAGS. <br />
                TAMIL ADVISORIES EMPOWER THE PRODUCER.
              </h2>
              <p className="text-sm text-[#69615B] leading-relaxed">
                Satellite data identifies promising evaporation signatures. But field verification remains critical. PANNAI sends clear, operational advisories in simple Tamil directly to producers like Muthu Swamy in Tharuvaikulam.
              </p>
              <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-4 rounded-2xl text-xs font-tamil text-[#C42A6B]">
                "வெள்ளிக்கிழமை குளத்தை நேரில் சரிபார்க்கவும். தற்போதைய நீர்மட்டத்தை அப்படியே பராமரிக்கவும்."
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="h-80 rounded-3xl overflow-hidden border-2 border-[#E6DFD5] shadow-xl relative">
                <img
                  src="/assets/farmer_field_check.png"
                  alt="Thoothukudi salt farmer measuring pond salinity with refractometer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#14100E]/80 backdrop-blur-md text-white p-3 rounded-xl text-xs flex justify-between">
                  <span>Producer: Muthu Swamy</span>
                  <span className="font-mono text-[#3E8B7A]">FIELD SALINITY: 92 ppt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story B: Physical Lab QC & Passport */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="h-80 rounded-3xl overflow-hidden border-2 border-[#E6DFD5] shadow-xl relative">
                <img
                  src="/assets/lab_hatchability_test.png"
                  alt="Aquaculture lab technician inspecting Artemia hatchability under microscope"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#14100E]/80 backdrop-blur-md text-white p-3 rounded-xl text-xs flex justify-between">
                  <span>Lab Technician: Dr. V. Ramanathan</span>
                  <span className="font-mono text-[#C42A6B]">HATCHABILITY: 86.4% (GRADE A)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5 order-1 lg:order-2">
              <span className="text-xs font-mono font-bold text-[#C42A6B] uppercase tracking-widest">
                SCIENTIFIC GUARDRAILS & TRUST
              </span>
              <h2 className="font-heading font-bold text-3xl text-[#14100E]">
                HATCHERIES BUY VERIFIED QUALITY, NOT SATELLITE PROMISES.
              </h2>
              <p className="text-sm text-[#69615B] leading-relaxed">
                Computer vision estimates cyst surface purity (94.2%). But hatchability (86.4%) is strictly recorded from a physical 24-hour lab hatch test. Every lot receives a Digital Batch Passport with a scannable QR code.
              </p>
              <div className="bg-[#F7F3EC] border border-[#E6DFD5] p-4 rounded-2xl text-xs text-[#14100E] font-mono">
                PASSPORT: PASSPORT-PN-TUT-260806-018 · HASH: 0x8f2a9b4c7d6e1f...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 4: INTERACTIVE FARMER ECONOMIC IMPACT CALCULATOR */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6">
        <div className="bg-[#14100E] text-[#FFFCF7] rounded-3xl p-8 sm:p-12 space-y-8 border border-stone-800 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                CHAPTER 04 · ECONOMIC CALCULATOR
              </span>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mt-1">
                CALCULATE SALT-PAN BIOECONOMY POTENTIAL
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono bg-stone-900 px-3 py-1.5 rounded-xl text-stone-300">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>PRODUCER ESTIMATOR</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Slider */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-300 font-medium">Select Salt Pan Pond Area:</span>
                  <span className="font-bold text-amber-400 font-mono text-lg">{pondAcres} acres</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={pondAcres}
                  onChange={(e) => setPondAcres(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#C42A6B]"
                />
                <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                  <span>1 Acre</span>
                  <span>10 Acres</span>
                  <span>25 Acres</span>
                </div>
              </div>

              <p className="text-xs text-stone-400 leading-relaxed">
                Based on historical seasonal Artemia cyst recovery in suitable hypersaline compartments across the Thoothukudi salt belt.
              </p>
            </div>

            {/* Income Output Box */}
            <div className="lg:col-span-5 bg-stone-900 border border-stone-800 p-6 rounded-2xl text-center space-y-3">
              <span className="text-[11px] font-mono text-stone-400 uppercase">
                ESTIMATED ANNUAL BIOECONOMY ADDITION
              </span>
              <div className="font-heading font-bold text-3xl sm:text-4xl text-[#C42A6B]">
                +₹{estimatedIncomeINR.toLocaleString('en-IN')}{' '}
                <span className="text-xs text-stone-400 font-mono font-normal">/ year</span>
              </div>
              <DemoBadge label="DEMO ESTIMATE" />
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 5: THE 4 PRODUCTS IN ONE DATA LAYER */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold text-[#C42A6B] uppercase tracking-widest">
            CHAPTER 05 · PRODUCT PHILOSOPHY
          </span>
          <h2 className="font-heading font-bold text-3xl text-[#14100E]">FOUR PRODUCTS. ONE DATA LAYER.</h2>
          <p className="text-sm text-[#69615B]">
            ONE POND → ONE FARMER → ONE HARVEST → ONE BATCH → ONE PASSPORT → ONE MARKET LISTING → ONE BUYER
          </p>
        </div>

        {/* Interactive Product Tabs */}
        <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl p-6 shadow-sm space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-[#E6DFD5] pb-4">
            <button
              onClick={() => setActiveTab('earth')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'earth' ? 'bg-[#14100E] text-white' : 'bg-[#F7F3EC] text-[#69615B]'
              }`}
            >
              <Globe className="w-4 h-4 text-[#8FBFB4]" />
              <span>01 PANNAI EARTH</span>
            </button>

            <button
              onClick={() => setActiveTab('farmer')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'farmer' ? 'bg-[#14100E] text-white' : 'bg-[#F7F3EC] text-[#69615B]'
              }`}
            >
              <Smartphone className="w-4 h-4 text-[#3E8B7A]" />
              <span>02 PANNAI FARMER</span>
            </button>

            <button
              onClick={() => setActiveTab('certified')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'certified' ? 'bg-[#14100E] text-white' : 'bg-[#F7F3EC] text-[#69615B]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#C42A6B]" />
              <span>03 PANNAI CERTIFIED</span>
            </button>

            <button
              onClick={() => setActiveTab('market')}
              className={`py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                activeTab === 'market' ? 'bg-[#14100E] text-white' : 'bg-[#F7F3EC] text-[#69615B]'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#D9A441]" />
              <span>04 PANNAI MARKET</span>
            </button>
          </div>

          {/* Active Tab Explanation */}
          <div className="p-4 bg-[#F7F3EC] rounded-2xl text-xs space-y-2">
            {activeTab === 'earth' && (
              <div>
                <h4 className="font-bold text-sm text-[#14100E]">PANNAI EARTH — "Know where to look."</h4>
                <p className="text-[#69615B]">Satellite-assisted pond intelligence screening 35+ Thoothukudi salt compartments for optimal salinity windows.</p>
              </div>
            )}
            {activeTab === 'farmer' && (
              <div>
                <h4 className="font-bold text-sm text-[#14100E]">PANNAI FARMER — "Know what to do."</h4>
                <p className="text-[#69615B]">Radical operational simplicity in native Tamil script with Web Speech audio narration for salt producers.</p>
              </div>
            )}
            {activeTab === 'certified' && (
              <div>
                <h4 className="font-bold text-sm text-[#14100E]">PANNAI CERTIFIED — "Know what you're buying."</h4>
                <p className="text-[#69615B]">Traceable multi-stage processing, physical lab hatchability testing, and Digital Batch Passports with QR codes.</p>
              </div>
            )}
            {activeTab === 'market' && (
              <div>
                <h4 className="font-bold text-sm text-[#14100E]">PANNAI MARKET — "Know where to sell."</h4>
                <p className="text-[#69615B]">Verified B2B commodity procurement portal connecting certified Artemia supply directly with commercial hatcheries.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-[1320px] mx-auto px-4 sm:px-6 text-center space-y-6">
        <div className="bg-[#FFFCF7] border-2 border-[#C42A6B] rounded-3xl p-12 shadow-xl space-y-5 max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-[#14100E]">
            FROM POND TO PAYMENT.
          </h2>
          <p className="text-xs text-[#69615B] max-w-lg mx-auto">
            Experience the complete journey interactively. Launch the guided demo to walk through Pond TTK-042 to marketplace reservation and farmer payout.
          </p>

          <button
            onClick={handleStartDemo}
            className="py-4 px-8 bg-[#C42A6B] hover:bg-[#A8225A] text-white font-bold text-sm rounded-xl transition-transform active:scale-95 shadow-lg inline-flex items-center space-x-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>START GUIDED DEMO NOW</span>
          </button>
        </div>
      </section>
    </div>
  );
};
