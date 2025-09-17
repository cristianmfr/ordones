import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CheckoutSteps } from './-components/checkout-steps'
import { CheckoutReviewStep } from './-components/checkout-review-step'
import { CheckoutLoginStep } from './-components/checkout-login-step'
import { CheckoutAddressStep } from './-components/checkout-address-step'
import { CheckoutPaymentStep } from './-components/checkout-payment-step'
import { CheckoutFinishStep } from './-components/checkout-finish-step'
import { useAuthentication } from '@/hooks/use-authentication.hook'

export const Route = createFileRoute('/(www)/checkout/')({
  component: CheckoutPage,
})

type CheckoutStep = 'review' | 'login' | 'address' | 'payment' | 'finish'

type ShippingQuotes = {
  address: string
  options: Array<{
    carrier: string
    price: string
    days: string
  }>
}

type Address = {
  id: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

function CheckoutPage() {
  const { isAuthenticated } = useAuthentication()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('review')
  const [checkoutData, setCheckoutData] = useState({
    addressId: '',
    paymentMethod: '',
    shippingMethodId: '',
  })
  const [shippingQuotes, setShippingQuotes] = useState<ShippingQuotes | null>(null)
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([])

  const steps = [
    { id: 'review', label: 'Revisar Carrinho' },
    ...(isAuthenticated ? [] : [{ id: 'login', label: 'Login' }]),
    { id: 'address', label: 'Endereço' },
    { id: 'payment', label: 'Pagamento' },
    { id: 'finish', label: 'Finalização' },
  ]

  const activeStepIndex = steps.findIndex((step) => step.id === currentStep)

  const handleNextStep = () => {
    if (currentStep === 'review') {
      setCurrentStep(isAuthenticated ? 'address' : 'login')
    } else if (currentStep === 'login') {
      setCurrentStep('address')
    } else if (currentStep === 'address') {
      setCurrentStep('payment')
    } else if (currentStep === 'payment') {
      setCurrentStep('finish')
    }
  }

  const handlePreviousStep = () => {
    if (currentStep === 'address') {
      setCurrentStep(isAuthenticated ? 'review' : 'login')
    } else if (currentStep === 'login') {
      setCurrentStep('review')
    } else if (currentStep === 'payment') {
      setCurrentStep('address')
    } else if (currentStep === 'finish') {
      setCurrentStep('payment')
    }
  }

  const handleUpdateCheckoutData = (data: Partial<typeof checkoutData>) => {
    setCheckoutData((prev) => ({ ...prev, ...data }))
  }

  const handleAddressSaved = (address: Address) => {
    setSavedAddresses((prev) => [...prev, address])
    setCheckoutData((prev) => ({ ...prev, addressId: address.id }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <CheckoutSteps steps={steps} activeStep={activeStepIndex} />

      <div className="mt-8">
        {currentStep === 'review' && (
          <CheckoutReviewStep
            onNext={handleNextStep}
            onShippingQuote={setShippingQuotes}
          />
        )}

        {currentStep === 'login' && !isAuthenticated && (
          <CheckoutLoginStep
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        )}

        {currentStep === 'address' && (
          <CheckoutAddressStep
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            onUpdate={handleUpdateCheckoutData}
            onAddressSaved={handleAddressSaved}
            savedAddresses={savedAddresses}
          />
        )}

        {currentStep === 'payment' && (
          <CheckoutPaymentStep
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            onUpdate={handleUpdateCheckoutData}
            shippingQuotes={shippingQuotes}
          />
        )}

        {currentStep === 'finish' && (
          <CheckoutFinishStep
            checkoutData={checkoutData}
            shippingQuotes={shippingQuotes}
            savedAddresses={savedAddresses}
            onPrevious={handlePreviousStep}
          />
        )}
      </div>
    </div>
  )
}