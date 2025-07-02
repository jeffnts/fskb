import React, { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type ButtonProps = {
  link: string
  text: string
}

type HomePageSectionProps = {
  isVisible?: boolean
  title: string
  description: string
  children?: ReactNode
  button?: ButtonProps
}

const HomePageSection: React.FC<HomePageSectionProps> = ({
  isVisible = true,
  title,
  description,
  children,
  button,
}) => {
  if (!isVisible) return <></>

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {children}

        {!!button && (
          <div className="text-center mt-12">
            <Link href={button.link}>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-blue-800 hover:text-white w-full sm:w-fit"
              >
                {button.text}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomePageSection
