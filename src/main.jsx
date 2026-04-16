import { createRoot } from "react-dom/client";
import "./app/globalStyles/globalStyles.scss";
import Login from "./pages/loginPage/Login";
import { RouterProvider } from "react-router";
import { router } from "./app/routes/router";
import { Provider } from "react-redux";
import { store } from "./app/store/store";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router}>
			
		</RouterProvider>
    </Provider>
  </>,
);
