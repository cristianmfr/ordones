import { Check } from 'lucide-react'

interface CheckoutStepsProps {
  steps: Array<{ id: string; label: string }>
  activeStep: number
}

export function CheckoutSteps({ steps, activeStep }: CheckoutStepsProps) {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center"
          style={{ flex: index === steps.length - 1 ? 'none' : 1 }}
        >
          <div className="flex items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2
                ${
                  index < activeStep
                    ? 'bg-primary border-primary text-primary-foreground'
                    : index === activeStep
                    ? 'border-primary text-primary'
                    : 'border-muted-foreground/30 text-muted-foreground/30'
                }
              `}
            >
              {index < activeStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span
              className={`
                ml-3 text-sm font-medium
                ${
                  index <= activeStep
                    ? 'text-foreground'
                    : 'text-muted-foreground/50'
                }
              `}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`
                h-0.5 mx-4 flex-1
                ${
                  index < activeStep
                    ? 'bg-primary'
                    : 'bg-muted-foreground/20'
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  )
}