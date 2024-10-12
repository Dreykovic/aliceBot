import React, { useState } from 'react';
import DataSelector from '../data-select';

interface Bookmaker {
  id: number;
  nom_bookmaker: string;
  logoUrl: string;
}

const bookmakers: Bookmaker[] = [
  { id: 1, nom_bookmaker: 'Bet365', logoUrl: '/assets/bet365.png' },
  { id: 2, nom_bookmaker: 'Unibet', logoUrl: '/assets/unibet.png' },
  { id: 3, nom_bookmaker: 'William Hill', logoUrl: '/assets/williamhill.png' },
];

const BookmakerSelector: React.FC = () => {
  const [selectedBookmaker, setSelectedBookmaker] = useState<Bookmaker | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen(!open);
  const handleChange = (bookmaker: Bookmaker) =>
    setSelectedBookmaker(bookmaker);

  return (
    <div className="w-full max-w-sm mx-auto">
      <DataSelector
        id="bookmaker-selector"
        open={open}
        disabled={false}
        onToggle={handleToggle}
        onChange={handleChange}
        selectedValue={selectedBookmaker || undefined}
        dataArray={bookmakers}
        isLoading={false}
        filterFunction={(item, query) =>
          item.nom_bookmaker.toLowerCase().includes(query.toLowerCase())
        }
        placeholder="Select a bookmaker"
        noDataText="No bookmakers found"
      />
      {selectedBookmaker && (
        <p className="mt-4">
          Selected Bookmaker: {selectedBookmaker.nom_bookmaker}
        </p>
      )}
    </div>
  );
};

export default BookmakerSelector;
