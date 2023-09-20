import React from "react";
import { lazy, Suspense } from "react";
import MainLayout from "../Layout/MainLayout";
import AuthLayout from "../Layout/AuthLayout";
import { useRoutes } from "react-router-dom";
import Login from "../Components/auth/login";


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const Home = Loader(lazy(() => import("../Common/Home")));
const Profile = Loader(lazy(() => import("../Common/Profile")));
const Buyer = Loader(
  lazy(() => import("../Components/User_Management/Buyer/Buyer"))
);
const AddBuyer = Loader(
  lazy(() => import("../Components/User_Management/Buyer/AddBuyer"))
);
const EditBuyer = Loader(
  lazy(() => import("../Components/User_Management/Buyer/EditBuyer"))
);
const Investors = Loader(
  lazy(() => import("../Components/User_Management/Investor/Investors"))
);
const AddInvestorForm = Loader(
  lazy(() => import("../Components/User_Management/Investor/AddInvestorForm"))
);
const EditInvestor = Loader(
  lazy(() => import("../Components/User_Management/Investor/EditInvestor"))
);
const Sellers = Loader(
  lazy(() => import("../Components/User_Management/Sellers/Sellers"))
);
const AddSellers = Loader(
  lazy(() => import("../Components/User_Management/Sellers/AddSellers"))
);
const EditSeller = Loader(
  lazy(() => import("../Components/User_Management/Sellers/EditSeller"))
);
const PropertyListing = Loader(
  lazy(() =>
    import("../Components/User_Management/PropertyListing/PropertyListing")
  )
);
const EditProperty = Loader(
  lazy(() =>
    import("../Components/User_Management/PropertyListing/EditProperty")
  )
);
const AddProperty = Loader(
  lazy(() =>
    import("../Components/User_Management/PropertyListing/AddProperty")
  )
);
const VerificationRequest = Loader(
  lazy(() =>
    import("../Components/User_Management/PropertyListing/VerificationRequest")
  )
);
const ViewBuyer = Loader(
  lazy(() => import("../Components/User_Management/Buyer/ViewBuyer"))
);
const ViewSeller = Loader(
  lazy(() => import("../Components/User_Management/Sellers/ViewSeller"))
);
const ViewInvestor = Loader(
  lazy(() => import("../Components/User_Management/Investor/ViewInvestor"))
);
const DocumentVerification = Loader(
  lazy(() =>
    import("../Components/User_Management/PropertyListing/DocumentVerification")
  )
);
const ResetPassword = Loader(
  lazy(() => import("../Components/auth/ResetPassword"))
);
const RoleManage = Loader(
  lazy(() => import("../Components/Manager_Role/RoleManage"))
);

const EditRoleManage = Loader(
  lazy(() => import("../Components/Manager_Role/EditRoleManage"))
);

const AdminMenu = Loader(
  lazy(() => import("../Components/AdminMenu/AdminMenu"))
);
const AddMenu = Loader(lazy(() => import("../Components/AdminMenu/AddMenu")));

const EditAdminMenu = Loader(
  lazy(() => import("../Components/AdminMenu/EditAdminMenu"))
);

const UserManagement = Loader(
  lazy(() => import("../Components/UserManagement"))
);
const PersonalDetailsBuyer = Loader(
  lazy(() =>
    import("../Components/User_Management/Buyer/View/PersonalDetailsBuyer")
  )
);
const BuyerKyc = Loader(
  lazy(() => import("../Components/User_Management/Buyer/View/BuyerKyc"))
);
const PropertyVerification = Loader(
  lazy(() => import("../Components/Property_Verification/PropertyVerification"))
);
const AddPropertyVerification = Loader(
  lazy(() =>
    import("../Components/Property_Verification/AddPropertyVerification")
  )
);
const ViewPropertyVerification = Loader(
  lazy(() =>
    import("../Components/Property_Verification/ViewPropertyVerification")
  )
);
const ViewPropertyListing = Loader(
  lazy(() =>
    import("../Components/User_Management/PropertyListing/ViewPropertyListing")
  )
);


const BuyerSubscription = Loader(
  lazy(() => import("../Components/Subscription/Buyer/BuyerSubscription"))
);
const AddBuyerSub = Loader(
  lazy(() => import("../Components/Subscription/Buyer/Add/AddBuyerSub"))
);
const EditBuyerSub = Loader(
  lazy(() => import("../Components/Subscription/Buyer/Edit/EditBuyerSub"))
);
// const ViewBuyerSub = Loader(
//   lazy(() => import("../Components/Subscription/Buyer/View/ViewBuyerSub"))
// );
//seller
const SellerSubscription = Loader(
  lazy(() => import("../Components/Subscription/Sellers/SellerSubscription"))
);
const AddSellerSub = Loader(
  lazy(() => import("../Components/Subscription/Sellers/Add/AddSellerSub"))
);
const EditSellerSub = Loader(
  lazy(() => import("../Components/Subscription/Sellers/Edit/EditSellerSub"))
);
// const ViewSellerSub = Loader(
//   lazy(() => import("../Components/Subscription/Sellers/View/ViewSellerSub"))
// );
//investor
const InvestorSubscription = Loader(
  lazy(() =>
    import("../Components/Subscription/Investor/InvestorSubscription.")
  )
);
const AddInvestorSub = Loader(
  lazy(() => import("../Components/Subscription/Investor/Add/AddInvestorSub"))
);
const EditInvestorSub = Loader(
  lazy(() => import("../Components/Subscription/Investor/Edit/EditInvestorSub"))
);
// const ViewInvestorSub = Loader(
//   lazy(() => import("../Components/Subscription/Investor/View/ViewInvestorSub"))
// );

const AddManager = Loader(
  lazy(() => import("../Components/Managers/AddManager"))
);
const EditManager = Loader(
  lazy(() => import("../Components/Managers/EditManager"))
);
const ViewManager = Loader(
  lazy(() => import("../Components/Managers/ViewManager"))
);
const Manager = Loader(lazy(() => import("../Components/Managers/Manager")));
function Router() {
  {
    let element = useRoutes([
      {
        element: <AuthLayout />,
        children: [
          { path: "/", element: <Login /> },
          { path: "/reset-password", element: <ResetPassword /> },
          {
            element: <MainLayout />,
            children: [
              { path: "/Dashboard", element: <Home /> },
              { path: "/profile", element: <Profile /> },

              { path: "/buyer", element: <Buyer /> },
              { path: "/add-buyer", element: <AddBuyer /> },
              { path: "/edit-buyer/:id", element: <EditBuyer /> },
              { path: "/view-buyer/:id", element: <ViewBuyer /> },
              {
                path: "/personal-details/:id",
                element: <PersonalDetailsBuyer />,
              },
              { path: "/buyer-kyc", element: <BuyerKyc /> },

              { path: "/sellers", element: <Sellers /> },
              { path: "/add-seller", element: <AddSellers /> },
              { path: "/edit-seller/:id", element: <EditSeller /> },
              { path: "/view-seller/:id", element: <ViewSeller /> },

              { path: "/investor", element: <Investors /> },
              { path: "/add-investor", element: <AddInvestorForm /> },
              { path: "/edit-investor/:id", element: <EditInvestor /> },
              { path: "/view-investor/:id", element: <ViewInvestor /> },

              { path: "/property-listing", element: <PropertyListing /> },
              {
                path: "/view-propertylisting/:id",
                element: <ViewPropertyListing />,
              },

              { path: "/add-property", element: <AddProperty /> },
              { path: "/edit-property", element: <EditProperty /> },

              {
                path: "/property-Verification",
                element: <PropertyVerification />,
              },
              {
                path: "/add-propertyverification",
                element: <AddPropertyVerification />,
              },
              {
                path: "/view-propertyverification/:id",
                element: <ViewPropertyVerification />,
              },

              { path: "/RoleManage", element: <RoleManage /> },

              { path: "/edit-roleManage/:id", element: <EditRoleManage /> },

              { path: "/AdminMenu", element: <AdminMenu /> },
              { path: "/AddMenu", element: <AddMenu /> },
              { path: "/edit-adminmenu/:id", element: <EditAdminMenu /> },

              {
                path: "/documentVerification",
                element: <DocumentVerification />,
              },
              //subscription
              

              { path: "/buyer-subscription", element: <BuyerSubscription /> },
              { path: "/add-buyersub", element: <AddBuyerSub /> },
              { path: "/edit-buyersub/:id", element: <EditBuyerSub /> },
              // { path: "/view-buyersub/:id", element: <ViewBuyerSub /> },

              ,
              { path: "/seller-subscription", element: <SellerSubscription /> },
              { path: "/add-sellersub", element: <AddSellerSub /> },
              { path: "/edit-sellersub/:id", element: <EditSellerSub /> },
              // { path: "/view-sellersub/:id", element: <ViewSellerSub /> },

              {
                path: "/investor-subscription",
                element: <InvestorSubscription />,
              },
              { path: "/add-investorsub", element: <AddInvestorSub /> },
              { path: "/edit-investorsub/:id", element: <EditInvestorSub /> },
              // { path: "/view-investorsub/:id", element: <ViewInvestorSub /> },

              {
                path: "/add-manager",
                element: <AddManager />,
              },
              {
                path: "/edit-manager/:id",
                element: <EditManager />,
              },
              {
                path: "/view-manager/:id",
                element: <ViewManager />,
              },
              {
                path: "/managers",
                element: <Manager />,
              },
              {
                path: "/verification-request",
                element: <VerificationRequest />,
              },

              { path: "/userManagement", element: <UserManagement /> },
            ],
          },
        ],
      },
    ]);

    return element;
  }
}

export default Router;
