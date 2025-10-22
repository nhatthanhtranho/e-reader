"use client";

interface EditModeToggleProps {
  isEditMode?: boolean;
  setIsEditMode?: (v: boolean) => void;
}

export default function EditModeToggle({ isEditMode, setIsEditMode }: EditModeToggleProps) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <h3 className="text-lg font-bold m-0">Chỉnh sửa</h3>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" checked={isEditMode} onChange={(e) => setIsEditMode?.(e.target.checked)} className="sr-only peer" />
        <div className="w-12 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[rgb(var(--color-primary))] transition-all duration-200"></div>
        <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 peer-checked:translate-x-6"></div>
      </label>
    </div>
  );
}
