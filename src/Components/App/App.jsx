import React from "react";
import { Helmet } from "react-helmet";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Login } from "../Login/Login";
import { MasterLayout } from "../MasterLayout/MasterLayout";
import { Note } from "../Note/Note";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import { Register } from "../Register/Register";
const App = () => {
  const routes = createHashRouter([
    {
      path: "/",
      element: <MasterLayout />,
      errorElement: <h1>Not found page</h1>,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "note",
          element: (
            <ProtectedRoute>
              {" "}
              <Note />{" "}
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
       <Helmet>
        <title>My Notes</title>
      </Helmet>

   
        <RouterProvider router={routes} />
   

    </>
  );
};

export default App;
