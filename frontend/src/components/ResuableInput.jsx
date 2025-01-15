import React, { useId } from 'react';
import { Controller } from 'react-hook-form';

const ReusableInput = React.forwardRef(({ name, control, defaultValue = '', label, type = 'text', className = '', ...rest }, ref) => {
  const id = useId();

  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block text-sm font-semibold text-gray-700">{label}</label>}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              id={id}
              ref={ref}
              type={type}
              {...rest}
              className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${fieldState?.invalid ? 'border-red-500' : 'border-gray-300'} text-gray-900 ${className}`}
            />
            {fieldState?.invalid && (
              <span className="text-sm text-red-500">{fieldState?.error?.message}</span>
            )}
          </>
        )}
      />
    </div>
  );
});

export default ReusableInput;
