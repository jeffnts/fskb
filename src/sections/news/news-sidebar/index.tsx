'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Props {
  tags: string[]
}

export default function NewsSidebar({ tags }: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()

  const toggleTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (selectedTags.includes(tag)) {
      const allSelectedTags = selectedTags.filter((t) => t !== tag)
      params.set('tags', allSelectedTags.join())
      router.push(`?${params.toString()}`, { scroll: false })
      setSelectedTags(allSelectedTags)
    } else {
      params.set('tags', [...selectedTags, tag].join())
      router.push(`?${params.toString()}`, { scroll: false })
      setSelectedTags([...selectedTags, tag])
    }
  }

  const onChangeParam = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value.toString())
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Search className="h-5 w-5 mr-2" />
            Buscar Notícias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Digite sua busca..."
            name="noticia"
            onChange={onChangeParam}
            className="w-full"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Filter className="h-5 w-5 mr-2" />
            Filtrar por tags
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className={`cursor-pointer hover:bg-blue-100 ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Newsletter</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4">
            Receba as últimas notícias do kickboxing sergipano diretamente no seu email.
          </p>
          <div className="space-y-2">
            <Input placeholder="Seu email" type="email" />
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Inscrever-se
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
