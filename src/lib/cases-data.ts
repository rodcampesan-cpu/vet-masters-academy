export const FULL_CASES = {
  1: {
    id: 1,
    courseId: "ortopedia-avancada",
    teacherId: "t1",
    title: "Cão com claudicação severa em membro pélvico esquerdo",
    specialty: "Ortopedia",
    difficulty: "Avançado",
    patient: "Bidu, Golden Retriever, 4 anos, Macho inteiro",
    description: "Tutor relata que o animal começou a mancar subitamente após correr no parque. Apresenta dor à manipulação do joelho.",
    anamnesisText: "O tutor relata que Bidu estava correndo atrás de uma bola no parque quando subitamente soltou um ganido, recolheu a perna traseira esquerda e não apoiou mais o peso no chão. \n\nNas últimas 48h houve uma leve melhora, ele passou a \"tocar\" a ponta dos dedos no chão ao caminhar, mas ao parar, mantém o membro levantado. \n\nSem histórico prévio de problemas articulares. Vacinas e vermífugos em dia.",
    chatHistory: [
      { isVet: true, text: "Olá! Pode me dar mais detalhes sobre a alimentação dele e se ele já tomou algum medicamento nos últimos dias?" },
      { isVet: false, text: "Doutor, ele come ração super premium. Ontem eu dei um comprimido de dipirona que tinha em casa porque ele parecia estar com dor." }
    ],
    aiHint: "Animais jovens de raça grande com claudicação aguda sem trauma externo evidente frequentemente apresentam problemas de ordem ligamentar. Considere testes específicos de estabilidade no exame físico.",
    examList: [
      "Escore Corporal: 6/9 (Leve sobrepeso).",
      "Sinais Vitais: FC 110bpm, FR 30mpm, TR 38.5°C, Mucosas normocoradas.",
      "Avaliação Ortopédica: Claudicação grau 3/4 em membro pélvico esquerdo.",
      "Palpação: Efusão articular evidente no joelho esquerdo e espessamento medial da cápsula.",
      "Testes Específicos: Teste de compressão tibial (Gaveta) POSITIVO. Teste de Ortolani negativo bilateralmente."
    ],
    images: ["Raio-X (Mediolateral)", "Raio-X (Craniocaudal)"],
    examConclusion: "Laudo: Deslocamento cranial da crista da tíbia em relação aos côndilos femorais. Aumento de radiopacidade em região infrapatelar (sinal da almofada de gordura).",
    options: ["Luxação Patelar Medial", "Ruptura de Ligamento Cruzado Cranial", "Displasia Coxofemoral", "Fratura de Platô Tibial"],
    correctAnswer: "Ruptura de Ligamento Cruzado Cranial",
    feedbackCorrect: "O teste de gaveta positivo combinado com o sinal radiográfico da almofada de gordura e o histórico agudo são clássicos para Ruptura do Ligamento Cruzado Cranial (RLCC).",
    feedbackIncorrect: "A presença de teste de compressão tibial (gaveta) positivo e o histórico do animal apontam para outra patologia muito comum no joelho. Revise os testes específicos.",
    playbookProtocol: "1. Tratamento Cirúrgico (Padrão Ouro): TPLO (Osteotomia de Nivelamento do Platô Tibial) ou TTA.\\n2. Tratamento Conservador (apenas se cirurgia não for possível): Repouso absoluto por 4 a 6 semanas.\\n3. Manejo da Dor: Meloxicam (0,1 mg/kg SID) por 5-7 dias, associado a Dipirona (25 mg/kg BID/TID) ou Tramadol (2-4 mg/kg BID).\\n4. Condroproteção: Suplementação com Glicosamina e Condroitina.\\n5. Reabilitação: Fisioterapia e controle rigoroso de peso (emagrecimento essencial para Bidu)."
  },
  4: {
    id: 4,
    courseId: "neurologia-essencial",
    teacherId: "t2",
    title: "Felino com andar plantígrado e poliúria",
    specialty: "Endocrinologia / Neurologia",
    difficulty: "Intermediário",
    patient: "Garfield, SRD, 11 anos, Macho castrado",
    description: "Gato apresenta fraqueza nos membros pélvicos, caminhando com os jarretes tocando o chão. Tutor relata aumento na ingestão de água.",
    anamnesisText: "Garfield vem perdendo peso nos últimos 2 meses apesar de estar comendo mais que o normal (polifagia). \n\nNas últimas semanas, o tutor notou que ele parou de pular nos móveis e começou a andar de um jeito estranho, apoiando toda a parte de trás da pata (jarrete) no chão. \n\nO tutor também percebeu que a caixa de areia está sempre muito molhada (poliúria) e ele bebe água constantemente (polidipsia).",
    chatHistory: [
      { isVet: true, text: "Houve alguma mudança na dieta recente ou uso de algum medicamento como corticoides?" },
      { isVet: false, text: "Nenhuma mudança na dieta, ele só come ração seca. Ele não toma nenhum remédio faz anos." }
    ],
    aiHint: "A combinação de polifagia, perda de peso, poliúria/polidipsia (PU/PD) e neuropatia periférica (andar plantígrado) em felinos é altamente sugestiva de uma alteração endócrina específica. Avalie a glicemia.",
    examList: [
      "Escore Corporal: 4/9 (Magro). Perda de massa muscular generalizada.",
      "Sinais Vitais: FC 180bpm, FR 32mpm, TR 38.2°C.",
      "Avaliação Neurológica: Andar plantígrado bilateral nos membros pélvicos. Propriocepção preservada, mas reflexos patelares levemente diminuídos.",
      "Exames de Sangue (Simulação): Glicemia de jejum: 380 mg/dL. Frutosamina elevada.",
      "Urinálise: Glicosúria (+++), ausência de corpos cetônicos."
    ],
    images: ["Foto do Andar Plantígrado", "Laudo do Exame de Sangue"],
    examConclusion: "Conclusão: Hiperglicemia persistente confirmada pela frutosamina, associada a neuropatia periférica diabética.",
    options: ["Insuficiência Renal Crônica", "Diabetes Mellitus Complicada por Neuropatia", "Hipertireoidismo", "Hipocalemia severa"],
    correctAnswer: "Diabetes Mellitus Complicada por Neuropatia",
    feedbackCorrect: "Exato! O andar plantígrado é uma manifestação clássica da neuropatia diabética em gatos. Junto com a hiperglicemia severa e glicosúria, o diagnóstico de Diabetes Mellitus é confirmado.",
    feedbackIncorrect: "Apesar de gatos idosos terem essas outras patologias, a glicemia de 380 mg/dL com frutosamina elevada e o andar plantígrado são patognomônicos de outra síndrome. Revise o laudo de sangue.",
    playbookProtocol: "1. Insulinoterapia: Iniciar com Insulina Glargina (Lantus) na dose de 0,25 a 0,5 U/kg BID.\\n2. Dieta: Trocar para ração úmida rica em proteínas e pobre em carboidratos (ex: Dietas Diabetic/Feline). Alimentar estritamente antes da aplicação da insulina.\\n3. Monitoramento: Curva glicêmica após 7-14 dias do início do protocolo. Avaliar frutosamina mensalmente.\\n4. Neuropatia: A neuropatia diabética (andar plantígrado) costuma reverter gradualmente com o bom controle glicêmico. Pode-se suplementar com Metilcobalamina (Vitamina B12) 500mcg SID para auxiliar na recuperação nervosa."
  }
};

export const MOCK_CASES = [
  FULL_CASES[1],
  FULL_CASES[4]
];
