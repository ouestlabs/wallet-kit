import { ImageResponse } from "next/og";
import type { ImageResponseOptions } from "next/server";
import type { ReactElement, ReactNode } from "react";
import { appConfig, baseUrl } from "@/lib/config";
import { Icons } from "@/lib/icons";

type GenerateProps = {
  title: ReactNode;
  description?: ReactNode;
  variant?: "docs" | "default";
};

export function generateOGImage(
  options: GenerateProps & ImageResponseOptions
): ImageResponse {
  const { title, description, variant, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      description,
      variant,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    }
  );
}

export function generate({
  variant = "default",
  ...props
}: GenerateProps): ReactElement {
  if (variant === "default") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          color: "white",
          backgroundColor: "#0a1929",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0.1,
              backgroundImage: `
                linear-gradient(rgba(100, 181, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 181, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: "2px solid rgba(100, 181, 246, 0.4)",
              borderStyle: "dashed",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              right: "2rem",
              bottom: "2rem",
              border: "1px solid rgba(100, 181, 246, 0.2)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            padding: "4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "32px",
            }}
          >
            <div style={{ display: "flex" }}>
              <Icons.walletKit height="100" width="100" />
            </div>
            <p
              style={{
                fontWeight: 600,
                fontSize: "96px",
                fontFamily: "Instrument Serif",
                color: "rgba(255, 255, 255, 0.95)",
                textShadow: "0 0 20px rgba(100, 181, 246, 0.3)",
              }}
            >
              {props.title}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        color: "white",
        backgroundColor: "#0a1929",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0.1,
            backgroundImage: `
                linear-gradient(rgba(100, 181, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(100, 181, 246, 0.3) 1px, transparent 1px)
              `,
            backgroundSize: "40px 40px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: "2px solid rgba(100, 181, 246, 0.4)",
            borderStyle: "dashed",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            right: "2rem",
            bottom: "2rem",
            border: "1px solid rgba(100, 181, 246, 0.2)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "4rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "4px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
              color: "rgba(100, 181, 246, 0.6)",
              letterSpacing: "1px",
            }}
          >
            1200 × 630
          </div>
        </div>
        <p
          style={{
            fontWeight: 600,
            fontSize: "76px",
            fontFamily: "Instrument Serif",
            color: "rgba(255, 255, 255, 0.95)",
            textShadow: "0 0 20px rgba(100, 181, 246, 0.3)",
          }}
        >
          {props.title}
        </p>
        {props.description && (
          <p
            style={{
              fontSize: "48px",
              fontFamily: "Bricolage Grotesque",
              color: "rgba(200, 220, 240, 0.8)",
              lineHeight: "1.2",
              marginTop: "1rem",
            }}
          >
            {props.description}
          </p>
        )}
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              padding: "6px 20px",
              border: "1px solid rgba(100, 181, 246, 0.3)",
              borderRadius: "4px",
              backgroundColor: "rgba(100, 181, 246, 0.05)",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "rgba(100, 181, 246, 0.6)",
              }}
            />
            <p
              style={{
                fontSize: "24px",
                fontFamily: "Bricolage Grotesque",
                fontWeight: 400,
                color: "rgba(200, 220, 240, 0.8)",
                letterSpacing: "0.5px",
              }}
            >
              {baseUrl.origin}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
