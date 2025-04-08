import UpdateProductsForm from "@/components/modules/shop/product/UpdateProductFrom";
import { getSingleProduct } from "@/services/products";
import React from "react";

const ProductUpdatePage = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;
    const { data: product } = await getSingleProduct(productId);
    console.log(product);
    return (
        <div className="flex items-center justify-center">
            <UpdateProductsForm product={product} />
        </div>
    );
};

export default ProductUpdatePage;
