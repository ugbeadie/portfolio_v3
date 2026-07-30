import { ImageResponse } from "next/og";

export const alt = "Ugbe Adie — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#ffffff",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: 6,
            color: "#a0a0a0",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: "#a87ffb",
            }}
          />
          SOFTWARE DEVELOPER
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 700,
              letterSpacing: -4,
            }}
          >
            UGBE ADIE
          </div>
          <div
            style={{
              display: "flex",
              width: 120,
              height: 6,
              background: "#a87ffb",
              marginTop: 28,
              marginBottom: 28,
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 32,
              lineHeight: 1.4,
              color: "#a0a0a0",
              maxWidth: 880,
            }}
          >
            Products built end to end — the interface, the data model underneath
            it, and the deployment that puts it in front of people.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#a0a0a0",
            borderTop: "1px solid #262626",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex" }}>ugbeadie.com</div>
          <div style={{ display: "flex", color: "#a87ffb" }}>
            Selected work · Playground
          </div>
        </div>
      </div>
    ),
    size,
  );
}
