import {
  Tooltip,
  TooltipProps,
  tooltipClasses,
  styled,
} from '@mui/material';
import Link from 'src/components/Link';
import { useTranslation } from 'react-i18next';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        overflow:hidden;
        width: 100px;
        border-radius:100%;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

function Logo() {
  const { t }: { t: any } = useTranslation();

  return (
    <TooltipWrapper title={t('Governize')} arrow>
      <LogoWrapper href="/">
        
          <img height={100} alt="Governize" src='/governize.png' />
        
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
