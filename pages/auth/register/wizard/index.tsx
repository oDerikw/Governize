import { useState, Children } from 'react';
import {
  Typography,
  Container,
  Button,
  Card,
  CircularProgress,
  Grid,
  Box,
  Step,
  StepLabel,
  Stepper,
  Avatar,
  styled
} from '@mui/material';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';
import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import * as Yup from 'yup';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { Guest } from 'src/components/Guest';
import Link from 'src/components/Link';

import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import Logo from 'src/components/LogoSign';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    overflow: auto;
    flex: 1;
`
);

const BoxActions = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]}
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      margin-left: auto;
      margin-right: auto;

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const sleep = (time: number) => new Promise((acc) => setTimeout(acc, time));

function RegisterWizard() {
  const { t }: { t: any } = useTranslation();

  return (
    <>
      <Head>
        <title>Cadastro - Governize</title>
      </Head>
      <MainContent>
        <Container
          sx={{
            my: 4
          }}
          maxWidth="md"
        >
          <Logo />
          <Card
            sx={{
              mt: 3,
              pt: 4
            }}
          >
            <Box px={4}>
              <Typography
                variant="h2"
                sx={{
                  mb: 1
                }}
              >
                {t('Criar Conta')}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3
                }}
              >
                {t('Preencha os campos abaixo para criar sua conta.')}
              </Typography>
            </Box>

            <FormikStepper
              initialValues={{
                first_name: '',
                last_name: '',
                terms: true,
                promo: true,
                password: '',
                password_confirm: '',
                email: '',
                phone: '',
                company_name: '',
                company_size: '',
                company_role: ''
              }}
              onSubmit={async (_values) => {
                await sleep(3000);
              }}
            >
              <FormikStep
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email(
                      t('O endereço de e-mail deve ser um e-mail válido')
                    )
                    .max(255)
                    .required(t('O espaço de e-mail é obrigatório')),
                  first_name: Yup.string()
                    .max(255)
                    .required(t('O espaço do primeiro nome é obrigatório')),
                  last_name: Yup.string()
                    .max(255)
                    .required(t('O espaço do último nome é obrigatório')),
                  password: Yup.string()
                    .min(8)
                    .max(255)
                    .required(t('O espaço da senha é obrigatório')),
                  password_confirm: Yup.string()
                    .oneOf(
                      [Yup.ref('password')],
                      t('Ambas as senhas devem ser iguais')
                    )
                    .required(t('Esse campo é obrigatório'))
                })}
                label={t('Informações')}
              >
                <Box p={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="first_name"
                        component={TextField}
                        label={t('Primeiro Nome')}
                        placeholder={t('Escreva seu nome aqui...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="last_name"
                        component={TextField}
                        label={t('Último Nome')}
                        placeholder={t('Escreva seu nome aqui...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="email"
                        component={TextField}
                        label={t('E-mail')}
                        placeholder={t('Escreva seu e-mail aqui...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} />
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        type="password"
                        name="password"
                        component={TextField}
                        label={t('Senha')}
                        placeholder={t('Escreva sua senha aqui...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        type="password"
                        name="password_confirm"
                        component={TextField}
                        label={t('Confirmação de Senha')}
                        placeholder={t('Confirme sua senha aqui...')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="phone"
                        type="number"
                        component={TextField}
                        label={t('Número de telefone')}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>

              <FormikStep
                validationSchema={Yup.object().shape({
                  company_size: Yup.string()
                    .max(55)
                    .required(t('The first name field is required')),
                  company_name: Yup.string()
                    .max(255)
                    .required(t('The first name field is required')),
                  company_role: Yup.string()
                    .max(255)
                    .required(t('The first name field is required'))
                })}
                label={t('Detalhes da empresa')}
              >
                <Box p={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_name"
                        component={TextField}
                        label={t('Company name')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_size"
                        type="number"
                        component={TextField}
                        label={t('Company size')}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_role"
                        component={TextField}
                        label={t('Company role')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="promo"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        Label={{
                          label: t(
                            'Sim, quero receber e-mails sobre x/y/z da Governize sobre...'
                          )
                        }}
                      />
                      <br />
                      <Field
                        name="terms"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        Label={{
                          label: (
                            <Typography variant="body2">
                              {t('Eu aceito os')}{' '}
                              <Link href="#">{t('termos e condições')}</Link>.
                            </Typography>
                          )
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>

              <FormikStep label={t('Cadastro realizado com sucesso')}>
                <Box px={4} py={8}>
                  <Container maxWidth="sm">
                    <AvatarSuccess>
                      <CheckTwoToneIcon />
                    </AvatarSuccess>

                    <Typography
                      align="center"
                      sx={{
                        pt: 5,
                        pb: 4,
                        lineHeight: 1.5,
                        px: 10
                      }}
                      variant="h2"
                    >
                      {t(
                        'Verifique seu endereço de e-mail para confirmar seu cadastro.'
                      )}
                    </Typography>

                    <Button fullWidth variant="contained" href="/">
                      Entrar
                    </Button>
                  </Container>
                </Box>
              </FormikStep>
            </FormikStepper>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({
  children,
  ...props
}: FormikConfig<FormikValues>) {
  const childrenArray = Children.toArray(
    children
  ) as ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const { t }: { t: any } = useTranslation();

  function isLastStep() {
    return step === childrenArray.length - 2;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
          setStep((s) => s + 1);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}
          {!completed ? (
            <BoxActions
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                disabled={isSubmitting || step === 0}
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => setStep((s) => s - 1)}
              >
                {t('Previous')}
              </Button>

              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? t('Submitting')
                  : isLastStep()
                  ? t('Complete registration')
                  : t('Next step')}
              </Button>
            </BoxActions>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}

RegisterWizard.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export default RegisterWizard;
