import { create } from "zustand";

export type OSMode = "recruiter" | "developer" | "presentation";

interface Tab {
  name: string;
  path: string;
  type: "file" | "folder" | "terminal" | "query" | "log";
}

interface OSState {
  mode: OSMode;
  setMode: (mode: OSMode) => void;
  isBooted: boolean;
  setBooted: (booted: boolean) => void;
  
  // IDE Simulator State
  tabs: Tab[];
  activeTabPath: string;
  openTab: (name: string, path: string, type: Tab["type"]) => void;
  closeTab: (path: string) => void;
  sidebarTab: "explorer" | "search" | "stats" | "settings";
  setSidebarTab: (tab: "explorer" | "search" | "stats" | "settings") => void;
  
  // Terminal State
  terminalHistory: string[];
  addTerminalHistory: (cmd: string) => void;
  
  // Presentation Mode State
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  presentationStep: "problem" | "architecture" | "stack" | "challenges" | "demo";
  setPresentationStep: (step: "problem" | "architecture" | "stack" | "challenges" | "demo") => void;
}

const DEFAULT_TABS: Tab[] = [
  { name: "Home.java", path: "src/Home.java", type: "file" },
  { name: "About.md", path: "src/About.md", type: "file" }
];

export const useOSStore = create<OSState>((set) => ({
  mode: "recruiter", // Recruiter mode is the default
  setMode: (mode) => set({ mode }),
  isBooted: false,
  setBooted: (isBooted) => set({ isBooted }),
  
  tabs: DEFAULT_TABS,
  activeTabPath: "src/Home.java",
  openTab: (name, path, type) =>
    set((state) => {
      const exists = state.tabs.some((t) => t.path === path);
      const newTabs = exists ? state.tabs : [...state.tabs, { name, path, type }];
      return {
        tabs: newTabs,
        activeTabPath: path
      };
    }),
  closeTab: (path) =>
    set((state) => {
      const remainingTabs = state.tabs.filter((t) => t.path !== path);
      let nextActive = state.activeTabPath;
      if (state.activeTabPath === path && remainingTabs.length > 0) {
        nextActive = remainingTabs[remainingTabs.length - 1].path;
      }
      return {
        tabs: remainingTabs,
        activeTabPath: remainingTabs.length > 0 ? nextActive : ""
      };
    }),
  sidebarTab: "explorer",
  setSidebarTab: (sidebarTab) => set({ sidebarTab }),
  
  terminalHistory: [],
  addTerminalHistory: (cmd) =>
    set((state) => ({ terminalHistory: [...state.terminalHistory, cmd] })),
    
  activeProjectId: "pulsearena",
  setActiveProjectId: (id) => set({ activeProjectId: id, presentationStep: "problem" }),
  presentationStep: "problem",
  setPresentationStep: (presentationStep) => set({ presentationStep })
}));
