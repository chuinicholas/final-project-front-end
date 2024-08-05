import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ConfettiExplosion from "react-confetti-explosion";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function PayLoad() {
  const [progress, setProgress] = useState(10);
  const [success, setSuccess] = useState(false);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 500);

    // Update success state when progress reaches 100
    if (progress === 100) {
      setSuccess(true);
      setIsExploding(true);
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [progress]);

  useEffect(() => {
    if (success) {
      // Delay redirecting to the success page by 2 seconds
      const delayRedirect = setTimeout(() => {
        window.location.href = "/record";
      }, 2000);

      return () => clearTimeout(delayRedirect);
    }
  }, [success]);

  return (
    <div className={StyleSheet.payLoadBox}>
      <CircularProgressWithLabel value={progress} size={100} />
      {success ? <h2>成功付款</h2> : null}
      {isExploding ? (
        <ConfettiExplosion
          style={{ position: "relative", left: "50px", top: "-80px" }}
          width={1600}
          duration={3000}
          onComplete={() => setIsExploding(false)}
          particleCount={200}
        />
      ) : null}
    </div>
  );
}
