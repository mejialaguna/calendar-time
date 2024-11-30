import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuthStore } from '../../hooks';
import { ShowHide } from './';
import { clearError } from '../../store';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const [form, setForm] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const { startLogin } = useAuthStore();

  const dispatch = useDispatch();

  const onFormSubmit = (event) => {
    event.preventDefault();
    startLogin({ ...form });
  };

  const clearResponseError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onInputChange = useCallback(
    ({ target }) => {
      const { name, value } = target;
      setForm({ ...form, [name]: value });
      clearResponseError();
    },
    [form, clearResponseError],
  );

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={onFormSubmit} className="space-y-4 md:space-y-6" action="#">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
          rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full
           p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required={true}
          onChange={onInputChange}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            placeholder="**********"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
            rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full
             p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            required={true}
            onChange={onInputChange}
          />

          <ShowHide
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4
         focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5
         py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700
         dark:focus:ring-primary-800">
        Sign in
      </button>
    </form>
  );
};
