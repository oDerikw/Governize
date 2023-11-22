import { Box, styled } from '@mui/material';
import Link from 'src/components/Link';

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
        width: 100%;
        display:flex;
        align-itens:center;
        transform: scale(.7);
        
`
);


function Logo() {
  

  return (
    <LogoWrapper href="/">
      <LogoSignWrapper>
      <img height={80} alt="Governize" src='/governize2.png' />
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
