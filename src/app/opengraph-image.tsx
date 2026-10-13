import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

// The preview card shown when the site link is shared (LinkedIn, Slack, iMessage, …)
export const alt = `${site.person.name} — ${site.person.roles.join(" · ")}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0a09",
          color: "#f5f5f4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 22, height: 22, borderRadius: 5, background: "#f59e0b" }} />
          <div style={{ fontSize: 28, color: "#f59e0b", letterSpacing: 2 }}>{site.person.tagline.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 28, letterSpacing: -2 }}>{site.person.name}</div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 24, gap: 10 }}>
          {site.person.roles.map((role) => (
            <div key={role} style={{ fontSize: 36, color: "#a8a29e" }}>
              {role}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
