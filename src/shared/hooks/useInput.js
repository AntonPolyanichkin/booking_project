const { useState, useCallback } = require("react");

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const clearInput = useCallback(() => {
    setValue("");
  }, []);
  return {
    value,
    onChange: handleChange,
    clearInput,
  };
}
