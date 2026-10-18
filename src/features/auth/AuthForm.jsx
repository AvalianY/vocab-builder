import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { PasswordField } from '../../components/PasswordField';
import { useNotification } from '../../components/Notification';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCredentials } from '../../redux/sessionSlice';
import {
  useLoginMutation,
  useRegisterMutation,
} from '../../services/api/authApi';
import { ROUTES } from '../../routes/routePaths';
import { storeToken } from '../../utils/authStorage';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import { AuthField } from './AuthField';
import { loginSchema, registerSchema } from './validation';
import './auth.css';

const AUTH_COPY = {
  login: {
    title: 'Login',
    description:
      'Please enter your login details to continue using our service:',
    submitLabel: 'Login',
    linkLabel: 'Register',
    linkTo: ROUTES.register,
    fallback: 'Unable to log in. Check your details and try again.',
  },
  register: {
    title: 'Register',
    description:
      'To start using our services, please fill out the registration form below. All fields are mandatory:',
    submitLabel: 'Register',
    linkLabel: 'Login',
    linkTo: ROUTES.login,
    fallback: 'Unable to create an account. Please try again.',
  },
};

export function AuthForm({ mode }) {
  const copy = AUTH_COPY[mode];
  const isRegister = mode === 'register';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [login, loginState] = useLoginMutation();
  const [register, registerState] = useRegisterMutation();
  const {
    formState: { dirtyFields, errors, submitCount, touchedFields },
    handleSubmit,
    register: registerField,
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
    mode: 'onTouched',
  });
  const isSubmitting = loginState.isLoading || registerState.isLoading;
  const isFieldValid = (name) =>
    Boolean(
      dirtyFields[name] &&
        (touchedFields[name] || submitCount > 0) &&
        !errors[name],
    );

  const onSubmit = async (values) => {
    try {
      const credentials = isRegister
        ? values
        : { email: values.email, password: values.password };
      const result = await (isRegister
        ? register(credentials).unwrap()
        : login(credentials).unwrap());

      storeToken(result.token);
      dispatch(setCredentials(result));
      navigate(ROUTES.dictionary, { replace: true });
    } catch (error) {
      notify(getApiErrorMessage(error, copy.fallback));
    }
  };

  return (
    <section className="auth-card" aria-labelledby={`${mode}-title`}>
      <div className="auth-card__intro">
        <h1 className="auth-card__title" id={`${mode}-title`}>
          {copy.title}
        </h1>
        <p className="auth-card__description">{copy.description}</p>
      </div>

      <form className="auth-form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-form__fields">
          {isRegister ? (
            <AuthField
              id="name"
              label="Name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              registration={registerField('name')}
              error={errors.name}
              valid={isFieldValid('name')}
            />
          ) : null}

          <AuthField
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            inputMode="email"
            registration={registerField('email')}
            error={errors.email}
            valid={isFieldValid('email')}
          />

          <PasswordField
            id="password"
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            registration={registerField('password')}
            error={errors.password}
            valid={isFieldValid('password')}
          />
        </div>

        <div className="auth-form__actions">
          <button
            className="auth-form__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {copy.submitLabel}
          </button>
          <Link className="auth-form__link" to={copy.linkTo}>
            {copy.linkLabel}
          </Link>
        </div>
      </form>
    </section>
  );
}
