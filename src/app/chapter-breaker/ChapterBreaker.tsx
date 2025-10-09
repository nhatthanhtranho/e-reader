'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as mammoth from 'mammoth';

let pdfjsLib: any = null;

export default function ChapterBreaker() {
  const [file, setFile] = useState<File | null>(null);
  const [wordLimit, setWordLimit] = useState(1000);
  const [chapters, setChapters] = useState<{ title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (typeof window === 'undefined') return;
      const lib = await import('pdfjs-dist/build/pdf');
      pdfjsLib = lib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';
    })();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    if (!pdfjsLib) throw new Error('PDFJS chưa sẵn sàng.');

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const lines: Record<number, string[]> = {};
      content.items.forEach((item: any) => {
        const y = Math.round(item.transform[5]);
        if (!lines[y]) lines[y] = [];
        lines[y].push(item.str);
      });
      const sortedY = Object.keys(lines).map(Number).sort((a, b) => b - a);
      const pageText = sortedY.map((y) => lines[y].join('')).join('\n');
      fullText += pageText + '\n\n';
    }
    return fullText;
  };

  const extractTextFromWord = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value; // trả về text giữ line breaks
  };

  const splitByWordCount = (text: string, wordsPerChapter: number) => {
    const words = text.match(/\S+\s*/g) || [];
    const chunks: string[] = [];
    let buffer = '';
    let count = 0;
    for (const w of words) {
      buffer += w;
      count += 1;
      if (count >= wordsPerChapter) {
        chunks.push(buffer);
        buffer = '';
        count = 0;
      }
    }
    if (buffer) chunks.push(buffer);
    return chunks;
  };

  const handleProcess = async () => {
    if (!file) return alert('Chưa chọn file!');
    setLoading(true);
    try {
      let text = '';
      if (file.name.endsWith('.pdf')) {
        text = await extractTextFromPDF(file);
      } else if (file.name.endsWith('.docx')) {
        text = await extractTextFromWord(file);
      } else {
        throw new Error('Chỉ hỗ trợ PDF và DOCX');
      }
      const parts = splitByWordCount(text, wordLimit);
      setChapters(parts.map((c, i) => ({ title: `Chương ${i + 1}`, content: c })));
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (chapters.length === 0) return alert('Không có chương nào để export!');
    const zip = new JSZip();
    const mapping: Record<string, string> = {};
    chapters.forEach((ch, i) => {
      const fileName = `chapter_${i + 1}.txt`;
      mapping[ch.title] = fileName;
      zip.file(fileName, ch.content);
    });
    zip.file('mapping.json', JSON.stringify(mapping, null, 2));
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'chapters.zip');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-2">📖 Chapter Breaker</h1>

      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="border p-2 w-full" />

      <input
        type="number"
        value={wordLimit}
        onChange={(e) => setWordLimit(parseInt(e.target.value))}
        className="border p-2 w-full"
        placeholder="Số lượng từ mỗi chương"
      />

      <button
        onClick={handleProcess}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full disabled:opacity-50"
      >
        {loading ? '⏳ Đang xử lý...' : '🪄 Tách chương'}
      </button>

      {chapters.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold mt-4">Danh sách chương:</h2>
          {chapters.map((ch, i) => (
            <div key={i} className="border p-2 rounded">
              <input
                className="border-b w-full text-lg font-medium"
                value={ch.title}
                onChange={(e) => {
                  const updated = [...chapters];
                  updated[i].title = e.target.value;
                  setChapters(updated);
                }}
              />
              <pre className="text-gray-600 text-sm max-h-32 overflow-auto whitespace-pre-wrap">{ch.content}</pre>
            </div>
          ))}
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full mt-2"
          >
            💾 Export ZIP (TXT + JSON)
          </button>
        </div>
      )}
    </div>
  );
}
