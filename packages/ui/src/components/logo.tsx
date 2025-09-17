import LogoSymbol from '../assets/branding/logo-text-white.png'

export const Logo = ({ className }: { className?: string }) => (
  <img src={LogoSymbol} alt="OrdonesLogo" className={className} />
)
