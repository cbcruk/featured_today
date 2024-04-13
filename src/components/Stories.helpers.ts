export const isList = (substyle: string | null) => {
  if (!substyle) {
    return false
  }

  return ['list', 'grid', 'river'].includes(substyle)
}
