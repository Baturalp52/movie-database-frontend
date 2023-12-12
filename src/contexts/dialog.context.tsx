import { createContext, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export interface IHandleOpenParams {
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  colorScheme: string;
  handleClose: () => Promise<void>;
}

export type DailogContextType = {
  open: (params: IHandleOpenParams) => void;
};

const DialogContext = createContext<DailogContextType>({
  open: () => {},
});

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [colorScheme, setColorScheme] = useState('');
  const [closeFn, setCloseFn] = useState<() => Promise<void>>(async () => {});
  const cancelRef = useRef(null);

  const handleOpen = ({
    title,
    description,
    cancelText,
    confirmText,
    colorScheme,
    handleClose,
  }: IHandleOpenParams) => {
    setTitle(title);
    setDescription(description);
    setCancelText(cancelText);
    setConfirmText(confirmText);
    setColorScheme(colorScheme);
    setCloseFn(() => handleClose);
    onOpen();
  };

  return (
    <DialogContext.Provider
      value={{
        open: handleOpen,
      }}
    >
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>{description}</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                {cancelText}
              </Button>
              <Button
                isLoading={loading}
                colorScheme={colorScheme}
                onClick={async () => {
                  setLoading(true);
                  await closeFn();
                  setLoading(false);
                  onClose();
                }}
                ml={3}
              >
                {confirmText}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      {children}
    </DialogContext.Provider>
  );
}

export default DialogContext;
