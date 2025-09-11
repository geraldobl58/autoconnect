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
    url: "/dashboard",
    icon: Home,
    subitems: [
      {
        title: "Inicio",
        url: "/dashboard",
        icon: Home,
      },
      {
        title: "Estoque",
        url: "/stock",
        icon: Car,
      },
      {
        title: "Vendas do mês",
        url: "/dashboard/sales",
        icon: DollarSign,
      },
      {
        title: "Top 3 vendedores",
        url: "/dashboard/sellers",
        icon: Dumbbell,
      },
    ],
  },
  {
    title: "Veículos",
    url: "/vehicles",
    icon: ImagePlus,
    subitems: [
      {
        title: "Administração",
        url: "/vehicles/",
        icon: Binoculars,
      },
    ],
  },
  {
    title: "Gestão de Leads",
    url: "/leads",
    icon: Headset,
    subitems: [
      {
        title: "Cadastro",
        url: "/leads/new",
        icon: CirclePlus,
      },
      {
        title: "Visualizar",
        url: "/leads/list",
        icon: Binoculars,
      },
      {
        title: "Buscar Leads",
        url: "/leads/search",
        icon: SearchCheck,
      },
    ],
  },
  {
    title: "Agenda de Test Drives",
    url: "/test-drives",
    icon: CarFront,
    subitems: [
      {
        title: "Calendário",
        url: "/test-drives/calendar",
        icon: Calendar,
      },
      {
        title: "Agendamento",
        url: "/test-drives/schedule",
        icon: Calendar1Icon,
      },
      {
        title: "Notificação",
        url: "/test-drives/notifications",
        icon: Megaphone,
      },
    ],
  },
  {
    title: "Propostas e Vendas",
    url: "/sales",
    icon: WalletMinimal,
    subitems: [
      {
        title: "Registros",
        url: "/sales/records",
        icon: HandHelping,
      },
      {
        title: "Propostas",
        url: "/sales/proposals",
        icon: TrendingUp,
      },
      {
        title: "Vendas",
        url: "/sales/sales",
        icon: Gavel,
      },
    ],
  },
  {
    title: "Relatórios",
    url: "/reports",
    icon: ChartPie,
    subitems: [
      {
        title: "Vendedores",
        url: "/reports/sellers",
        icon: Percent,
      },
      {
        title: "Tempo médio",
        url: "/reports/average-time",
        icon: Hourglass,
      },
      {
        title: "Estoque por status",
        url: "/reports/stock-status",
        icon: Layers,
      },
    ],
  },
];
