import React, { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Building2, Check, ChevronDown, Compass, ExternalLink, Factory, Gauge, GraduationCap, Layers3, Maximize2, MousePointer2, RotateCcw, Search, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import InfrastructureScene from './Scene.jsx';
import { assets, divisions, tourSteps } from './catalogue.js';

const byId = Object.fromEntries(assets.map((asset) => [asset.id, asset]));

function pillLabel(product) {
  if (product.includes('TXIQ')) return 'TXIQ';
  if (product.includes('MOT-WARE')) return 'MOT-WARE';
  return product;
}

export default function App() {
  const [selectedId, setSelectedId] = useState('substation');
  const [mode, setMode] = useState('explore');
  const [tourIndex, setTourIndex] = useState(0);
  const [viewKey, setViewKey] = useState(0);
  const [expandedDivision, setExpandedDivision] = useState('');
  const [query, setQuery] = useState('');
  const [catalogueOpen, setCatalogueOpen] = useState(true);
  const selectedAsset = byId[selectedId] || assets[0];
  const activeDivision = divisions.find((division) => division.name === expandedDivision);

  const filteredDivisions = useMemo(() => {
    const normalQuery = query.trim().toLowerCase();
    if (!normalQuery) return divisions;
    return divisions.filter((division) => `${division.name} ${division.summary} ${division.products.join(' ')}`.toLowerCase().includes(normalQuery));
  }, [query]);

  const selectAsset = (id) => {
    setSelectedId(id);
    if (mode === 'guided') {
      const index = tourSteps.indexOf(id);
      if (index >= 0) setTourIndex(index);
    }
  };
  const startTour = () => {
    setMode('guided');
    setTourIndex(0);
    setSelectedId(tourSteps[0]);
  };
  const nextTour = () => {
    const index = Math.min(tourIndex + 1, tourSteps.length - 1);
    setTourIndex(index);
    setSelectedId(tourSteps[index]);
  };
  const prevTour = () => {
    const index = Math.max(tourIndex - 1, 0);
    setTourIndex(index);
    setSelectedId(tourSteps[index]);
  };

  return <main className="app-shell">
    <header className="topbar">
      <a className="brand" href="https://motwane.com/" target="_blank" rel="noreferrer" aria-label="Motwane website">
        <span className="brand-mark">M</span><span className="brand-name">MOTWANE<span className="brand-sub">POWER · MEASUREMENT · INTELLIGENCE</span></span>
      </a>
      <div className="topbar-right"><span className="live-dot" /> INTERACTIVE INFRASTRUCTURE CONCEPT <span className="topbar-divider" /> <span className="topbar-v">V0.1</span></div>
    </header>

    <section className="hero-strip">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> CONNECTED POWER ECOSYSTEM</div>
        <h1>From the grid.<br /><em>Into industry.</em></h1>
        <p>Explore the assets, testing technologies and digital solutions that keep power infrastructure measurable, monitored and moving.</p>
      </div>
      <div className="hero-stat"><span className="hero-stat-num">01</span><span className="hero-stat-label">CONNECTED<br />ECOSYSTEM</span></div>
      <div className="hero-stat"><span className="hero-stat-num">360°</span><span className="hero-stat-label">FREE<br />EXPLORATION</span></div>
      <div className="hero-stat hero-stat-last"><span className="hero-stat-num">ALL</span><span className="hero-stat-label">MOTWANE<br />DIVISIONS</span></div>
    </section>

    <section className="workspace">
      <div className="scene-column">
        <div className="scene-topline">
          <div className="scene-name"><span className="scene-number">01</span><span><strong>Infrastructure explorer</strong><small>SCHEMATIC 3D ENVIRONMENT</small></span></div>
          <div className="scene-actions">
            <button className={`mode-button ${mode === 'explore' ? 'active' : ''}`} onClick={() => setMode('explore')}><MousePointer2 size={15} /> Explore</button>
            <button className={`mode-button ${mode === 'guided' ? 'active' : ''}`} onClick={startTour}><Compass size={15} /> Guided journey</button>
            <button className="icon-button" aria-label="Reset 3D view" title="Reset view" onClick={() => setViewKey((key) => key + 1)}><RotateCcw size={16} /></button>
          </div>
        </div>
        <div className="canvas-frame">
          <InfrastructureScene selectedId={selectedId} onSelect={selectAsset} viewKey={viewKey} autoFocus={mode === 'guided'} />
          <div className="canvas-badge"><span className="badge-dot" /> POWER FLOW <span className="badge-sep">/</span> SCHEMATIC</div>
          <div className="canvas-hint"><MousePointer2 size={13} /> Click an asset · Drag to orbit · Scroll to zoom</div>
          {mode === 'guided' && <div className="tour-card">
            <div className="tour-card-top"><span>GUIDED JOURNEY</span><span>{String(tourIndex + 1).padStart(2, '0')} / {String(tourSteps.length).padStart(2, '0')}</span></div>
            <div className="tour-progress"><span style={{ width: `${((tourIndex + 1) / tourSteps.length) * 100}%` }} /></div>
            <strong>{selectedAsset.title}</strong><p>{selectedAsset.description}</p>
            <div className="tour-controls"><button className="tour-back" onClick={prevTour} disabled={tourIndex === 0}><ArrowLeft size={14} /> Back</button><button className="tour-next" onClick={tourIndex === tourSteps.length - 1 ? () => setMode('explore') : nextTour}>{tourIndex === tourSteps.length - 1 ? 'Finish' : 'Next asset'} <ArrowRight size={14} /></button></div>
          </div>}
        </div>
        <div className="flow-legend"><span className="flow-legend-title">SYSTEM PATH</span><span className="legend-step">Utility substation</span><ArrowRight size={13} /><span className="legend-step">Transformer</span><ArrowRight size={13} /><span className="legend-step">Transmission</span><ArrowRight size={13} /><span className="legend-step">Industry</span></div>
        <div className="division-strip"><div className="division-strip-head"><span>THE WIDER ECOSYSTEM</span><span>CONNECTED + SUPPORTING APPLICATIONS</span></div><div className="mini-ecosystem">
          <button onClick={() => selectAsset('streetlight')} className={selectedId === 'streetlight' ? 'selected' : ''}><span className="mini-icon">CL</span><span><b>CityLight</b><small>Smart lighting</small></span><ArrowUpRight size={14}/></button>
          <button onClick={() => selectAsset('cable-network')} className={selectedId === 'cable-network' ? 'selected' : ''}><span className="mini-icon">TM</span><span><b>Telemetrics</b><small>Cable fault locating</small></span><ArrowUpRight size={14}/></button>
          <button onClick={() => selectAsset('chiller')} className={selectedId === 'chiller' ? 'selected' : ''}><span className="mini-icon">Io</span><span><b>Industrial IoT</b><small>Chiller · Water · Assets</small></span><ArrowUpRight size={14}/></button>
          <button onClick={() => selectAsset('security-gate')} className={selectedId === 'security-gate' ? 'selected' : ''}><span className="mini-icon">AC</span><span><b>Access control</b><small>Facility entrance</small></span><ArrowUpRight size={14}/></button>
        </div></div>
      </div>

      <aside className="inspector">
        <div className="inspector-top"><div><div className="eyebrow eyebrow-small">ASSET INSPECTOR</div><h2>{selectedAsset.title}</h2></div><span className="selected-mark"><Check size={14} /> SELECTED</span></div>
        <div className="asset-meta"><span className="asset-meta-code">{selectedAsset.eyebrow}</span><span className="asset-meta-id">ASSET / {String(assets.findIndex((asset) => asset.id === selectedId) + 1).padStart(2, '0')}</span></div>
        <p className="asset-description">{selectedAsset.description}</p>
        <div className="inspector-section"><div className="section-head"><span>RELEVANT SOLUTIONS</span><span>{selectedAsset.products.length.toString().padStart(2, '0')}</span></div><div className="solution-list">{selectedAsset.products.map((product, index) => <div className="solution-row" key={product}><span className="solution-index">0{index + 1}</span><span>{product}</span><ArrowDownRight size={14} /></div>)}</div></div>
        <div className="related-wrap"><div className="section-head"><span>RELATED DIVISIONS</span><span>EXPLORE</span></div><div className="related-chips">{selectedAsset.related.map((name) => <button key={name} onClick={() => { setExpandedDivision(name); setCatalogueOpen(true); }}>{name}<ArrowUpRight size={12}/></button>)}</div></div>
        <div className="inspector-cta"><div className="cta-icon"><Zap size={17}/></div><div><strong>Need technical details?</strong><p>Open the relevant Motwane portfolio page for verified specifications and product information.</p></div><a href={divisions.find(d => selectedAsset.related.includes(d.name))?.url || 'https://motwane.com/'} target="_blank" rel="noreferrer" aria-label="Open Motwane product page"><ExternalLink size={16}/></a></div>
        <div className="catalogue-head" role="button" tabIndex={0} onClick={() => setCatalogueOpen((open) => !open)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setCatalogueOpen((open) => !open); }}><div><div className="eyebrow eyebrow-small">PORTFOLIO DIRECTORY</div><h3>All divisions</h3><p>Browse Motwane's wider portfolio.</p></div><button className="catalogue-toggle" aria-label={catalogueOpen ? 'Collapse divisions' : 'Expand divisions'}><ChevronDown className={catalogueOpen ? 'rotated' : ''} size={18}/></button></div>
        {catalogueOpen && <div className="division-directory">
          <label className="search-field"><Search size={15}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search divisions or product areas" /><kbd>{filteredDivisions.length}</kbd></label>
          {filteredDivisions.map((division) => {
            const isExpanded = expandedDivision === division.name;
            return <div className={`division-item ${isExpanded ? 'expanded' : ''}`} key={division.id}>
              <button className="division-row" onClick={() => setExpandedDivision(isExpanded ? '' : division.name)}><span className="division-code">{division.short}</span><span className="division-copy"><b>{division.name}</b><small>{division.products.length} product areas</small></span><ChevronDown size={15} className={isExpanded ? 'rotated' : ''}/></button>
              {isExpanded && <div className="division-details"><p>{division.summary}</p><div className="division-products">{division.products.map((product) => <span key={product}>{product}</span>)}</div><div className="division-bottom"><button onClick={() => { const match = assets.find(asset => asset.related.includes(division.name)); if (match) selectAsset(match.id); }}>Locate on scene <ArrowUpRight size={13}/></button><a href={division.url} target="_blank" rel="noreferrer">Official page <ExternalLink size={12}/></a></div></div>}
            </div>;
          })}
          {filteredDivisions.length === 0 && <div className="no-results">No matching division or product area.</div>}
        </div>}
        <div className="catalogue-note"><ShieldCheck size={14}/><span>Portfolio groupings are a working draft. Confirm the current catalogue, product names and division ownership before publishing.</span></div>
      </aside>
    </section>

    <footer className="footer"><span>CONCEPT BUILD · REACT + THREE.JS</span><span>Illustrative environment · Not an engineering drawing or live digital twin</span><span>© Motwane · Prototype for review</span></footer>
  </main>;
}
