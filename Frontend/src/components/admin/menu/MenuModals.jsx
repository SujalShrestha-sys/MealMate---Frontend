import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { X, Edit2, Plus, Image as ImageIcon } from "lucide-react";

export const AddEditDishModal = ({
  open,
  onClose,
  onSave,
  dish,
  categories,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryName: "",
    badge: "",
  });

  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    if (dish) {
      setFormData({
        name: dish.name || "",
        description: dish.description || "",
        price: dish.price || "",
        imageUrl: dish.imageUrl || "",
        categoryName: dish.category?.name || "",
        badge: dish.badge || "",
      });
      setShowNewCategory(false);
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryName: "",
        badge: "",
      });
      setShowNewCategory(false);
    }
  }, [dish, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "categoryName" && value === "NEW_CATEGORY") {
      setShowNewCategory(true);
      setFormData((prev) => ({ ...prev, categoryName: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          p: 1.5,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{ textAlign: "center", position: "relative", pt: 4, pb: 1 }}
      >
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", right: 16, top: 16, color: "grey.400" }}
        >
          <X size={20} />
        </IconButton>

        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "grey.50",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: "auto",
            mb: 2,
            boxShadow: "0 8px 16px -4px rgba(197, 113, 53, 0.2)",
          }}
        >
          {dish ? <Edit2 size={26} /> : <Plus size={26} />}
        </Box>

        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 700, color: "grey.900", letterSpacing: "-0.02em" }}
        >
          {dish ? "Edit Dish Detail" : "New Menu Item"}
        </Typography>
        <Typography variant="body2" color="grey.500" sx={{ mt: 0.5 }}>
          {dish
            ? "Update the information for this dish"
            : "Fill in the details to add to your menu"}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
          <TextField
            label="Dish Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Classic Burger"
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2, fontWeight: 600 } }}
            InputLabelProps={{ sx: { fontWeight: 500 } }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Price (Rs.)"
              name="price"
              type="number"
              fullWidth
              value={formData.price}
              onChange={handleChange}
              InputProps={{ sx: { borderRadius: 2, fontWeight: 600 } }}
            />
            {!showNewCategory ? (
              <TextField
                label="Category"
                name="categoryName"
                select
                fullWidth
                value={formData.categoryName}
                onChange={handleChange}
                InputProps={{ sx: { borderRadius: 2, fontWeight: 600 } }}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.id}
                    value={cat.name}
                    sx={{ fontWeight: 500 }}
                  >
                    {cat.name}
                  </MenuItem>
                ))}
                <MenuItem
                  value="NEW_CATEGORY"
                  sx={{ color: "primary.main", fontWeight: 700 }}
                >
                  + Create New
                </MenuItem>
              </TextField>
            ) : (
              <TextField
                label="New Category"
                name="categoryName"
                fullWidth
                value={formData.categoryName}
                onChange={handleChange}
                InputProps={{
                  sx: { borderRadius: 2, fontWeight: 600 },
                  endAdornment: (
                    <IconButton
                      size="small"
                      onClick={() => setShowNewCategory(false)}
                    >
                      <X size={16} />
                    </IconButton>
                  ),
                }}
              />
            )}
          </Box>

          <TextField
            label="Image URL"
            name="imageUrl"
            fullWidth
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://images.unsplash.com/..."
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          {formData.imageUrl && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 140,
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid",
                borderColor: "grey.100",
                bgcolor: "grey.50",
              }}
            >
              <img
                src={formData.imageUrl}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x400?text=Image+Not+Found";
                }}
              />
            </Box>
          )}

          <TextField
            label="Badge"
            name="badge"
            fullWidth
            value={formData.badge}
            onChange={handleChange}
            placeholder="e.g. Recommended"
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={2}
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly describe this dish..."
            InputProps={{ sx: { borderRadius: 2 } }}
          />
        </Box>
      </DialogContent>

      <DialogActions
        sx={{ px: 3, pb: 4, pt: 2, flexDirection: "column", gap: 1.5 }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            py: 1.5,
            borderRadius: 1,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "1rem",
            boxShadow: "0 10px 20px -5px rgba(249,115,22,0.3)",
          }}
        >
          {dish ? "Update Dish" : "Create Item"}
        </Button>
        <Button
          fullWidth
          onClick={onClose}
          sx={{
            color: "grey.500",
            textTransform: "none",
            fontWeight: 700,
            border: "1px solid",
            borderColor: "grey.200",
            "&:hover": { bgcolor: "transparent", color: "grey.700" },
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const DeleteConfirmModal = ({ open, onClose, onConfirm, dishName }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogContent sx={{ p: 4, textAlign: "center", position: "relative" }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: "absolute", right: 12, top: 12, color: "grey.400" }}
        >
          <X size={24} />
        </IconButton>

        <Box
          sx={{
            color: "#e11d48",
            mb: 2,
            display: "flex",
            justifyContent: "center",
          }}
        ></Box>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
          Remove Dish?
        </Typography>
        <Typography variant="body2" color="grey.500" sx={{ mb: 3 }}>
          Are you sure you want to remove <strong>{dishName}</strong> from the
          menu? This action cannot be undone.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            fullWidth
            onClick={onClose}
            sx={{
              color: "grey.500",
              fontWeight: 600,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={onConfirm}
            sx={{
              bgcolor: "#e11d48",
              "&:hover": { bgcolor: "#be123c" },
              fontWeight: 700,
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Yes, Remove
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
