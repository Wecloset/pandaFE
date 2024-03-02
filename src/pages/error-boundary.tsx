import Error from "next/error";
import React, { ErrorInfo, ReactNode } from "react";

import { setModalProps } from "../types/modal-type";

interface Props {
  children: ReactNode;
  errorFallback: ReactNode;
  setModal?: setModalProps;
  reTryFn?: () => void;
}

interface State {
  hasError: boolean;
  axiosError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = {
      hasError: false,
      axiosError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: ErrorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });

    if (error.code === "ERR_BAD_REQUEST") {
      if (this.props.setModal)
        this.props.setModal({
          message: "네트워크 오류가 발생했습니다.",
          btnText: "다시시도",
          submitFn: () => {
            this.setState({ hasError: false });
            window.location.replace("/");
          },
        });
      this.setState({ axiosError: true });
    }
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.errorFallback;
    }

    // Return children components in case of no error
    return this.props.children;
  }
}
export default ErrorBoundary;
