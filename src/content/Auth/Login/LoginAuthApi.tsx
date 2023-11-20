import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import axios from 'axios'; // Import axios

import {
  Box,
  Button,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';


const LoginAuthApi = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: 'demo@example.com',
      password: 'TokyoPass1@',
      terms: true,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .max(255)
        .required('Email is required'),
      password: Yup.string()
        .max(255)
        .required('Password is required'),
      terms: Yup.boolean().oneOf(
        [true],
        'You must agree to terms and conditions'
      )
    }),
    onSubmit: async (values, helpers) => {
      try {
        // Make a POST request to localhost API
        const response = await axios.post('http://localhost:8000/', {
          email: values.email,
          password: values.password,
          terms: values.terms
        });

        console.log(response.data);

        // Redirect to the specified route
        const backTo = (router.query.backTo as string) || '/dashboards/reports';
        router.push(backTo);
      } catch (err) {
        console.error(err);

        helpers.setStatus({ success: false });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          error={Boolean(formik.touched.email && formik.errors.email)}
          fullWidth
          helperText={formik.touched.email && formik.errors.email}
          label="Email address"
          placeholder="Your email address here..."
          margin="normal"
          name="email"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="email"
          value={formik.values.email}
          variant="outlined"
        />

        <TextField
          error={Boolean(formik.touched.password && formik.errors.password)}
          fullWidth
          helperText={formik.touched.password && formik.errors.password}
          label="Password"
          placeholder="Your password here..."
          margin="normal"
          name="password"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="password"
          value={formik.values.password}
          variant="outlined"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.terms}
              name="terms"
              color="primary"
              onChange={formik.handleChange}
            />
          }
          label={
            <Typography variant="body2">
              I accept the <a href="#">terms and conditions</a>.
            </Typography>
          }
        />

        {Boolean(formik.touched.terms && formik.errors.terms) && (
          <FormHelperText error>{formik.errors.terms}</FormHelperText>
        )}

        <Button
          type="submit"
          disabled={formik.isSubmitting}
          fullWidth
          variant="contained"
        >
          Sign in
        </Button>
      </form>
    </Box>
  );
};

export default LoginAuthApi;
