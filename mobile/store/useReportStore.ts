import { create } from "zustand";

interface ReportStore {
  photo: string | null;
  setPhoto: (photo: string) => void;
  reset: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  photo: null,
  setPhoto: (photo) => set({ photo }),
  reset: () => set({ photo: null }),
}));
