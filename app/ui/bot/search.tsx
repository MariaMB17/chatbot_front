'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const WAIT_BETWEEN_CHANGE = 300;

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string | undefined>(searchParams.get('query')?.toString());

  const handleSearch = useDebouncedCallback((term: string) => {
    const sanitizedTerm = term.replace(/[^\w\s]/gi, ''); // Eliminar caracteres especiales y símbolos
    const params = new URLSearchParams(searchParams);
    if (sanitizedTerm) {
      params.set('query', sanitizedTerm);
    } else {
      params.delete('query');
    }
    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);
  }, WAIT_BETWEEN_CHANGE);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        onChange={handleChange}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={searchTerm || ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}