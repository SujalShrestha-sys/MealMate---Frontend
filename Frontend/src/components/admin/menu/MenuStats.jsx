import React from "react";
import { Grid } from "@mui/material";
import StatCard from "../StatCard";
import { UtensilsCrossed, Tags, PieChart, TrendingUp } from "lucide-react";

const MenuStats = ({ stats, loading }) => {
  return (
    <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          label="Total Dishes"
          value={stats?.totalDishes || 0}
          icon={UtensilsCrossed}
          trend="+2 this week"
          trendDirection="up"
          delay={0.1}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          label="Categories"
          value={stats?.totalCategories || 0}
          icon={Tags}
          trend="All active"
          trendDirection="up"
          delay={0.2}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          label="Available Items"
          value={stats?.availableItems || 0}
          icon={PieChart}
          trend="95% of total"
          trendDirection="up"
          delay={0.3}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <StatCard
          label="Top Category"
          value={stats?.topCategory || "N/A"}
          icon={TrendingUp}
          trend="Most items"
          trendDirection="neutral"
          delay={0.4}
        />
      </Grid>
    </Grid>
  );
};

export default MenuStats;
