import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  TextField,
  PaginationItem,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { serverApi } from "../../../lib/config";
import { Dispatch } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import moment from "moment";
import ProductSwiper from "../homepage/Swiper";
import { setProducts } from "../homepage/slice";
import { retrieveProducts } from "../homepage/selector";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",
  backgroundColor: "#343434",
  color: "#D7B586",
  padding: "0 20px",
  minWidth: "auto",
  height: "40px",
  "&:hover": {
    backgroundColor: "#343434",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
  display: "flex",
  alignItems: "center",
}));

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    height: "40px",
    "& fieldset": {
      borderRadius: "20px",
      border: "none",
    },
  },
}));

const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Shop(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 12,
    order: "createdAt",
    productCollections: [
      ProductCollection.FRUITS,
      ProductCollection.VEGETABLES,
      ProductCollection.SWEETS,
      ProductCollection.MEAT,
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
      <Container>
        <Stack className="products">
          <Stack className="dishes-filter-section">
            <Stack className="title">
              <Typography className="title-text" fontSize={"36px"}>
                Our Organic Products
              </Typography>

              <Stack className="product-category">
                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.FRUITS
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.FRUITS
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.FRUITS
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.FRUITS)
                  }
                >
                  Fruits
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.VEGETABLES
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.VEGETABLES
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.VEGETABLES
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.VEGETABLES)
                  }
                >
                  Vegetables
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.SWEETS
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.SWEETS
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.SWEETS
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  className={"order"}
                  variant="contained"
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SWEETS)
                  }
                >
                  Sweets
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection === ProductCollection.MEAT
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection === ProductCollection.MEAT
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.MEAT
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.MEAT)
                  }
                >
                  Meat
                </Button>

                <Button
                  sx={{
                    backgroundColor:
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#ffb524"
                        : "#f4f6f8",
                    color:
                      productSearch.productCollection ===
                      ProductCollection.OTHER
                        ? "#ffffff"
                        : "#000000",
                    "&:hover": {
                      backgroundColor:
                        productSearch.productCollection ===
                        ProductCollection.OTHER
                          ? "#e6a11f"
                          : "#e0e3e6",
                    },
                    borderRadius: "8px",
                    padding: "10px 20px",
                    transition: "background-color 0.3s ease",
                  }}
                  variant="contained"
                  className={"order"}
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Others
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Stack className="search-box-main">
            <Box className={"search-box"}>
              <StyledInput
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <StyledButton
                className="search-icon"
                onClick={searchProductHandler}
              >
                SEARCH
                <SearchIcon />
              </StyledButton>
            </Box>
          </Stack>

          {/* PRODUCTS */}
          <Stack className="product-wrapper">
            {products.length !== 0 ? (
              products.map((product: Product) => {
                const imagePath = `${serverApi}/${product.productImages[0]}`;

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
                    <div className="product-size">{product.productSize}</div>
                    <Stack className={"bottom-side"}>
                      <div>
                        {product?.productSale && product.productSale > 0 ? (
                          <>
                            <span className={"product-sale2"}>
                              -{product.productSale}%
                            </span>
                            <span className={"product-sale-price"}>
                              ${product.productSalePrice}
                            </span>
                            <span className={"product-sale-original-price2"}>
                              List:
                              <span className={"product-sale-original-price"}>
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
          <div>
            <ProductSwiper
              products={products}
              serverApi={serverApi}
              chooseDishHandler={chooseDishHandler}
              onAdd={onAdd}
            />
          </div>
        </Stack>
      </Container>
    </>
  );
}
