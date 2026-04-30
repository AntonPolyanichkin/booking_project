import { createRoot } from "react-dom/client";
import "./app/globalStyles/globalStyles.scss";
import { RouterProvider } from "react-router";
import { router } from "./app/routes/router";
import { Provider } from "react-redux";
import { store } from "./app/store/store";
import AppInit from "./app/appInit/AppInit";

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </>,
);
