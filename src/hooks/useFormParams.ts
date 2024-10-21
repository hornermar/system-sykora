import { useEffect } from "react";
import { FormValues } from "../types/FormValues";
import { rulesItems } from "../lib/formItems";
import { Rule } from "../types/Rule";
import { map } from "lodash";
import { useNavigate, useLocation } from "react-router-dom";

const rules = map(rulesItems, (rule: Rule) => rule.code);

const getFormValuesFromParams = (searchParams: URLSearchParams): FormValues => {
  const coefficient = parseFloat(searchParams.get("coefficient") || "");
  const rule = searchParams.get("rule");
  const parsedRule = rule === null || rule === "" ? null : Number(rule);

  const rows = parseInt(searchParams.get("rows") || "", 10);
  const columns = parseInt(searchParams.get("columns") || "", 10);

  return {
    rows: !isNaN(rows) ? rows : defaultFormValues.rows,
    columns: !isNaN(columns) ? columns : defaultFormValues.rows,
    coefficient:
      !isNaN(coefficient) && coefficient > 0 && coefficient < 4
        ? coefficient
        : defaultFormValues.coefficient,
    rule: parsedRule !== null && rules.includes(parsedRule) ? parsedRule : null,
  };
};

const getValidParams = (values: FormValues, activeStep: number) => {
  const { rows, columns, coefficient, rule } = values;

  let step = activeStep;

  if (rows === 0 || (columns === 0 && activeStep > 1)) {
    step = 1;
  } else if (!coefficient && activeStep > 3) {
    step = 3;
  } else if (rule === null && activeStep > 4) {
    step = 4;
  }

  const params = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      value !== null ? value?.toString() : "",
    ])
  );

  return { step: !isNaN(step) ? step.toString() : "0", ...params };
};

const defaultFormValues: FormValues = {
  coefficient: 0,
  rule: null,
  rows: 0,
  columns: 0,
};

export const useFormParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const form = getFormValuesFromParams(searchParams);

  const activeStep = parseInt(searchParams.get("step") || "", 10);

  useEffect(() => {
    const params = getValidParams(form, activeStep);
    navigate(
      { search: `?${new URLSearchParams(params).toString()}` },
      { replace: true }
    );
  }, []);

  const onFormChange = (newFormValues: Partial<FormValues>) => {
    const updatedForm = {
      ...form,
      ...newFormValues,
    };

    const params = getValidParams(updatedForm, activeStep);
    navigate(
      { search: `?${new URLSearchParams(params).toString()}` },
      {
        replace: true,
      }
    );
  };

  const handleStepChange = (step: number) => {
    searchParams.set("step", step.toString());
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return {
    form,
    activeStep,
    onFormChange,
    handleStepChange,
    defaultFormValues,
  };
};
