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
    secondaryColor: '#cce7f4',       // lichtblauw-45
    tertiaryColor: '#bcdef0',        // lichtblauw-60

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
    excludeBkgColor: '#eef7fc',      // lichtblauw-15 — excluded date ranges (e.g. weekends)
    gridColor: '#c7c7c7',
    vertLineColor: '#154273',        // donkerblauw — vertical reference lines
    taskBkgColor: '#cce7f4',         // lichtblauw-45
    taskBorderColor: '#007bc7',
    taskTextColor: '#154273',
    taskTextLightColor: '#ffffff',
    taskTextDarkColor: '#154273',
    taskTextOutsideColor: '#154273',
    taskTextClickableColor: '#007bc7',
    activeTaskBkgColor: '#8fcae7',   // lichtblauw — in-progress; readable with dark navy text
    activeTaskBorderColor: '#007bc7',
    doneTaskBkgColor: '#b2d7ef',     // lighter blue — completed
    doneTaskBorderColor: '#007bc7',
    critBkgColor: '#d52b1e',         // rood — critical path (semantic)
    critBorderColor: '#9c1b14',
    todayLineColor: '#e17000',       // signaalkleur-oranje

    // ── Pie / donut chart ────────────────────────────────────────────────────
    // pie1-12 derive from primary/secondary/tertiary automatically; only
    // override stroke colours which default to harsh black.
    pieStrokeColor: '#154273',       // donkerblauw — segment dividers
    pieOuterStrokeColor: '#154273',  // donkerblauw — outer ring
    pieOpacity: '0.9',               // up from 0.7; less washed-out on projector

    // ── XY Chart (bar / line) ────────────────────────────────────────────────
    // Default plotColorPalette is warm yellows/oranges — completely off-brand.
    // Use the BD blue progression + signaalkleur-oranje for a distinguishable set.
    xyChart: {
      plotColorPalette: '#007bc7,#8fcae7,#154273,#cce7f4,#e17000,#eef7fc,#bcdef0,#b2d7ef',
      backgroundColor: '#ffffff',
      titleColor: '#154273',
      xAxisLabelColor: '#154273',
      xAxisTitleColor: '#154273',
      xAxisTickColor: '#154273',
      xAxisLineColor: '#154273',
      yAxisLabelColor: '#154273',
      yAxisTitleColor: '#154273',
      yAxisTickColor: '#154273',
      yAxisLineColor: '#154273',
    },

    // ── Architecture diagram ─────────────────────────────────────────────────
    // Defaults are "#777" (edges/arrows) and "#000" (group borders).
    archEdgeColor: '#007bc7',        // hemelblauw
    archEdgeArrowColor: '#007bc7',   // hemelblauw
    archGroupBorderColor: '#154273', // donkerblauw

    // ── Venn diagram ─────────────────────────────────────────────────────────
    // venn1-8 derive from primary/secondary/tertiary; only title/label text.
    vennTitleTextColor: '#154273',   // donkerblauw
    vennSetTextColor: '#1f2f3f',     // primaryTextColor

    // ── Radar chart ──────────────────────────────────────────────────────────
    radar: {
      axisColor: '#154273',          // donkerblauw — axis lines
      graticuleColor: '#ddeff8',     // lichtblauw-30 — background grid rings
      graticuleOpacity: 0.5,
    },

    // ── ER diagram ──────────────────────────────────────────────────────────
    attributeBackgroundColorEven: '#eef7fc',
    attributeBackgroundColorOdd: '#ffffff',

    // ── Typography ──────────────────────────────────────────────────────────
    fontFamily: "ROregular, 'Segoe UI', Arial, sans-serif",
    fontSize: '14px',
  },
})
