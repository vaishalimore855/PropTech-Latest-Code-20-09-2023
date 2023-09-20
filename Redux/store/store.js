import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Slice/AuthSlice";
import ProfileSlice from "../Slice/ProfileSlice";
import BuyerSlice from "../Slice/BuyerSlice";
import SellerSlice from "../Slice/SellerSlice";
import InvestorSlice from "../Slice/InvestorSlice";
import AdminMenuSlice from "../Slice/MenuSlice";
import PropertyListingSlice from "../Slice/PropertyListingSlice";
import UserSlice from "../Slice/UserSlice";
import PropertyVerificationSlice from "../Slice/PropertyVerificationSlice";
import SubscriptionSlice from "../Slice/SubscriptionSlice";
import ManagerSlice from "../Slice/ManagerSlice";
import SellerSubSlice from "../Slice/SellerSubSlice";
import InvestorSubSlice from "../Slice/InvestorSubSlice";
export const store = configureStore({
  reducer: {
    authentication: AuthSlice,
    profile: ProfileSlice,
    buyer: BuyerSlice,
    seller: SellerSlice,
    investor: InvestorSlice,
    adminMenu: AdminMenuSlice,
    propertylisting: PropertyListingSlice,
    user:UserSlice,
    propertyverification:PropertyVerificationSlice,
    SubscriptionData:SubscriptionSlice,
    ManagerData:ManagerSlice,
    SellerSubscriptionData:SellerSubSlice,
    InvestorSubscriptionData:InvestorSubSlice
  },
});

export default store;
