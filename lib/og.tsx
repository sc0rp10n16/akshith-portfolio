import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function clip(text: string, max: number): string {
  if (text.length <= max) {
    return text;
  }
  const sliced = text.slice(0, max - 1);
  const space = sliced.lastIndexOf(" ");
  const base = space > 40 ? sliced.slice(0, space) : sliced;
  return `${base}…`;
}

function titleSize(title: string, withPortrait: boolean): number {
  const budget = withPortrait ? 28 : 42;
  if (title.length <= budget) {
    return withPortrait ? 68 : 80;
  }
  if (title.length <= budget + 24) {
    return withPortrait ? 52 : 60;
  }
  return withPortrait ? 42 : 48;
}

export async function renderOgImage({
  eyebrow,
  title,
  description,
  showPortrait = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  showPortrait?: boolean;
}) {
  const [regular, bold, portrait] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/PixelOperator.ttf")),
    readFile(join(process.cwd(), "app/fonts/PixelOperator-Bold.ttf")),
    showPortrait
      ? readFile(join(process.cwd(), "public/akshith_potrait.png"))
      : Promise.resolve(null),
  ]);

  const portraitSrc = portrait
    ? `data:image/png;base64,${portrait.toString("base64")}`
    : null;
  const summary = description ? clip(description, showPortrait ? 120 : 160) : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0d0b",
          color: "#ece6d8",
          padding: "64px 72px",
          fontFamily: "Pixel",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#7eb4ff",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 28, height: 4, background: "#7eb4ff" }} />
          {eyebrow}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              width: showPortrait ? 700 : 1040,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: titleSize(title, showPortrait),
                fontWeight: 700,
                lineHeight: 1.08,
              }}
            >
              {title}
            </div>
            {summary ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  lineHeight: 1.35,
                  color: "#a39d90",
                }}
              >
                {summary}
              </div>
            ) : null}
          </div>
          {portraitSrc ? (
            <img
              src={portraitSrc}
              alt=""
              width={280}
              height={400}
              style={{
                objectFit: "cover",
                objectPosition: "50% 12%",
                border: "1px solid rgba(236, 230, 216, 0.28)",
              }}
            />
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8a8479",
          }}
        >
          <div>{site.name}</div>
          <div>akshithmysa.com</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Pixel", data: regular, weight: 400, style: "normal" },
        { name: "Pixel", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
