import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { apiRoute } from "./constants/api-routes";
import { CategoryPage, HomePage, ProductDetailPage, ProfilePage } from "./pages";
import { DoranPage } from "./pages/doran-page";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={apiRoute.HOME} element={<DoranPage />}>
                    <Route path={apiRoute.HOME} element={<HomePage />} />
                    <Route path={apiRoute.CATEGORY} element={<CategoryPage />}>
                        <Route path=":id" element={<CategoryPage />} />
                    </Route>
                    <Route path={`${apiRoute.PRODUCT}/:id`} element={<ProductDetailPage />} />
                    <Route path={apiRoute.PROFILE} element={<ProfilePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
