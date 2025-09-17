import { Label } from '@ordones/ui/components/label'
import { Link } from '@tanstack/react-router'

export function Footer() {
  return (
    <footer className="border-t-primary/10 flex h-[350px] w-full flex-col border">
      <div className="grid h-full w-full grid-cols-6 py-12">
        <div className="col-span-1 h-full w-full gap-4"></div>

        <div className="col-span-1 flex h-full w-full flex-col gap-4">
          <Label className="text-md font-semibold">Institucional</Label>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <Link
              to="/"
              className="hover:text-primary text-sm font-normal transition ease-in"
            >
              Início
            </Link>
            <Link
              to="/about"
              className="hover:text-primary text-sm font-normal transition ease-in"
            >
              Sobre Nós
            </Link>
            <Link
              to="/contact"
              className="hover:text-primary text-sm font-normal transition ease-in"
            >
              Fale Conosco
            </Link>
          </div>
        </div>

        <div className="col-span-1 flex h-full w-full flex-col gap-4">
          <Label className="text-md font-semibold">Loja</Label>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <Link
              to="/products"
              className="hover:text-primary text-sm font-normal transition ease-in"
            >
              Produtos
            </Link>
            <Link
              to="/categories"
              className="hover:text-primary text-sm font-normal transition ease-in"
            >
              Categorias
            </Link>
          </div>
        </div>

        <div className="col-span-1 flex h-full w-full flex-col gap-4">
          <Label className="text-md font-semibold">Políticas</Label>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <Link
              to="/privacy"
              className="hover:text-primary text-sm font-normal transition ease-in"
            >
              Política de Privacidade
            </Link>
            <Link
              to="/exchanges-returns"
              className="hover:text-primary text-sm font-normal transition ease-in"
            >
              Trocas e Devoluções
            </Link>
          </div>
        </div>

        <div className="col-span-1 flex h-full w-full flex-col gap-4">
          <Label className="text-md font-semibold">Contato</Label>
          <div className="flex w-full flex-col items-start justify-start gap-2">
            <span className="text-muted-foreground text-sm font-normal">
              (62) 3000-0000
            </span>
            <span className="text-muted-foreground text-sm font-normal">
              contato@ordones.com.br
            </span>
            <span className="text-muted-foreground text-sm font-normal">
              Goiânia, GO
            </span>
          </div>
        </div>

        <div className="col-span-1 h-full w-full gap-4"></div>
      </div>

      <div className="bg-card flex h-24 items-center justify-center gap-2">
        <div className="grid w-full grid-cols-3">
          <span className="col-start-2 text-center text-xs">
            2025 © Todos os direitos reservados a Ordones Lazer e Bordados
          </span>
          <div className="-mb-1 flex items-center justify-center"></div>
        </div>
      </div>
    </footer>
  )
}
