import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Box, styled } from "@mui/system";
import { Rating } from "@mui/material";
import CustomButton from "./CustomButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useProductCart } from "../store/CartProduct";
const StyledCard = styled(Card)(() => ({
  width: "100%",
  height: 500,
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&:hover .image": {
    opacity: 0,
    transform: "translateY(-100%)",
  },
  "&:hover .description": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const ImageContainer = styled("div")({
  position: "relative",
  minHeight: "260px", // Constrain the height
  maxsHeight: "260px", // Constrain the height
  width: "100%", // Ensure it spans the width of the card
});

const Image = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  transition: "opacity 0.5s, transform 0.5s",
  zIndex: 1,
});

const Description = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  color: "#fff",
  padding: "16px",
  textAlign: "center",
  opacity: 0,
  transform: "translateY(100%)",
  transition: "opacity 0.5s, transform 0.5s",
  zIndex: 2,
});

type ProductCardProps = {
  id: number;
  title: string;
  images: string[];
  description: string;
  category: string;
  price: number;
  rating: number;
  amount: number;
};

export default function ProductCard({
  id,
  title,
  images,
  description,
  category,
  price,
  rating,
  amount,
}: ProductCardProps) {
  const addProductToCart = useProductCart((state) => state.addProductToCart);
  const product = { id, title, price, images, amount };
  return (
    <StyledCard>
      <CardHeader title={title} subheader={category} />
      <ImageContainer>
        <Image
          style={{ backgroundImage: `url(${images[0]})` }}
          className="image"
        />
        <Description className="description">
          <Typography variant="body1">{description}</Typography>
        </Description>
      </ImageContainer>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
        }}
      >
        <Rating name="read-only" value={rating} readOnly />

        <Box>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </Box>
      </CardActions>
      <Typography
        variant="body1"
        sx={{
          color: "text.primary",
          fontWeight: "bold",
          flexGrow: 1,
          paddingX: "16px",
          marginBottom: "16px", // Adds spacing to ensure alignment
        }}
      >
        {`${price} $`}
      </Typography>
      <CustomButton
        type="submit"
        onClick={() => addProductToCart(product)}
        size="small"
        icon={<AddCircleOutlineOutlinedIcon />}
        color="primary"
      >
        Add to cart
      </CustomButton>
    </StyledCard>
  );
}
