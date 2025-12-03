import {
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
} from '@phosphor-icons/react'
import { tv } from 'tailwind-variants'
import { IconButton } from './IconButton'

const paginationVariants = tv({
  slots: {
    container: 'flex items-center justify-between mt-8',
    info: 'text-sm text-custom-text-brand',
    controls: 'flex items-center gap-6 lg:gap-8',
    pageInfo: 'text-sm font-medium text-custom-text-tagline',
    buttons: 'flex items-center gap-2',
  },
})

interface PaginationProps {
  pageIndex: number
  perPage: number
  totalCount: number
  onPageChange: (pageIndex: number) => void
}

/**
 * Componente de Paginação
 *
 * Exibe navegação entre páginas com:
 * - Total de itens
 * - Página atual / Total de páginas
 * - Botões: Primeiro | Anterior | Próxima | Última
 */
export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: PaginationProps) {
  const styles = paginationVariants()

  /**
   * Calcula o número total de páginas
   *
   * Math.ceil() arredonda para cima
   * Exemplo: 25 itens / 10 por página = 2.5 → 3 páginas
   *
   * || 1 → Se o resultado for 0 ou NaN, retorna 1 (mínimo 1 página)
   */
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className={styles.container()}>
      {/* Mostra o total de filmes */}
      <span className={styles.info()}>Total de {totalCount} filme(s)</span>

      <div className={styles.controls()}>
        {/* 
          Mostra "Página X de Y"
          pageIndex + 1 → Converte de 0-based para 1-based para exibição
          Ex: pageIndex=0 → "Página 1 de 3"
        */}
        <div className={styles.pageInfo()}>
          Página {pageIndex + 1} de {pages}
        </div>

        {/* Botões de navegação */}
        <div className={styles.buttons()}>
          {/* 
            Primeira página (<<)
            onClick: Sempre vai para índice 0
            disabled: Desabilita se já está na primeira página (pageIndex === 0)
          */}
          <IconButton
            variant="secondary"
            size="sm"
            icon={<CaretDoubleLeft size={16} weight="bold" />}
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0}
            aria-label="Primeira página"
          />

          {/* 
            Página anterior (<)
            onClick: Vai para pageIndex - 1
            disabled: Desabilita se já está na primeira página
          */}
          <IconButton
            variant="secondary"
            size="sm"
            icon={<CaretLeft size={16} weight="bold" />}
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            aria-label="Página anterior"
          />

          {/* 
            Próxima página (>)
            onClick: Vai para pageIndex + 1
            disabled: Desabilita se está na última página
            
            Lógica: pages <= pageIndex + 1
            Ex: 3 páginas, pageIndex=2 (última) → 3 <= 3 → true → desabilitado
          */}
          <IconButton
            variant="secondary"
            size="sm"
            icon={<CaretRight size={16} weight="bold" />}
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pages <= pageIndex + 1}
            aria-label="Próxima página"
          />

          {/* 
            Última página (>>)
            onClick: Vai para pages - 1 (último índice)
            Ex: 3 páginas → pages - 1 = 2 (índice da página 3)
            disabled: Desabilita se já está na última página
          */}
          <IconButton
            variant="secondary"
            size="sm"
            icon={<CaretDoubleRight size={16} weight="bold" />}
            onClick={() => onPageChange(pages - 1)}
            disabled={pages <= pageIndex + 1}
            aria-label="Última página"
          />
        </div>
      </div>
    </div>
  )
}
