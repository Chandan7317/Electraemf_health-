import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, BookOpen, Zap, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import { electraData } from '../data/electraData';
import { allPagesFull } from '../data/allPagesFull';

export default function GlobalSearchModal({ isOpen, onClose, onNavigateToItem }) {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Build searchable index from services, case studies, educational articles, and scraped pages
  const allItems = useMemo(() => {
    const list = [];

    // 1. Services
    electraData.services.forEach(s => {
      list.push({
        type: 'service',
        id: s.id,
        title: s.title,
        subtitle: s.category,
        description: s.shortDesc + ' ' + s.features.join(' '),
        data: s
      });
    });

    // 2. Case Studies
    electraData.caseStudies.forEach(cs => {
      list.push({
        type: 'case-study',
        id: cs.id,
        title: cs.title,
        subtitle: `${cs.location} • Case Study`,
        description: cs.summary + ' ' + cs.headline + ' ' + cs.details.join(' '),
        data: cs
      });
    });

    // 3. Educational Articles
    electraData.educationalArticles.forEach(art => {
      list.push({
        type: 'article',
        id: art.id,
        title: art.title,
        subtitle: `${art.category} • Article`,
        description: art.summary + ' ' + (art.content || ''),
        data: art
      });
    });

    // 4. Scraped web pages
    for (const slug in allPagesFull) {
      const p = allPagesFull[slug];
      if (p.sections && p.sections.length > 0) {
        list.push({
          type: 'page',
          id: slug,
          title: p.title || slug,
          subtitle: `electraEMF Website Page • /${slug}`,
          description: p.fullTextSnippet || '',
          data: p
        });
      }
    }

    return list;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    return allItems.filter(item => {
      const matchesType = activeFilter === 'all' || item.type === activeFilter;
      const matchesText = item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesType && matchesText;
    }).slice(0, 15);
  }, [query, activeFilter, allItems]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[85%] overflow-hidden mt-2">
        {/* Search Input Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, 5G, pacemakers, reports..."
              className="w-full bg-slate-50 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center shrink-0 text-xs font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
          {['all', 'service', 'case-study', 'article', 'page'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-semibold transition-all ${
                activeFilter === f 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All' : f === 'service' ? 'Services' : f === 'case-study' ? 'Case Studies' : f === 'article' ? 'Articles' : 'Pages'}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-3 space-y-2">
          {query.trim() && results.length > 0 && (
            results.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onClose();
                  onNavigateToItem(item);
                }}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-100 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded uppercase bg-white border border-slate-200 text-slate-600">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold truncate">
                      {item.subtitle}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-xs text-slate-900 group-hover:text-blue-600 truncate mt-0.5">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>

                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-xs">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}

          {query.trim() && results.length === 0 && (
            <div className="py-10 text-center space-y-2 text-slate-400">
              <Search className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-bold text-slate-600">No results found for "{query}"</p>
              <p className="text-[11px]">Try checking your spelling or search a different keyword</p>
            </div>
          )}

          {!query.trim() && (
            <div className="p-4 space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Popular Searches</p>
              <div className="flex flex-wrap gap-1.5">
                {['5G mmWave antennas', 'Power substations', 'Trifield meter accuracy', 'Pacemaker & ICD interference', 'School classroom testing', 'Stray voltage pool mystery', 'Hamptons estate inspection'].map((term, i) => (
                  <button
                    key={i}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

