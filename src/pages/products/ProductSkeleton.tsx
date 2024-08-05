import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => (
  <div>
    <div data-testid='skeleton-1'>
      <Skeleton height={30} width={`80%`} />
    </div>
    <div data-testid='skeleton-2'>
      <Skeleton height={30} width={`60%`} />
    </div>
    <div data-testid='skeleton-3'>
      <Skeleton height={30} width={`90%`} />
    </div>
    <div data-testid='skeleton-4'>
      <Skeleton height={30} width={`50%`} />
    </div>
  </div>
);

export default ProductSkeleton;
