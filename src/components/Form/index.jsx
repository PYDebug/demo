import React, {
  createContext,
  cloneElement,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { getErrorRule } from './utils';
import styles from './index.module.scss';

const FormContext = createContext({
  formValueDispatch: () => {},
  formValidateDispatch: () => {},
  getField: () => {},
});

const formValueReducer = function (state, action) {
  switch (action.type) {
    case 'change':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const formValidateReducer = function (state, action) {
  switch (action.type) {
    case 'register':
      return {
        ...state,
        [action.payload.name]: {
          rules: action.payload.rules,
          validate: action.payload.validate,
        },
      };
    default:
      return state;
  }
};

function Form(props) {
  const { onSubmit, onError } = props;
  const [values, formValueDispatch] = useReducer(formValueReducer, {});
  const [validators, formValidateDispatch] = useReducer(
    formValidateReducer,
    {},
  );

  const getField = useCallback(
    (field) => {
      return values[field];
    },
    [values],
  );

  const handleSubmit = useCallback(
    (e) => {
      const errorRules = [];
      Object.keys(validators).forEach((name) => {
        const rule = validators[name]?.validate(
          validators[name].rules,
          values[name],
          getField,
        );
        if (rule) {
          errorRules.push({ [name]: rule.message });
        }
      });
      if (!errorRules.length) {
        onSubmit && onSubmit(values);
      } else {
        onError && onError(errorRules);
      }
      e.preventDefault();
    },
    [onSubmit, onError, values, validators, getField],
  );

  return (
    <FormContext.Provider
      value={{ formValueDispatch, formValidateDispatch, getField }}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        {props.children}
      </form>
    </FormContext.Provider>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node,
};

function FormItem(props) {
  const { name, rules, className } = props;
  const { formValueDispatch, formValidateDispatch, getField } =
    useContext(FormContext);
  const [error, setError] = useState('');

  // 向外层Form容器注册当前字段校验器
  useEffect(() => {
    formValidateDispatch({
      type: 'register',
      payload: {
        name,
        rules,
        validate,
      },
    });
  }, [formValidateDispatch, name, rules]);

  const validate = (_rules, _value, _getField) => {
    const errorRule = getErrorRule(_rules, _value, { getField: _getField });
    if (errorRule) {
      setError(errorRule.message || '校验错误');
    } else {
      setError('');
    }
    return errorRule;
  };

  const handleFormChange = useCallback(
    (value) => {
      validate(rules, value, getField);
      formValueDispatch({
        type: 'change',
        payload: {
          [name]: value,
        },
      });
    },
    [rules, getField, formValueDispatch, name],
  );

  const childNode = cloneElement(props.children, {
    ...props.children.props,
    onChange: handleFormChange,
  });

  return (
    <div className={`${styles.item} ${className}`}>
      {childNode}
      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  );
}

FormItem.propTypes = {
  name: PropTypes.string,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      required: PropTypes.bool,
      maxLen: PropTypes.number,
      pattern: PropTypes.instanceOf(RegExp),
      message: PropTypes.string,
    }),
  ),
  className: PropTypes.string,
  children: PropTypes.element,
};

Form.Item = FormItem;

export default Form;
