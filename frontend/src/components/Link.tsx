import React from 'react'
import { navigate } from '../utils/navigation'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

export const Link: React.FC<LinkProps> = ({ to, children, onClick, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e)
    }
    if (!e.defaultPrevented && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
      navigate(to)
    }
  }

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
