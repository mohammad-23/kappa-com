import {
  FaFingerprint,
  FaLifeRing,
  FaUndo,
  FaShippingFast,
} from "react-icons/fa";
const HeroData = [
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

const BenefitsData = [
  {
    id: 1,
    title: "FREE SHIPPING",
    description: "Free shipping on all US order or order above $100",
    icon: <FaShippingFast size={24} />,
  },
  {
    id: 2,
    title: "SUPPORT 24/7",
    description: "Contact us 24 hours a day, 7 days a week",
    icon: <FaLifeRing size={24} />,
  },
  {
    id: 3,
    title: "30 DAYS RETURN",
    description: "Simply return it within 30 days for an exchange.",
    icon: <FaUndo size={24} />,
  },
  {
    id: 4,
    title: "100% PAYMENT SECURE",
    description: "We ensure secure payment process.",
    icon: <FaFingerprint size={24} />,
  },
];

const FavouritesData = {
  title: "THE FAVORITES",
  items: [
    {
      id: 1,
      name: "Greta White Midi Dress",
      price: "159.00",
    },
    {
      id: 2,
      name: "Lilika Silver Mini",
      price: "159.00",
    },
    {
      id: 3,
      name: "Crystal Off White Dress",
      price: "159.00",
    },
    {
      id: 4,
      name: "Levi's Jeans",
      price: "15.00",
    },
    {
      id: 5,
      name: "Basic's Tshirt",
      price: "159.00",
    },
    {
      id: 6,
      name: "Some nice dress",
      price: "159.00",
    },
    {
      id: 7,
      name: "Tamilnadu Veshti",
      price: "159.00",
    },
    {
      id: 8,
      name: "Kerala Mundu",
      price: "159.00",
    },
    {
      id: 9,
      name: "Tamilnadu Saree",
      price: "159.00",
    },
    {
      id: 10,
      name: "Kerala Saree",
      price: "159.00",
    },
  ],
};

export { HeroData, BenefitsData, FavouritesData };
