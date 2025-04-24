import { useState } from "react";
import { useContentfulProducts } from "@/contexts/ContentfulProductsProvider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { EyeIcon, ChevronUpIcon } from "lucide-react";

/**
 * A component that allows toggling between preview and published content
 * Now with a collapsed state to be less intrusive
 */
const PreviewToggle = () => {
  const { previewMode, setPreviewMode } = useContentfulProducts();
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white ${
        isCollapsed ? "p-2" : "p-3"
      } rounded-lg shadow-lg z-50 flex items-center gap-2 transition-all duration-300 cursor-pointer`}
      onClick={() => isCollapsed && setIsCollapsed(false)}
    >
      {isCollapsed ? (
        <EyeIcon className="h-4 w-4" />
      ) : (
        <>
          <EyeIcon className="h-4 w-4" />
          <Label htmlFor="preview-mode" className="text-sm cursor-pointer">
            Preview Mode
          </Label>
          <Switch
            id="preview-mode"
            checked={previewMode}
            onCheckedChange={(checked) => {
              // Only allow enabling preview mode with explicit confirmation
              if (checked && !previewMode) {
                if (
                  window.confirm(
                    "Enable preview mode? This may cause performance issues."
                  )
                ) {
                  setPreviewMode(true);
                }
              } else {
                setPreviewMode(checked);
              }
            }}
            aria-label="Toggle preview mode"
            onClick={(e) => e.stopPropagation()}
          />
          <ChevronUpIcon
            className="h-4 w-4 ml-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default PreviewToggle;
