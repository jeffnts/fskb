export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function calculateReadingTime(richText: any): number {
  const children = richText?.root?.children || []

  const plainText = children
    .map((block: any) => block.children?.map((child: any) => child.text || '').join(''))
    .join(' ')

  const wordCount = plainText.split(/\s+/).filter((word: string) => word).length

  const readingTime = Math.ceil(wordCount / 200)

  return readingTime
}
