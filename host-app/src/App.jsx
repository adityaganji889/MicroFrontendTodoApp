import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const Todoform = lazy(() => import("todoform_app/Todoform")); //MFAName/Component Key Name exported from remote app
const Todolist = lazy(() => import("todolist_app/Todolist"));

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Toaster
          toastOptions={{
            duration: 2000, // default duration for all toasts
          }}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Todolist />
              </Suspense>
            }
          />
          <Route
            path="/add"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Todoform />
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Todoform type="edit" />
              </Suspense>
            }
          />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
