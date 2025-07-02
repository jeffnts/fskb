import { usePathname } from 'next/navigation'

export default function useIsNavbarActive(homePath = '/') {
  const currentPath = usePathname()

  const isActive = (href: string) =>
    href !== homePath ? currentPath.includes(href) : currentPath === href

  return isActive
}
