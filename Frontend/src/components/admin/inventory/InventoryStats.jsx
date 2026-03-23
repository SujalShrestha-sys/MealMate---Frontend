import { Box } from "@mui/material";
import StatCard from "../StatCard";
import { Package, AlertTriangle, XCircle } from "lucide-react";



const InventoryStats = ({ stats }) => {
  const cards = [
    {
      label: "Total Items",
      value: stats.total || 0,
      trend: "In your inventory",
      trendColor: "grey.400",
      icon: Package,
    },
    {
      label: "Low on Stock",
      value: stats.lowStock || 0,
      trend: stats.lowStock > 0 ? "Requires restock" : "All good",
      trendColor: stats.lowStock > 0 ? "#ea580c" : "#16a34a",
      icon: AlertTriangle,
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock || 0,
      trend: stats.outOfStock > 0 ? "Immediate action" : "None currently",
      trendColor: stats.outOfStock > 0 ? "#ef4444" : "grey.400",
      icon: XCircle,
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
