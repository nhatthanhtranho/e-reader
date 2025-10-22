export interface SettingsProps {
    nextLink?: string | null;
    prevLink?: string | null;
    setIsOpenListOfChapter?: (open: boolean) => void;
    isEditMode?: boolean;
    setIsEditMode?: (v: boolean) => void;
  }