"use client";

interface FontSelectorProps {
  fontFamily: string;
  setFontFamily: (f: string) => void;
}

export default function FontSelector({ fontFamily, setFontFamily }: FontSelectorProps) {
  return (
    <div className="mb-3 w-48">
      <h3 className="text-lg font-bold mb-3">Font chữ</h3>
      <select
        className="w-full p-2 rounded border"
        style={{ backgroundColor: "rgb(var(--color-bg))", color: "rgb(var(--color-text))", borderColor: "rgb(var(--color-border))" }}
        value={fontFamily}
        onChange={(e) => setFontFamily(e.target.value)}
      >
        <option value="raleway-unique">Raleway</option>
        <option value="open-sans-unique">Open Sans</option>
        <option value="playfair-display-regular">Playfair</option>
        <option value="montserrat-unique">Montserrat</option>
      </select>
    </div>
  );
}
