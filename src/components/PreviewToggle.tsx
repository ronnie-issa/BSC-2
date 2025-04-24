import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { EyeIcon } from 'lucide-react';
import { useContentfulProducts } from '../contexts/ContentfulProductsProvider';

const PreviewToggle = () => {
  const { previewMode, setPreviewMode } = useContentfulProducts();
  const [isOpen, setIsOpen] = useState(false);

  const handleTogglePreview = () => {
    if (!previewMode) {
      // If turning preview mode on, show confirmation dialog
      document.getElementById('preview-confirm-trigger')?.click();
    } else {
      // If turning preview mode off, just do it
      setPreviewMode(false);
    }
  };

  const confirmEnablePreview = () => {
    setPreviewMode(true);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
      >
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full bg-black border-white/20 hover:bg-black/90"
          >
            <EyeIcon className="h-4 w-4 text-white" />
            <span className="sr-only">Toggle preview mode</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 w-[240px]">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Preview Mode</span>
            <Switch
              checked={previewMode}
              onCheckedChange={handleTogglePreview}
              className="data-[state=checked]:bg-white data-[state=checked]:text-black"
            />
          </div>
          <p className="text-xs text-white/70 mt-2">
            {previewMode
              ? "You're viewing draft content. Changes may not be published yet."
              : "Enable to see unpublished content."}
          </p>
        </CollapsibleContent>
      </Collapsible>

      {/* Hidden trigger for the confirmation dialog */}
      <AlertDialog>
        <AlertDialogTrigger id="preview-confirm-trigger" className="hidden">
          Open
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Enable Preview Mode?</AlertDialogTitle>
            <AlertDialogDescription>
              Preview mode will show unpublished content from Contentful. This is intended for testing only and may show content that isn't ready for production.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEnablePreview}>
              Enable Preview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PreviewToggle;
