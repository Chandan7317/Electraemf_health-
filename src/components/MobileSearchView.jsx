import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowRight, BookOpen, Zap, ShieldCheck, FileText, 
  ChevronRight, TrendingUp, Sparkles, Clock, PhoneCall
} from 'lucide-react';
import { electraData } from '../data/electraData';
import { allPagesFull } from '../data/allPagesFull';

export default function MobileSearchView({ searchQuery, onSelectQuery, onNavigateToItem, onClose }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const popularSearches = [
    { label: "5G & mmWave Antenna", query: "5G" },
    { label: "Stray Ground Voltage", query: "stray voltage" },
    { label: "Pacemaker / ICD Safety", query: "pacemaker" },
    { label: "Transformer Substation", query: "transformer" },
    { label: "School District Testing", query: "school" },
    { label: "Dr. Joseph Dumanov", query: "Dumanov" },
    { label: "Court Expert Witness", query: "expert witness" },
    { label: "Residential EMF Audit", query: "residential" },
  ];

  // Index of all searchable items
  const allItems = useMemo(() => {
    const list = [];

    // 1. Services
    electraData.services.forEach(s => {
      list.push({
        type: 'service',
        categoryLabel: 'Service Protocol',
        badgeColor: 'bg-blue-50 text-blue-600 border-blue-200',
        id: s.id,
        title: s.title,
        subtitle: s.category || 'EMF Testing Service',
        description: s.shortDesc + ' ' + (s.features || []).join(' '),
        icon: Zap,
        targetTab: 'services',
        data: s
      });
    });

    // 2. Case Studies
    electraData.caseStudies.forEach(cs => {
      list.push({
        type: 'case-study',
        categoryLabel: 'Case Study',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        id: cs.id,
        title: cs.title,
        subtitle: `${cs.location} • Forensic Report`,
        description: cs.summary + ' ' + cs.headline + ' ' + (cs.details || []).join(' '),
        icon: FileText,
        targetTab: 'reports',
        data: cs
      });
    });

    // 3. Educational Articles
    electraData.educationalArticles.forEach(art => {
      list.push({
        type: 'article',
        categoryLabel: 'Technical Guide',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        id: art.id,
        title: art.title,
        subtitle: `${art.category} • Educational Resource`,
        description: art.summary + ' ' + (art.content || ''),
        icon: BookOpen,
        targetTab: 'reports',
        data: art
      });
    });

    // 4. Scraped web pages
    for (const slug in allPagesFull) {
      const p = allPagesFull[slug];
      if (p.sections && p.sections.length > 0) {
        list.push({
          type: 'page',
          categoryLabel: 'Official Page',
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
          id: slug,
          title: p.title || slug,
          subtitle: `electraemfhealth.com/${slug}`,
          description: p.fullTextSnippet || '',
          icon: ShieldCheck,
          targetTab: (slug === 'about' || slug === 'lawful-experts' || slug === 'health-consultant')
            ? 'experts'
            : (slug === 'services' || slug === 'emf-testing')
            ? 'services'
            : (slug === 'contact')
            ? 'profile'
            : 'reports',
          data: p
        });
      }
    }

    return list;
  }, []);

  // Filtered live results
  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    return allItems.filter(item => {
      const matchesType = activeFilter === 'all' || item.type === activeFilter;
      const matchesText = 
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesType && matchesText;
    }).slice(0, 16);
  }, [searchQuery, activeFilter, allItems]);

  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'service', label: 'Services' },
    { id: 'case-study', label: 'Case Studies' },
    { id: 'article', label: 'Guides' },
    { id: 'page', label: 'Pages' },
  ];

  return (
    <div className="space-y-3 pb-20 animate-in fade-in duration-150">
      {/* If search query is empty: Show Trending Topics and Popular Categories */}
      {!searchQuery.trim() ? (
        <div className="space-y-4 pt-1">
          {/* Trending Searches Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 px-0.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                Trending Searches
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {popularSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectQuery(item.query)}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 text-[11px] font-medium transition-all active:scale-95 shadow-2xs"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Category Jump Cards */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block px-0.5">
              Explore By Domain
            </span>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectQuery("residential")}
                className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-blue-400 text-left transition-all active:scale-95 shadow-2xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold mb-2 group-hover:scale-105 transition-transform">
                  🏠
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 leading-tight">
                  Residential EMF
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Home safety & audits
                </div>
              </button>

              <button
                onClick={() => onSelectQuery("stray voltage")}
                className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-emerald-400 text-left transition-all active:scale-95 shadow-2xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold mb-2 group-hover:scale-105 transition-transform">
                  ⚡
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-600 leading-tight">
                  Stray Voltage
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Ground surge neutralization
                </div>
              </button>

              <button
                onClick={() => onSelectQuery("pacemaker")}
                className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-rose-400 text-left transition-all active:scale-95 shadow-2xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-bold mb-2 group-hover:scale-105 transition-transform">
                  ❤️
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-rose-600 leading-tight">
                  Medical Implants
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Pacemaker EMI triage
                </div>
              </button>

              <button
                onClick={() => onSelectQuery("expert witness")}
                className="p-3 rounded-xl bg-white border border-slate-200/90 hover:border-amber-400 text-left transition-all active:scale-95 shadow-2xs group"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-bold mb-2 group-hover:scale-105 transition-transform">
                  ⚖️
                </div>
                <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 leading-tight">
                  Legal Due Diligence
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Court certified reports
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* When search query is entered: Show Filter Tabs and Live Match Cards */
        <div className="space-y-2.5">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold whitespace-nowrap transition-all ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
            <span className="text-[10px] font-medium text-slate-400 ml-auto shrink-0">
              {results.length} found
            </span>
          </div>

          {/* Results List */}
          {results.length > 0 ? (
            <div className="space-y-1.5">
              {results.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      onNavigateToItem(item);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer active:scale-[0.99] group"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                        <ItemIcon className="w-3.5 h-3.5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded-sm border ${item.badgeColor}`}>
                            {item.categoryLabel}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate">
                            {item.subtitle}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-xs text-slate-900 group-hover:text-blue-600 leading-tight line-clamp-1">
                          {item.title}
                        </h3>

                        <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0 self-center transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-2xs space-y-3 mt-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                🔍
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  No matches for "{searchQuery}"
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-[260px] mx-auto leading-relaxed">
                  Try searching for <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => onSelectQuery("5G")}>5G</span>, <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => onSelectQuery("voltage")}>voltage</span>, or <span className="text-blue-600 font-semibold cursor-pointer" onClick={() => onSelectQuery("pacemaker")}>pacemaker</span>.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Direct Expert Dispatch Hotline
                </span>
                <a
                  href="tel:347-491-9867"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 mt-1 hover:underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Chief Engineer: 347-491-9867</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

