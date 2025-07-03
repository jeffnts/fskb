import React from 'react'
import Link from 'next/link'
import { Home } from 'lucide-react'

type Props = {
  links: {
    name: string
    link?: string
  }[]
}

const Breadcrumbs: React.FC<Props> = ({ links }) => {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex list-none p-0 m-0">
        {links.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === 0 && <Home className="mr-2 w-4 h-4" />}
            {item?.link ? (
              <Link href={item.link} className="text-primary hover:underline mr-2">
                {item.name}
              </Link>
            ) : (
              <span className="text-gray-500 mr-2">{item.name}</span>
            )}
            {index < links.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Breadcrumbs
