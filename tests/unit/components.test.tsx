import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Footer } from "../../src/components/Footer";
import { Thumb } from "../../src/components/Thumb";
import { TourProvider } from "../../src/components/Tour";
import { YouTubePlayer } from "../../src/components/YouTubePlayer";

describe("componentes", () => {
  it("el pie muestra el aviso obligatorio", () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <TourProvider>
          <Footer />
        </TourProvider>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("disclaimer").textContent).toBe("Demo conceptual independiente. No es un sitio oficial de Meketrefes del Deporte.");
  });

  it("la miniatura pasa por la cadena de respaldo y termina en un marcador accesible", () => {
    const { container } = render(<Thumb id="AA09bwfR-ek" alt="Portada" size="sd" />);
    for (let i = 0; i < 3; i++) fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByRole("img", { name: "Portada" })).toBeTruthy();
    expect(screen.getByText("Miniatura no disponible")).toBeTruthy();
  });

  it("el reproductor no carga YouTube hasta que se pulsa reproducir", () => {
    const { container } = render(<YouTubePlayer id="AA09bwfR-ek" title="Panamá vs Croacia" />);
    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Reproducir: Panamá vs Croacia" }));
    const iframe = container.querySelector("iframe")!;
    expect(iframe.getAttribute("src")).toContain("youtube-nocookie.com/embed/AA09bwfR-ek");
    expect(iframe.getAttribute("title")).toBe("Reproductor de YouTube: Panamá vs Croacia");
  });
});
