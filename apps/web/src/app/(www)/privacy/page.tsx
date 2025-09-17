import { Label } from '@ordones/ui/components/label'
import {
  Page,
  type PageBreadcrumbItem,
  PageBreadcrumbs,
  PageContent,
} from '@ordones/ui/components/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(www)/privacy/')({
  component: PrivacyPage,
  head: () => ({
    meta: [
      {
        title: 'Políticas de Privacidade | Ordones',
      },
    ],
  }),
})

function PrivacyPage() {
  const breadcrumbs: PageBreadcrumbItem[] = [
    {
      label: 'Início',
      path: '/',
    },
    {
      label: 'Política de Privacidade',
      path: '/politica-privacidade',
    },
  ]

  return (
    <Page>
      <PageContent>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className='flex w-full flex-col gap-6 p-6 pt-0'>
          <div className='flex flex-col gap-4'>
            <Label className='text-primary text-3xl font-bold'>
              Política de Privacidade
            </Label>
            <p className='text-muted-foreground text-sm'>
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>

          <div className='flex max-w-4xl flex-col gap-6'>
            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                1. Informações Gerais
              </Label>
              <p className='text-foreground leading-7'>
                A Ordones está comprometida em proteger e respeitar sua
                privacidade. Esta Política de Privacidade explica como
                coletamos, usamos, armazenamos e protegemos suas informações
                pessoais em conformidade com a Lei Geral de Proteção de Dados
                (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                2. Dados Coletados
              </Label>
              <p className='text-foreground mb-3 leading-7'>
                Coletamos as seguintes categorias de dados pessoais:
              </p>
              <ul className='text-foreground ml-6 list-disc space-y-2 leading-7'>
                <li>
                  <strong>Dados de identificação:</strong> nome, CPF, RG,
                  e-mail, telefone
                </li>
                <li>
                  <strong>Dados de endereço:</strong> endereço completo para
                  entrega e cobrança
                </li>
                <li>
                  <strong>Dados de navegação:</strong> cookies, IP, dados de uso
                  do site
                </li>
                <li>
                  <strong>Dados comerciais:</strong> histórico de pedidos,
                  preferências de produtos
                </li>
                <li>
                  <strong>Dados de pagamento:</strong> informações de cartão de
                  crédito (processadas por terceiros seguros)
                </li>
              </ul>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                3. Finalidade do Uso dos Dados
              </Label>
              <p className='text-foreground mb-3 leading-7'>
                Utilizamos seus dados pessoais para:
              </p>
              <ul className='text-foreground ml-6 list-disc space-y-2 leading-7'>
                <li>Processar e entregar seus pedidos</li>
                <li>Comunicar sobre o status do pedido</li>
                <li>Oferecer suporte ao cliente</li>
                <li>Melhorar nossos produtos e serviços</li>
                <li>Enviar ofertas e promoções (mediante consentimento)</li>
                <li>Cumprir obrigações legais e fiscais</li>
              </ul>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                4. Cookies e Tecnologias Similares
              </Label>
              <p className='text-foreground mb-3 leading-7'>
                Utilizamos cookies para:
              </p>
              <ul className='text-foreground ml-6 list-disc space-y-2 leading-7'>
                <li>Manter sua sessão de compra ativa</li>
                <li>Personalizar sua experiência de navegação</li>
                <li>Analisar o tráfego e comportamento no site</li>
                <li>Lembrar suas preferências</li>
              </ul>
              <p className='text-foreground mt-3 leading-7'>
                Você pode gerenciar suas preferências de cookies através das
                configurações do seu navegador.
              </p>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                5. Compartilhamento de Dados
              </Label>
              <p className='text-foreground mb-3 leading-7'>
                Seus dados podem ser compartilhados com:
              </p>
              <ul className='text-foreground ml-6 list-disc space-y-2 leading-7'>
                <li>Transportadoras para entrega de produtos</li>
                <li>Processadores de pagamento seguros</li>
                <li>Prestadores de serviços de tecnologia</li>
                <li>Autoridades competentes, quando exigido por lei</li>
              </ul>
              <p className='text-foreground mt-3 leading-7'>
                Nunca vendemos ou alugamos seus dados pessoais para terceiros.
              </p>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                6. Seus Direitos
              </Label>
              <p className='text-foreground mb-3 leading-7'>
                Conforme a LGPD, você tem direito a:
              </p>
              <ul className='text-foreground ml-6 list-disc space-y-2 leading-7'>
                <li>Confirmar a existência de tratamento dos seus dados</li>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o consentimento</li>
                <li>Solicitar a portabilidade dos dados</li>
              </ul>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                7. Segurança dos Dados
              </Label>
              <p className='text-foreground leading-7'>
                Adotamos medidas técnicas e organizacionais adequadas para
                proteger seus dados pessoais contra acesso não autorizado,
                alteração, divulgação ou destruição. Utilizamos criptografia,
                firewalls e controles de acesso rigorosos.
              </p>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                8. Retenção de Dados
              </Label>
              <p className='text-foreground leading-7'>
                Mantemos seus dados pessoais apenas pelo tempo necessário para
                cumprir as finalidades descritas nesta política ou conforme
                exigido por lei. Dados de transações são mantidos por 5 anos
                para fins fiscais e legais.
              </p>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                9. Contato
              </Label>
              <p className='text-foreground leading-7'>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta
                política, entre em contato conosco:
              </p>
              <div className='text-foreground ml-6 leading-7'>
                <p>
                  <strong>E-mail:</strong> privacidade@ordones.com.br
                </p>
                <p>
                  <strong>Telefone:</strong> (62) 3000-0000
                </p>
                <p>
                  <strong>Endereço:</strong> Goiânia, GO
                </p>
              </div>
            </section>

            <section className='flex flex-col gap-3'>
              <Label className='text-primary text-xl font-semibold'>
                10. Alterações na Política
              </Label>
              <p className='text-foreground leading-7'>
                Esta política pode ser atualizada periodicamente. Notificaremos
                sobre alterações significativas através do nosso site ou por
                e-mail. A versão mais atual sempre estará disponível nesta
                página.
              </p>
            </section>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
