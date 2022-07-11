import { useState, useEffect } from "react";

export function useObjectUrl(initialObject = null) {
  const [objectURL, setObjectURL] = useState(null);
  const [object, setObject] = useState(initialObject);

  useEffect(() => {
    if (!object) return;

    const objectURL = URL.createObjectURL(object);
    setObjectURL(objectURL);

    return () => {
      URL.revokeObjectURL(objectURL);
      setObjectURL(null);
    };
  }, [object]);

  return {
    objectURL,
    object,
    setObject,
  };
}
