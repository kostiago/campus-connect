/*
  Mock de dados da Dashboard do Aluno (pages/dashboard-aluno.html)
*/

const dashboardAlunoMock = {
  usuario: {
    nome: "Maria Silva",
    curso: "Ciência da Computação",
    pontos: 1240,
    eventosParticipados: 14,
    diasAtivo: 86
  },

  progresso: [
    { label: "Acadêmico", percentual: 80, cor: "blue" },
    { label: "Carreira", percentual: 55, cor: "amber" },
    { label: "Social", percentual: 40, cor: "purple" }
  ],

  proximoEvento: {
    titulo: "Semana de Iniciação Científica",
    categoria: "Pesquisa",
    diasRestantes: 3,
    data: "28 jul",
    local: "Auditório Central"
  },

  certificados: {
    emitidos: 3,
    total: 5
  },

  inscricoes: [
    { titulo: "Hackathon UFMG 2025", data: "23 jul", status: "confirmada" },
    { titulo: "Semana de Iniciação Científica", data: "28 jul", status: "confirmada" },
    { titulo: "Workshop de Design Thinking", data: "02 ago", status: "aguardando" },
    { titulo: "Palestra: Carreiras em IA", data: "05 ago", status: "concluida" }
  ],

  atividadeRecente: [
    { texto: "Você se inscreveu em \"Hackathon UFMG 2025\"", tempo: "há 2 horas", tipo: "inscricao" },
    { texto: "Certificado de \"Meetup de Frontend\" foi emitido", tempo: "há 1 dia", tipo: "certificado" },
    { texto: "Você favoritou \"Feira de Startups Universitárias\"", tempo: "há 2 dias", tipo: "favorito" },
    { texto: "Você se inscreveu em \"Semana de Iniciação Científica\"", tempo: "há 4 dias", tipo: "inscricao" }
  ],

  recomendado: {
    titulo: "Feira de Carreiras e Estágios",
    categoria: "Carreira",
    data: "10 mai",
    local: "Biblioteca",
    vagasRestantes: 42,
    descricao: "Conecte-se com recrutadores de mais de 40 empresas parceiras em busca de estagiários."
  }
};