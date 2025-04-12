import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import TableShimmer from "../Components/ShimmerUI/TableShimmer";
import { useSelector } from "react-redux";
import AuthShimmer from "../Components/ShimmerUI/AuthShimmer";
import ErrorShimmer from "../Components/ShimmerUI/ErrorShimmer";
import CartShimmer from "../Components/ShimmerUI/CartShimmer";

const Home = lazy(() => import("./home"));
const Auth = lazy(() => import("./Auth"));
const Profile = lazy(() => import("./Profile"));
const UpdateProfile = lazy(() => import("./UpdateProfile"));
const AdminPanel = lazy(() => import("./AdminPanel"));
const AllUsers = lazy(() => import("./AllUsers"));
const AllProducts = lazy(() => import("./AllProducts"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const Cart = lazy(() => import("./Cart"));

function MyOutlet() {
  const user = useSelector((store) => store.user);

  return (
    <div className="pt-15">
      <Routes>
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
          path="/auth"
          element={
            <Suspense fallback={<AuthShimmer />}>
              <Auth />
            </Suspense>
          }
        />
        {user && <Route path="/profile" element={<Profile />} />}
        {user && <Route path="/profile/update" element={<UpdateProfile />} />}

        <Route
          path="/cart"
          element={
            <Suspense fallback={<CartShimmer />}>
              <Cart />
            </Suspense>
          }
        />

        {/* Nested Routes for Admin Panel */}
        {user && (
          <Route path="/admin-panel" element={<AdminPanel />}>
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
          </Route>
        )}

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