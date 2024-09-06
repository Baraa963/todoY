import {Typography,useState,useEffect,Box,CircularProgress} from "../Imports/Imports";


export default function Loading({ setLoading }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 100);

    setTimeout(() => {
      setLoading(false); 
    }, 1300); 

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="determinate" value={progress} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="white">
            {`${Math.round(progress)}%`}
          </Typography>
        </Box>
      </Box>
      
    </>
  );
}
