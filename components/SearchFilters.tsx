import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DisplayMode } from '../types';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleClearSearch: () => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClearSearch,
  displayMode,
  setDisplayMode,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div className="relative flex-1">
        <div className="relative group">
          <Input
            type="text"
            placeholder="Search for a pirate..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-12 pr-12 py-4 bg-white/5 border-yellow-500/20 rounded-2xl
              focus:ring-yellow-500/30 focus:border-yellow-500/30 group-hover:bg-white/10 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1.5 h-6 w-6 text-yellow-500/50" />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-4 text-yellow-500/50 hover:text-yellow-500 transition-colors"
            >
              <X className="h-6 w-6 top-1.5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex space-x-3">
        {['Current', 'Total', 'Spent'].map((mode) => (
          <Button
            key={mode}
            onClick={() => setDisplayMode(mode.toLowerCase() as DisplayMode)}
            className={`px-8 py-4 rounded-xl transition-all duration-300 text-lg ${
              displayMode === mode.toLowerCase()
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-bold shadow-lg shadow-yellow-500/25'
                : 'bg-white/5 text-yellow-500/70 hover:bg-yellow-500/20 border border-yellow-500/20'
            }`}
          >
            {mode}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;