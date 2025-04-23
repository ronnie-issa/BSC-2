import { useContentfulProducts } from "@/contexts/ContentfulProductsProvider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";

/**
 * A component that allows toggling between preview and published content
 */
const PreviewToggle = () => {
  const { previewMode, setPreviewMode } = useContentfulProducts();

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
      <EyeIcon className="h-4 w-4" />
      <Label htmlFor="preview-mode" className="text-sm cursor-pointer">
        Preview Mode
      </Label>
      <Switch
        id="preview-mode"
        checked={previewMode}
        onCheckedChange={setPreviewMode}
        aria-label="Toggle preview mode"
      />
    </div>
  );
};

export default PreviewToggle;
