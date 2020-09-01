import { useEffect } from "react";

const useOutsideClick = (ref: any, callback: () => void) => {
  const handleClick = ({ target }: Event) => {
    if (ref.current && !ref.current.contains(target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;