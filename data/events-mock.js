const mockEvents = [
  {
    id: "hackathon-ufmg-2025",
    titulo: "Hackathon UFMG 2025",
    categoria: "tecnologia",
    categoriaLabel: "Tecnologia",
    imagem: "../img/hackathon.jpg",
    data: "23 jul",
    hora: "09:00",
    local: "Bloco de Engenharia",
    descricao: "48 horas de desenvolvimento em equipe para resolver desafios reais da universidade.",
    vagasTotal: 100,
    inscritos: 65,
    preco: 0,
    mapaAssentos: true,
    categoriasAssentos: [
      { nome: "Plateia VIP", preco: 30, tipo: "sentado", cor: "#ec4899" },
      { nome: "Plateia Geral", preco: 0, tipo: "sentado", cor: "#8b5cf6" },
      { nome: "Área em Pé", preco: 0, tipo: "em-pe", cor: "#f59e0b" }
    ],
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Todos os participantes devem se inscrever previamente pelo formulário oficial.",
          "Vagas limitadas por ordem de inscrição.",
          "É necessário apresentar documento de identificação com foto na entrada."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Espera-se comportamento respeitoso entre todos os participantes.",
          "Qualquer conduta inadequada pode resultar em remoção do evento."
        ]
      }
    ],
    lotes: [
      {
        nome: "Lote Promocional",
        preco: 0,
        vagasTotal: 30,
        inscritos: 30,
        beneficios: ["Acesso completo ao evento", "Kit de boas-vindas"]
      },
      {
        nome: "Lote Padrão",
        preco: 0,
        vagasTotal: 50,
        inscritos: 30,
        beneficios: ["Acesso completo ao evento", "Certificado de participação"]
      },
      {
        nome: "Lote VIP",
        preco: 30,
        vagasTotal: 20,
        inscritos: 5,
        beneficios: ["Acesso completo ao evento", "Certificado de participação", "Área exclusiva de networking", "Kit premium"]
      }
    ],

    programacao: [
      {
        titulo: "Abertura",
        data: "23 jul, 2025",
        horario: "09:00 - 09:15",
        descricao: "Breve introdução sobre o evento e as regras da competição.",
        responsavel: "Prof. Ana Ribeiro"
      },
      {
        titulo: "Formação de Equipes",
        data: "23 jul, 2025",
        horario: "09:15 - 10:00",
        descricao: "Momento para os participantes se organizarem em equipes de até 4 pessoas.",
        responsavel: "Equipe organizadora"
      },
      {
        titulo: "Desenvolvimento",
        data: "23 jul, 2025",
        horario: "10:00 - 08:00 (24 jul)",
        descricao: "Período de 48 horas para desenvolvimento dos projetos, com mentoria disponível.",
        responsavel: "Equipe organizadora"
      },
      {
        titulo: "Apresentações",
        data: "25 jul, 2025",
        horario: "09:00 - 12:00",
        descricao: "Cada equipe tem 5 minutos para apresentar seu projeto à banca avaliadora.",
        responsavel: "Banca avaliadora"
      },
      {
        titulo: "Premiação",
        data: "25 jul, 2025",
        horario: "13:00 - 14:00",
        descricao: "Anúncio dos vencedores e encerramento oficial do evento.",
        responsavel: "Prof. Ana Ribeiro"
      }
    ],
    patrocinadores: [
      { nome: "Empresa X", url: "https://instagram.com/empresax" },
      { nome: "Empresa Y", url: "https://empresay.com.br" }
    ],

    palestrante: {
      nome: "Prof. Ana Ribeiro",
      cargo: "Coordenadora do curso de Ciência da Computação",
      bio: "Especialista em sistemas distribuídos, orienta projetos de extensão voltados à tecnologia aplicada.",
      linkedin: "https://linkedin.com/in/ana-ribeiro",
      redesSociais: [
        { tipo: "instagram", url: "https://instagram.com/anaribeiro" },
        { tipo: "twitter", url: "https://twitter.com/anaribeiro" }
      ]
    },
    detalhesAdicionais: "Traga seu próprio notebook. Tomadas e Wi-Fi estarão disponíveis em todas as mesas."
  },

  {
    id: "semana-iniciacao-cientifica",
    titulo: "Semana de Iniciação Científica",
    categoria: "pesquisa",
    categoriaLabel: "Pesquisa",
    imagem: "../img/iniciacao-cientifica.webp",
    data: "28 jul",
    hora: "14:00",
    local: "Auditório Central",
    descricao: "Apresentação de projetos de pesquisa de alunos de graduação e pós-graduação.",
    vagasTotal: 120,
    inscritos: 90,
    preco: 0,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Inscrições realizadas exclusivamente pelo formulário oficial do evento.",
          "Apresentadores de pôster devem enviar o resumo do trabalho até 5 dias antes do evento.",
          "É necessário apresentar documento de identificação com foto na entrada."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Espera-se comportamento respeitoso entre todos os participantes.",
          "Uso de celular deve ser evitado durante as apresentações."
        ]
      }
    ],
    lotes: [
      {
        nome: "Inscrição Geral",
        preco: 0,
        vagasTotal: 100,
        inscritos: 80,
        beneficios: ["Acesso a todas as sessões", "Certificado de participação"]
      },
      {
        nome: "Apresentador de Pôster",
        preco: 0,
        vagasTotal: 20,
        inscritos: 10,
        beneficios: ["Acesso a todas as sessões", "Espaço reservado para apresentação", "Certificado de apresentação"]
      }
    ],
    programacao: [
      {
        titulo: "Abertura",
        data: "28 jul, 2025",
        horario: "14:00 - 14:20",
        descricao: "Boas-vindas e apresentação da programação do dia.",
        responsavel: "Prof. Carlos Menezes"
      },
      {
        titulo: "Sessão de Apresentações Orais",
        data: "28 jul, 2025",
        horario: "14:20 - 16:00",
        descricao: "Alunos selecionados apresentam seus projetos de pesquisa em formato oral.",
        responsavel: "Comissão Avaliadora"
      },
      {
        titulo: "Sessão de Pôsteres",
        data: "28 jul, 2025",
        horario: "16:00 - 17:30",
        descricao: "Exposição e discussão dos trabalhos apresentados em formato de pôster.",
        responsavel: "Equipe organizadora"
      },
      {
        titulo: "Premiação dos Melhores Trabalhos",
        data: "28 jul, 2025",
        horario: "17:30 - 18:00",
        descricao: "Anúncio dos trabalhos destaque em cada área do conhecimento.",
        responsavel: "Prof. Carlos Menezes"
      }
    ],
    patrocinadores: [
      { nome: "Pró-Reitoria de Pesquisa", url: "https://propesq.ufmg.br" },
      { nome: "Editora Universitária", url: "https://editora.ufmg.br" }
    ],
    palestrante: {
      nome: "Prof. Carlos Menezes",
      cargo: "Pró-Reitor de Pesquisa e Pós-Graduação",
      bio: "Atua há mais de 15 anos fomentando projetos de iniciação científica e programas de bolsas para graduandos.",
      linkedin: "https://linkedin.com/in/carlos-menezes",
      redesSociais: [
        { tipo: "twitter", url: "https://twitter.com/carlosmenezes" }
      ]
    },
    detalhesAdicionais: "Apresentadores de pôster devem levar o material impresso; suportes serão fornecidos pela organização."
  },
  {
    id: "workshop-design-thinking",
    titulo: "Workshop de Design Thinking",
    categoria: "design",
    categoriaLabel: "Design",
    imagem: "../img/workshop_design_thinking.png",
    data: "02 ago",
    hora: "13:30",
    local: "Laboratório de Inovação",
    descricao: "Prática de metodologias de design centrado no usuário aplicadas a projetos reais.",
    vagasTotal: 60,
    inscritos: 24,
    preco: 25,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Vagas limitadas a 60 participantes, por ordem de inscrição.",
          "Pagamento deve ser confirmado até 48h antes do início do workshop.",
          "Recomenda-se chegar com 15 minutos de antecedência para o credenciamento."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "As dinâmicas em grupo exigem participação ativa de todos os inscritos.",
          "Materiais fornecidos pela organização não devem ser retirados do laboratório."
        ]
      }
    ],
    lotes: [
      {
        nome: "Lote Único",
        preco: 25,
        vagasTotal: 60,
        inscritos: 24,
        beneficios: ["Material do workshop", "Certificado de conclusão", "Coffee break"]
      }
    ],
    programacao: [
      {
        titulo: "Recepção e Apresentação",
        data: "02 ago, 2025",
        horario: "13:30 - 13:45",
        descricao: "Boas-vindas e apresentação dos objetivos do workshop.",
        responsavel: "Juliana Prado"
      },
      {
        titulo: "Fundamentos de Design Thinking",
        data: "02 ago, 2025",
        horario: "13:45 - 15:00",
        descricao: "Introdução às etapas de empatia, definição e ideação.",
        responsavel: "Juliana Prado"
      },
      {
        titulo: "Dinâmica em Grupo",
        data: "02 ago, 2025",
        horario: "15:00 - 16:30",
        descricao: "Aplicação prática do processo em um desafio real proposto pela organização.",
        responsavel: "Equipe de facilitadores"
      },
      {
        titulo: "Apresentação dos Protótipos",
        data: "02 ago, 2025",
        horario: "16:30 - 17:30",
        descricao: "Cada grupo apresenta seu protótipo e recebe feedback dos facilitadores.",
        responsavel: "Juliana Prado"
      }
    ],
    patrocinadores: [
      { nome: "Estúdio Criativo Z", url: "https://estudiocriativoz.com.br" }
    ],
    palestrante: {
      nome: "Juliana Prado",
      cargo: "Designer de Produto e Consultora em UX",
      bio: "Facilita workshops de design centrado no usuário para empresas e universidades há mais de 8 anos.",
      linkedin: "https://linkedin.com/in/juliana-prado",
      redesSociais: [
        { tipo: "instagram", url: "https://instagram.com/julianaprado.design" }
      ]
    },
    detalhesAdicionais: "As atividades serão feitas em grupos de até 5 pessoas. Não é necessário trazer material próprio."
  },
  {
    id: "palestra-carreiras-ia",
    titulo: "Palestra: Carreiras em IA",
    categoria: "carreira",
    categoriaLabel: "Carreira",
    imagem: "../img/palestra.jpg",
    data: "05 ago",
    hora: "19:00",
    local: "Sala 204, Bloco B",
    descricao: "Profissionais da área compartilham experiências sobre o mercado de trabalho em IA.",
    vagasTotal: 80,
    inscritos: 44,
    preco: 0,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Inscrição gratuita, sujeita à confirmação de presença por e-mail.",
          "Vagas limitadas à capacidade da sala."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Perguntas devem ser feitas apenas no momento reservado para isso.",
          "Gravação da palestra é de uso exclusivo da organização do evento."
        ]
      }
    ],
    lotes: [
      {
        nome: "Inscrição Geral",
        preco: 0,
        vagasTotal: 80,
        inscritos: 44,
        beneficios: ["Acesso à palestra", "Sessão de perguntas e respostas"]
      }
    ],
    programacao: [
      {
        titulo: "Abertura",
        data: "05 ago, 2025",
        horario: "19:00 - 19:10",
        descricao: "Apresentação do palestrante e da proposta do evento.",
        responsavel: "Diretório Acadêmico"
      },
      {
        titulo: "Palestra: Carreiras em IA",
        data: "05 ago, 2025",
        horario: "19:10 - 20:00",
        descricao: "Panorama do mercado de trabalho em Inteligência Artificial e caminhos de carreira.",
        responsavel: "Rafael Duarte"
      },
      {
        titulo: "Perguntas e Respostas",
        data: "05 ago, 2025",
        horario: "20:00 - 20:30",
        descricao: "Momento aberto para dúvidas do público.",
        responsavel: "Rafael Duarte"
      },
      {
        titulo: "Networking",
        data: "05 ago, 2025",
        horario: "20:30 - 21:00",
        descricao: "Confraternização informal ao final da palestra.",
        responsavel: "Diretório Acadêmico"
      }
    ],
    patrocinadores: [
      { nome: "TechNova Soluções", url: "https://technova.com.br" }
    ],
    palestrante: {
      nome: "Rafael Duarte",
      cargo: "Engenheiro de Machine Learning Sênior",
      bio: "Trabalha com sistemas de IA aplicada há 10 anos e já atuou em startups e grandes empresas de tecnologia.",
      linkedin: "https://linkedin.com/in/rafael-duarte",
      redesSociais: [
        { tipo: "twitter", url: "https://twitter.com/rafaelduarte" }
      ]
    },
    detalhesAdicionais: "O evento será seguido de um momento de networking informal. Não é necessário levar currículo."
  },
  {
    id: "feira-startups-universitarias",
    titulo: "Feira de Startups Universitárias",
    categoria: "carreira",
    categoriaLabel: "Carreira",
    imagem: "../img/startups-universitarias.jpg",
    data: "10 ago",
    hora: "10:00",
    local: "Pátio Central",
    descricao: "Alunos apresentam projetos de empreendedorismo para investidores e mentores.",
    vagasTotal: 200,
    inscritos: 150,
    preco: 15,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Expositores devem se inscrever com antecedência mínima de 10 dias.",
          "Visitantes podem adquirir ingresso até a data do evento, sujeito à disponibilidade.",
          "Cada estande é destinado a uma única startup."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "É proibida a divulgação de produtos ou serviços fora do estande designado.",
          "Espera-se comportamento profissional durante todo o evento."
        ]
      }
    ],
    lotes: [
      {
        nome: "Visitante",
        preco: 15,
        vagasTotal: 150,
        inscritos: 130,
        beneficios: ["Acesso à feira", "Networking com startups"]
      },
      {
        nome: "Expositor",
        preco: 0,
        vagasTotal: 50,
        inscritos: 20,
        beneficios: ["Estande reservado", "Divulgação no material do evento", "Acesso à área de mentoria"]
      }
    ],
    programacao: [
      {
        titulo: "Abertura dos Estandes",
        data: "10 ago, 2025",
        horario: "10:00 - 10:30",
        descricao: "Liberação do espaço para visitação dos estandes das startups.",
        responsavel: "Núcleo de Empreendedorismo"
      },
      {
        titulo: "Rodada de Pitches",
        data: "10 ago, 2025",
        horario: "10:30 - 12:30",
        descricao: "Startups selecionadas apresentam seus projetos para a banca de investidores.",
        responsavel: "Banca de Investidores"
      },
      {
        titulo: "Networking com Investidores",
        data: "10 ago, 2025",
        horario: "13:30 - 16:00",
        descricao: "Momento livre para conexões entre startups, mentores e investidores presentes.",
        responsavel: "Núcleo de Empreendedorismo"
      },
      {
        titulo: "Encerramento",
        data: "10 ago, 2025",
        horario: "16:00 - 16:30",
        descricao: "Agradecimentos e encerramento oficial da feira.",
        responsavel: "Núcleo de Empreendedorismo"
      }
    ],
    patrocinadores: [
      { nome: "Aceleradora Impulso", url: "https://aceleradoraimpulso.com.br" },
      { nome: "Banco Parceiro", url: "https://bancoparceiro.com.br" }
    ],
    palestrante: {
      nome: "Marina Costa",
      cargo: "Coordenadora do Núcleo de Empreendedorismo",
      bio: "Apoia startups universitárias desde a ideação até a captação de investimento.",
      linkedin: "https://linkedin.com/in/marina-costa",
      redesSociais: [
        { tipo: "instagram", url: "https://instagram.com/nucleoempreendedorismo" }
      ]
    },
    detalhesAdicionais: "Expositores devem montar seus estandes a partir das 8h. Energia elétrica disponível em todos os pontos."
  },
  {
    id: "meetup-frontend",
    titulo: "Meetup de Frontend",
    categoria: "tecnologia",
    categoriaLabel: "Tecnologia",
    imagem: "../img/banner-campus.webp",
    data: "14 ago",
    hora: "18:30",
    local: "Bloco de Computação",
    descricao: "Encontro informal para trocar experiências sobre HTML, CSS e JavaScript moderno.",
    vagasTotal: 50,
    inscritos: 38,
    preco: 0,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Evento gratuito, com vagas limitadas por ordem de inscrição.",
          "Aberto a estudantes e profissionais da área."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Ambiente colaborativo e respeitoso entre todos os participantes.",
          "Fotos e conteúdo do evento podem ser divulgados nas redes sociais da organização."
        ]
      }
    ],
    lotes: [
      {
        nome: "Inscrição Geral",
        preco: 0,
        vagasTotal: 50,
        inscritos: 38,
        beneficios: ["Acesso ao meetup", "Pizza e refrigerante"]
      }
    ],
    programacao: [
      {
        titulo: "Recepção",
        data: "14 ago, 2025",
        horario: "18:30 - 18:45",
        descricao: "Chegada dos participantes e momento inicial de networking.",
        responsavel: "Comunidade Dev Campus"
      },
      {
        titulo: "Talk: Novidades do CSS Moderno",
        data: "14 ago, 2025",
        horario: "18:45 - 19:30",
        descricao: "Apresentação sobre os recursos mais recentes de CSS para times de frontend.",
        responsavel: "Bianca Souza"
      },
      {
        titulo: "Talk: Performance em JavaScript",
        data: "14 ago, 2025",
        horario: "19:30 - 20:15",
        descricao: "Boas práticas para otimizar aplicações frontend modernas.",
        responsavel: "Bianca Souza"
      },
      {
        titulo: "Confraternização",
        data: "14 ago, 2025",
        horario: "20:15 - 21:00",
        descricao: "Pizza, refrigerante e bate-papo entre os participantes.",
        responsavel: "Comunidade Dev Campus"
      }
    ],
    patrocinadores: [
      { nome: "DevHub", url: "https://devhub.com.br" }
    ],
    palestrante: {
      nome: "Bianca Souza",
      cargo: "Desenvolvedora Frontend Sênior",
      bio: "Atua com desenvolvimento web há 7 anos e participa ativamente de comunidades de tecnologia.",
      linkedin: "https://linkedin.com/in/bianca-souza",
      redesSociais: [
        { tipo: "twitter", url: "https://twitter.com/biancasouza" },
        { tipo: "instagram", url: "https://instagram.com/biancasouza.dev" }
      ]
    },
    detalhesAdicionais: "Traga seu notebook caso queira acompanhar os exemplos práticos ao vivo."
  },
  {
    id: "formatura-primavera-2026",
    titulo: "Cerimônia de Formatura da Primavera 2026",
    categoria: "academico",
    categoriaLabel: "Acadêmico",
    imagem: "../img/banner-campus-2.jpg",
    descricao: "Venha celebrar a cerimônia de formatura da turma de 2026. Familiares e amigos são bem-vindos.",
    data: "15 de maio, 2026",
    hora: "10:00",
    local: "Auditório Principal",
    vagasTotal: 300,
    inscritos: 210,
    preco: 0,
    mapaAssentos: true,
    categoriasAssentos: [
      { nome: "Formandos", preco: 0, tipo: "sentado", cor: "#6366f1" },
      { nome: "Familiares", preco: 0, tipo: "sentado", cor: "#8b5cf6" },
      { nome: "Convidados", preco: 0, tipo: "em-pe", cor: "#f59e0b" }
    ],
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Formandos devem confirmar presença até 15 dias antes da cerimônia.",
          "Cada formando tem direito a 2 convites para acompanhantes.",
          "Chegada recomendada com 1 hora de antecedência para organização da procissão."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Trajes formais são recomendados para formandos e convidados.",
          "Flashes de câmera não são permitidos durante os discursos."
        ]
      }
    ],
    lotes: [
      {
        nome: "Formando",
        preco: 0,
        vagasTotal: 100,
        inscritos: 100,
        beneficios: ["Toga e beca inclusas", "2 convites para acompanhantes", "Foto oficial de formatura"]
      },
      {
        nome: "Acompanhante",
        preco: 0,
        vagasTotal: 200,
        inscritos: 110,
        beneficios: ["Assento reservado", "Acesso à recepção pós-cerimônia"]
      }
    ],
    programacao: [
      {
        titulo: "Recepção dos Formandos",
        data: "15 de maio, 2026",
        horario: "09:00 - 10:00",
        descricao: "Organização da procissão e entrega de togas e becas.",
        responsavel: "Secretaria Acadêmica"
      },
      {
        titulo: "Procissão de Entrada",
        data: "15 de maio, 2026",
        horario: "10:00 - 10:20",
        descricao: "Entrada solene dos formandos no auditório.",
        responsavel: "Secretaria Acadêmica"
      },
      {
        titulo: "Discursos",
        data: "15 de maio, 2026",
        horario: "10:20 - 11:00",
        descricao: "Discursos da direção, do paraninfo e de representantes da turma.",
        responsavel: "Prof. Ricardo Alves"
      },
      {
        titulo: "Entrega de Diplomas",
        data: "15 de maio, 2026",
        horario: "11:00 - 12:00",
        descricao: "Chamada individual dos formandos para entrega simbólica do diploma.",
        responsavel: "Secretaria Acadêmica"
      },
      {
        titulo: "Encerramento e Fotos",
        data: "15 de maio, 2026",
        horario: "12:00 - 13:00",
        descricao: "Sessão de fotos oficiais e recepção para familiares e convidados.",
        responsavel: "Secretaria Acadêmica"
      }
    ],
    patrocinadores: [
      { nome: "Estúdio Fotográfico Central", url: "https://estudiocentral.com.br" }
    ],
    palestrante: {
      nome: "Prof. Ricardo Alves",
      cargo: "Paraninfo da Turma 2026",
      bio: "Professor há 20 anos na instituição, escolhido pela turma para representar a formatura.",
      linkedin: "https://linkedin.com/in/ricardo-alves",
      redesSociais: []
    },
    detalhesAdicionais: "A cerimônia terá transmissão ao vivo para familiares que não puderem comparecer presencialmente."
  },
  {
    id: "campeonato-esportes",
    titulo: "Campeonato Anual de Esportes",
    categoria: "esportes",
    categoriaLabel: "Esportes",
    imagem: "../img/hero-image.png",
    descricao: "Participe de diversas modalidades esportivas e apoie os colegas neste dia dedicado ao esporte universitário.",
    data: "22 de março, 2026",
    hora: "09:00",
    local: "Complexo Esportivo",
    vagasTotal: 150,
    inscritos: 60,
    preco: 10,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Participantes devem escolher a modalidade no momento da inscrição.",
          "É recomendado atestado médico para participantes das modalidades competitivas.",
          "Espectadores têm acesso livre às arquibancadas mediante inscrição gratuita."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Espírito esportivo e respeito aos adversários são obrigatórios em todas as modalidades.",
          "Comportamento antidesportivo pode resultar em desclassificação."
        ]
      }
    ],
    lotes: [
      {
        nome: "Participante",
        preco: 10,
        vagasTotal: 100,
        inscritos: 45,
        beneficios: ["Kit esportivo", "Inscrição em uma modalidade", "Certificado de participação"]
      },
      {
        nome: "Espectador",
        preco: 0,
        vagasTotal: 50,
        inscritos: 15,
        beneficios: ["Acesso às arquibancadas"]
      }
    ],
    programacao: [
      {
        titulo: "Abertura",
        data: "22 de março, 2026",
        horario: "09:00 - 09:30",
        descricao: "Cerimônia de abertura e apresentação das equipes participantes.",
        responsavel: "Coordenação de Esportes"
      },
      {
        titulo: "Modalidades Coletivas",
        data: "22 de março, 2026",
        horario: "09:30 - 12:00",
        descricao: "Partidas eliminatórias de futsal, vôlei e basquete.",
        responsavel: "Coordenação de Esportes"
      },
      {
        titulo: "Modalidades Individuais",
        data: "22 de março, 2026",
        horario: "13:00 - 15:00",
        descricao: "Competições de atletismo e natação.",
        responsavel: "Coordenação de Esportes"
      },
      {
        titulo: "Finais e Premiação",
        data: "22 de março, 2026",
        horario: "15:00 - 17:00",
        descricao: "Disputas finais das modalidades coletivas e cerimônia de premiação.",
        responsavel: "Prof. Eduardo Lima"
      }
    ],
    patrocinadores: [
      { nome: "Loja Esportiva Vitalize", url: "https://vitalizeesportes.com.br" }
    ],
    palestrante: {
      nome: "Prof. Eduardo Lima",
      cargo: "Coordenador de Esportes Universitários",
      bio: "Responsável pela organização dos campeonatos esportivos da universidade há 6 anos.",
      linkedin: "https://linkedin.com/in/eduardo-lima",
      redesSociais: [
        { tipo: "instagram", url: "https://instagram.com/esportesuniversidade" }
      ]
    },
    detalhesAdicionais: "Participantes devem chegar 30 minutos antes do horário de sua modalidade para aquecimento."
  },
  {
    id: "conferencia-inovacao-tecnologica",
    titulo: "Conferência de Inovação Tecnológica",
    categoria: "academico",
    categoriaLabel: "Acadêmico",
    imagem: "../img/hackathon.jpg",
    descricao: "Explore as últimas inovações em tecnologia com especialistas da indústria e projetos de alunos.",
    data: "08 de abril, 2026",
    hora: "14:00",
    local: "Centro Estudantil",
    vagasTotal: 180,
    inscritos: 99,
    preco: 30,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Ingressos devem ser adquiridos com antecedência pelo site oficial.",
          "Credenciamento obrigatório a partir das 13h no dia do evento.",
          "Certificado de participação enviado por e-mail após o evento."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Uso de crachá de identificação obrigatório durante todo o evento.",
          "Gravações e fotos são permitidas apenas nas áreas de exposição."
        ]
      }
    ],
    lotes: [
      {
        nome: "Lote Padrão",
        preco: 30,
        vagasTotal: 140,
        inscritos: 85,
        beneficios: ["Acesso a todas as palestras", "Material do evento", "Coffee break"]
      },
      {
        nome: "Lote Premium",
        preco: 60,
        vagasTotal: 40,
        inscritos: 14,
        beneficios: ["Acesso a todas as palestras", "Material do evento", "Coffee break", "Almoço com palestrantes", "Acesso antecipado"]
      }
    ],
    programacao: [
      {
        titulo: "Credenciamento",
        data: "08 de abril, 2026",
        horario: "13:00 - 14:00",
        descricao: "Retirada de crachás e materiais do evento.",
        responsavel: "Equipe organizadora"
      },
      {
        titulo: "Palestra de Abertura",
        data: "08 de abril, 2026",
        horario: "14:00 - 15:00",
        descricao: "Panorama das principais tendências tecnológicas para os próximos anos.",
        responsavel: "Dra. Patrícia Nogueira"
      },
      {
        titulo: "Painéis Temáticos",
        data: "08 de abril, 2026",
        horario: "15:00 - 17:30",
        descricao: "Discussões em grupo sobre inteligência artificial, nuvem e cibersegurança.",
        responsavel: "Convidados diversos"
      },
      {
        titulo: "Exposição de Projetos de Alunos",
        data: "08 de abril, 2026",
        horario: "17:30 - 18:30",
        descricao: "Mostra de projetos desenvolvidos por alunos de graduação e pós-graduação.",
        responsavel: "Equipe organizadora"
      },
      {
        titulo: "Encerramento",
        data: "08 de abril, 2026",
        horario: "18:30 - 19:00",
        descricao: "Considerações finais e agradecimentos.",
        responsavel: "Dra. Patrícia Nogueira"
      }
    ],
    patrocinadores: [
      { nome: "CloudTech Brasil", url: "https://cloudtech.com.br" },
      { nome: "SecureNet", url: "https://securenet.com.br" }
    ],
    palestrante: {
      nome: "Dra. Patrícia Nogueira",
      cargo: "Pesquisadora em Inteligência Artificial",
      bio: "Doutora em Ciência da Computação, atua em pesquisas aplicadas de IA em parceria com a indústria.",
      linkedin: "https://linkedin.com/in/patricia-nogueira",
      redesSociais: [
        { tipo: "twitter", url: "https://twitter.com/patricianogueira" }
      ]
    },
    detalhesAdicionais: "Estacionamento gratuito disponível no Centro Estudantil durante todo o evento."
  },
  {
    id: "festival-musica-primavera",
    titulo: "Festival de Música da Primavera",
    categoria: "cultural",
    categoriaLabel: "Cultural",
    imagem: "../img/banner-campus.webp",
    descricao: "Uma noite de música ao vivo com bandas de estudantes e convidados especiais. Food trucks e atividades.",
    data: "20 de abril, 2026",
    hora: "18:00",
    local: "Campus Principal",
    vagasTotal: 500,
    inscritos: 275,
    preco: 20,
    mapaAssentos: true,
    categoriasAssentos: [
      { nome: "Pista VIP", preco: 40, tipo: "em-pe", cor: "#ec4899" },
      { nome: "Pista Geral", preco: 20, tipo: "em-pe", cor: "#8b5cf6" }
    ],
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Ingressos não são reembolsáveis, exceto em caso de cancelamento do evento.",
          "Entrada permitida a partir dos 16 anos, acompanhados de responsável até os 18."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "É proibida a entrada com bebidas e alimentos externos.",
          "A organização reserva-se o direito de retirar do local qualquer pessoa em comportamento inadequado."
        ]
      }
    ],
    lotes: [
      {
        nome: "Pista Geral",
        preco: 20,
        vagasTotal: 400,
        inscritos: 250,
        beneficios: ["Acesso ao festival", "Acesso à área de food trucks"]
      },
      {
        nome: "Pista VIP",
        preco: 40,
        vagasTotal: 100,
        inscritos: 25,
        beneficios: ["Acesso ao festival", "Área exclusiva próxima ao palco", "Open bar não alcoólico"]
      }
    ],
    programacao: [
      {
        titulo: "Abertura dos Portões",
        data: "20 de abril, 2026",
        horario: "18:00 - 19:00",
        descricao: "Liberação da entrada e abertura da praça de food trucks.",
        responsavel: "Equipe organizadora"
      },
      {
        titulo: "Banda Calouro",
        data: "20 de abril, 2026",
        horario: "19:00 - 20:00",
        descricao: "Apresentação de banda formada por alunos ingressantes.",
        responsavel: "Diretório Acadêmico"
      },
      {
        titulo: "Banda Convidada",
        data: "20 de abril, 2026",
        horario: "20:00 - 21:30",
        descricao: "Show de banda convidada, aberta ao público universitário.",
        responsavel: "Produção do Festival"
      },
      {
        titulo: "Show Principal",
        data: "20 de abril, 2026",
        horario: "21:30 - 23:30",
        descricao: "Apresentação da atração principal da noite.",
        responsavel: "Produção do Festival"
      },
      {
        titulo: "Encerramento",
        data: "20 de abril, 2026",
        horario: "23:30 - 00:00",
        descricao: "Encerramento oficial e liberação gradual do público.",
        responsavel: "Equipe organizadora"
      }
    ],
    patrocinadores: [
      { nome: "Rádio Campus FM", url: "https://radiocampusfm.com.br" },
      { nome: "Food Trucks União", url: "https://instagram.com/foodtrucksuniao" }
    ],
    palestrante: {
      nome: "Diego Farias",
      cargo: "Curador do Festival de Música da Primavera",
      bio: "Produtor cultural responsável pela curadoria musical dos eventos do campus há 5 anos.",
      linkedin: "https://linkedin.com/in/diego-farias",
      redesSociais: [
        { tipo: "instagram", url: "https://instagram.com/diegofarias" }
      ]
    },
    detalhesAdicionais: "Área de food trucks funciona durante todo o evento. Estacionamento pago disponível nas proximidades."
  },
  {
    id: "feira-carreiras-estagios",
    titulo: "Feira de Carreiras e Estágios",
    categoria: "carreira",
    categoriaLabel: "Carreira",
    imagem: "../img/startups-universitarias.jpg",
    descricao: "Conecte-se com recrutadores de mais de 40 empresas parceiras em busca de estagiários e talentos.",
    data: "10 de maio, 2026",
    hora: "10:00",
    local: "Biblioteca",
    vagasTotal: 250,
    inscritos: 125,
    preco: 0,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Inscrição gratuita, recomendada com antecedência para garantir vaga.",
          "Recomenda-se levar currículo impresso, além do currículo digital cadastrado."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Traje social ou social casual é recomendado para os participantes.",
          "Respeito às filas de atendimento de cada empresa é obrigatório."
        ]
      }
    ],
    lotes: [
      {
        nome: "Inscrição Geral",
        preco: 0,
        vagasTotal: 250,
        inscritos: 125,
        beneficios: ["Acesso à feira", "Currículo disponível para recrutadores"]
      }
    ],
    programacao: [
      {
        titulo: "Abertura",
        data: "10 de maio, 2026",
        horario: "10:00 - 10:15",
        descricao: "Boas-vindas e orientações gerais sobre a feira.",
        responsavel: "Núcleo de Carreiras"
      },
      {
        titulo: "Rodada de Conversas com Empresas",
        data: "10 de maio, 2026",
        horario: "10:15 - 13:00",
        descricao: "Estudantes visitam os estandes das empresas parceiras para conversar com recrutadores.",
        responsavel: "Empresas Parceiras"
      },
      {
        titulo: "Workshop de Currículo",
        data: "10 de maio, 2026",
        horario: "14:00 - 15:00",
        descricao: "Orientações práticas para montar um currículo competitivo.",
        responsavel: "Fernanda Lopes"
      },
      {
        titulo: "Encerramento",
        data: "10 de maio, 2026",
        horario: "15:00 - 15:30",
        descricao: "Encerramento oficial e agradecimentos às empresas parceiras.",
        responsavel: "Núcleo de Carreiras"
      }
    ],
    patrocinadores: [
      { nome: "Grupo RH Talentos", url: "https://rhtalentos.com.br" },
      { nome: "Consultoria Carreira Plena", url: "https://carreiraplena.com.br" }
    ],
    palestrante: {
      nome: "Fernanda Lopes",
      cargo: "Consultora de Recursos Humanos",
      bio: "Especialista em recrutamento de estagiários e jovens talentos, atua há 12 anos na área de RH.",
      linkedin: "https://linkedin.com/in/fernanda-lopes",
      redesSociais: [
        { tipo: "twitter", url: "https://twitter.com/fernandalopesrh" }
      ]
    },
    detalhesAdicionais: "Lista de empresas participantes será divulgada uma semana antes do evento no site do Núcleo de Carreiras."
  },
  {
    id: "encontro-integracao-calouros",
    titulo: "Encontro de Integração dos Calouros",
    categoria: "social",
    categoriaLabel: "Social",
    imagem: "../img/hero-image.png",
    descricao: "Dinâmicas, jogos e networking para novos alunos se conhecerem no início do semestre.",
    data: "02 de fevereiro, 2026",
    hora: "16:00",
    local: "Campus Principal",
    vagasTotal: 400,
    inscritos: 360,
    preco: 0,
    mapaAssentos: false,
    termos: [
      {
        titulo: "Inscrição e Participação",
        itens: [
          "Evento exclusivo para alunos ingressantes no semestre atual.",
          "Inscrição gratuita, obrigatória para garantir o kit de boas-vindas."
        ]
      },
      {
        titulo: "Conduta",
        itens: [
          "Participação nas dinâmicas em grupo é opcional, mas recomendada.",
          "Respeito e boas-vindas fazem parte do espírito do encontro."
        ]
      }
    ],
    lotes: [
      {
        nome: "Inscrição Geral",
        preco: 0,
        vagasTotal: 400,
        inscritos: 360,
        beneficios: ["Acesso ao evento", "Lanche incluso", "Kit de boas-vindas para calouros"]
      }
    ],
    programacao: [
      {
        titulo: "Recepção",
        data: "02 de fevereiro, 2026",
        horario: "16:00 - 16:30",
        descricao: "Chegada dos calouros e entrega dos kits de boas-vindas.",
        responsavel: "Diretório Acadêmico"
      },
      {
        titulo: "Dinâmicas em Grupo",
        data: "02 de fevereiro, 2026",
        horario: "16:30 - 17:30",
        descricao: "Jogos e atividades para os calouros se conhecerem entre si.",
        responsavel: "Diretório Acadêmico"
      },
      {
        titulo: "Apresentação dos Cursos",
        data: "02 de fevereiro, 2026",
        horario: "17:30 - 18:15",
        descricao: "Coordenadores apresentam brevemente a estrutura de cada curso.",
        responsavel: "Coordenações de Curso"
      },
      {
        titulo: "Lanche e Confraternização",
        data: "02 de fevereiro, 2026",
        horario: "18:15 - 19:00",
        descricao: "Momento livre para socialização entre os novos alunos.",
        responsavel: "Diretório Acadêmico"
      }
    ],
    patrocinadores: [
      { nome: "Papelaria Universitária", url: "https://papelariauniversitaria.com.br" }
    ],
    palestrante: {
      nome: "Lucas Andrade",
      cargo: "Presidente do Diretório Acadêmico",
      bio: "Representa os alunos na organização de eventos de integração e acolhimento dos calouros.",
      linkedin: "https://linkedin.com/in/lucas-andrade",
      redesSociais: [
        { tipo: "instagram", url: "https://instagram.com/dacampus" }
      ]
    },
    detalhesAdicionais: "Recomenda-se roupas confortáveis para participar das dinâmicas ao ar livre."
  }
];