import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, User, UserRole } from "../../models";
import { ProductResponseWithPaging, UserResponseWithPaging } from "../../services";
import { RootState } from "../store";

interface UserState {
    isLoadingUser: boolean;
    user: User;

    isAddingToWatchedList: boolean;

    isLoadingWatchList: boolean;
    watchedProducts: Product[];
    watchedProductsCurrentPage: number;
    watchedProductsTotalPages: number;

    isLoadingSellers: boolean;
    loadedSellers: User[];
    loadedSellersCurrentPage: number;
    loadedSellersTotalPages: number;

    isLoadingListRequestUpgrade: boolean;
    loadedListReqUpgrade: User[];
    loadedListReqUpgradeCurrentPage: number;
    loadedListReqUpgradeTotalPages: number;

    isUpgrading: boolean;
    isDowngrading: boolean;

    isLoadingUserList: boolean;
    users: User[];
    loadedUserListCurrentPage: number;
    loadedUserListTotalPages: number;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            id: 0,
            name: "",
            avatar: "",
            points: 0,
            email: "",
        },
        isLoadingUser: false,
        isAddingToWatchedList: false,

        isLoadingWatchList: false,
        watchedProducts: [],
        watchedProductsCurrentPage: 1,
        watchedProductsTotalPages: 1,

        isLoadingSellers: false,
        loadedSellers: [],
        loadedSellersCurrentPage: 1,
        loadedSellersTotalPages: 1,

        isLoadingListRequestUpgrade: false,
        loadedListReqUpgrade: [],
        loadedListReqUpgradeCurrentPage: 1,
        loadedListReqUpgradeTotalPages: 1,

        isUpgrading: false,
        isDowngrading: false,

        isLoadingUserList: false,
        loadedUserListCurrentPage: 1,
        loadedUserListTotalPages: 1,
        users: [],
    } as UserState,
    reducers: {
        requestUser: (state: UserState) => {
            state.isLoadingUser = true;
        },
        completeGetUser: (state: UserState, action: PayloadAction<User>) => {
            state.isLoadingUser = false;
            state.user = action.payload;
        },
        requestUpdateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isLoadingUser = true;
            state.user = action.payload;
        },
        completeUpdateUser: (state: UserState, action: PayloadAction<User>) => {
            state.isLoadingUser = false;

            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.user.dob = action.payload.dob;
        },
        requestAddToWatchList: (state: UserState, action: PayloadAction<Product>) => {
            state.isAddingToWatchedList = true;
        },
        completeAddToWatchList: (state: UserState, action: PayloadAction<Product>) => {
            state.isAddingToWatchedList = false;
            state.watchedProducts.push(action.payload);
        },
        requestWatchList: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingWatchList = true;
            state.watchedProductsCurrentPage = 1;
            state.watchedProductsTotalPages = 1;
        },
        completeGetWatchList: (state: UserState, action: PayloadAction<ProductResponseWithPaging>) => {
            state.isLoadingWatchList = false;
            state.watchedProducts = action.payload.products ?? [];
            state.watchedProductsCurrentPage = action.payload.currentPage ?? 1;
            state.watchedProductsTotalPages = action.payload.totalPages ?? 1;
        },

        requestListSeller: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingSellers = true;
            state.loadedSellersCurrentPage = 1;
            state.loadedSellersTotalPages = 1;
        },
        completeGetListSeller: (state: UserState, action: PayloadAction<UserResponseWithPaging>) => {
            state.isLoadingSellers = false;
            state.loadedSellers = action.payload.users ?? [];
            state.loadedSellersCurrentPage = action.payload.currentPage ?? 1;
            state.loadedSellersTotalPages = action.payload.totalPages ?? 1;
        },

        requestListUpgrade: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingListRequestUpgrade = true;
            state.loadedListReqUpgradeCurrentPage = 1;
            state.loadedListReqUpgradeTotalPages = 1;
        },
        completeGetListUpgrade: (state: UserState, action: PayloadAction<UserResponseWithPaging>) => {
            state.isLoadingListRequestUpgrade = false;
            state.loadedListReqUpgrade = action.payload.users ?? [];
            state.loadedListReqUpgradeCurrentPage = action.payload.currentPage ?? 1;
            state.loadedListReqUpgradeTotalPages = action.payload.totalPages ?? 1;
        },

        upgrade: (state: UserState, action: PayloadAction<string>) => {
            state.isUpgrading = true;
        },
        completeUpgrade: (state: UserState) => {
            state.isUpgrading = false;
        },

        downgrade: (state: UserState, action: PayloadAction<string>) => {
            state.isDowngrading = true;
            state.user.role = UserRole.SELLER;
        },
        completeDowngrade: (state: UserState) => {
            state.isDowngrading = false;
            state.user.role = UserRole.BIDDER;
        },
        requestGetUserList: (state: UserState, action: PayloadAction<number>) => {
            state.isLoadingUserList = true;
        },
        completeGetUserList: (state: UserState, action: PayloadAction<UserResponseWithPaging>) => {
            state.isLoadingUserList = false;
            state.loadedUserListCurrentPage = action.payload.currentPage ?? 1;
            state.loadedUserListTotalPages = action.payload.totalPages ?? 1;
            state.users = action.payload.users ?? [];
        },
    },
});

export const {
    requestUser,
    completeGetUser,

    requestUpdateUser,
    completeUpdateUser,

    requestAddToWatchList,
    completeAddToWatchList,

    requestWatchList,
    completeGetWatchList,

    requestListSeller,
    completeGetListSeller,

    requestListUpgrade,
    completeGetListUpgrade,

    upgrade,
    completeUpgrade,

    downgrade,
    completeDowngrade,

    requestGetUserList,
    completeGetUserList,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectUserName = (state: RootState) => state.userState.user.name;
export const selectUserAvatar = (state: RootState) => state.userState.user.avatar;
