import { Toaster as Sonner, type ToasterProps } from 'sonner'

interface ToasterTemplateProps extends ToasterProps {
  theme?: ToasterProps['theme']
}

function ToasterTemplate({ theme = 'system', ...props }: ToasterTemplateProps) {
  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export default ToasterTemplate
