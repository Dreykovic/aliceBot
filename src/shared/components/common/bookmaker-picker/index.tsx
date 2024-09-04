import { AnimatePresence, motion } from 'framer-motion';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import { Bookmaker } from '@/shared/types/models-interfaces';
export interface BookmakerSelector {
  id: string;
  open: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onChange: (value: Bookmaker['id']) => void;
  selectedValue: Bookmaker;
  dataArray?: Bookmaker[];
  isLoading: Boolean;
}

export default function BookmakerSelector({
  id,
  open,
  disabled = false,
  onToggle,
  onChange,
  selectedValue,
  dataArray,
  isLoading,
}: BookmakerSelector) {
  const ref = useRef<HTMLDivElement>(null);
  // const { data: BOOKMAKERS, isLoading } = useGetBookmakersQuery();
  useEffect(() => {
    const mutableRef = ref as MutableRefObject<HTMLDivElement | null>;

    const handleClickOutside: EventListenerOrEventListenerObject = (
      event: Event,
    ) => {
      if (
        mutableRef.current &&
        !mutableRef.current.contains(event.target as Node) &&
        open
      ) {
        onToggle();
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onToggle, open]);

  const [query, setQuery] = useState('');
  const inputClasses =
    'bg-neutral rounded pl-6 py-2  focus:outline-none w-full text-neutral-content focus:bg-base-100  focus:text-neutral';
  return (
    <div ref={ref} className={`w-full m-1 `}>
      <div className="relative w-full">
        <button
          type="button"
          className={` relative w-full ${inputClasses}`}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={onToggle}
          disabled={disabled}
        >
          {selectedValue ? (
            <span className="truncate flex items-center">
              <img
                alt={`${selectedValue.nom_bookmaker}`}
                src={`assets/svg/bookmakers/${selectedValue.nom_bookmaker}.svg`}
                className={'inline mr-2 h-4 rounded-sm'}
              />
              {selectedValue.nom_bookmaker}
            </span>
          ) : (
            <span className="truncate flex items-center">
              Choisir le Bookmaker
            </span>
          )}
          <span
            className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
              disabled ? 'hidden' : ''
            }`}
          >
            <svg
              className="h-5 w-5 text-neutral-content"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className="absolute z-10 mt-1 w-full bg-base-100 shadow-lg max-h-80 rounded-md text-base ring-1 ring-base-content  ring-opacity-5 focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              <div className="sticky top-0 z-10 bg-base-100">
                <li className=" text-gray-900 cursor-default select-none relative py-2 px-3">
                  <input
                    type="search"
                    name="search"
                    autoComplete={'off'}
                    className="focus:ring-primary focus:border-primary block w-full h-10 sm:text-sm border-neutral rounded-md"
                    placeholder={'RechercherUn Bookmaker'}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </li>
                <hr />
              </div>

              <div
                className={
                  'max-h-64  scrollbar-track-accent scrollbar-thumb-accent hover:scrollbar-thumb-secondary scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll'
                }
              >
                {dataArray?.filter((bookmaker) =>
                  bookmaker.nom_bookmaker
                    .toLowerCase()
                    .startsWith(query.toLowerCase()),
                ).length === 0 || isLoading ? (
                  <li className="text-neutral cursor-default select-none relative py-2 pl-3 pr-9">
                    No bookmaker found
                  </li>
                ) : (
                  dataArray
                    ?.filter((bookmaker) =>
                      bookmaker.nom_bookmaker
                        .toLowerCase()
                        .startsWith(query.toLowerCase()),
                    )
                    .map((value, index) => {
                      return (
                        <li
                          key={`${id}-${index}`}
                          className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-accent transition"
                          id="listbox-option-0"
                          role="option"
                          onClick={() => {
                            onChange(value.id);
                            setQuery('');
                            onToggle();
                          }}
                        >
                          <img
                            alt={`${value.nom_bookmaker}`}
                            src={`assets/svg/bookmakers/${value.nom_bookmaker}.svg`}
                            className={'inline mr-2 h-4 rounded-sm'}
                          />

                          <span className="font-normal truncate">
                            {value.nom_bookmaker}
                          </span>
                          {value.id === selectedValue?.id ? (
                            <span className="text-primary absolute inset-y-0 right-0 flex items-center pr-8">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          ) : null}
                        </li>
                      );
                    })
                )}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
