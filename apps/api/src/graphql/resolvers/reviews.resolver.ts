import { Args, Query, Resolver } from '@nestjs/graphql'
import { ReviewProductOutput } from '@/common/database/dto/review-product-output.dto'
import { ProductReviews } from '@/common/database/entities/product-reviews.entity'
import { ReviewsService } from '../services/reviews.service'

@Resolver()
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Query(() => [ReviewProductOutput], { name: 'reviewsProduct' })
  async getProductReviews(@Args('productId') productId: string) {
    return this.reviewsService.getProductReviews(productId)
  }

  @Query(() => ProductReviews, { name: 'reviewsProductSummary' })
  async getProductReviewsSummary(@Args('productId') productId: string) {
    return this.reviewsService.getProductReviewsSummary(productId)
  }
}
