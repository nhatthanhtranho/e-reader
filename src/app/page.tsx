"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Settings from "./components/Settings";
import { useSettings } from "@/context/SettingContext";

// Outer wrapper for background & padding
const Layout = styled.div<{ theme: "light" | "dark" | string }>`
  margin: 0 auto;
  background-color: ${(props) =>
    props.theme === "dark" ? "#1a1a1a" : "#fafafa"};
  color: ${(props) => (props.theme === "dark" ? "#f3f4f6" : "#1e2939")};
  padding: 1rem;
  border-radius: 0.5rem;
`;

// Content block with dynamic width & font size
const Content = styled.div<{ fontSize: number; width: number }>`
  width: ${(props) => props.width}%;
  margin: 0 auto;
  font-size: ${(props) => props.fontSize}px;
`;

export default function Home() {
  const [content, setContent] = useState<string>("");
  const { fontSize, theme, width } = useSettings();

  useEffect(() => {
    fetch("/kinh-phat/kinh-quan-the-am-bo-tat-tho-ky/chapter_1.txt")
      .then((res) => {
        if (!res.ok) throw new Error("Chapter not found");
        return res.text();
      })
      .then((text) => setContent(text))
      .catch(console.error);
  }, []);

  return (
    <Layout theme={theme}>
      <Content fontSize={fontSize} width={width}>
        {content}
      </Content>
      <Settings />
    </Layout>
  );
}
