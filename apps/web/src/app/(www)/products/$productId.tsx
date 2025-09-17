import { useQuery } from '@apollo/client'
import { Page, PageContent } from '@ordones/ui/components/page'
import { createFileRoute } from '@tanstack/react-router'
import { CartFinishSheet } from '@/components/cart/cart-finish-sheet'
import ProductDetails from '@/components/product/product-details'
import { ProductDetailsSkeleton } from '@/components/product/product-details-skeleton'
import { PRODUCT_DETAILS } from '@/graphql/queries/products.queries'
import { addToCart } from '@/store/cart-local.store'

export const Route = createFileRoute('/(www)/products/$productId')({
  component: ProductPage,
  head: () => ({
    meta: [
      {
        title: 'Produto | Ordones',
      },
    ],
  }),
})

function ProductPage() {
  const { productId } = Route.useParams()

  const { data: productDetailsQuery, loading: productDetailsIsLoading } =
    useQuery(PRODUCT_DETAILS, {
      variables: {
        productId,
        query: {
          take: 10,
          skip: 0,
        },
      },
    })

  const product = productDetailsQuery?.product
  const relatedProducts = productDetailsQuery?.products?.items
  const productReviews = productDetailsQuery?.reviewsProduct
  const productReviewsSummary = productDetailsQuery?.reviewsProductSummary!

  if (!product) {
    return null
  }

  return (
    <>
      <Page>
        <PageContent>
          <div className='flex w-full h-full flex-col gap-4'>
            {productDetailsIsLoading ? (
              <ProductDetailsSkeleton />
            ) : (
              <ProductDetails
                product={product}
                handleAddToCart={() => addToCart(product, 1)}
                relatedProducts={relatedProducts ?? []}
                reviews={productReviews ?? []}
                reviewsSummary={productReviewsSummary}
              />
            )}
          </div>
        </PageContent>
      </Page>
      <CartFinishSheet />
    </>
  )
}
