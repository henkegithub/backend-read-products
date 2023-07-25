import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import { StyledList } from "../ProductList/ProductList.styled";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }
  console.log("Reviews", data.reviews);
  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      <StyledList>
        {data.reviews.map((review) => {
          return (
            <>
              <h3>Review(s):</h3>
              <li>
                <strong>Rating:</strong> {review.rating}
              </li>
              <li key={review.id}>
                <strong>Title:</strong> {review.title}
              </li>
              <li>
                <strong>Comment:</strong> {review.text}
              </li>
            </>
          );
        })}
      </StyledList>
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
