import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import styled, { css } from "styled-components";
import { BiChevronLeft, BiChevronRight, BiHeart } from "react-icons/bi";

import useApi from "../../utils/useApi";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCard from "../../components/ProductCard";
import {
  Button,
  Dropdown,
  Input,
  StarRating,
  Tabs,
  TextField,
} from "../../styles/UIKit";
import AuthContext from "../../contexts/AuthContext";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CarouselButton = ({ onClick, position }) => (
  <StyledButton position={position} onClick={onClick}>
    {position === "left" ? <BiChevronLeft /> : <BiChevronRight />}
  </StyledButton>
);

const Product = ({ data, error }) => {
  const [loading, setLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [quantitySelected, setQuantitySelected] = useState(1);
  const [, setSelectedVariants] = useState({});

  const api = useApi();
  const router = useRouter();
  const { updateCart } = useContext(AuthContext);

  useEffect(() => {
    if (data.assets) {
      setMainImage(data.assets[0].id);
    }

    return () => {
      setMainImage("");
    };
  }, [router.query]);

  const getBreadcrumb = () => {
    const primaryCategory = data.categories.find(
      (item) => item.category_type === "primary_cat"
    );

    return (
      <Breadcrumbs>
        <div disabled>PRODUCTS</div>&nbsp;/&nbsp;
        <Link href={`/products?category=${primaryCategory.name}`}>
          {primaryCategory.name}
        </Link>
      </Breadcrumbs>
    );
  };

  const onOptionSelect = (variantType) => (selectedValue) => {
    setSelectedVariants((prevState) => ({
      ...prevState,
      [variantType]: selectedValue,
    }));
  };

  const onQuantitySelect = (event) => {
    const { value } = event.target;

    setQuantitySelected(Number(value));
  };

  const addProductToCart = async () => {
    const product = { id: data._id, quantity: quantitySelected };

    try {
      setLoading(true);

      const { data: cart } = await api.put("/cart", { product });

      await updateCart(cart.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderProductImages = () => {
    const { assets } = data;

    const displayedImage = mainImage.length ? mainImage : data.assets[0].id;

    const secondaryImages = assets.filter((item) => item.id !== displayedImage);
    const selectedImage = assets.find((item) => item.id === displayedImage);

    return (
      <ImagesContainer>
        <img
          src={selectedImage?.url || assets[0].url}
          alt={selectedImage?.filename || assets[0].filename}
        />
        <SecondaryImagesContainer>
          {secondaryImages.map((item) => (
            <div
              key={item.filename}
              onClick={() => {
                setMainImage(item.id);
              }}
            >
              <img src={item.url} alt={item.filename} />
            </div>
          ))}
        </SecondaryImagesContainer>
      </ImagesContainer>
    );
  };

  const renderVariants = () =>
    data.variant_groups.map((item) => {
      const options = item.options.map((item) => ({
        key: item.name,
        name: item.name,
        value: item.name,
      }));

      return (
        <div key={item.name}>
          <Dropdown
            hasInitialValue={false}
            placeholder={`Select ${item.name}`}
            options={options}
            onOptionSelect={onOptionSelect(item.name)}
          />
        </div>
      );
    });

  const renderProductDetails = () => (
    <ProductDetail>
      {renderProductImages()}
      <div>
        {getBreadcrumb()}
        <TextField size="1.25em" weight="bold">
          {data.name}
        </TextField>
        <ReviewsContainer>
          {[1, 2, 3, 4, 5].map((item) => (
            <StarRating index={item} key={item} isChecked />
          ))}
          <TextField
            weight={700}
            size="0.75em"
            margin="0.25em 0"
            style={{ alignSelf: "flex-start" }}
          >
            (234)
          </TextField>
        </ReviewsContainer>
        <TextField size="1.25em" weight="bold" color="primary">
          {data.price.formatted_with_symbol}
        </TextField>
        <TextField size="1em">{data.short_description}</TextField>
        <VariantsContainer>{renderVariants()}</VariantsContainer>
        <ProductAddContainer>
          <Button
            onClick={addProductToCart}
            loading={loading}
            disabled={loading}
          >
            Add to cart
          </Button>
          <Button basic>
            <BiHeart size={20} />
          </Button>
          <ProductQuantity>
            <Button
              basic
              onClick={() => {
                setQuantitySelected((prevState) =>
                  prevState > 1 ? prevState - 1 : 1
                );
              }}
            >
              -
            </Button>
            <Input
              value={quantitySelected}
              onChange={onQuantitySelect}
              type="number"
            />
            <Button
              basic
              onClick={() => {
                setQuantitySelected((prevState) => prevState + 1);
              }}
            >
              +
            </Button>
          </ProductQuantity>
        </ProductAddContainer>
      </div>
    </ProductDetail>
  );

  const renderRelatedProducts = () => (
    <RelatedProductsContainer>
      <RelatedProductsHeader>
        <TextField weight={700} size="1.5em">
          Related Products
        </TextField>
      </RelatedProductsHeader>
      <Carousel
        responsive={responsive}
        arrows
        slidesToSlide={3}
        swipeable
        customLeftArrow={<CarouselButton position="left" />}
        customRightArrow={<CarouselButton position="right" />}
      >
        {data.related_products.map((item) => (
          <StyledProductCard key={item.name}>
            <ProductCard {...item} hideInfo />
          </StyledProductCard>
        ))}
      </Carousel>
    </RelatedProductsContainer>
  );

  return (
    <Tabs>
      <Container>
        <Header />
        {error ? (
          <ErrorContainer>
            <TextField weight="bold" size="1.5em">
              Product does not exist!
            </TextField>
          </ErrorContainer>
        ) : (
          <React.Fragment>
            {renderProductDetails()}
            <DetailedDescription>
              <StyledTabsList width="30%">
                <Tabs.Tab>Description</Tabs.Tab>
                <Tabs.Tab>Reviews (0)</Tabs.Tab>
              </StyledTabsList>
              <Tabs.TabPanels>
                <Tabs.TabPanel>
                  <div>
                    <DescriptionContainer>
                      {data.long_description}
                    </DescriptionContainer>
                  </div>
                </Tabs.TabPanel>
                <Tabs.TabPanel>
                  <div>
                    <DescriptionContainer>No Reviews Yet</DescriptionContainer>
                  </div>
                </Tabs.TabPanel>
              </Tabs.TabPanels>
            </DetailedDescription>
            {renderRelatedProducts()}
          </React.Fragment>
        )}
        <Footer />
      </Container>
    </Tabs>
  );
};

export async function getServerSideProps({ params }) {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  });

  try {
    const response = await api.get(`/products/${params.id}`);

    return {
      props: {
        data: response.data || null,
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

CarouselButton.defaultProps = {
  onClick: () => {},
  position: null,
};

CarouselButton.propTypes = {
  onClick: PropTypes.func,
  position: PropTypes.string,
};

Product.defaultProps = {
  data: {},
  error: null,
};

Product.propTypes = {
  data: PropTypes.object,
  error: PropTypes.string,
};

export default Product;

const flexStyle = css`
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const ErrorContainer = styled.div`
  height: 100%;
  ${flexStyle};
  justify-content: center;
`;

const ProductDetail = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  padding: 2em;
  margin-top: 2em;
`;

const ImagesContainer = styled.div`
  padding: 0 4em;

  img {
    width: 100%;
  }
`;

const Breadcrumbs = styled.span`
  ${flexStyle};
  font-size: 1em;
  color: ${(props) => props.theme.textSecondary};

  & * :last-child {
    cursor: pointer;
    color: ${(props) => props.theme.textSecondary};
    text-decoration: none;

    :hover {
      opacity: 0.7;
    }
  }
`;

const VariantsContainer = styled.div`
  ${flexStyle};
  margin: 2em 0;

  & > * {
    width: 30%;
    margin: 0 0.5em 0 0;
  }
`;

const ProductAddContainer = styled.div`
  ${flexStyle};

  & > * {
    margin: 0 0.5em 0 0;
  }
`;

const ProductQuantity = styled.div`
  display: flex;

  & > * {
    border-radius: 0px;
  }

  input {
    max-width: 10%;
    text-align: center;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const SecondaryImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.5em;

  div {
    display: flex;
  }

  img {
    height: 100%;
    cursor: pointer;

    :hover {
      opacity: 0.3;
    }
  }
`;

const DetailedDescription = styled.div`
  margin: 3em 4em;
  padding: 1em 0;
`;

const StyledTabsList = styled(Tabs.TabList)`
  border: 1px solid ${(props) => props.theme.background};
  border-bottom: 0px;
  background-color: ${(props) => props.theme.backgroundLight};
`;

const DescriptionContainer = styled.div`
  border: 1px solid ${(props) => props.theme.background};
  padding: 3em 2em;
  background-color: ${(props) => props.theme.backgroundLight};
`;

const RelatedProductsContainer = styled.div`
  padding: 3em 4em;
`;

const RelatedProductsHeader = styled.div`
  ${flexStyle};
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.background};
`;

const StyledButton = styled.div`
  position: absolute;
  top: 50%;
  border-radius: 100%;
  ${flexStyle};
  height: 1em;
  width: 1em;
  font-size: 2em;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.background};
  background-color: ${(props) => props.theme.background};
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.25);
  outline: none;

  ${(props) => {
    switch (props.position) {
      case "right":
        return {
          right: 5,
        };

      case "left":
        return {
          left: 5,
        };
    }
  }};
`;

const StyledProductCard = styled.div`
  margin: 1em 0.5em;
`;

const ReviewsContainer = styled.div`
  ${flexStyle};
  gap: 2px;
`;
