import { useColorStore } from "@/store/color";

export const useRgba = () => {
  const { r, g, b, a } = useColorStore((state) => state.color);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
