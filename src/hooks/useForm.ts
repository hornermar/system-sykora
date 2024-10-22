import { useEffect, useCallback } from "react";
import { FormValues } from "../types/FormValues";
import { useStep } from "./useStep";
import { rulesItems } from "../lib/formItems";
import { Rule } from "../types/Rule";
import { map } from "lodash";
import { useLocalStorage } from "./useLocalStorage";

const validateStep = (form: FormValues, activeStep: number) => {
  const { rows, columns, coefficient, rule } = form;

  if ((rows === 0 || columns === 0) && activeStep > 1) {
    return 1;
  } else if (!coefficient && activeStep > 3) {
    return 3;
  } else if (rule === null && activeStep > 4) {
    return 4;
  }

  return activeStep;
};

const isNumber = (value: unknown): boolean => {
  return typeof value === "number" && !isNaN(value);
};

const getValidNumber = (value: unknown, defaultValue: number) =>
  isNumber(value) ? Number(value) : defaultValue;

const getValidFormValues = (values: FormValues): FormValues => {
  const { coefficient, rule, rows, columns } = values;

  return {
    rows: getValidNumber(rows, defaultFormValues.rows),
    columns: getValidNumber(columns, defaultFormValues.columns),
    coefficient:
      isNumber(coefficient) && coefficient > 0 && coefficient < 4
        ? coefficient
        : defaultFormValues.coefficient,
    rule: rule !== null && rules.includes(rule) ? rule : null,
  };
};

const defaultFormValues: FormValues = {
  coefficient: 0,
  rule: null,
  rows: 0,
  columns: 0,
};

const rules = map(rulesItems, (rule: Rule) => rule.code);

export const useForm = () => {
  const [form, setForm] = useLocalStorage<FormValues>(
    "formValues",
    getValidFormValues(defaultFormValues)
  );

  const { activeStep, onStepChange } = useStep();

  // Validate step on mount (if some values are missing)
  useEffect(() => {
    const validStep = validateStep(form, activeStep);
    if (activeStep !== validStep) {
      onStepChange(validStep);
    }
  }, []);

  const onFormChange = useCallback(
    (newFormValues: Partial<FormValues>) => {
      const updatedForm = {
        ...form,
        ...newFormValues,
      };

      setForm(updatedForm);
    },
    [form, setForm]
  );

  return {
    form,
    activeStep,
    onFormChange,
    defaultFormValues,
  };
};
