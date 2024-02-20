import React, { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { axiosAction } from '@/app/lib/api-service';
import { ResponseModel } from '@/app/lib/model/reponse-model';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface InputSearchComponentProps {
  placeholder: string;
  url: string;
  inputId: string;
  onSearch: (data: ResponseModel) => void;

}

const InputSearchComponent: React.FC<InputSearchComponentProps> = ({ onSearch, placeholder, url, inputId }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const fetchData = async () => {
    try {
      const response = await axiosAction.get(`${url}${debouncedSearchTerm}`);
      onSearch(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [debouncedSearchTerm]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor={inputId} className="sr-only">
        Search
      </label>
      <input
        type="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default InputSearchComponent;
