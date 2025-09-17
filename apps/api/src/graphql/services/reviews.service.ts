import { Injectable } from '@nestjs/common'
import { ReviewProductOutput } from '@/common/database/dto/review-product-output.dto'
import { ProductReviews } from '@/common/database/entities/product-reviews.entity'
import { PrismaService } from '@/shared/prisma/prisma.service'

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductReviews(productId: string): Promise<ReviewProductOutput[]> {
    const reviews = await this.prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    const productReviews = reviews.map(review => ({
      createdBy: review.user.name,
      comment: review.comment,
      title: review.title,
      rating: review.rating,
      createdAt: review.createdAt,
    }))

    return productReviews
  }

  async getProductReviewsSummary(productId: string): Promise<ProductReviews> {
    const reviews = await this.prisma.review.findMany({
      where: {
        productId,
      },
    })

    const totalReviews = reviews.length

    const ratingCounts = {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
    }

    let totalRatingSum = 0

    reviews.forEach(review => {
      totalRatingSum += review.rating
      switch (review.rating) {
        case 1:
          ratingCounts.one++
          break
        case 2:
          ratingCounts.two++
          break
        case 3:
          ratingCounts.three++
          break
        case 4:
          ratingCounts.four++
          break
        case 5:
          ratingCounts.five++
          break
      }
    })

    const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0

    return {
      totalReviews,
      averageRating: Math.round(averageRating * 100) / 100,
      ratingCounts,
    }
  }
}
