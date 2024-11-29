import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RegisterForm } from '../../calendar/component';
import { useAuthStore } from '../../hooks';

export const RegisterPage = () => {
  const [error, setError] = useState(null);

  const { errorMessage } = useAuthStore();

  useEffect(() => {
    setError(errorMessage);
  }, [errorMessage]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 animate-fadeIn">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              New Account
            </h1>
            <hr style={{ marginTop: 8 }} />
            {error && (
              <p className="mt-2 text-sm text-red-500 dark:text-red-400 font-bold animate__bounceIn">
                {error.toUpperCase()}
              </p>
            )}
            <RegisterForm setError={setError} />
            <hr />
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <Link
                to="/auth/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
