import { useState, useEffect } from "react";

import { LinearProgress } from "@mui/material";

const Splash = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          // navigate("/get-started");
          //   navigate("/start");
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        backgroundColor: "#00000000",
        height: "10px",
        "& .MuiLinearProgress-bar": {
          backgroundColor: "#EF4444",
        },
      }}
    />
  );
};

export default Splash;
