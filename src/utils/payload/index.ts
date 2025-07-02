export async function relalidatePaths({ req, paths }: { req?: any; paths: string[] }) {
  for (const path of paths) {
    await fetch(`${req?.origin || ''}/api/revalidate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path }),
    })
  }
}

export function createSlug({ data, value }: any) {
  const slug = data?.title || data?.name
  if (slug) {
    return slug
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
  return value
}
