import { getProducts } from "@/actions/getProducts";
import ProductContent from "./component/ProductContent";

const ProductPage = async() => {
    const products = await getProducts();

    return (
        <ProductContent products={products} />
    )
}

export default ProductPage;