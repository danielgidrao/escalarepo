// Dados falsos do protótipo. Na AA2 isto vira o json-server / MockAPI.

export const usuario = {
  nome: 'Dra. Marina Lopes',
  especialidade: 'Clínica Médica',
  crm: 'CRM-SP 123456',
  iniciais: 'ML',
}

export const especialidades = [
  'Clínica Médica',
  'Pediatria',
  'Ortopedia',
  'Anestesiologia',
  'Ginecologia',
  'Cardiologia',
  'Emergência',
]

export const turnos = ['Diurno', 'Noturno', '24h']

export const distancias = [5, 10, 20, 50]

export const hospitais = [
  { id: 'h1', nome: 'Hospital Santa Clara', bairro: 'Vila Mariana', cidade: 'São Paulo', endereco: 'Rua Domingos de Morais, 1200' },
  { id: 'h2', nome: 'Hospital São Lucas', bairro: 'Moema', cidade: 'São Paulo', endereco: 'Av. Ibirapuera, 2450' },
  { id: 'h3', nome: 'Pronto-Socorro Central', bairro: 'Centro', cidade: 'São Paulo', endereco: 'Rua da Consolação, 300' },
  { id: 'h4', nome: 'Hospital Infantil Sabará', bairro: 'Higienópolis', cidade: 'São Paulo', endereco: 'Av. Angélica, 1987' },
  { id: 'h5', nome: 'Hospital Regional Oeste', bairro: 'Osasco', cidade: 'Osasco', endereco: 'Av. dos Autonomistas, 4000' },
  { id: 'h6', nome: 'Maternidade Bela Vista', bairro: 'Bela Vista', cidade: 'São Paulo', endereco: 'Rua Treze de Maio, 900' },
  { id: 'h7', nome: 'Hospital Municipal do Tatuapé', bairro: 'Tatuapé', cidade: 'São Paulo', endereco: 'Rua Tuiuti, 2100' },
  { id: 'h8', nome: 'Hospital das Clínicas', bairro: 'Cerqueira César', cidade: 'São Paulo', endereco: 'Av. Dr. Enéas Carvalho de Aguiar, 255' },
  { id: 'h9', nome: 'UPA Santana', bairro: 'Santana', cidade: 'São Paulo', endereco: 'Rua Voluntários da Pátria, 3500' },
  { id: 'h10', nome: 'Hospital Estadual de Diadema', bairro: 'Centro', cidade: 'Diadema', endereco: 'Rua José Bonifácio, 1641' },
  { id: 'h11', nome: 'Hospital São Bernardo', bairro: 'Rudge Ramos', cidade: 'São Bernardo do Campo', endereco: 'Av. Caminho do Mar, 3000' },
  { id: 'h12', nome: 'Pronto-Socorro Lapa', bairro: 'Lapa', cidade: 'São Paulo', endereco: 'Rua Guaicurus, 1500' },
]

export const plantoes = [
  {
    id: 'p1',
    instrucoesTroca: 'Mandar e-mail para escala.pa@santaclara.com.br até 48h antes, com nome e CRM de quem assume.\nA coordenação responde confirmando a troca no sistema.\nNo dia, retirar o crachá provisório na portaria da Rua Domingos de Morais.', hospitalId: 'h1', especialidade: 'Clínica Médica', setor: 'Pronto-atendimento adulto',
    data: '2026-10-03', inicio: '07:00', fim: '19:00', turno: 'Diurno', valor: 1800, distancia: 3.2,
    descricao: 'PA adulto com média de 60 atendimentos por turno. Equipe com 2 clínicos, 1 enfermeiro-chefe e retaguarda de cardiologia. Prontuário eletrônico MV.',
    publicadoPor: { nome: 'Dr. Rafael Nunes', iniciais: 'RN', trocas: 14 }, urgente: true,
  },
  {
    id: 'p2',
    instrucoesTroca: 'Avisar a Dra. Sandra (coordenação da anestesia) pelo ramal 4410 ou WhatsApp institucional.\nQuem assume precisa ter cadastro no corpo clínico. Se não tiver, levar RG, CRM e comprovante de RQE ao RH.', hospitalId: 'h2', especialidade: 'Anestesiologia', setor: 'Centro cirúrgico',
    data: '2026-10-04', inicio: '19:00', fim: '07:00', turno: 'Noturno', valor: 2600, distancia: 5.8,
    descricao: 'Plantão de sobreaviso presencial no centro cirúrgico. Cirurgias de urgência, em média 3 por noite. Sala de conforto com cama.',
    publicadoPor: { nome: 'Dra. Paula Reis', iniciais: 'PR', trocas: 31 },
  },
  {
    id: 'p3',
    instrucoesTroca: 'Preencher o formulário de troca no portal do médico (menu Escalas > Solicitar troca).\nAs duas partes precisam aprovar no portal até 24h antes.', hospitalId: 'h4', especialidade: 'Pediatria', setor: 'Emergência pediátrica',
    data: '2026-10-05', inicio: '07:00', fim: '07:00', turno: '24h', valor: 3900, distancia: 7.1,
    descricao: 'Emergência pediátrica de porte médio. Dois pediatras por turno, com UTI pediátrica de retaguarda no mesmo andar.',
    publicadoPor: { nome: 'Dr. Tiago Almeida', iniciais: 'TA', trocas: 8 },
  },
  {
    id: 'p4',
    instrucoesTroca: 'A troca é feita direto com o chefe de plantão do PS, Dr. Mauro, pelo telefone (11) 3000-0000.\nLevar ACLS válido impresso no primeiro plantão.', hospitalId: 'h3', especialidade: 'Emergência', setor: 'Sala vermelha',
    data: '2026-10-06', inicio: '19:00', fim: '07:00', turno: 'Noturno', valor: 2200, distancia: 1.4,
    descricao: 'Sala vermelha com 6 leitos. Necessário ACLS em dia. Alto volume às sextas e sábados.',
    publicadoPor: { nome: 'Dra. Carla Mendes', iniciais: 'CM', trocas: 22 }, urgente: true,
  },
  {
    id: 'p5',
    instrucoesTroca: 'Enviar nome, CRM e telefone de quem assume para a secretaria da ortopedia (ortopedia@hro.org.br).\nPrimeiro plantão no hospital: chegar 30 min antes para integração.', hospitalId: 'h5', especialidade: 'Ortopedia', setor: 'PS ortopédico',
    data: '2026-10-08', inicio: '07:00', fim: '19:00', turno: 'Diurno', valor: 2000, distancia: 18.5,
    descricao: 'PS ortopédico com sala de gesso e raio-X 24h. Casos cirúrgicos são encaminhados para a equipe de sobreaviso.',
    publicadoPor: { nome: 'Dr. Bruno Costa', iniciais: 'BC', trocas: 5 },
  },
  {
    id: 'p6',
    instrucoesTroca: 'Registrar a troca no livro de escala do centro obstétrico, com assinatura das duas partes.\nAvisar a enfermeira-chefe do turno.', hospitalId: 'h6', especialidade: 'Ginecologia', setor: 'Centro obstétrico',
    data: '2026-10-09', inicio: '07:00', fim: '19:00', turno: 'Diurno', valor: 2400, distancia: 4.3,
    descricao: 'Centro obstétrico com média de 12 partos por turno. Equipe de enfermagem obstétrica experiente.',
    publicadoPor: { nome: 'Dra. Juliana Prado', iniciais: 'JP', trocas: 17 },
  },
  {
    id: 'p7',
    instrucoesTroca: 'Troca pelo app interno do hospital (Escala SC). Eu envio a solicitação e você aceita com o login do corpo clínico.\nSem login, falar com a secretaria da cardiologia no ramal 2230.', hospitalId: 'h1', especialidade: 'Cardiologia', setor: 'Unidade coronariana',
    data: '2026-10-10', inicio: '19:00', fim: '07:00', turno: 'Noturno', valor: 2800, distancia: 3.2,
    descricao: 'UCO com 10 leitos. Hemodinâmica de sobreaviso. Passagem de plantão às 19h em round com a equipe diurna.',
    publicadoPor: { nome: 'Dr. André Lima', iniciais: 'AL', trocas: 40 },
  },
  {
    id: 'p8',
    instrucoesTroca: 'Avisar a coordenação clínica por e-mail (clinica@saolucas.com.br) com cópia para mim.\nA confirmação costuma sair no mesmo dia.', hospitalId: 'h2', especialidade: 'Clínica Médica', setor: 'Enfermaria',
    data: '2026-10-11', inicio: '07:00', fim: '19:00', turno: 'Diurno', valor: 1500, distancia: 5.8,
    descricao: 'Enfermaria clínica com 30 leitos, evolução e intercorrências. Plantão tranquilo aos fins de semana.',
    publicadoPor: { nome: 'Dra. Fernanda Rocha', iniciais: 'FR', trocas: 11 },
  },
]

// Plantões publicados pela usuária logada, com candidatos já populados.
export const meusPublicados = [
  {
    id: 'm1',
    instrucoesTroca: 'Ligar para a secretaria do PS Central, (11) 3000-0000, ramal 12, informando nome e CRM.\nA secretaria atualiza a escala e manda a confirmação por e-mail.', hospitalId: 'h3', especialidade: 'Clínica Médica', setor: 'Pronto-atendimento',
    data: '2026-10-07', inicio: '07:00', fim: '19:00', turno: 'Diurno', valor: 1900, distancia: 1.4,
    status: 'aberto',
    candidatos: [
      { id: 'c1', nome: 'Dr. Lucas Ferreira', iniciais: 'LF', especialidade: 'Clínica Médica', trocas: 12, nota: 4.9 },
      { id: 'c2', nome: 'Dra. Beatriz Souza', iniciais: 'BS', especialidade: 'Clínica Médica', trocas: 3, nota: 4.7 },
      { id: 'c3', nome: 'Dr. Henrique Dias', iniciais: 'HD', especialidade: 'Emergência', trocas: 27, nota: 4.95 },
    ],
  },
  {
    id: 'm2',
    instrucoesTroca: 'Mandar e-mail para escala.pa@santaclara.com.br com nome e CRM.\nRetirar o crachá provisório na portaria.', hospitalId: 'h1', especialidade: 'Clínica Médica', setor: 'Enfermaria',
    data: '2026-10-15', inicio: '19:00', fim: '07:00', turno: 'Noturno', valor: 1700, distancia: 3.2,
    status: 'aberto',
    candidatos: [
      { id: 'c4', nome: 'Dra. Camila Torres', iniciais: 'CT', especialidade: 'Clínica Médica', trocas: 9, nota: 4.8 },
    ],
  },
]

export const meusAssumidos = [
  {
    id: 'a1',
    instrucoesTroca: 'Avisar a coordenação clínica por e-mail (clinica@saolucas.com.br) com cópia para o Dr. Paulo.\nApresentar-se ao enfermeiro-chefe ao chegar.', hospitalId: 'h2', especialidade: 'Clínica Médica', setor: 'Pronto-atendimento',
    data: '2026-09-30', inicio: '07:00', fim: '19:00', turno: 'Diurno', valor: 1800, distancia: 5.8,
    status: 'confirmado', publicadoPor: { nome: 'Dr. Paulo Vieira', iniciais: 'PV', trocas: 19 },
  },
]

export const getHospital = (id) => hospitais.find((h) => h.id === id)

const semana = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

export function formatData(iso) {
  const [a, m, d] = iso.split('-').map(Number)
  const dt = new Date(a, m - 1, d)
  return { dia: d, mes: meses[m - 1], semana: semana[dt.getDay()], extenso: `${semana[dt.getDay()]}, ${d} de ${meses[m - 1]}` }
}

export const formatValor = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

export function duracao(inicio, fim) {
  const [hi, mi] = inicio.split(':').map(Number)
  const [hf, mf] = fim.split(':').map(Number)
  let h = hf + mf / 60 - (hi + mi / 60)
  if (h <= 0) h += 24
  return `${h}h`
}

// Busca sem diferenciar acentos e maiúsculas.
export const normalizar = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
