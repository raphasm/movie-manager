import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

interface RouterLinkProps extends Omit<LinkProps, 'to'> {
  to: string
}

export function RouterLink({ to, ...props }: RouterLinkProps) {
  return <Link to={to} {...props} />
}
