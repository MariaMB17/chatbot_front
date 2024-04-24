import i18n from '@/app/translate/i18n';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import React, { useState, useRef } from 'react';

interface NumericInputProps {
  initialValue?: string;
  onBlur?: (data: resultInput) => void;
  onChange?: (data: resultInput) => void;
  placeholder?: string;
  id: string;
  name: string;
}

interface resultInput {
  newValue: string,
  property: string
}

const NumericInput: React.FC<NumericInputProps> = ({
  initialValue,
  onBlur,
  onChange,
  placeholder,
  id,
  name
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  let res: resultInput

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formattedValue = new Intl.NumberFormat(i18n.language, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(formattNumber(e.target.value));
    setInputValue(formattedValue);
    if (onBlur) {
      onBlur({ newValue: formattedValue, property: name });      
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {

    const inputElement = e.target as HTMLInputElement; // Cast to HTMLInputElement
    const newValue = inputElement.value === '' ? '0' : inputElement.value;
    const newNumber1 = formattNumber(newValue)
    const NS = newNumber1.toString()

    if (
      e instanceof KeyboardEvent &&
      (e.key === 'Backspace' || e.code === 'Backspace')
    ) {
      setInputValue(newValue);
      if (onChange) {
        onChange({ newValue, property: name });
      }
    } else if (/^[0-9]+(\.[0-9]+)?$/.test(NS)) {
      ///^[0-9]*\\.?[0-9]*$/.test(NS)
      setInputValue(newValue);
      if (onChange) {
        onChange({ newValue, property: name });
      }
    }
  };

  const formattNumber = (value: string) => {
    let newNumber = Number(value)
    if (isNaN(newNumber)) {
      let N1 = value.replace(/\./g, '');
      const newNumber1 = N1.replace(/\,/g, '.');
      return +newNumber1
    }
    return +value
  }

  return (
    <div>
      <input
        type="type"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        id={id}
        ref={inputRef}
        name={name}
        value={inputValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder={placeholder || 'Ingresa un número'}
        required
        maxLength={9}
      />
      <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
};

export default NumericInput;
