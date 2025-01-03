import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../utils/axios";
import ProductCard from "./ProductCard";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Loading } from "./Loading";
import Grid from "@mui/material/Grid";
import { debounce } from "@mui/material";

const PRODUCTS_PER_PAGE = 21;
type ProductType = {
  id: number;
  title: string;
  images: string[];
  description: string;
  category: string;
  price: number;
  rating: number;
  amount: number;
};

type ProductsType = ProductType[];
type CategoryType = { name: string; slug: string }[];

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryType>([]);
  // const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [products, setProducts] = useState<ProductsType>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const sortBy = searchParams.get("sortBy") || "title";
  const order = searchParams.get("order") || "asc";
  const categoryQuery = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryQuery);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("products/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const skip = (currentPage - 1) * PRODUCTS_PER_PAGE;
      let url;
      let categoryFilterAppliedWithSearchQuery = false;
      if (searchQuery && selectedCategory !== "all") {
        categoryFilterAppliedWithSearchQuery = true;
        url = `products/category/${selectedCategory}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
      } else if (searchQuery && selectedCategory === "all") {
        url = `products/search?q=${searchQuery}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
      } else if (selectedCategory !== "all") {
        url = `products/category/${selectedCategory}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
      } else {
        url = `products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}&sortBy=${sortBy}&order=${order}`;
      }
      const res = await axios.get(url);
      let productsData = res.data.products;
      if (categoryFilterAppliedWithSearchQuery) {
        productsData = res.data.products.filter(
          (product: ProductType) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }
      setProducts(productsData);
      setTotalProducts(res.data.total);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedCategory, sortBy, order]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    searchQuery,
    sortBy,
    order,
    selectedCategory,
    fetchProducts,
  ]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSearchParams({
      page: page.toString(),
      q: searchQuery,
      category: selectedCategory,
      sortBy,
      order,
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(() => query);
    handleSearchParamsChange(query);
  };

  const handleSearchParamsChange = debounce((query) => {
    setSearchParams({
      page: "1",
      q: query,
      category: selectedCategory,
      sortBy,
      order,
    });
  }, 300);

  const handleSortChange = (
    event: SelectChangeEvent<`${string}-${string}`>
  ) => {
    const [newSortBy, newOrder] = event.target.value.split("-");
    setSearchParams({
      page: "1",
      q: searchQuery,
      category: selectedCategory,
      sortBy: newSortBy,
      order: newOrder,
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSearchParams({
      page: "1",
      q: searchQuery,
      category: category,
      sortBy,
      order,
    });
  };

  const renderCategories = () =>
    categories.map((category) => (
      <MenuItem key={category.slug} value={category.slug}>
        {category.name}
      </MenuItem>
    ));

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <Paper
      elevation={2}
      sx={{
        padding: "24px",
        margin: "24px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Product List
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{ marginBottom: "16px" }}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Search Products"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select
            fullWidth
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {renderCategories()}
          </Select>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Select
            fullWidth
            value={`${sortBy}-${order}`}
            onChange={handleSortChange}
          >
            <MenuItem value="title-asc">Title (A-Z)</MenuItem>
            <MenuItem value="title-desc">Title (Z-A)</MenuItem>
            <MenuItem value="price-asc">Price (Low to High)</MenuItem>
            <MenuItem value="price-desc">Price (High to Low)</MenuItem>
            <MenuItem value="rating-asc">Rating (Low to High)</MenuItem>
            <MenuItem value="rating-desc">Rating (High to Low)</MenuItem>
          </Select>
        </Grid>
      </Grid>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Grid container spacing={2}>
            {products.map((product: ProductType, index) => (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <ProductCard
                  id={product.id}
                  title={product.title}
                  images={product.images}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                  rating={product.rating}
                  amount={product.amount}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              marginTop: "16px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        </>
      )}
    </Paper>
  );
};

export default Products;
