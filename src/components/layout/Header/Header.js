import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  searchIcon: true,
  SearchIconElement:IoSearch,
  searchIconUrl: "/search",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#eb4034",
  // searchIconMargin: "1vmax",
  cartIcon:true,
  CartIconElement:FaShoppingCart,
  cartIconUrl: "/cart",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  profileIcon:true,
  ProfileIconElement:CgProfile,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  // profileIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options}/>;
};

export default Header;