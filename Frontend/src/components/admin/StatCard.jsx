import { Box, Paper, Typography } from "@mui/material";
import { motion } from "motion/react";

const MotionPaper = motion.create(Paper);

const StatCard = ({
  label,
  value,
  trend,
  trendDirection = "up",
  trendColor: customTrendColor,
  icon: Icon,
  delay = 0,
}) => {
  const trendColor = customTrendColor || (trendDirection === "up" ? "success.main" : "grey.400");

  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      sx={{
        p: { xs: 2.5, sm: 3 }, // Reduced padding on mobile
        borderRadius: 2,
        border: "1px solid",
        borderColor: "grey.50",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "primary.light",
          boxShadow: "0 4px 16px rgba(249,115,22,0.06)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "grey.500",
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          {label}
        </Typography>
        {Icon && (
          <Box sx={{ color: "primary.main", opacity: 0.7 }}>
            <Icon size={18} />
          </Box>
        )}
      </Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 600, mb: 1, fontSize: "1.3rem" }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          color: trend ? trendColor : "transparent",
          fontSize: "0.80rem",
          fontWeight: 600,
          minHeight: "1.2rem", // Reserve space for trend text
        }}
      >
        {trend || "Placeholder"}
      </Typography>
    </MotionPaper>
  );
};

export default StatCard;
