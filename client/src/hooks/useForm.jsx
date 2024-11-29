/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
import { useEffect, useState, useMemo } from 'react';

export const useForm = (modalInitialState) => {
  const [formState, setFormState] = useState(modalInitialState);
  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    createValidators();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(modalInitialState);
  }, [modalInitialState]);
  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckedValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField];

      formCheckedValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,

    ...formValidation,
    isFormValid,
  };
};
