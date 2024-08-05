import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Navbar } from "./components";
import {
  ProductAdd,
  ProductAddSkeleton,
  ProductEdit,
  ProductEditSkeleton,
  ProductSkeleton,
} from "./pages/products";
import Product from "./pages/products/Product";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={
            <Suspense fallback={<ProductSkeleton />}>
              <Product />
            </Suspense>
          }
        />
        <Route
          path='/add-product'
          element={
            <Suspense fallback={<ProductAddSkeleton />}>
              <ProductAdd />
            </Suspense>
          }
        />
        <Route
          path='/edit-product'
          element={
            <Suspense fallback={<ProductEditSkeleton />}>
              <ProductEdit />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default App;
