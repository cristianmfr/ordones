import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@ordones/ui/components/button'
import { Label } from '@ordones/ui/components/label'
import { Page, PageBreadcrumbs, PageContent } from '@ordones/ui/components/page'
import { TextField } from '@ordones/ui/components/text-field'
import { Textarea } from '@ordones/ui/components/textarea'
import { IconMail, IconMapPin, IconPhoneEnd } from '@tabler/icons-react'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export const Route = createFileRoute('/(www)/contact/')({
  component: ContactPage,
})

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type FormData = z.infer<typeof formSchema>

function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const breadcrumbs = [
    {
      label: 'Início',
      path: '/',
    },
    {
      label: 'Fale Conosco',
      path: '/fale-conosco',
    },
  ]

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (_values: FormData) => {
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.success(
        'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      )
      form.reset()
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqItems = [
    {
      question: 'Qual o prazo de entrega para produtos personalizados?',
      answer:
        'O prazo varia de 5 a 15 dias úteis, dependendo da complexidade do produto e quantidade solicitada.',
    },
    {
      question: 'Vocês fazem orçamentos sem compromisso?',
      answer:
        'Sim! Enviamos orçamentos gratuitos e sem compromisso. Entre em contato com seus arquivos e especificações.',
    },
    {
      question: 'Quais materiais vocês trabalham?',
      answer:
        'Trabalhamos com tecidos, couro, materiais sintéticos, acrílico, MDF e outros materiais compatíveis com corte a laser.',
    },
    {
      question: 'Há quantidade mínima para pedidos?',
      answer:
        'Não temos quantidade mínima, atendemos desde pequenas confecções até grandes indústrias.',
    },
    {
      question: 'Como enviar arquivos para orçamento?',
      answer:
        'Você pode enviar arquivos em formato vetorial (AI, CDR, SVG) ou raster (PNG, JPG) através do formulário ou e-mail.',
    },
  ]

  return (
    <Page>
      <PageContent>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className='flex w-full flex-col gap-8 p-6 pt-0'>
          <div className='flex flex-col gap-4'>
            <Label className='text-primary text-3xl font-bold'>
              Fale Conosco
            </Label>
            <p className='text-muted-foreground text-lg'>
              Entre em contato conosco. Nossa equipe está pronta para ajudar com
              suas necessidades de corte a laser.
            </p>
          </div>

          <div className='grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Contact Form */}
            <div className='lg:col-span-2'>
              <div className='bg-card rounded-lg border p-6'>
                <Label className='text-primary mb-6 block text-xl font-semibold'>
                  Envie sua mensagem
                </Label>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-4'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <TextField
                        name='name'
                        control={form.control}
                        label='Nome completo'
                        placeholder='Seu nome completo'
                      />
                      <TextField
                        name='email'
                        control={form.control}
                        label='E-mail'
                        placeholder='seu@email.com'
                        type='email'
                      />
                    </div>

                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <TextField
                        name='phone'
                        control={form.control}
                        label='Telefone'
                        placeholder='(62) 99999-9999'
                      />
                      <TextField
                        name='subject'
                        control={form.control}
                        label='Assunto'
                        placeholder='Sobre o que deseja falar?'
                      />
                    </div>

                    <div>
                      <Label className='mb-2 block text-sm font-medium'>
                        Mensagem
                      </Label>
                      <Textarea
                        {...form.register('message')}
                        placeholder='Descreva sua necessidade, projeto ou dúvida...'
                        className='min-h-[120px] resize-none'
                      />
                      {form.formState.errors.message && (
                        <p className='text-destructive mt-1 text-sm'>
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type='submit'
                      className='w-full'
                      isLoading={isSubmitting}
                      disabled={isSubmitting}>
                      Enviar mensagem
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Contact Info */}
            <div className='flex flex-col gap-6'>
              <div className='bg-card rounded-lg border p-6'>
                <Label className='text-primary mb-4 block text-xl font-semibold'>
                  Informações de contato
                </Label>

                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <IconMail className='text-primary h-5 w-5' />
                    <div>
                      <p className='font-medium'>E-mail</p>
                      <p className='text-muted-foreground text-sm'>
                        contato@ordones.com.br
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <IconPhoneEnd className='text-primary h-5 w-5' />
                    <div>
                      <p className='font-medium'>Telefone</p>
                      <p className='text-muted-foreground text-sm'>
                        (62) 3000-0000
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <IconMapPin className='text-primary h-5 w-5' />
                    <div>
                      <p className='font-medium'>Endereço</p>
                      <p className='text-muted-foreground text-sm'>
                        Goiânia, Goiás
                        <br />
                        CEP: 74000-000
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='bg-card rounded-lg border p-6'>
                <Label className='text-primary mb-4 block text-xl font-semibold'>
                  Horário de atendimento
                </Label>

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span>Segunda à Sexta</span>
                    <span className='text-muted-foreground'>8h às 18h</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Sábado</span>
                    <span className='text-muted-foreground'>8h às 12h</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>Domingo</span>
                    <span className='text-muted-foreground'>Fechado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='max-w-4xl'>
            <Label className='text-primary mb-6 block text-2xl font-semibold'>
              Perguntas Frequentes
            </Label>

            <div className='grid gap-4'>
              {faqItems.map((item, index) => (
                <div key={index} className='bg-card rounded-lg border p-4'>
                  <Label className='text-primary mb-2 block font-medium'>
                    {item.question}
                  </Label>
                  <p className='text-muted-foreground text-sm leading-6'>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
