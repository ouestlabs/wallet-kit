import { ImageResponse } from "next/og";
import type { ImageResponseOptions } from "next/server";
import type { ReactElement, ReactNode } from "react";
import { appConfig, baseUrl } from "@/lib/config";
import { Icons } from "@/lib/icons";

type GenerateProps = {
  title: ReactNode;
  description?: ReactNode;
  primaryTextColor?: string;
};

export function generateOGImage(
  options: GenerateProps & ImageResponseOptions
): ImageResponse {
  const { title, description, primaryTextColor, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      description,
      primaryTextColor,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    }
  );
}

export function generate({
  primaryTextColor = "rgb(255,150,255)",
  ...props
}: GenerateProps): ReactElement {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "#121212",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "4rem",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            fontSize: "76px",
            fontFamily: "Instrument Serif",
          }}
        >
          {props.title}
        </p>
        <p
          style={{
            fontSize: "48px",
            fontFamily: "Bricolage Grotesque",
            color: "rgba(240,240,240,0.7)",
          }}
        >
          {props.description}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "24px",
              marginTop: "auto",
              color: primaryTextColor,
            }}
          >
            <Icons.walletKit height="64" width="64" />

            <p
              style={{
                fontSize: "46px",
                fontWeight: 600,
              }}
            >
              {appConfig.name}
            </p>
          </div>

          <p
            style={{
              fontSize: "24px",
              fontFamily: "Bricolage Grotesque",
              fontWeight: 400,
              color: "rgba(240,240,240,0.7)",
            }}
          >
            {baseUrl.origin}
          </p>
        </div>
      </div>
    </div>
  );
}
