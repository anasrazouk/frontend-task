import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Box, Typography } from "@mui/material";
import axios from "../utils/axios";
import CustomButton from "./CustomButton";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

interface ProductFormInputs {
  title: string;
  description: string;
  price: number;
  category: string;
}

const AddProductPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const response = await axios.post("products/add", data);
      alert("Product added successfully!");
      console.log(response.data);
      reset(); // Clear the form after submission
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ mb: 3, textAlign: "center" }}
      >
        Add Product
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          rules={{ required: "Description is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{
            required: "Price is required",
            validate: (value) => value > 0 || "Price must be greater than 0",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.price}
              helperText={errors.price?.message}
              onChange={(e) => field.onChange(parseFloat(e.target.value))}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
            />
          )}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <CustomButton size="small" color="secondary" icon = {<CancelOutlinedIcon/>} onClick={() => reset()}>
            Cancel
          </CustomButton>
          <CustomButton type="submit" size="small" icon = {<AddCircleOutlineOutlinedIcon/>} color="primary">
            Add
          </CustomButton>
        </Box>
      </form>
    </Box>
  );
};

export default AddProductPage;
