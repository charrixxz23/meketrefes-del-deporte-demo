import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { __resetFavoritesCache, useFavorites } from "../../src/hooks/useFavorites";

describe("favoritos", () => {
  beforeEach(() => {
    window.localStorage.clear();
    __resetFavoritesCache();
    vi.restoreAllMocks();
  });

  it("agrega, detecta y quita un favorito, y lo persiste", () => {
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggle("video", "AA09bwfR-ek");
    });
    expect(result.current.has("video", "AA09bwfR-ek")).toBe(true);
    expect(JSON.parse(window.localStorage.getItem("mk-demo:favoritos")!)).toEqual([{ kind: "video", id: "AA09bwfR-ek" }]);
    act(() => {
      result.current.toggle("video", "AA09bwfR-ek");
    });
    expect(result.current.favorites).toEqual([]);
  });

  it("ignora datos corruptos en el almacenamiento", () => {
    window.localStorage.setItem("mk-demo:favoritos", "{no es json");
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it("sigue funcionando si el almacenamiento falla (modo privado)", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceeded");
    });
    const { result } = renderHook(() => useFavorites());
    act(() => {
      result.current.toggle("article", "donde-seguir-a-meketrefes");
    });
    expect(result.current.has("article", "donde-seguir-a-meketrefes")).toBe(true);
  });
});
