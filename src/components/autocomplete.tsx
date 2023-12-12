import {
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { ReactNode, forwardRef, useRef, useState } from 'react';

export type AutocompleteProps<T = string> = {
  renderOption?: (option: T) => ReactNode;
  options: T[];
  filter?: (option: T, searchText: string) => boolean;
  value: T;
  onChange: (value: T) => void;
};
const Autocomplete = forwardRef(function <T>(
  { renderOption, options, filter, onChange, value }: AutocompleteProps<T>,
  ref: any,
) {
  const inputRef = useRef<HTMLDivElement>(null);
  const [searchText, setSearchText] = useState('');
  const filteredOptions = options.filter((option) =>
    filter ? filter(option, searchText) : true,
  );
  return (
    <FormControl ref={ref}>
      <Menu isOpen={!!searchText} placement="bottom" strategy="fixed">
        <InputGroup ref={inputRef}>
          {value && (
            <InputLeftAddon
              w={'auto'}
              children={renderOption ? renderOption(value) : `${value}`}
            />
          )}
          <Input
            placeholder="Search..."
            variant="filled"
            value={searchText}
            onChange={(e) => setSearchText(e.currentTarget.value)}
          />
        </InputGroup>
        <MenuList
          w="100%"
          rootProps={{
            w: inputRef.current?.getBoundingClientRect().width ?? 0 + 'px',
            top:
              (inputRef.current?.getBoundingClientRect().bottom ?? 0) +
              5 +
              'px !important',
            left: '25px !important',
          }}
        >
          {filteredOptions.map((option, index) => (
            <MenuItem
              key={`auto-complete-${index}`}
              onClick={() => {
                setSearchText('');
                onChange(option);
              }}
            >
              {renderOption ? renderOption(option) : `${option}`}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormControl>
  );
});

export default Autocomplete;
