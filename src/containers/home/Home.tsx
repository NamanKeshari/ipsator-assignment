import AppLayout from "@/layouts/AppLayout";
import ContextProvider from "./Context";
import Products from "../../components/Products";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";

export default function HomePage() {
  return (
    <ContextProvider>
      <AppLayout>
        <Filters />
        <Products />
        <Pagination />
      </AppLayout>
    </ContextProvider>
  );
}
