import { useContext, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { FiUser, FiShoppingBag, FiMenu, FiSearch } from "react-icons/fi";

import { Logo } from "../../assets/icons";
import { Input, Tooltip } from "../../styles/UIKit";
import LoginModal from "../LoginModal/LoginModal";
import AuthContext from "../../contexts/AuthContext";
import {
  HEADER_BASE_TEXT,
  MEN,
  WOMEN,
  KIDS,
  LOGIN,
  ACCOUNT_DETAILS,
  WISHLIST,
  ORDER_HISTORY,
} from "../../utils/constants";
import { headerData } from "../../config/HomeConfig";

const primaryCategories = [MEN, WOMEN, KIDS];

const userMenu = [
  { key: null, name: LOGIN },
  { key: "user", name: ACCOUNT_DETAILS },
  { key: "wishlist", name: WISHLIST },
  { key: "user", name: ORDER_HISTORY },
];

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const renderCategories = () =>
    primaryCategories.map((category) => (
      <CategoryContainer key={category}>
        <Link href={headerData[category.toLowerCase()].url}>{category}</Link>
      </CategoryContainer>
    ));

  const renderSearchInput = () => (
    <SearchContainer>
      <FiSearch size={16} />
      <Input fluid placeholder="Search" />
    </SearchContainer>
  );

  const renderMenuContent = () =>
    userMenu.map((item) => {
      if (!item.key) {
        if (!user) {
          return (
            <MenuItem key={item.name} onClick={() => setIsModalOpen(true)}>
              {item.name}
            </MenuItem>
          );
        }
      } else {
        return (
          <Link key={item.name} href={`/${item.key}`}>
            <MenuItem>{item.name}</MenuItem>
          </Link>
        );
      }

      return null;
    });

  const renderIcons = () => (
    <IconsContainer>
      <Tooltip content={() => renderMenuContent()} direction="bottom-right">
        <FiUser size={24} style={{ marginTop: "10px" }} />
      </Tooltip>
      <Link href="/cart">
        <CartContainer>
          <FiShoppingBag size={24} />
          {cart.items?.length ? (
            <CartAmount>
              <TextField
                color="background"
                size="0.75em"
                margin="0 2px 0 0"
                weight={700}
              >
                {cart.items.length}
              </TextField>
            </CartAmount>
          ) : null}
        </CartContainer>
      </Link>
      <FiMenu size={24} />
    </IconsContainer>
  );

  return (
    <HeaderContainer>
      <HeaderBase>{HEADER_BASE_TEXT}</HeaderBase>
      <HeaderSections>
        <Link href="/">
          <LogoContainer>
            <Logo style={{ margin: "auto 0" }} />
          </LogoContainer>
        </Link>
        <Categories>{renderCategories()}</Categories>
        {renderSearchInput()}
        {renderIcons()}
      </HeaderSections>
      <LoginModal
        isOpen={isModalOpen}
        closeModal={() => {
          setIsModalOpen(false);
        }}
      />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: 6.5rem;
  width: 100%;
`;

const LogoContainer = styled.span`
  cursor: pointer;
`;

const HeaderBase = styled.div`
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  padding: 5px;
  text-align: center;
  font-size: 14px;
`;

const HeaderSections = styled.div`
  display: grid;
  grid-template-columns: 20% 30% 35% 15%;
  padding: 10px 15px;

  & > div {
    padding: 0 10px;
  }
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const CategoryContainer = styled.div`
  a {
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    color: ${(props) => props.theme.textPrimary};

    :hover {
      color: ${(props) => props.theme.textSecondary};
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  svg {
    position: absolute;
    top: 15px;
    left: 20px;
    color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }

  input {
    padding-left: 40px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  svg {
    cursor: pointer;

    :hover {
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

const MenuItem = styled.div`
  padding: 10px 0;
  cursor: pointer;

  :hover {
    color: ${(props) => props.theme.textSecondary};
  }
`;

const CartContainer = styled.div`
  position: relative;
  display: flex;
`;
const CartAmount = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  background-color: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
`;
