import { useCallback, useState } from 'react';
import { useAuthStore } from '../../hooks';
import { ShowHide } from './ShowHide';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegisterForm = ({ setError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);

  const { startNewAccount } = useAuthStore();

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (form?.password !== form?.confirmPassword) {
      setError('Please make sure passwords match');
      return;
    }

    const bodyForm = {
      email: form?.email,
      password: form?.password,
      username: form?.username,
    };

    startNewAccount({ ...bodyForm });
  };

  const onInputChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
      setError('');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form],
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="space-y-4 md:space-y-6" action="#" onSubmit={onFormSubmit}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          className="bg-gray-50 border border-gray-300 text-gray-900
           sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
            block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
            dark:placeholder-gray-400 dark:text-white
             dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Username"
          required={true}
          onChange={onInputChange}
        />
      </div>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          className="bg-gray-50 border border-gray-300 text-gray-900
           sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
           block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required={true}
          onChange={onInputChange}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            placeholder="******"
            className="bg-gray-50 border border-gray-300 text-gray-900
             sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5
              focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500"
            required={true}
            onChange={onInputChange}
          />

          <ShowHide showPassword={showPassword} togglePasswordVisibility={togglePasswordVisibility} />
        </div>
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Confirm Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={form.confirmPassword}
          placeholder="*****"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
          rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full
           p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required={true}
          onChange={onInputChange}
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700
         focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg
         text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Create an account
      </button>
    </form>
  );
};
