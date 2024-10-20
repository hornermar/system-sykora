import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FormValues } from "../types/FormValues";
import { rulesItems } from "../lib/formItems";
import { Rule } from "../types/Rule";
import { map } from "lodash";

const rules = map(rulesItems, (rule: Rule) => rule.code);

const getFormValuesFromParams = (searchParams: URLSearchParams): FormValues => {
  const coefficient = parseFloat(searchParams.get("coefficient") || "");
  const rule = searchParams.get("rule");
  const parsedRule = rule === null || rule === "" ? null : Number(rule);

  const rows = parseInt(searchParams.get("rows") || "", 10);
  const columns = parseInt(searchParams.get("columns") || "", 10);

  return {
    coefficient:
      !isNaN(coefficient) && coefficient > 0 && coefficient < 4
        ? coefficient
        : defaultFormValues.coefficient,
    rule: parsedRule !== null && rules.includes(parsedRule) ? parsedRule : null,
    rows: !isNaN(rows) ? rows : defaultFormValues.rows,
    columns: !isNaN(columns) ? columns : defaultFormValues.rows,
  };
};

const getValidParams = (values: FormValues, activeStep: number) => {
  const params = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value !== null ? value?.toString() : "",
    ])
  );

  return { step: !isNaN(activeStep) ? activeStep.toString() : "1", ...params };
};

const defaultFormValues: FormValues = {
  coefficient: 0,
  rule: null,
  rows: 0,
  columns: 0,
};

export const useFormParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const form = getFormValuesFromParams(searchParams);

  const activeStep = parseInt(searchParams.get("step") || "", 10);

  useEffect(() => {
    const params = getValidParams(form, activeStep);
    setSearchParams(params);
  }, []);

  const onFormChange = (newFormValues: Partial<FormValues>) => {
    const updatedForm = {
      ...form,
      ...newFormValues,
    };

    const params = getValidParams(updatedForm, activeStep);

    setSearchParams(params);
  };

  const handleStepChange = (step: number) => {
    setSearchParams((prevParams) => ({
      ...Object.fromEntries(prevParams),
      step: step.toString(),
    }));
  };

  return {
    form,
    activeStep,
    onFormChange,
    handleStepChange,
    defaultFormValues,
  };
};
