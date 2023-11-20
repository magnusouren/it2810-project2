import { Box, CircularProgress } from '@mui/material';

type SpinnerProps = {
  width: string;
  height: string;
};

export const Spinner = ({ width, height }: SpinnerProps) => {
  return (
    <Box sx={{ display: 'flex', width: width, height: height, justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
};
