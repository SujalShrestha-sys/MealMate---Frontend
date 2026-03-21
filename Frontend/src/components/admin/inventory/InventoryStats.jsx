import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { motion } from "motion/react";

const MotionPaper = motion.create(Paper);

const StatCard = ({ label, value, trend, trendColor = "success.main", delay = 0 }) => {
  return (
    <MotionPaper
      elevation={0}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 1, 
        border: "1px solid",
        borderColor: "grey.100",
        transition: "all 0.3s ease-in-out",
        height: "100%",
        minWidth: { xs: "260px", sm: "auto" },
        bgcolor: "#fff",
        "&:hover": {
          borderColor: "#ff6e20ff",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "grey.500",
          fontWeight: 600,
          mb: 1,
          fontSize: "0.85rem",
        }}
      >
        {label}
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontWeight: 600, mb: 1, color: "#271e16ff" }}
      >
        {value}
      </Typography>
      {trend && (
        <Typography
          sx={{ color: trendColor, fontSize: "0.80rem", fontWeight: 700 }}
        >
          {trend}
        </Typography>
      )}
    </MotionPaper>
  );
};

const InventoryStats = ({ stats }) => {
  const cards = [
    {
      label: "Total Items",
      value: stats.total || 0,
      trend: "In your inventory",
      trendColor: "grey.400",
    },
    {
      label: "Items Low on Stock",
      value: stats.lowStock || 0,
      trend: stats.lowStock > 0 ? "Requires restock" : "All good",
      trendColor: stats.lowStock > 0 ? "#ea580c" : "#16a34a",
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock || 0,
      trend: stats.outOfStock > 0 ? "Immediate action" : "None currently",
      trendColor: stats.outOfStock > 0 ? "#ef4444" : "grey.400",
    },
  ];

  return (
    <Box
      sx={{
        
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        gap: 3,
        mb: 4,
        overflowX: { xs: "auto", sm: "visible" },
        pb: { xs: 2, sm: 0 },
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": { display: "none" },
        "& > *": { flex: { xs: "0 0 auto", sm: 1 } },
      }}
    >
      {cards.map((card, index) => (
        <StatCard key={card.label} {...card} delay={index * 0.05} />
      ))}
    </Box>
  );
};

export default InventoryStats;
