import React from "react";
import {
  FaFingerprint,
  FaLifeRing,
  FaUndo,
  FaShippingFast,
} from "react-icons/fa";

const headerData = {
  men: { url: "/products?category=men" },
  women: { url: "/products?category=women" },
  kids: { url: "/products?category=kids" },
};

const heroData = [
  {
    id: 1,
    title: "HOT RIGHT NOW",
    description:
      "Create your ever-evolving wardrobe today with 500+ styles to discover",
    buttonText: "BUILD YOUR WARDROBE",
  },
  {
    id: 2,
    title: "WINTER SALE IS ON!",
    description: "Hurry up and grab your winter collections now",
    buttonText: "BUILD YOUR WARDROBE",
  },
  {
    id: 3,
    title: "Your favourite brands are now on KappaCom",
    description:
      "Levi's, Basics, Otto and so much of favourites are now on KappaCom",
    buttonText: "BUILD YOUR WARDROBE",
  },
];

const benefitsData = [
  {
    id: 1,
    title: "FREE SHIPPING",
    description: "Free shipping on all US order or order above $100",
    icon: <FaShippingFast size={20} />,
  },
  {
    id: 2,
    title: "SUPPORT 24/7",
    description: "Contact us 24 hours a day, 7 days a week",
    icon: <FaLifeRing size={20} />,
  },
  {
    id: 3,
    title: "30 DAYS RETURN",
    description: "Simply return it within 30 days for an exchange.",
    icon: <FaUndo size={20} />,
  },
  {
    id: 4,
    title: "100% PAYMENT SECURE",
    description: "We ensure secure payment process.",
    icon: <FaFingerprint size={20} />,
  },
];

const FAVOURITES_TITLE = "THE FAVORITES";

const hotDealsData = {
  title: "HOT DEALS",
  linkText: "VIEW ALL",
  OfferText: (
    <React.Fragment>
      {" "}
      WINTER SALES <br /> 50 % OFF
    </React.Fragment>
  ),
  buttonText: "SHOP NOW",
};

const homeConfig = {
  heroData,
  benefitsData,
  FAVOURITES_TITLE,
  hotDealsData,
  headerData,
};

export default homeConfig;
