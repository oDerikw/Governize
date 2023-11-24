import {
  Box,
  Card,
  Tooltip,
  Typography,
  Container,
  Alert,
  styled
} from '@mui/material';
import Head from 'next/head';
import { useAuth } from 'src/hooks/useAuth';
import { Guest } from 'src/components/Guest';
import { LoginJWT } from 'src/content/Auth/Login/LoginJWT';
import BaseLayout from 'src/layouts/BaseLayout';
import Link from 'src/components/Link';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';
import Scrollbar from 'src/components/Scrollbar';

const icons = {
  Auth0: '/static/images/logo/auth0.svg',
  FirebaseAuth: '/static/images/logo/firebase.svg',
  JWT: '/static/images/logo/jwt.svg',
  Amplify: '/static/images/logo/amplify.svg'
};

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
    
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
  @media (min-width: ${theme.breakpoints.values.md}px) {
    padding: 0 0 0 440px;
  }
  width: 100%;
  display: flex;
  align-items: center;
`
);

const SidebarWrapper = styled(Box)(
  () => `
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    background: #0c3c44;
    width: 440px;
`
);

const SidebarContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(6)};
`
);

const CardImg = styled(Card)(
  ({ theme }) => `
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 1px solid ${theme.colors.alpha.black[10]};
    transition: ${theme.transitions.create(['border'])};
    position: absolute;

    &:hover {
      border-color: ${theme.colors.primary.main};
    }
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(33)};
    color: ${theme.colors.alpha.white[100]};
    
`
);


function LoginCover() {
  const { method } = useAuth() as any;
  const { t }: { t: any } = useTranslation();

  const router = useRouter();
  const { demo } = router.query;

  return (
    <>
      <Head>
        <title>Login - Governize</title>
      </Head>
      <Content>
        <SidebarWrapper
          sx={{
            display: { xs: 'none', md: 'flex' }
          }}
        >
          <Scrollbar>
            <SidebarContent>
              <Logo />
              <Box mt={6}>
                <TypographyH1
                  variant="h1"
                  textAlign="center"
                  sx={{
                    mb: 7
                  }}
                >
                  {t('Governize')}
                </TypographyH1>
                <Box
                  sx={{
                    position: 'relative',
                    width: 300,
                    height: 120
                  }}
                >
                  <Tooltip arrow placement="top" title="Auth0">
                    <CardImg
                      sx={{
                        width: 80,
                        height: 80,
                        left: -20,
                        top: -40
                      }}
                    >
                      <img width={40} alt="Auth0" src={icons['Auth0']} />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Firebase">
                    <CardImg
                      sx={{
                        width: 90,
                        height: 90,
                        left: 70
                      }}
                    >
                      <img
                        width={50}
                        alt="Firebase"
                        src={icons['FirebaseAuth']}
                      />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="JSON Web Token">
                    <CardImg
                      sx={{
                        width: 110,
                        height: 110,
                        top: -30,
                        left: 170
                      }}
                    >
                      <img width={80} alt="JSON Web Token" src={icons['JWT']} />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="AWS Amplify">
                    <CardImg
                      sx={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        right: -55
                      }}
                    >
                      <img width={50} alt="Amplify" src={icons['Amplify']} />
                    </CardImg>
                  </Tooltip>
                </Box>
                <Typography
                  variant="subtitle1"
                  color="common.white"
                  sx={{
                    my: 3
                  }}
                >
                  {t(
                    'At vero eos et atque corrupti quos dolores et quas provident, similique sunt in culpa qui id est laborum et dolorum fuga.'
                  )}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="common.white"
                  fontWeight="bold"
                >
                  {t('Lorem Text')}
                </Typography>
                <Typography variant="subtitle1" color="common.white">
                  {t(
                    'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id'
                  )}
                  . <Link href="/docs">Read docs</Link>
                </Typography>
              </Box>
            </SidebarContent>
          </Scrollbar>
        </SidebarWrapper>
        <MainContent>
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column'
            }}
            maxWidth="sm"
          >
            <Card
              sx={{
                p: 4,
                my: 4
              }}
            >
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Entrar')}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('Preencha os campos abaixo para logar na sua conta.')}
                </Typography>
              </Box>
              {method === 'JWT' && <LoginJWT />}
              <Box my={4}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('Ainda não tem uma conta?')}
                </Typography>{' '}
                <Link
                  href={
                    demo
                      ? `/auth/register/?demo=${demo}`
                      : '/auth/register/'
                  }
                >
                  <b>Se cadastre aqui</b>
                </Link>
              </Box>
              {method !== 'Auth0' && (
                <Tooltip
                  title={t('Usado apenas para demonstração!')}
                >
                  <Alert severity="warning">
                    Use <b>john@mail.com</b> e <b>changeme</b> como senha
                  </Alert>
                </Tooltip>
              )}
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
  );
}

LoginCover.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export default LoginCover;
