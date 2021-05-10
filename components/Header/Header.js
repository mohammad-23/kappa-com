import { useContext, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { FiUser, FiShoppingBag, FiMenu, FiSearch } from "react-icons/fi";

import { Logo } from "../../assets/icons";
import { Input, Tooltip } from "../../styles/UIKit";
import LoginModal from "../LoginModal/LoginModal";
import AuthContext from "../../contexts/AuthContext";

const primaryCategories = ["Men", "women", "kids"];

const userMenu = [
  { key: null, name: "Login" },
  { key: "user", name: "Account Details" },
  { key: "wishlist", name: "Wishlist" },
  { key: "user", name: "Order History" },
];

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const renderCategories = () =>
    primaryCategories.map((category) => (
      <CategoryContainer key={category}>{category}</CategoryContainer>
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
      <FiShoppingBag size={24} />
      <FiMenu size={24} />
    </IconsContainer>
  );

  return (
    <HeaderContainer>
      <HeaderBase>Free shipping and returns on all US orders</HeaderBase>
      <HeaderSections>
        <Logo style={{ margin: "auto 0" }} />
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
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  text-transform: uppercase;
  color: ${(props) => props.theme.textPrimary};

  :hover {
    color: ${(props) => props.theme.textSecondary};
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
