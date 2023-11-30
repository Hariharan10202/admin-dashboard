import { fetchProducts } from "@/app/lib/data";
import ProductTable from "@/components/ProductTable";

const Products = async () => {
  const products = await fetchProducts();

  return (
    <div className="w-full p-5">
      <ProductTable products={JSON.stringify(products)} />
    </div>
  );
};

export default Products;
