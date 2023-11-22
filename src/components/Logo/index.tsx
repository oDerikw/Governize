import { Box, styled, Tooltip } from '@mui/material';
import Link from 'src/components/Link';
import { useTranslation } from 'react-i18next';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        width:80px;
        height:80px;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
        &:hover {
          text-decoration: none;
        }
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 80px;
        display:flex;
        align-itens:center;
        overflow: hidden;
        border-radius:100%;
        transform: scale(.7);
        background:  #0c3c44;
`
);





const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
`
);



const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: ${theme.typography.pxToRem(15)};
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  const { t }: { t: any } = useTranslation();

  return (
    <LogoWrapper href="/">
      <LogoSignWrapper>
      <img height={80} alt="Governize" src='/governize.png' />
      </LogoSignWrapper>
    
    </LogoWrapper>
  );
}

export default Logo;
