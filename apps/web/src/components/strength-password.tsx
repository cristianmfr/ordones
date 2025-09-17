import { SecureField } from '@ordones/ui/components/secure-field'
import { CheckIcon, XIcon } from 'lucide-react'
import { useMemo } from 'react'
import type { Control } from 'react-hook-form'

interface StrengthPasswordProps {
  name: string
  control: Control<any>
  label?: string
  password: string
}

export function StrengthPassword({
  name,
  control,
  label,
  password = '',
}: StrengthPasswordProps) {
  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'Pelo menos 8 caracteres' },
      { regex: /[0-9]/, text: 'Pelo menos 1 número' },
      { regex: /[a-z]/, text: 'Pelo menos 1 letra minúscula' },
      { regex: /[A-Z]/, text: 'Pelo menos 1 letra maiúscula' },
    ]

    return requirements.map(req => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  const strength = checkStrength(password)

  const strengthScore = useMemo(() => {
    return strength.filter(req => req.met).length
  }, [strength])

  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-border'
    if (score <= 1) return 'bg-red-500'
    if (score <= 2) return 'bg-orange-500'
    if (score === 3) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  const getStrengthText = (score: number) => {
    if (score === 0) return 'Crie uma senha'
    if (score <= 2) return 'Senha fraca'
    if (score === 3) return 'Senha média'
    return 'Senha forte'
  }

  return (
    <div>
      <div className='*:not-first:mt-2'>
        <SecureField
          name={name}
          control={control}
          label={label}
          placeholder='************'
        />
      </div>

      <div
        className='bg-border mb-2 mt-3 h-1 w-full overflow-hidden rounded-full'
        role='progressbar'
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={4}
        aria-label='Força da senha'>
        <div
          className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
          style={{ width: `${(strengthScore / 4) * 100}%` }}></div>
      </div>

      <p className='text-foreground mb-1 text-xs font-medium'>
        {getStrengthText(strengthScore)}. Deve conter:
      </p>

      <ul className='space-y-1.5' aria-label='Requisitos da senha'>
        {strength.map((req, index) => (
          <li key={index} className='flex items-center gap-2'>
            {req.met ? (
              <CheckIcon
                size={16}
                className='text-emerald-500'
                aria-hidden='true'
              />
            ) : (
              <XIcon
                size={16}
                className='text-muted-foreground/80'
                aria-hidden='true'
              />
            )}
            <span
              className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}>
              {req.text}
              <span className='sr-only'>
                {req.met
                  ? ' - Requisito atendido'
                  : ' - Requisito não atendido'}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
