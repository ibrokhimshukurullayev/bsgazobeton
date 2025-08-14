import ProductDetail from "./ProductDetail.client";

export default async function Page({ params }) {
  const resolvedParams = await params; // Promise ichidan qiymatni olish
  return <ProductDetail productId={resolvedParams?.productId} />;
}
