import { useCallback, useState } from "react";

export default function useConfirmPasswordVisible() {
    const [visibleConfirmPassword, setConfirmVisiblePassword] = useState(false);
    const toggleConfirmPasswordVisible = useCallback(() => {
      setConfirmVisiblePassword(visible => !visible);
    }, []);
    return {
      visibleConfirmPassword,
      toggleConfirmPasswordVisible
    };
  }