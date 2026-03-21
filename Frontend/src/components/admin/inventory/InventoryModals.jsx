import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { X, AlertTriangle } from "lucide-react";
import { Box } from "@mui/material";

const modalPaperProps = {
  sx: {
    borderRadius: 1, // Matches dashboard (16px from theme)
    p: 1,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

export const AddEditModal = ({ open, onClose, onSave, item = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    quantity: 0,
    lowStockThreshold: 5,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        unit: item.unit,
        quantity: item.quantity,
        lowStockThreshold: item.lowStockThreshold,
      });
    } else {
      setFormData({ name: "", unit: "", quantity: 0, lowStockThreshold: 5 });
    }
  }, [item, open]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Ensure numerical fields are parsed correctly for backend validation
    const processedValue = type === "number" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={modalPaperProps}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 3,
          px: 3,
        }}
      >
        <Typography
          component="span"
          variant="h6"
          sx={{ fontWeight: 700, color: "#1e293b", fontSize: "1.25rem" }}
        >
          {item ? "Edit Ingredient" : "Add New Ingredient"}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "grey.400" }}>
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ px: 3, py: 2 }}>
          <Grid container spacing={{ xs: 2.5, sm: 4 }}>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Ingredient Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoFocus={true}
                variant="outlined"
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Unit (kg, pcs)"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </Grid>
            {!item && (
              <Grid size={6}>
                <TextField
                  fullWidth
                  label="Available Stock"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
                />
              </Grid>
            )}
            <Grid size={item ? 12 : 6}>
              <TextField
                fullWidth
                label="Low Stock Alert"
                name="lowStockThreshold"
                type="number"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                required
                variant="outlined"
                size="small"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "12px" } }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 4, pt: 1 }}>
          <Button
            onClick={onClose}
            sx={{
              color: "grey.500",
              fontWeight: 700,
              textTransform: "none",
              mr: 2,
              border: "1px solid #ff9900ff",
              borderRadius: "12px",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: "#10b981",
              "&:hover": { bgcolor: "#059669" },
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 800,
              boxShadow: "none",
              px: { xs: 4, sm: 6 },
              py: 1.25,
            }}
          >
            {item ? "Update Details" : "Create Item"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const DeleteConfirmModal = ({ open, onClose, onConfirm, itemName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={modalPaperProps}
    >
      <Box sx={{ position: "absolute", right: 16, top: 16 }}>
        <IconButton onClick={onClose} size="small" sx={{ color: "grey.400" }}>
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent sx={{ textAlign: "center", pb: 3, pt: 6 }}>
        <Box
          sx={{
            display: "inline-flex",
            p: 2,
            borderRadius: "50%",
            bgcolor: "#fef2f2",
            color: "#ef4444",
            mb: 2.5,
          }}
        >
          <AlertTriangle size={30} />
        </Box>

        <Typography
          variant="h6"
          sx={{ fontWeight: 600, mb: 1, color: "#1e293b" }}
        >
          Confirm Deletion
        </Typography>

        <Typography variant="body2" sx={{ color: "grey.500", px: 2, mb: 1 }}>
          Are you sure you want to remove{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#0f172a" }}>
            {itemName.toUpperCase()}
          </Box>{" "}
          from your inventory?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ pb: 4, px: 4, justifyContent: "center", gap: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            flex: 1,
            color: "grey.500",
            fontWeight: 700,
            textTransform: "none",
            borderRadius: "12px",
            border: "1px solid",
            borderColor: "grey.200",
            py: 1.25,
            "&:hover": { bgcolor: "#f8fafc" },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            flex: 1,
            bgcolor: "#ef4444",
            "&:hover": { bgcolor: "#dc2626" },
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 800,
            boxShadow: "none",
            py: 1.25,
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
