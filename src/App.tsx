import { RouterProvider } from "react-router-dom";
import { router } from "./routs/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;