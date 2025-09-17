import { Button } from '@ordones/ui/components/button'
import { LoginForm } from '@/components/forms/login-form'

interface CheckoutLoginStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function CheckoutLoginStep({ onNext, onPrevious }: CheckoutLoginStepProps) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Faça login para continuar</h2>
        <p className="text-muted-foreground">
          Entre com sua conta para prosseguir com o checkout
        </p>
      </div>

      <LoginForm />

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex-1"
        >
          Voltar
        </Button>
        <Button
          variant="secondary"
          onClick={onNext}
          className="flex-1"
        >
          Continuar sem login
        </Button>
      </div>
    </div>
  )
}