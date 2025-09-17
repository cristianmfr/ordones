import { Label } from '@ordones/ui/components/label'
import {
  Page,
  type PageBreadcrumbItem,
  PageBreadcrumbs,
  PageContent,
} from '@ordones/ui/components/page'
import {
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconPackage,
} from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(www)/exchanges/')({
  component: ExchangesPage,
})

function ExchangesPage() {
  const breadcrumbs: PageBreadcrumbItem[] = [
    {
      label: 'Início',
      path: '/',
    },
    {
      label: 'Trocas e Devoluções',
      path: '/trocas-devolucoes',
    },
  ]

  const steps = [
    {
      number: 1,
      title: 'Entre em contato',
      description:
        'Envie um e-mail para atendimento@ordones.com.br informando o número do pedido e o motivo da solicitação.',
    },
    {
      number: 2,
      title: 'Análise da solicitação',
      description:
        'Nossa equipe analisará sua solicitação em até 24 horas e enviará as instruções necessárias.',
    },
    {
      number: 3,
      title: 'Envio do produto',
      description:
        'Embale o produto adequadamente e envie conforme as instruções recebidas.',
    },
    {
      number: 4,
      title: 'Processamento',
      description:
        'Após o recebimento, processamos a troca ou devolução em até 5 dias úteis.',
    },
  ]

  const conditions = [
    {
      icon: <IconCheck className='h-5 w-5 text-green-500' />,
      title: 'Defeito de fabricação',
      description:
        'Produtos com defeito de fabricação podem ser trocados sem custo adicional.',
    },
    {
      icon: <IconCheck className='h-5 w-5 text-green-500' />,
      title: 'Erro no pedido',
      description:
        'Se houve erro na especificação por nossa parte, faremos a correção gratuitamente.',
    },
    {
      icon: <IconAlertTriangle className='h-5 w-5 text-yellow-500' />,
      title: 'Mudança de especificação',
      description:
        'Alterações após aprovação do layout podem gerar custos adicionais.',
    },
    {
      icon: <IconAlertTriangle className='h-5 w-5 text-red-500' />,
      title: 'Produtos personalizados',
      description:
        'Produtos personalizados não podem ser trocados, exceto em caso de defeito.',
    },
  ]

  return (
    <Page>
      <PageContent>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className='flex w-full flex-col gap-8 p-6 pt-0'>
          <div className='flex flex-col gap-4'>
            <Label className='text-primary text-3xl font-bold'>
              Trocas e Devoluções
            </Label>
            <p className='text-muted-foreground text-lg'>
              Conheça nossa política de trocas e devoluções para produtos
              personalizados e saiba como solicitar.
            </p>
          </div>

          <div className='max-w-4xl space-y-8'>
            {/* Important Alert */}
            <div className='rounded-lg border border-amber-200 bg-amber-50 p-4'>
              <div className='flex items-start gap-3'>
                <IconAlertTriangle className='mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600' />
                <div>
                  <Label className='font-semibold text-amber-800'>
                    Importante sobre produtos personalizados
                  </Label>
                  <p className='mt-1 text-sm leading-6 text-amber-700'>
                    Devido à natureza personalizada de nossos produtos, trocas
                    só são aceitas em casos específicos. Certifique-se de
                    revisar cuidadosamente o layout antes da aprovação.
                  </p>
                </div>
              </div>
            </div>

            {/* Prazos */}
            <section className='flex flex-col gap-4'>
              <Label className='text-primary text-2xl font-semibold'>
                Prazos para Solicitação
              </Label>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='bg-card rounded-lg border p-4'>
                  <div className='mb-2 flex items-center gap-3'>
                    <IconClock className='text-primary h-5 w-5' />
                    <Label className='font-semibold'>
                      Defeito de fabricação
                    </Label>
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    Até <strong>30 dias</strong> após o recebimento do produto
                  </p>
                </div>

                <div className='bg-card rounded-lg border p-4'>
                  <div className='mb-2 flex items-center gap-3'>
                    <IconPackage className='text-primary h-5 w-5' />
                    <Label className='font-semibold'>
                      Produto danificado no transporte
                    </Label>
                  </div>
                  <p className='text-muted-foreground text-sm'>
                    Até <strong>7 dias</strong> após o recebimento do produto
                  </p>
                </div>
              </div>
            </section>

            {/* Condições */}
            <section className='flex flex-col gap-4'>
              <Label className='text-primary text-2xl font-semibold'>
                Condições para Troca
              </Label>

              <div className='grid gap-4'>
                {conditions.map((condition, index) => (
                  <div key={index} className='bg-card rounded-lg border p-4'>
                    <div className='flex items-start gap-3'>
                      {condition.icon}
                      <div className='flex-1'>
                        <Label className='mb-1 block font-medium'>
                          {condition.title}
                        </Label>
                        <p className='text-muted-foreground text-sm'>
                          {condition.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Processo */}
            <section className='flex flex-col gap-4'>
              <Label className='text-primary text-2xl font-semibold'>
                Como solicitar troca ou devolução
              </Label>

              <div className='space-y-4'>
                {steps.map((step, index) => (
                  <div key={index} className='flex gap-4'>
                    <div className='bg-primary text-primary-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold'>
                      {step.number}
                    </div>
                    <div className='flex-1 pb-4'>
                      <Label className='mb-2 block font-semibold'>
                        {step.title}
                      </Label>
                      <p className='text-muted-foreground text-sm leading-6'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Exceções */}
            <section className='flex flex-col gap-4'>
              <Label className='text-primary text-2xl font-semibold'>
                Exceções e Casos Especiais
              </Label>

              <div className='space-y-4'>
                <div className='bg-card rounded-lg border p-4'>
                  <Label className='text-primary mb-3 block font-semibold'>
                    Não aceitamos trocas em:
                  </Label>
                  <ul className='text-muted-foreground ml-6 list-disc space-y-2 text-sm'>
                    <li>
                      Produtos personalizados conforme especificação aprovada
                    </li>
                    <li>Produtos danificados por uso inadequado</li>
                    <li>Produtos com mais de 30 dias da entrega</li>
                    <li>Mudanças de especificação após aprovação do layout</li>
                  </ul>
                </div>

                <div className='bg-card rounded-lg border p-4'>
                  <Label className='text-primary mb-3 block font-semibold'>
                    Trocas aceitas:
                  </Label>
                  <ul className='text-muted-foreground ml-6 list-disc space-y-2 text-sm'>
                    <li>Defeitos de fabricação comprovados</li>
                    <li>Erro na especificação por nossa parte</li>
                    <li>Produto danificado durante o transporte</li>
                    <li>Produto diferente do solicitado</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Custos */}
            <section className='flex flex-col gap-4'>
              <Label className='text-primary text-2xl font-semibold'>
                Custos de Troca e Devolução
              </Label>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
                  <Label className='mb-2 block font-semibold text-green-800'>
                    Sem custo para você
                  </Label>
                  <ul className='space-y-1 text-sm text-green-700'>
                    <li>• Defeito de fabricação</li>
                    <li>• Erro nosso na especificação</li>
                    <li>• Dano no transporte</li>
                  </ul>
                </div>

                <div className='rounded-lg border border-orange-200 bg-orange-50 p-4'>
                  <Label className='mb-2 block font-semibold text-orange-800'>
                    Por conta do cliente
                  </Label>
                  <ul className='space-y-1 text-sm text-orange-700'>
                    <li>• Mudança de especificação</li>
                    <li>• Arrependimento da compra</li>
                    <li>• Frete de retorno quando aplicável</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contato */}
            <section className='bg-card rounded-lg border p-6'>
              <Label className='text-primary mb-4 block text-xl font-semibold'>
                Precisa de ajuda?
              </Label>

              <p className='text-muted-foreground mb-4'>
                Nossa equipe está pronta para ajudar com sua solicitação de
                troca ou devolução.
              </p>

              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <strong>E-mail:</strong>
                  <span>atendimento@ordones.com.br</span>
                </div>
                <div className='flex items-center gap-2'>
                  <strong>Telefone:</strong>
                  <span>(62) 3000-0000</span>
                </div>
                <div className='flex items-center gap-2'>
                  <strong>Horário:</strong>
                  <span>Segunda à sexta, 8h às 18h</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
