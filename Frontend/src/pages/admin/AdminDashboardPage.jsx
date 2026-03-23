import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, Skeleton } from "@mui/material";
import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import SalesTrendChart from "../../components/admin/SalesTrendChart";
import BusiestHoursChart from "../../components/admin/BusiestHoursChart";
import LiveOrdersTable from "../../components/admin/LiveOrdersTable";
import {
  CalendarDays,
  ChevronDown,
  ShoppingBag,
  Banknote,
  Clock,
  Star,
} from "lucide-react";
import adminService from "../../api/services/admin.service.js";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await adminService.getDashboardStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout activePath="/admin/dashboard">
      {/* Page Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
            Dashboard Overview
          </Typography>
          <Typography variant="body2" sx={{ color: "grey.500" }}>
            Welcome back, Admin! Here's a look at today's performance.
          </Typography>
        </Box>
      </Box>

      {/* Stat Cards — responsive grid */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              height={140}
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <StatCard
              label="Today's Orders"
              value={stats?.todayOrders || 0}
              trend={`${stats?.todayOrdersChange >= 0 ? "+" : ""}${stats?.todayOrdersChange}% from yesterday`}
              trendDirection={stats?.todayOrdersChange >= 0 ? "up" : "down"}
              icon={ShoppingBag}
              delay={0.05}
            />
          )}
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              height={140}
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <StatCard
              label="Today's Sales"
              value={`Rs.${stats?.todaySales?.toLocaleString() || 0}`}
              trend={`${stats?.todaySalesChange >= 0 ? "+" : ""}${stats?.todaySalesChange}% from yesterday`}
              trendDirection={stats?.todaySalesChange >= 0 ? "up" : "down"}
              icon={Banknote}
              delay={0.1}
            />
          )}
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              height={140}
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <StatCard
              label="Active Slots"
              value={`${stats?.activePickupSlots || 0} / ${stats?.totalPickupSlots || 0}`}
              trend={`${Math.round((stats?.activePickupSlots / stats?.totalPickupSlots) * 100) || 0}% capacity`}
              trendDirection="neutral"
              icon={Clock}
              delay={0.15}
            />
          )}
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              height={140}
              sx={{ borderRadius: 2 }}
            />
          ) : (
            <StatCard
              label="Top Selling Item"
              value={stats?.topSellingItem?.name || "N/A"}
              trend={`${stats?.topSellingItem?.unitsSold || 0} units sold`}
              trendDirection="neutral"
              icon={Star}
              delay={0.2}
            />
          )}
        </Grid>
      </Grid>

      {/* Charts — responsive: stacked on mobile, side-by-side on desktop */}
      <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <SalesTrendChart />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <BusiestHoursChart />
        </Grid>
      </Grid>

      {/* Live Orders Table */}
      <Box sx={{ overflowX: "auto", width: "100%" }}>
        <LiveOrdersTable />
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
