import type { StudyMethod } from '@shared/types'

export const METHOD_OPTIONS: { value: StudyMethod; label: string }[] = [
  { value: 'feynman', label: 'Feynman Technique' },
  { value: 'active_recall', label: 'Active Recall' },
  { value: 'spaced_repetition', label: 'Spaced Repetition' },
  { value: 'interleaving', label: 'Interleaving' },
  { value: 'elaboration', label: 'Elaborative Interrogation' },
  { value: 'dual_coding', label: 'Dual Coding' }
]
