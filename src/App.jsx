import { RouterProvider } from "react-router";
import { router } from "./routing/AppRoutes";
import AuthContextProvider from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import GlobalSpinner from "./components/shared/Spinner/GlobalSpinner";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />

      <AuthContextProvider>
        <GlobalSpinner />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
