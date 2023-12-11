import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cropper, ReactCropperElement } from 'react-cropper';
import base64toFile from '@/utils/base64-to-file';
import Iconify from './iconify';
import { Box, BoxProps, Button, Text } from '@chakra-ui/react';
import Image from './image';

type Props = {
  src: string;
  onImageSelected: (file: File) => void;
  minCropBoxHeight?: number;
  minCropBoxWidth?: number;
} & BoxProps;

const UploadAvatar = ({
  src,
  onImageSelected,
  minCropBoxHeight = 10,
  minCropBoxWidth = 10,
  ...containerProps
}: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const [imgPreview, setImgPreview] = useState(src);
  const [imgToCrop, setImgToCrop] = useState<string | null>(null);

  useEffect(() => {
    if (src) {
      setImgPreview(src);
    }
  }, [src]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onload = () => {
      setImgToCrop(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSaveCroppedArea = () => {
    const croppedAreaBase64 =
      cropperRef.current?.cropper.getCroppedCanvas().toDataURL() ?? '';
    const file = base64toFile(croppedAreaBase64);
    setImgPreview(croppedAreaBase64);
    onImageSelected(file);
    setImgToCrop(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      _hover={{
        cursor: 'pointer',
      }}
      {...containerProps}
    >
      {imgToCrop ? (
        <div style={{ width: '100%', position: 'relative' }}>
          <Cropper
            ref={cropperRef}
            style={{ height: 400, width: '100%' }}
            zoomTo={0.5}
            aspectRatio={1 / 1}
            src={imgToCrop}
            viewMode={1}
            minCropBoxHeight={minCropBoxHeight}
            minCropBoxWidth={minCropBoxWidth}
            guides={true}
          />
          <Button
            variant="rounded"
            onClick={handleSaveCroppedArea}
            position="absolute"
            bottom={-5}
            left={'50%'}
            transform={'translateX(-50%)'}
          >
            Save
          </Button>
        </div>
      ) : (
        <Box
          position="relative"
          {...getRootProps()}
          borderRadius="50%"
          overflow="hidden"
        >
          <input {...getInputProps()} />
          {imgPreview && <Image src={imgPreview} alt="Selected avatar" />}
          <Box
            position="absolute"
            top={'50%'}
            left={'50%'}
            transform={'translate(-50%,-50%)'}
            bgColor="gray.100"
            opacity={isDragActive ? 0.7 : 0}
            transition={'opacity 0.3s ease'}
            _hover={{
              opacity: 0.7,
            }}
            height={'100%'}
            width={'100%'}
            p={2}
          >
            <Box
              border="2px dashed black"
              borderRadius="50%"
              p={2}
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <Iconify icon="lets-icons:upload" boxSize={'60px'} />
              <Text fontSize="2xs" textAlign="center">
                Drag and drop an image here, or click to select an image
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UploadAvatar;
