import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        icon,
        ...props
      }) {
        return (
          <Toast key={id} {...props} className="w-full">
            <div className="container mx-auto text-center px-4">
              {icon && <span className="inline-block mr-2">{icon}</span>}
              <span className="inline-flex flex-col items-center justify-center">
                {title && (
                  <ToastTitle className="font-bold text-sm">{title}</ToastTitle>
                )}
                {description && (
                  <ToastDescription className="text-black/80 text-sm">
                    {description}
                  </ToastDescription>
                )}
              </span>
              {action && <span className="ml-2">{action}</span>}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
