import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  Badge,
  PaginationItem,
  Pagination,
  Slider,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import {
  AddBox,
  ArrowBack,
  ArrowForward,
  MonetizationOn,
  RemoveRedEye,
} from "@mui/icons-material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { retrieveProducts } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { setProducts } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import moment from "moment";

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollections: [
      ProductCollection.DISH,
      ProductCollection.SALAD,
      ProductCollection.DESSERT,
      ProductCollection.DRINK,
      ProductCollection.OTHER,
    ],
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    // Data fetch
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        console.log("data: ", data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  // HANDLERS
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

  return (
    <>
      <div>
        <Container>
          <div className="main-container">
            <div className="left-container">
              <h1 className="categories-name">Categories</h1>
              <div className="category-container">
                <div className="category-item">
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Fruits</h2>
                </div>
                <div className="category-item">
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Vegetables</h2>
                </div>
                <div className="category-item">
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Sweets</h2>
                </div>
                <div className="category-item">
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Meat</h2>
                </div>
                <div className="category-item">
                  <h3>
                    <CakeIcon />
                  </h3>
                  <h2>Others</h2>
                </div>
              </div>
              <Box sx={{ width: 250 }} className="price">
                <h2 className="pricw2">Price</h2>
                <Slider
                  step={10}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `$${value}`}
                  aria-labelledby="range-slider"
                  sx={{ mt: 2 }}
                />

                <Typography variant="h3" justifyContent={"flex-start"}>
                  Price$ {/* {priceRange[0]} - ${priceRange[1]} */}
                </Typography>
              </Box>
              <FormControl className="selecting">
                <h1>Additional</h1>
                <RadioGroup>
                  <FormControlLabel
                    value="All"
                    control={<Radio />}
                    label="All"
                  />
                  <FormControlLabel
                    value="New"
                    control={<Radio />}
                    label="New"
                  />
                  <FormControlLabel
                    value="Price"
                    control={<Radio />}
                    label="Price"
                  />
                  <FormControlLabel
                    value="Discount"
                    control={<Radio />}
                    label="Discount"
                  />
                  <FormControlLabel
                    value="Popular"
                    control={<Radio />}
                    label="Popular"
                  />
                </RadioGroup>
              </FormControl>
              <div className="featured-products">
                <h1>Featured Products</h1>

                <div className="main-feauture">
                  <div className="main-featured">
                    <div className="left-image">
                      <img src="/img/featur-1.jpg" alt="" />
                    </div>
                    <div className="right-sale">
                      <h3>Big Banana</h3>
                      <div className="right-pricing">
                        <h4>123$</h4>
                        <h4 className="sale-color">1231$</h4>
                      </div>
                    </div>
                  </div>
                  <div className="main-featured">
                    <div className="left-image">
                      <img src="/img/featur-1.jpg" alt="" />
                    </div>
                    <div className="right-sale">
                      <h3>Big Banana</h3>
                      <div className="right-pricing">
                        <h4>123$</h4>
                        <h4 className="sale-color">1231$</h4>
                      </div>
                    </div>
                  </div>
                  <div className="main-featured">
                    <div className="left-image">
                      <img src="/img/featur-1.jpg" alt="" />
                    </div>
                    <div className="right-sale">
                      <h3>Big Banana</h3>
                      <div className="right-pricing">
                        <h4>123$</h4>
                        <h4 className="sale-color">1231$</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="buttot">View More</button>
                <div className="down-image">
                  <img src="/img/food-city.webp" alt="" />
                </div>
              </div>
            </div>
            <div className="right-container">
              {" "}
              <Stack className="product-wrapper">
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + ""
                        : product.productSize + "";
                    const producedDate = moment(product.createdAt).format(
                      "DD MM YYYY"
                    );

                    return (
                      <Stack
                        onClick={() => chooseDishHandler(product._id)}
                        key={product._id}
                        className="product-card"
                      >
                        <Stack className={"product-img-container"}>
                          <Stack
                            className="product-img"
                            sx={{ backgroundImage: `url(${imagePath})` }}
                          ></Stack>
                        </Stack>
                        <div className="product-size">{sizeVolume}</div>
                        <Stack className={"bottom-side"}>
                          <div>
                            {product.productSale && product.productSale > 0 ? (
                              <>
                                <span className={"product-sale2"}>
                                  -{product.productSale}%
                                </span>
                                <span className={"product-sale-price"}>
                                  ${product.productSalePrice}
                                </span>
                                <span
                                  className={"product-sale-original-price2"}
                                >
                                  List:
                                  <span
                                    className={"product-sale-original-price"}
                                  >
                                    ${product.productPrice}
                                  </span>
                                </span>
                              </>
                            ) : (
                              <span className="product-price">
                                ${product.productPrice}
                              </span>
                            )}
                          </div>

                          <Button
                            className="shop-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdd({
                                _id: product._id,
                                quantity: 1,

                                price: product.productSalePrice
                                  ? product.productSalePrice
                                  : product.productPrice,
                                name: product.productName,
                                image: product.productImages[0],
                              });
                            }}
                          >
                            <ShoppingBagIcon className="icon-button" />
                            Add to cart
                          </Button>
                        </Stack>

                        <Box className={"product-desc"}>
                          <span className={"product-salee1"}>
                            {product.productLeftCount} left
                          </span>
                          <span className={"product-soldd1"}>
                            {product.productSold} sold
                          </span>{" "}
                          <span className={"product-title"}>
                            {product.productName}
                          </span>
                          <span className={"product-title1"}>
                            {product.productDesc}
                          </span>
                          <span className={"product-produced-date"}>
                            Prod:{producedDate}
                          </span>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available!</Box>
                )}
              </Stack>
              <Stack className="pagination-section">
                <Pagination
                  count={
                    products.length !== 0
                      ? productSearch.page + 1
                      : productSearch.page
                  }
                  page={productSearch.page}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{ previous: ArrowBack, next: ArrowForward }}
                      {...item}
                      color={"secondary"}
                    />
                  )}
                  onChange={paginationHandler}
                />
              </Stack>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
