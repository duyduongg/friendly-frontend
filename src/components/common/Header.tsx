import { Icon } from "@iconify/react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRoute } from "../../constants/api-routes";
import CategoryButton from "../category/CategoryButton";
import NotificationButton from "../notification/NotificationButton";
import ProfileButton from "../profile/ProfileButton";
import SearchBar from "../search-bar/SearchBar";
import classes from "./Header.module.css";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className={classes.header}>
            <div className={classes.container}>
                <a href="#" onClick={() => navigate(apiRoute.HOME)}>
                    <div className={classes.logo}></div>
                </a>
                <div className={classes.home} onClick={() => navigate("/")}>
                    Trang chủ
                </div>
                <CategoryButton />
                <SearchBar />
                <ProfileButton />
                <NotificationButton />
            </div>
        </header>
    );
}
