import { useState } from 'react';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = ({ placeholder }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/product-search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="max-w-xs mx-auto">
      <div className="flex w-full h-8 items-stretch rounded-full shadow-sm">
        <Input
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 rounded-l-full rounded-r-none border-r-0 bg-gray-50 h-full text-xs focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onClick={handleSearch}
          size="sm"
          className="rounded-l-none rounded-r-full border-l-0 bg-gray-50 hover:bg-gray-100 text-gray-600 px-2 h-full"
          variant="outline"
        >
          <Search className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;