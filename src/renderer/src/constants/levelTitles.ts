const LEVEL_TITLES: { min: number; title: string }[] = [
  { min: 1, title: 'Aprendiz' },
  { min: 3, title: 'Estudante Dedicado' },
  { min: 6, title: 'Programador Júnior' },
  { min: 10, title: 'Programador Pleno' },
  { min: 15, title: 'Programador Senior' },
  { min: 20, title: 'Mestre do Conhecimento' }
]

export function getLevelTitle(level: number): string {
  let title = LEVEL_TITLES[0].title
  for (const tier of LEVEL_TITLES) {
    if (level >= tier.min) title = tier.title
  }
  return title
}
