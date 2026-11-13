import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const SelectContext = createContext(null);

export function Select({ value, onValueChange, children, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const containerRef = useRef(null);

  const selectedValue = value !== undefined ? value : internalValue;

  const handleSelect = (val) => {
    if (value === undefined) setInternalValue(val);
    if (onValueChange) onValueChange(val);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedValue, handleSelect }}>
      <div ref={containerRef} className="relative w-full text-left">
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className = '', placeholder }) {
  const { isOpen, setIsOpen, selectedValue } = useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      className={`flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 shadow-2xs transition-all hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <span className="truncate">
        {children || <span className="text-slate-400">{placeholder || 'Select an option'}</span>}
      </span>
      <ChevronDown 
        className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} 
      />
    </button>
  );
}

export function SelectValue({ placeholder = 'Select an option' }) {
  const { selectedValue } = useContext(SelectContext);
  return (
    <span className={selectedValue ? 'font-medium text-slate-900' : 'text-slate-400'}>
      {selectedValue || placeholder}
    </span>
  );
}

export function SelectContent({ children, className = '' }) {
  const { isOpen } = useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <div
      className={`absolute left-0 top-full z-50 mt-1.5 w-full min-w-[8rem] overflow-hidden rounded-xl border border-slate-200/90 bg-white p-1 text-slate-900 shadow-xl shadow-blue-950/15 animate-in fade-in-80 slide-in-from-top-1 duration-150 ${className}`}
      style={{ maxHeight: '220px', overflowY: 'auto' }}
    >
      <div className="space-y-0.5 no-scrollbar">
        {children}
      </div>
    </div>
  );
}

export function SelectItem({ value, children, className = '' }) {
  const { selectedValue, handleSelect } = useContext(SelectContext);
  const isSelected = selectedValue === value;

  return (
    <div
      onClick={() => handleSelect(value)}
      role="option"
      aria-selected={isSelected}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-lg py-2.5 pl-8 pr-3 text-xs font-medium outline-none transition-colors active:scale-[0.99] ${
        isSelected
          ? 'bg-blue-50 text-blue-700 font-bold'
          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
      } ${className}`}
    >
      <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4 text-blue-600 stroke-[2.5]" />}
      </span>
      <span className="truncate">{children}</span>
    </div>
  );
}

// Convenient unified Select component
export function ShadcnSelect({ 
  value, 
  onValueChange, 
  options = [], 
  placeholder = 'Select an option',
  className = '',
  triggerClassName = ''
}) {
  const selectedOption = options.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : '';

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={triggerClassName}>
        {displayLabel ? (
          <span className="font-semibold text-slate-900 truncate">{displayLabel}</span>
        ) : (
          <span className="text-slate-400 font-normal">{placeholder}</span>
        )}
      </SelectTrigger>
      <SelectContent className={className}>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ShadcnSelect;
