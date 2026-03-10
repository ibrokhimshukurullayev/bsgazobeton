const isPlainObject = (value) =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const addAliases = (target, key, value) => {
  const lowerKey = key.toLowerCase();
  if (!(lowerKey in target)) {
    target[lowerKey] = value;
  }

  if (key === "isSuccess" && !("success" in target)) {
    target.success = value;
  }

  if (key === "isFailure" && !("failure" in target)) {
    target.failure = value;
  }

  if (key === "message" && !("description" in target)) {
    target.description = value;
  }
};

const normalizeValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (!isPlainObject(value)) {
    return value;
  }

  const normalized = {};

  Object.entries(value).forEach(([key, nestedValue]) => {
    const normalizedNestedValue = normalizeValue(nestedValue);
    normalized[key] = normalizedNestedValue;
    addAliases(normalized, key, normalizedNestedValue);
  });

  return normalized;
};

export const normalizeApiPayload = (payload) => normalizeValue(payload);
