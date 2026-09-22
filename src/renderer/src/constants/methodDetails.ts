import type { StudyMethod } from '@shared/types'

export interface MethodDetail {
  value: StudyMethod
  label: string
  tagline: string
  effectiveness: number
  whenToUse: string
  howTo: string[]
  evidence: string
}

export const METHOD_DETAILS: MethodDetail[] = [
  {
    value: 'feynman',
    label: 'Feynman Technique',
    tagline: 'Ensine a uma criança para aprender',
    effectiveness: 5,
    whenToUse: 'Quando está confuso com um conceito, antes de fazer exercícios difíceis ou de explicar em grupo.',
    howTo: [
      'Escolha um conceito que está estudando',
      'Explique como se estivesse ensinando uma criança, sem jargão técnico',
      'Identifique as lacunas: onde você não consegue explicar, você não entende',
      'Volte à fonte, refine, e tente explicar de novo até conseguir explicar perfeitamente'
    ],
    evidence: 'Pesquisa no Journal of Experimental Psychology mostra que falar em voz alta é um mecanismo poderoso para melhorar a memória.'
  },
  {
    value: 'active_recall',
    label: 'Active Recall',
    tagline: 'Force seu cérebro a lembrar',
    effectiveness: 5,
    whenToUse: 'Depois de estudar a teoria, antes de qualquer prova ou exercício.',
    howTo: [
      'Blurting: escreva tudo que lembra do tópico numa folha em branco, sem consultar nada',
      'Flashcards: pergunta na frente, resposta atrás, teste de memória',
      'Explique verbalmente em voz alta, como se estivesse ensinando alguém',
      'Faça quizzes/testes reais sem consultar material'
    ],
    evidence: 'Pesquisas mostram que recuperar conceitos de memória é muito mais efetivo do que revisar consultando o material de curso.'
  },
  {
    value: 'spaced_repetition',
    label: 'Spaced Repetition',
    tagline: 'Revise na hora certa, não tarde demais',
    effectiveness: 5,
    whenToUse: 'Para reter conteúdo a longo prazo, evitando esquecer o que já estudou.',
    howTo: [
      'Revise em intervalos crescentes: 1, 3, 7, 14, 30 e 90 dias após aprender',
      'Revisar cedo demais é redundante; revisar tarde demais já esqueceu',
      'Use uma ferramenta como Anki ou Quizlet pra automatizar o cronograma'
    ],
    evidence: 'Ebbinghaus (1885) descobriu a "Curva do Esquecimento" — combinar active recall com repetição espaçada é muito mais efetivo que estudar tudo de véspera.'
  },
  {
    value: 'interleaving',
    label: 'Interleaving',
    tagline: 'Misture os tópicos ao estudar',
    effectiveness: 4,
    whenToUse: 'Ao estudar vários tópicos relacionados na mesma sessão, em vez de blocos longos de um só assunto.',
    howTo: [
      'Em vez de 3h só de um tópico, alterne: 30min de A + 30min de B + 30min de C',
      'Misture exercícios de temas diferentes em vez de fazer 10 do mesmo tipo em sequência',
      'No começo parece mais confuso — isso é esperado, a retenção de longo prazo é que melhora'
    ],
    evidence: 'Pesquisas de 2010 em diante mostram melhorias de 20-40% na retenção com interleaving comparado a estudar em blocos.'
  },
  {
    value: 'elaboration',
    label: 'Elaborative Interrogation',
    tagline: 'Pergunte Por quê? e Como?',
    effectiveness: 4,
    whenToUse: 'Para construir compreensão profunda de um conceito, não só memorização superficial.',
    howTo: [
      'Para cada conceito novo, pergunte: Por quê isso funciona assim?',
      'Pergunte: Como isso funciona por dentro?',
      'Pergunte: Quando devo usar isso em vez de uma alternativa?',
      'Pergunte: Qual é a diferença entre isso e o conceito parecido?'
    ],
    evidence: 'Utility moderado-alto para compreensão — forçar a explicação do "porquê" cria conexões mais fortes do que reler o material.'
  },
  {
    value: 'dual_coding',
    label: 'Dual Coding',
    tagline: 'Combine texto + imagem',
    effectiveness: 4,
    whenToUse: 'Com conteúdo que tem um componente visual — diagramas, fluxos, estruturas.',
    howTo: [
      'Leia a teoria e desenhe um diagrama do que entendeu',
      'Estude o texto e depois veja um vídeo ou exemplo visual do mesmo conceito',
      'Combine teoria escrita com código/exemplo prático em ação'
    ],
    evidence: 'Comprovado em pesquisas de aprendizado multimídia: combinar representações verbais e visuais melhora a retenção.'
  }
]
