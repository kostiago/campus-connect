/*
  auth.js — SIMULAÇÃO de sessão de usuário, sem backend real.

  Isso NÃO é autenticação de verdade: não há senha, não há servidor
  validando nada. É só um "cofrinho" no localStorage guardando qual
  papel (role) está "logado" no momento, pra você poder testar a UI
  condicional (nav pública vs. menu de usuário) antes de existir um
  backend de verdade.

  Quando o backend real existir, troque as funções abaixo por
  chamadas à API (ex: verificar um token JWT, uma sessão de servidor
  etc.) — o resto do código (site-header.js) não precisa mudar, desde
  que `getCurrentUser()` continue retornando o mesmo formato de objeto.

  Hierarquia de papéis (cada um acumula os anteriores):
  visitante (não logado) < aluno < organizador < administrador
*/

const CampusAuth = {
  STORAGE_KEY: "campusConnectSession",

  DASHBOARD_FILE_BY_ROLE: {
    aluno: "dashboard-aluno.html",
    organizador: "dashboard-organizador.html",
    administrador: "dashboard-administrador.html"
  },

  
  // Retorna o usuário "logado" atualmente, ou null se for visitante.
  // Formato: { role: "aluno" | "organizador" | "administrador", nome: "..." }
  getCurrentUser() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // Simula login — usar só para teste/demonstração.
  login(role, nome = "Usuário de Teste") {
    const rolesValidos = ["aluno", "organizador", "administrador"];

    if (!rolesValidos.includes(role)) {
      console.warn(`Papel inválido: "${role}". Use um de: ${rolesValidos.join(", ")}`);
      return;
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ role, nome }));
    console.log(`Sessão simulada iniciada como "${role}". Recarregue a página para ver o menu atualizado.`);
  },

  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log("Sessão encerrada. Recarregue a página.");
  }
};

/*
  Como testar no Console do navegador (F12), enquanto não existe
  tela de login de verdade:

  CampusAuth.login("aluno");           // simula um aluno logado
  CampusAuth.login("organizador");     // simula um organizador
  CampusAuth.login("administrador");   // simula um admin
  CampusAuth.logout();                 // volta a ser visitante

  Depois de rodar, recarregue a página para o header atualizar.
*/

window.CampusAuth = CampusAuth;