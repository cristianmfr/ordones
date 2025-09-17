import { PrismaClient } from './generated'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding products...')

  const products = [
    {
      name: 'Caneca Barril 420 ml - Verde Musgo',
      slug: 'caneca-barril-420ml-verde-musgo',
      description:
        'Caneca térmica em formato barril com capacidade de 420ml, cor verde musgo. Ideal para manter suas bebidas na temperatura desejada.',
      price: 9999, // R$ 99,99 in cents
      discount: 0,
      installments: 6,
      sku: 'ORD-CANECA-BARRIL-420-VM',
      stock: 25,
      status: 'ACTIVE' as const,
      hasCustomOption: false,
      hasCustomModel: false,
      height: 120, // 12cm in mm
      length: 85, // 8.5cm in mm
      width: 85, // 8.5cm in mm
      weight: 300, // 0.3kg in grams
    },
    {
      name: 'Caneca Barril 420 ml - Vermelha',
      slug: 'caneca-barril-420ml-vermelha',
      description:
        'Caneca térmica em formato barril com capacidade de 420ml, cor vermelha. Ideal para manter suas bebidas na temperatura desejada.',
      price: 9999, // R$ 99,99 in cents
      discount: 0,
      installments: 6,
      sku: 'ORD-CANECA-BARRIL-420-VERMELHA',
      stock: 25,
      status: 'ACTIVE' as const,
      hasCustomOption: false,
      hasCustomModel: false,
      height: 120, // 12cm in mm
      length: 85, // 8.5cm in mm
      width: 85, // 8.5cm in mm
      weight: 300, // 0.3kg in grams
    },
    {
      name: 'Caneca Barril 420 ml - Inox',
      slug: 'caneca-barril-420ml-inox',
      description:
        'Caneca térmica em formato barril com capacidade de 420ml, acabamento em inox. Ideal para manter suas bebidas na temperatura desejada.',
      price: 9999, // R$ 99,99 in cents
      discount: 0,
      installments: 6,
      sku: 'ORD-CANECA-BARRIL-420-INOX',
      stock: 25,
      status: 'ACTIVE' as const,
      hasCustomOption: false,
      hasCustomModel: false,
      height: 120, // 12cm in mm
      length: 85, // 8.5cm in mm
      width: 85, // 8.5cm in mm
      weight: 300, // 0.3kg in grams
    },
    {
      name: 'Copo Térmico com Abridor de Garrafa 473 ml - Preto',
      slug: 'copo-termico-abridor-473ml-preto',
      description:
        'Copo térmico de 473ml na cor preta com abridor de garrafa integrado. Funcionalidade e praticidade em um só produto.',
      price: 15999, // R$ 159,99 in cents
      discount: 0,
      installments: 6,
      sku: 'ORD-COPO-TERM-473-ABRID-PRETO',
      stock: 20,
      status: 'ACTIVE' as const,
      hasCustomOption: false,
      hasCustomModel: false,
      height: 140, // 14cm in mm
      length: 80, // 8cm in mm
      width: 80, // 8cm in mm
      weight: 350, // 0.35kg in grams
    },
    {
      name: 'Copo Térmico com Abridor de Garrafa 473 ml - Marinho',
      slug: 'copo-termico-abridor-473ml-marinho',
      description:
        'Copo térmico de 473ml na cor marinho com abridor de garrafa integrado. Funcionalidade e praticidade em um só produto.',
      price: 15999, // R$ 159,99 in cents
      discount: 0,
      installments: 6,
      sku: 'ORD-COPO-TERM-473-ABRID-MARINHO',
      stock: 20,
      status: 'ACTIVE' as const,
      hasCustomOption: false,
      hasCustomModel: false,
      height: 140, // 14cm in mm
      length: 80, // 8cm in mm
      width: 80, // 8cm in mm
      weight: 350, // 0.35kg in grams
    },
    {
      name: 'Copo Térmico com Abridor de Garrafa 473 ml - Verde Musgo',
      slug: 'copo-termico-abridor-473ml-verde-musgo',
      description:
        'Copo térmico de 473ml na cor verde musgo com abridor de garrafa integrado. Funcionalidade e praticidade em um só produto.',
      price: 15999, // R$ 159,99 in cents
      discount: 0,
      installments: 6,
      sku: 'ORD-COPO-TERM-473-ABRID-VM',
      stock: 20,
      status: 'ACTIVE' as const,
      hasCustomOption: false,
      hasCustomModel: false,
      height: 140, // 14cm in mm
      length: 80, // 8cm in mm
      width: 80, // 8cm in mm
      weight: 350, // 0.35kg in grams
    },
    {
      name: 'Copo Térmico com Tampa 500 ml - Preto',
      slug: 'copo-termico-tampa-500ml-preto',
      description:
        'Copo térmico de 500ml na cor preta com tampa. Perfeito para manter suas bebidas na temperatura ideal por mais tempo.',
      price: 13499, // R$ 134,99 in cents
      discount: 0,
      installments: 6,
      sku: 'ORD-COPO-TERM-500-TAMPA-PRETO',
      stock: 30,
      status: 'ACTIVE' as const,
      hasCustomOption: false,
      hasCustomModel: false,
      height: 150, // 15cm in mm
      length: 85, // 8.5cm in mm
      width: 85, // 8.5cm in mm
      weight: 400, // 0.4kg in grams
    },
  ]

  for (const productData of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: productData,
      create: productData,
    })

    console.log(`✅ Product created/updated: ${product.name}`)
  }

  console.log('🎉 Seeding completed!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
