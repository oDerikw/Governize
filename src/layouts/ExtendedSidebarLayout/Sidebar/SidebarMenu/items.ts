import type { ReactNode } from 'react';

import SearchIcon from '@mui/icons-material/Search';
import GavelIcon from '@mui/icons-material/Gavel';
import LockIcon from '@mui/icons-material/Lock';
import SettingsIcon from '@mui/icons-material/Settings';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SpeedIcon from '@mui/icons-material/Speed';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  badgeTooltip?: string;

  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Geral',
    items: [
      {
        name: 'Gerenciador Governize',
        icon: LockIcon,
        items: [
          {
            name: 'Extended Sidebar',
            link: '/dashboards/reports',
            badgeTooltip: 'Added in version 3.0'
          },
          {
            name: 'Accent Header',
            link: '/blueprints/accent-header/dashboards/reports',
            badge: '',
            badgeTooltip: 'Updated'
          }
        ]
      },
      {
        name: 'Painel de Controle',
        link: '/management/projects',
        icon: SettingsIcon
      },
      {
        name: 'Licitação',
        icon: GavelIcon,
        link: '/dashboards',
        items: [
          {
            name: 'Reports',
            link: '/dashboards/reports',
            badge: '',
            badgeTooltip: 'Dot indicator with example tooltip'
          },
          {
            name: 'Expenses',
            link: '/dashboards/expenses',
            badge: ''
          },
          {
            name: 'Products',
            link: '/dashboards/products'
          }
        ]
      },
      {
        name: 'Agenda',
        link: '/management/projects',
        icon: CalendarIcon
      },
      {
        name: 'Consulta',
        icon: SearchIcon,
        badge: '',
        link: '/blocks',
        badgeTooltip: 'Tokyo contains over 250 data display blocks',
        items: [
          {
            name: 'Charts large',
            link: '/blocks/charts-large'
          },
          {
            name: 'Charts small',
            link: '/blocks/charts-small'
          }
        ]
      },
      {
        name: 'Relatório',
        icon: AssessmentOutlinedIcon,
        badge: '',
        link: '/blocks',
        badgeTooltip: 'Tokyo contains over 250 data display blocks',
        items: [
          {
            name: 'Charts large',
            link: '/blocks/charts-large'
          },
          {
            name: 'Charts small',
            link: '/blocks/charts-small'
          }
        ]
      },
      {
        name: 'Dashboard',
        link: '/management/projects',
        icon: SpeedIcon
      },
      {
        name: 'Monitoramento (beta)',
        link: '/management/projects',
        icon: ForumOutlinedIcon
      },
      {
        name: 'Sair',
        link: '/management/projects',
        icon: LogoutOutlinedIcon
      }
    ]
  },
  
];

export default menuItems;
