import { ImageResponse } from "next/og";

// Home-screen icon on iPhone/iPad
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f59e0b",
          color: "#0c0a09",
          fontSize: 120,
          fontWeight: 700,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
