import { Container, Stack, Box } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { createSelector } from "@reduxjs/toolkit";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { retrieveChosenProduct, retrieveRestaurant } from "./selector";
import { setChosenProduct, setRestaurant } from "./slice";
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";
import { serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";
import { useParams } from "react-router-dom";
import MemberService from "../../services/MemberService";

const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
  setRestaurant: (data: Member) => dispatch(setRestaurant(data)),
});

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct })
);
const restaurantRetriever = createSelector(
  retrieveRestaurant,
  (restaurant) => ({ restaurant })
);

interface ChosenProducteProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProducteProps) {
  const { onAdd } = props;
  const { setChosenProduct, setRestaurant } = actionDispatch(useDispatch());

  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { restaurant } = useSelector(restaurantRetriever);

  const { productId } = useParams<{ productId: string }>();
  console.log("productId: ", productId);

  useEffect(() => {
    const product = new ProductService();

    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getRestaurant()
      .then((data) => setRestaurant(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;
  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          {chosenProduct?.productImages.map((ele: string, index: number) => {
            const imagePath = `${serverApi}/${ele}`;
            return (
              <SwiperSlide key={index}>
                <img className="slider-image" src={imagePath} />
              </SwiperSlide>
            );
          })}
        </Stack>
        <Stack className={"chosen-product-info"}>
          <Box className={"info-box"}>
            <strong className={"product-name"}>
              {chosenProduct.productName}
            </strong>
            <span className={"resto-name"}>{restaurant?.memberNick}</span>
            <span className={"resto-name"}>{restaurant?.memberPhone}</span>
            <Box className={"rating-box"}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <div className={"evaluation-box"}>
                <div className={"product-view"}>
                  <span>{chosenProduct.productViews}</span>
                </div>
              </div>
            </Box>
            <p className={"product-desc"}>
              {chosenProduct?.productDesc
                ? chosenProduct?.productDesc
                : "No description"}
            </p>
            <Divider height="1" width="100%" bg="#000000" />
            <div className={"product-price"}>
              <span>Price:</span>
              <span>{`$${chosenProduct?.productPrice}`}</span>
            </div>
            <div className={"button-box"}>
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd({
                    _id: chosenProduct._id,
                    quantity: 1,
                    price: chosenProduct.productPrice,
                    name: chosenProduct.productName,
                    image: chosenProduct.productImages[0],
                  });
                }}
              >
                Add To Basket
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
