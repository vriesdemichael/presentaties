import type { MermaidConfig } from 'mermaid'

/**
 * Belastingdienst mermaid theme configuration.
 *
 * Picked up by Slidev's virtual module system (/@slidev/setups/mermaid) and
 * merged into the mermaid.initialize() call before any diagram is rendered.
 * This is the authoritative source; the slidev.defaults.mermaid entry in
 * package.json only sets headmatter defaults and is NOT used for initialization.
 */
export default (): MermaidConfig => ({
  theme: 'base',
  themeVariables: {
    // ── Base palette ────────────────────────────────────────────────────────
    background: '#ffffff',
    primaryColor: '#eef7fc',         // lichtblauw-15
    primaryTextColor: '#1f2f3f',
    primaryBorderColor: '#007bc7',   // hemelblauw
    lineColor: '#154273',            // donkerblauw
    secondaryColor: '#cce7f4',       // lichtblauw-30
    tertiaryColor: '#bcdef0',        // lichtblauw-50 approx.

    // ── Flowchart / generic nodes ────────────────────────────────────────────
    mainBkg: '#eef7fc',
    nodeBorder: '#007bc7',
    clusterBkg: '#ddeff8',
    titleColor: '#154273',
    edgeLabelBackground: '#ffffff',

    // ── Sequence diagram ────────────────────────────────────────────────────
    signalColor: '#154273',
    signalTextColor: '#1f2f3f',
    activationBkgColor: '#cce7f4',
    activationBorderColor: '#007bc7',
    actorBkg: '#eef7fc',
    actorBorder: '#007bc7',
    actorTextColor: '#1f2f3f',
    actorLineColor: '#154273',
    noteBkgColor: '#cce7f4',
    noteTextColor: '#1f2f3f',
    noteBorderColor: '#007bc7',

    // ── Gantt chart ──────────────────────────────────────────────────────────
    sectionBkgColor: '#f5f5f5',
    altSectionBkgColor: '#ffffff',
    gridColor: '#c7c7c7',
    taskBkgColor: '#cce7f4',         // lichtblauw-30
    taskBorderColor: '#007bc7',
    taskTextColor: '#154273',
    taskTextLightColor: '#ffffff',
    taskTextDarkColor: '#154273',
    taskTextOutsideColor: '#154273',
    taskTextClickableColor: '#007bc7',
    activeTaskBkgColor: '#007bc7',   // hemelblauw — in-progress
    activeTaskBorderColor: '#154273',
    doneTaskBkgColor: '#b2d7ef',     // lighter blue — completed
    doneTaskBorderColor: '#007bc7',
    critBkgColor: '#d52b1e',         // rood — critical path (semantic)
    critBorderColor: '#9c1b14',
    todayLineColor: '#d52b1e',       // rood — today indicator

    // ── ER diagram ──────────────────────────────────────────────────────────
    attributeBackgroundColorEven: '#eef7fc',
    attributeBackgroundColorOdd: '#ffffff',

    // ── Typography ──────────────────────────────────────────────────────────
    fontFamily: "ROregular, 'Segoe UI', Arial, sans-serif",
    fontSize: '14px',
  },
})
