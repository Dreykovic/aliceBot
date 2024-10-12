import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface DataSelectorProps<T> {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onChange: (value: T) => void;
  selectedValue?: T;
  dataArray?: T[];
  isLoading: boolean;
  filterFunction?: (item: T, query: string) => boolean;

  placeholder?: string;
  noDataText?: string;
}

export default function DataSelector<T>({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
  dataArray = [],
  isLoading,
  filterFunction = (item, query) =>
    String(item).toLowerCase().includes(query.toLowerCase()),

  placeholder = 'Choose an item',
  noDataText = 'No items found',
}: DataSelectorProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && open) {
        onToggle();
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onToggle]);

  const filteredData = dataArray.filter((item) => filterFunction(item, query));

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        className="bg-neutral rounded pl-6 py-2 focus:outline-none w-full"
        onClick={onToggle}
        disabled={disabled}
      >
        <span className="flex items-center truncate">
          {selectedValue ? String(selectedValue) : placeholder}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg max-h-80 rounded-md"
          >
            <li className="sticky top-0 bg-base-100 py-2 px-3">
              <input
                type="search"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full border rounded-md"
              />
            </li>
            <div className="max-h-64 overflow-y-auto">
              {isLoading ? (
                <li className="p-2 text-center">Loading...</li>
              ) : filteredData.length === 0 ? (
                <li className="p-2 text-center">{noDataText}</li>
              ) : (
                filteredData.map((item, index) => (
                  <li
                    key={`${id}-${index}`}
                    onClick={() => {
                      onChange(item);
                      setQuery('');
                      onToggle();
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <span>{String(item)}</span>
                  </li>
                ))
              )}
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
