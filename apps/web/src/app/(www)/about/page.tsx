import { Label } from '@ordones/ui/components/label'
import {
  Page,
  type PageBreadcrumbItem,
  PageBreadcrumbs,
  PageContent,
} from '@ordones/ui/components/page'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(www)/about/')({
  component: AboutPage,
  head: () => ({
    meta: [
      {
        title: 'Sobre nós | Ordones',
      },
    ],
  }),
})

function AboutPage() {
  const breadcrumbs: PageBreadcrumbItem[] = [
    {
      label: 'Início',
      path: '/',
    },
    {
      label: 'Sobre nós',
      path: '/about',
    },
  ]

  return (
    <Page>
      <PageContent>
        <PageBreadcrumbs breadcrumbs={breadcrumbs} />
        <div className='flex w-full flex-col gap-4 p-6 pt-0'>
          <div className='-mt-6 flex h-[450px] w-full flex-col items-center justify-center gap-4'>
            <Label className='text-primary text-2xl font-bold'>Sobre nós</Label>
            <span className='text-md w-2/3 select-none text-center leading-7'>
              Somos uma empresa genuinamente goiana, especializada em corte a
              laser de alta precisão para diversos materiais como tecidos,
              couro, materiais sintéticos, acrílico e MDF. Atendemos desde
              pequenas confecções até grandes indústrias, oferecendo soluções
              personalizadas que unem tecnologia, eficiência e acabamento
              impecável.
            </span>
          </div>
          <div className='bg-primary grid h-[450px] w-full grid-cols-2 rounded-xl p-6'>
            <div className='flex w-full flex-col items-end justify-center gap-4 text-right'>
              <Label className='text-secondary text-2xl font-bold'>
                Nosso compromisso
              </Label>
              <span className='text-md text-accent w-2/3 select-none leading-7'>
                Nosso compromisso vai além do fornecimento de produtos: buscamos
                entregar valor, confiança e tranquilidade a cada cliente.
                Trabalhamos com prazos curtos, processos otimizados e atenção
                especial a cada detalhe do projeto, sempre com foco na
                excelência.
              </span>
            </div>
            <div className='flex h-full w-full flex-col px-12'>
              <div className='bg-muted h-full w-full rounded-xl'></div>
            </div>
          </div>
          <div className='grid h-[450px] w-full grid-cols-2'>
            <div className='flex h-full w-full flex-col px-12'>
              <div></div>
            </div>
            <div className='flex w-full flex-col justify-center gap-4'>
              <Label className='text-primary text-2xl font-bold'>
                Nossos diferenciais
              </Label>
              <ul className='ml-6 list-disc [&>li]:mt-2'>
                <li>
                  Equipamentos modernos e calibrados para cortes de alta
                  precisão;
                </li>
                <li>Equipe qualificada e em constante aperfeiçoamento;</li>
                <li>
                  Atendimento humanizado e flexível, com suporte técnico durante
                  todas as etapas;
                </li>
                <li>
                  Capacidade de atender grandes volumes com agilidade e
                  qualidade;
                </li>
                <li>
                  Controle rigoroso de qualidade e acabamento profissional.
                </li>
              </ul>
            </div>
          </div>
          <div className='bg-primary grid h-[450px] w-full grid-cols-2 rounded-xl p-6'>
            <div className='flex h-full w-full flex-col px-12'>
              <div className='bg-muted h-full w-full rounded-xl'></div>
            </div>
            <div className='flex w-full flex-col items-start justify-center gap-4 text-right'>
              <Label className='text-secondary text-2xl font-bold'>
                Nossa missão
              </Label>
              <span className='text-md text-accent w-2/3 select-none text-left leading-7'>
                Ser referência em corte a laser em Goiás e em todo o Brasil,
                levando soluções inteligentes e personalizadas para os mais
                diversos segmentos do mercado.
              </span>
            </div>
          </div>
          <div className='flex h-[450px] w-full flex-col items-center justify-center gap-4'>
            <Label className='text-primary text-2xl font-bold'>
              Nosso maior diferencial
            </Label>
            <span className='text-md w-1/3 select-none text-center leading-7'>
              <strong>JESUS CRISTO</strong> é o nosso maior diferencial. É Ele
              quem nos guia, fortalece e abençoa cada passo da nossa jornada.
              Atuamos com ética, responsabilidade e propósito, honrando a
              confiança que cada cliente deposita em nós.
            </span>
          </div>
        </div>
      </PageContent>
    </Page>
  )
}
