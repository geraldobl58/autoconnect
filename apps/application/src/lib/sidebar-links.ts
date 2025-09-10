import {
  Binoculars,
  Calendar,
  Calendar1Icon,
  Car,
  CarFront,
  ChartPie,
  CirclePlus,
  DollarSign,
  Dumbbell,
  Gavel,
  HandHelping,
  Headset,
  Home,
  Hourglass,
  ImagePlus,
  Layers,
  Megaphone,
  Percent,
  SearchCheck,
  TrendingUp,
  WalletMinimal,
} from "lucide-react";

export interface SubItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  items?: React.ReactNode;
  subitems?: SubItem[];
}

export const mainItems: NavItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    subitems: [
      {
        title: "Estoque",
        url: "",
        icon: Car,
      },
      {
        title: "Vendas do mês.",
        url: "",
        icon: DollarSign,
      },
      {
        title: "Top 3 vendedores",
        url: "",
        icon: Dumbbell,
      },
    ],
  },
  {
    title: "Cadastro de Veículos",
    url: "#",
    icon: ImagePlus,
    subitems: [
      {
        title: "Novo veículo",
        url: "",
        icon: CirclePlus,
      },
      {
        title: "Lista de veículos",
        url: "",
        icon: Binoculars,
      },
      {
        title: "Buscar veículos",
        url: "",
        icon: SearchCheck,
      },
    ],
  },
  {
    title: "Gestão de Leads",
    url: "#",
    icon: Headset,
    subitems: [
      {
        title: "Cadastro",
        url: "",
        icon: CirclePlus,
      },
      {
        title: "Visualizar",
        url: "",
        icon: Binoculars,
      },
      {
        title: "Buscar Leads",
        url: "",
        icon: SearchCheck,
      },
    ],
  },
  {
    title: "Agenda de Test Drives",
    url: "#",
    icon: CarFront,
    subitems: [
      {
        title: "Calendário",
        url: "",
        icon: Calendar,
      },
      {
        title: "Agendamento",
        url: "",
        icon: Calendar1Icon,
      },
      {
        title: "Notificação",
        url: "",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "Propostas e Vendas",
    url: "#",
    icon: WalletMinimal,
    subitems: [
      {
        title: "Registros",
        url: "",
        icon: HandHelping,
      },
      {
        title: "Propostas",
        url: "",
        icon: TrendingUp,
      },
      {
        title: "Vendas",
        url: "",
        icon: Gavel,
      },
    ],
  },
  {
    title: "Relatórios",
    url: "#",
    icon: ChartPie,
    subitems: [
      {
        title: "Vendedores",
        url: "",
        icon: Percent,
      },
      {
        title: "Tempo médio",
        url: "",
        icon: Hourglass,
      },
      {
        title: "Estoque por status",
        url: "",
        icon: Layers,
      },
    ],
  },
];
