import React, { useEffect } from "react";
import { Image, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {
    requestTopFiveEndSoon,
    requestTopFiveHottest,
    requestTopFiveMostBidded,
} from "../../app/reducers/product-slice";
import auctionBanner from "../../assets/images/auction-banner.svg";
import bgImg3 from "../../assets/images/friends.svg";
import bgImg2 from "../../assets/images/green-park.svg";
import bgImg1 from "../../assets/images/happy-crowd.svg";
import Banner from "../../components/common/banner/Banner";
import { SectionTitle } from "../../components/common/section-title/section-title";
import { CategoryCarousel } from "../../components/doran-carousel/category-carousel";
import { DoranCarousel } from "../../components/doran-carousel/doran-carousel";
import ProductCard from "../../components/product/ProductCard";
import { ScrollTopButton } from "../../components/scroll-top-button/scroll-top-button";

export const HomePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(requestTopFiveMostBidded());
        dispatch(requestTopFiveHottest());
        dispatch(requestTopFiveEndSoon());
    }, []);

    const {
        isLoadingMostBidded,
        mostBiddedProducts,
        isLoadingHottest,
        hottestProducts,
        isLoadingEndSoon,
        endSoonProducts,
    } = useAppSelector((state) => state.productState);

    return (
        <div>
            <Image
                src={auctionBanner}
                style={{ width: "100%", zIndex: -1, borderBottomRightRadius: "25%", borderBottomLeftRadius: "25%" }}
            />

            <ScrollTopButton />
            <CategoryCarousel className="container" style={{ marginTop: "-6rem" }} />
            <div
                style={{
                    backgroundImage: `url(${bgImg1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "50rem",
                    width: "100%",
                    zIndex: 99,
                }}
                className="p-5 my-5"
            >
                <div className="container">
                    <SectionTitle text="NHIỀU NGƯỜI YÊU THÍCH" className="mx-5 my-3" />
                    {isLoadingMostBidded && <Spinner animation="border" className="d-block mx-auto" />}
                    {!isLoadingMostBidded && (
                        <DoranCarousel style={{ position: "relative", zIndex: 999 }}>
                            {mostBiddedProducts.map((item, index) => {
                                return <ProductCard key={index} product={item} />;
                            })}
                        </DoranCarousel>
                    )}
                </div>
            </div>

            <Banner bannerMsg="THAM GIA ĐẤU GIÁ THEO DÕI SẢN PHẨM" buttonMsg="ĐĂNG KÝ TÀI KHOẢN" />

            <div
                style={{
                    backgroundImage: `url(${bgImg2})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "45rem",
                    width: "100%",
                }}
                className="p-5"
            >
                <div className="container">
                    <SectionTitle text="MỌI NGƯỜI SĂN ĐÓN" className="mx-5 my-3" />
                    {isLoadingHottest && <Spinner animation="border" className="d-block mx-auto" />}
                    {!isLoadingHottest && (
                        <DoranCarousel>
                            {hottestProducts.map((item, index) => {
                                return <ProductCard key={index} product={item} />;
                            })}
                        </DoranCarousel>
                    )}
                </div>
            </div>

            <Banner bannerMsg="BẮT ĐẦU PHIÊN ĐẤU GIÁ CỦA BẠN" buttonMsg="NÂNG CẤP TÀI KHOẢN" />

            <div
                style={{
                    backgroundImage: `url(${bgImg3})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    height: "50rem",
                    width: "100%",
                }}
                className="p-5"
            >
                <div className="container">
                    <SectionTitle text="SẮP KẾT THÚC" className="mx-5 my-3" />
                    {isLoadingEndSoon && <Spinner animation="border" className="d-block mx-auto" />}
                    {!isLoadingEndSoon && (
                        <DoranCarousel>
                            {endSoonProducts.map((item, index) => {
                                return <ProductCard key={index} product={item} />;
                            })}
                        </DoranCarousel>
                    )}
                </div>
            </div>
        </div>
    );
};
