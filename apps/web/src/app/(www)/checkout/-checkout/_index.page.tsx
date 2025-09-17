import { useCartItems } from '@/hooks/use-cart-store.hook'
import {
  Page,
  PageBreadcrumbs,
  PageContent,
  PageHead,
  type PageBreadcrumbItem,
} from '@ordones/ui/components/page'
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from '@ordones/ui/components/stepper'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { CheckoutAddressStep } from './+steps/checkout-address-step'
import { CheckoutFinishStep } from './+steps/checkout-finish-step'
import { CheckoutPaymentStep } from './+steps/checkout-payment-step'
import { CheckoutReviewStep } from './+steps/checkout-review-step'

export const Route = createFileRoute('/(www)/checkout/_checkout/_index/')({
  component: CheckoutPage,
  head: () => ({
    meta: [
      {
        title: 'Checkout | Ordones',
      },
    ],
  }),
})

const checkoutSteps = [
  { id: 'review', step: 1, title: 'Revisar' },
  { id: 'address', step: 2, title: 'Endereço' },
  { id: 'payment', step: 3, title: 'Pagamento' },
  { id: 'finish', step: 4, title: 'Finalizar' },
]

const CHECKOUT_STEP_STORAGE_KEY = 'checkout_current_step'

function CheckoutPage() {
  const cartItems = useCartItems()

  const [currentStep, setCurrentStep] = useState(() => {
    const saved = sessionStorage.getItem(CHECKOUT_STEP_STORAGE_KEY)
    return saved ? parseInt(saved) : 1
  })

  useEffect(() => {
    sessionStorage.setItem(CHECKOUT_STEP_STORAGE_KEY, currentStep.toString())
  }, [currentStep])

  const breadcrumbs: PageBreadcrumbItem[] = [
    {
      label: 'Início',
      path: '/',
    },
    {
      label: 'Checkout',
      path: '/checkout',
    },
  ]

  const handleNextStep = () => {
    if (currentStep < checkoutSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBackStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepChange = (step: number) => {
    if (step <= currentStep + 1) {
      setCurrentStep(step)
    }
  }

  if (cartItems.length === 0) {
    return (
      <Page>
        <PageContent>
          <PageBreadcrumbs breadcrumbs={breadcrumbs} />
          <PageHead title="Checkout" subtitle="Finalize sua compra" />
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-6 text-6xl">🛒</div>
            <h2 className="mb-2 text-2xl font-bold">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground mb-6">
              Adicione alguns produtos ao carrinho antes de finalizar a compra
            </p>
            <Link
              to="/"
              className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Ver produtos
            </Link>
          </div>
        </PageContent>
      </Page>
    )
  }

  return (
    <Page>
      <PageContent>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        <PageHead title="Checkout" subtitle="Finalize sua compra" />
        <div className="flex w-full flex-col gap-8">
          <Stepper
            value={currentStep}
            onValueChange={handleStepChange}
            orientation="horizontal"
          >
            {checkoutSteps.map((_, index) => (
              <StepperItem
                key={index}
                step={index + 1}
                className="not-last:flex-1"
              >
                <StepperTrigger asChild>
                  <StepperIndicator />
                </StepperTrigger>
                {index < checkoutSteps.length - 1 && <StepperSeparator />}
              </StepperItem>
            ))}
          </Stepper>

          <div className="min-h-[600px]">
            {currentStep === 1 && (
              <CheckoutReviewStep onNext={handleNextStep} />
            )}

            {currentStep === 2 && (
              <CheckoutAddressStep
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 3 && (
              <CheckoutPaymentStep
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}

            {currentStep === 4 && <CheckoutFinishStep />}
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
