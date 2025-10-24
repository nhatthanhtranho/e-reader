"use client";
import Settings from "@/components/Settings";
import ListOfChapter from "@/components/ListOfChapter";
import { Metadata } from "../../../types/Metadata";
import ChapterNavigation from "../ChapterNavigation";

interface Props {
  nextPath?: string | null;
  prevPath?: string | null;
  metadata: Metadata | null;
  isOpenList: boolean;
  setIsOpenList: (v: boolean) => void;
  isEditMode?: boolean
  setIsEditMode?: (v: boolean) => void;
}

export default function ChapterHeader({
  nextPath,
  prevPath,
  metadata,
  isOpenList,
  setIsOpenList,
  isEditMode,
  setIsEditMode
}: Props) {
  return (
    <>
      <Settings
        nextLink={nextPath}
        prevLink={prevPath}
        setIsOpenListOfChapter={setIsOpenList}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
      <ChapterNavigation
        nextPath={nextPath}
        prevPath={prevPath}
      />
      <ListOfChapter
        chapters={metadata?.chapters || []}
        slug={metadata?.slug || ''}
        isOpen={isOpenList}
        setIsOpen={setIsOpenList}
      />
    </>
  );
}
