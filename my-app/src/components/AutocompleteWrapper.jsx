import React, { ChangeEvent, FC, ReactElement, useState } from 'react';

import { FieldRenderProps } from 'react-final-form';

import TextField from '@material-ui/core/TextField';
import Autocomplete, { AutocompleteProps, RenderInputParams } from '@material-ui/lab/Autocomplete';

declare interface IAutoCompleteWrapperProps {
  max: number;
}

declare interface IOption {
  value: string;
  label: string;
}

type AutoCompleteWrapperProps = AutocompleteProps<IOption> & FieldRenderProps<string> & IAutoCompleteWrapperProps;

export const AutoCompleteWrapper: FC<AutoCompleteWrapperProps> = props => {
  const { input, meta, helperText, max = Infinity, options = [], ...rest } = props;
  const { name, onChange, value, multiple, ...restInput } = input;
  const label = rest.label;
  const placeholder = rest.placeholder;

  const error = meta.error || meta.submitError;
  const hasError = error && (meta.dirty || meta.submitFailed);

  const [maxReached, setMaxReached] = useState(false);

  if (multiple) {
    return (
      <Autocomplete
        {...rest}
        multiple={multiple}
        options={maxReached ? [] : options.filter((option: IOption) => !value.includes(option.value))}
        value={options.filter((option: IOption) => value.includes(option.value))}
        onChange={(_e: ChangeEvent<{}>, values: Array<IOption>): void => {
          setMaxReached(value.length >= max - 1);
          onChange(values.map((option: IOption) => option.value));
        }}
        getOptionLabel={(option: IOption): string => option.label}
        // noOptionsText={
        //   maxReached
        //     ? formatMessage({id: "components.autocomplete.max"}, {max})
        //     : formatMessage({id: "components.autocomplete.no"})
        // }
        renderInput={(params: RenderInputParams): ReactElement => (
          <TextField
            {...params}
            {...restInput}
            label={label}
            placeholder={placeholder}
            helperText={hasError ? error.toString() : helperText}
            error={hasError}
            fullWidth
          />
        )}
      />
    );
  } else {
    return (
      <Autocomplete
        {...rest}
        multiple={multiple}
        options={options}
        value={options.find((option: IOption) => option.value === value)}
        onChange={(_e: ChangeEvent<{}>, option: IOption | null): void => {
          return onChange(option ? option : null);
        }}
        onInputChange={(e, value) => {
          onChange(value);
        }}
        getOptionLabel={(option: IOption): string => option.label}
        // noOptionsText={formatMessage({id: "components.autocomplete.no"})}
        renderInput={(params: RenderInputParams): ReactElement => (
          <TextField
            {...params}
            {...restInput}
            label={label}
            placeholder={placeholder}
            helperText={hasError ? error.toString() : helperText}
            error={hasError}
            fullWidth
          />
        )}
      />
    );
  }
};
