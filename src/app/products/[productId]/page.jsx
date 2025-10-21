import ProductDetail from "./ProductDetail.client";

export default async function Page({ params }) {
  const { productId } = await params; // ✅ yangi Next versiyalarda shunday kerak
  return <ProductDetail productId={productId} />;
}
