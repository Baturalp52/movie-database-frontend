'use client';

import { Button, ButtonGroup, useBreakpointValue } from '@chakra-ui/react';
import Iconify from './iconify';

type PaginationProps = {
  page: number;
  setPage: (page: number | ((page: number) => number)) => void;
  totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const maxButtonsToShow =
    useBreakpointValue({ base: 5, lg: 12 }, { ssr: false }) ?? 0;
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const renderPageButtons = () => {
    const buttons = [];

    const startPage = Math.max(1, page - Math.floor(maxButtonsToShow / 2));
    const endPage = Math.min(startPage + maxButtonsToShow - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          colorScheme={i === page ? 'orange' : 'gray'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>,
      );
    }

    return buttons;
  };

  return (
    <ButtonGroup>
      <Button
        colorScheme={'gray'}
        isDisabled={page === 1}
        onClick={() => {
          if (page - 1) {
            setPage((page) => page - 1);
          }
        }}
      >
        <Iconify icon="ph:arrow-left-thin" boxSize={6} />
      </Button>
      {renderPageButtons()}
      <Button
        colorScheme={'gray'}
        isDisabled={page === totalPages}
        onClick={() => {
          if (page !== totalPages) {
            setPage((page) => page + 1);
          }
        }}
      >
        <Iconify icon="ph:arrow-right-thin" boxSize={6} />
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
