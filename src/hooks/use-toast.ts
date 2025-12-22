import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
};

const toast = (props: ToastProps) => {
  if (props.variant === "destructive") {
    sonnerToast.error(props.title, {
      description: props.description,
    });
  } else if (props.title) {
     if (typeof props.title !== 'string' || (props.description && typeof props.description !== 'string')) {
        sonnerToast(props.title, {
            description: props.description  as React.ReactNode,
        });
     } else {
        sonnerToast.success(props.title, {
            description: props.description as string,
        });
     }
  }
};

// The useToast hook is simplified to just export the toast function.
// The complex reducer and state management is no longer needed
// as sonner handles it internally.
function useToast() {
  return {
    toast,
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  };
}

export { useToast, toast };
