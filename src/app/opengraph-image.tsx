import { ImageResponse } from "next/og";

export const alt = "MM Printers — garment accessories and packaging, Dhaka";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#F6F4EF", padding: 72, color: "#171A1C" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#171A1C", color: "#F6F4EF", fontSize: 34, fontWeight: 800, padding: "6px 16px", borderRadius: 6 }}>MM</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>Printers</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2, textTransform: "uppercase" }}>The details behind</div>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 0.95, letterSpacing: -2, textTransform: "uppercase" }}>every great garment.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div>Garment accessories & packaging · Dhaka, Bangladesh</div>
          <div style={{ width: 120, height: 14, background: "#F36B35", borderRadius: 7 }} />
        </div>
      </div>
    ),
    size,
  );
}
