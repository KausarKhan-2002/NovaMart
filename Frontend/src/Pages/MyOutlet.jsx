import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import TableShimmer from "../Components/ShimmerUI/TableShimmer";
import { useSelector } from "react-redux";
import AuthShimmer from "../Components/ShimmerUI/AuthShimmer";
import ErrorShimmer from "../Components/ShimmerUI/ErrorShimmer";
import CartShimmer from "../Components/ShimmerUI/CartShimmer";
import AdminProtector from "../Components/Protection/AdminProtector";
import TopDiscountList from "./TopDiscountList";

const Home = lazy(() => import("./Home"));
const Auth = lazy(() => import("./Auth"));
const Profile = lazy(() => import("./Profile"));
const UpdateProfile = lazy(() => import("./UpdateProfile"));
const AdminPanel = lazy(() => import("./AdminPanel"));
const AllUsers = lazy(() => import("./AllUsers"));
const AllProducts = lazy(() => import("./AllProducts"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const Cart = lazy(() => import("./Cart"));
const ProductCollection = lazy(() => import("./ProductCollection"));
const FeatureTagEditor = lazy(() => import("./FeatureTagEditor"));
const Sponsorship = lazy(() => import("./Sponsorship"));

function MyOutlet() {
  const user = useSelector((store) => store.user);
  // const products = useSelector(store => store.products)

  return (
    <div className="pt-15">
      <Routes>
        {/* ********** Public routes ********** */}
        <Route
          path="/"
          element={
            <Suspense
              fallback={<div className="text-center p-4">Loading...</div>}
            >
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/collection/:categoryName"
          element={<ProductCollection />}
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<CartShimmer />}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="/top-discount" element={<TopDiscountList />} />

        {/* ********** User routes ********** */}
        <Route
          path="/auth"
          element={
            <Suspense fallback={<AuthShimmer />}>
              <Auth />
            </Suspense>
          }
        />
        {user && <Route path="/profile" element={<Profile />} />}
        {user && <Route path="/profile/update" element={<UpdateProfile />} />}

        {/* ********** Admin routes ********** */}
        {/* Nested Routes for Admin Panel */}
        {user && (
          <Route element={<AdminProtector />}>
            <Route
              path="/admin-panel"
              element={
                ["Admin", "Seller", "Moderator"].includes(user?.role) ? (
                  <AdminPanel />
                ) : (
                  <ErrorPage />
                )
              }
            >
              <Route
                path="all-users"
                element={
                  <Suspense fallback={<TableShimmer />}>
                    <AllUsers />
                  </Suspense>
                }
              />
              <Route
                path="all-products"
                element={
                  <Suspense
                    fallback={<div className="text-center p-4">Loading...</div>}
                  >
                    <AllProducts />
                  </Suspense>
                }
              />
              <Route
                path="edit/tags/:productId"
                element={<FeatureTagEditor />}
              />
              <Route path="sponsorship/:productId" element={<Sponsorship />} />
            </Route>
          </Route>
        )}

        {/* ********** Unauthorised or Unimplemented routes ********** */}
        <Route
          path="*"
          element={
            <Suspense fallback={<ErrorShimmer />}>
              <ErrorPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default MyOutlet;
