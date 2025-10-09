/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

let pdfjsLib: any = null;

export default function ChapterBreaker() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [wordLimit, setWordLimit] = useState(1000);
  const [chapters, setChapters] = useState<{ title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(false);

  // --- import pdfjs client-side only
  useEffect(() => {
    (async () => {
      if (typeof window === 'undefined') return;
      const lib = await import('pdfjs-dist/build/pdf');
      pdfjsLib = lib;
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js'; // file worker đặt trong /public/pdfjs
    })();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPdfFile(file);
  };

  // --- extract text giữ nguyên xuống dòng + list
  const extractTextFromPDF = async (file: File): Promise<string> => {
    if (!pdfjsLib) throw new Error('PDFJS chưa sẵn sàng. Vui lòng chờ 1 giây.');

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      // Nhóm text theo tọa độ Y (dòng)
      const lines: Record<number, string[]> = {};
      content.items.forEach((item: any) => {
        const y = Math.round(item.transform[5]);
        if (!lines[y]) lines[y] = [];
        lines[y].push(item.str);
      });

      // Sắp xếp từ trên xuống
      const sortedY = Object.keys(lines)
        .map(Number)
        .sort((a, b) => b - a);

      const pageText = sortedY.map((y) => lines[y].join('')).join('\n');

      // Giữ line trống giữa các trang
      fullText += pageText + '\n\n';
    }

    return fullText;
  };

  // --- split theo số từ nhưng giữ format line
  const splitByWordCount = (text: string, wordsPerChapter: number) => {
    // match \S+ plus whitespace để giữ khoảng trắng và newline
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
    if (!pdfFile) return alert('Chưa chọn file PDF!');
    setLoading(true);
    try {
      const text = await extractTextFromPDF(pdfFile);
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

      <input type="file" accept="application/pdf" onChange={handleFileChange} className="border p-2 w-full" />

      <input
        type="number"
        value={wordLimit}
        onChange={(e) => setWordLimit(parseInt(e.target.value))}
        className="border p-2 w-full"
        placeholder="Số lượng từ mỗi chương (mặc định 1000)"
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
