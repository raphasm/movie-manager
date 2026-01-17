/**
 * Sanitiza o nome do arquivo removendo caracteres especiais e potencialmente perigosos
 * @param filename - Nome do arquivo original
 * @returns Nome do arquivo sanitizado
 */
export function sanitizeFilename(filename: string): string {
  if (!filename) {
    return 'file'
  }

  // Separar nome e extensão
  const lastDotIndex = filename.lastIndexOf('.')
  const name =
    lastDotIndex !== -1 ? filename.substring(0, lastDotIndex) : filename
  const extension = lastDotIndex !== -1 ? filename.substring(lastDotIndex) : ''

  // Remove caracteres especiais perigosos e mantém apenas alfanuméricos, hífen e underscore
  // Remove também espaços extras e caracteres como #, %, &, etc.
  const sanitizedName = name
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais (incluindo #)
    .replace(/\s+/g, '_') // Substitui espaços por underscore
    .replace(/_{2,}/g, '_') // Remove underscores duplicados
    .replace(/^_+|_+$/g, '') // Remove underscores no início e fim
    .toLowerCase()

  // Sanitizar extensão também
  const sanitizedExtension = extension.replace(/[^\w.]/g, '').toLowerCase()

  // Se o nome ficou vazio, usar um nome padrão
  const finalName = sanitizedName || 'file'

  return `${finalName}${sanitizedExtension}`
}
