import { Input, InputGroup } from '@chakra-ui/react';
import { cloneElement, forwardRef } from 'react';
import ReactAutocomplete from 'react-autocomplete';
import { List } from 'react-virtualized';

export type AutocompleteProps = ReactAutocomplete.Props;

const Autocomplete = forwardRef(function (props: AutocompleteProps, ref: any) {
  return (
    <ReactAutocomplete
      ref={ref}
      {...props}
      renderMenu={(items) => (
        <List
          style={{ zIndex: 9999 }}
          height={200}
          width={400}
          rowRenderer={(e) => {
            const Item: any = e?.index ? items[e?.index] : <></>;
            const onMouseDown = (e: any) => {
              if (e.button === 0) {
                Item.props.onClick(e);
              }
            };

            return cloneElement(Item, {
              ...Item.props,
              onMouseDown,
              style: {
                ...e.style,
                zIndex: 9999,
              },
            });
          }}
          rowCount={items.length}
          rowHeight={35}
        />
      )}
      renderInput={(inputProps: any) => (
        <InputGroup>
          <Input {...inputProps} width="100%" />
        </InputGroup>
      )}
    />
  );
});

export default Autocomplete;
