<script setup lang="ts">
import lz from 'lz-string'
import { computed } from 'vue'
import Mermaid from './Mermaid.vue'

const graphSource = String.raw`%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontFamily': 'RijksoverheidSansWebText, Segoe UI, Arial, sans-serif',
    'fontSize': '16px',
    'primaryColor': '#FFFFFF',
    'primaryTextColor': '#154273',
    'primaryBorderColor': '#8FCAE7',
    'lineColor': '#5E7F9A',
    'secondaryColor': '#DDEFF8',
    'tertiaryColor': '#F7FBFD',
    'clusterBkg': '#FFFFFF',
    'clusterBorder': '#B5DDEF',
    'mainBkg': '#FFFFFF',
    'nodeBorder': '#8FCAE7'
  },
  'flowchart': {
    'curve': 'linear',
    'htmlLabels': false,
    'nodeSpacing': 26,
    'rankSpacing': 30
  }
}}%%
flowchart TD
  A([CI faalt]) --> W[Webhook]
  W --> EL[EventListener]
  EL --> TT[TriggerTemplate]
  TT --> PD[Pipeline definitie]

  HC[Helm chart Tekton] -.- EL
  HC -.- TT
  HC -.- PD

  PD --> TASKS[Tasks in pipeline]
  HO[Helm overrides] --> TI[Task image tag]
  TASKS --> TI

  TI --> BI[CI/CD base image]
  BI --> PV[Python package versie]
  PY[Python library repo] --> REG[(Internal package registry)]
  REG --> PV

  PD --> RS[semantic-release stap]
  RS --> SRI[semantic-release image]
  SRI --> SRC[semantic-release config repo]

  classDef root fill:#DDEFF8,stroke:#7AA8C6,color:#154273,stroke-width:2px;
  classDef step fill:#FFFFFF,stroke:#8FCAE7,color:#154273,stroke-width:1.5px;
  classDef meta fill:#F7FBFD,stroke:#B5DDEF,color:#154273,stroke-width:1.2px,stroke-dasharray:4 4;
  classDef store fill:#F7FBFD,stroke:#8FCAE7,color:#154273,stroke-width:1.4px;

  class A root;
  class W,EL,TT,PD,TASKS,HO,TI,BI,PV,PY,RS,SRI,SRC step;
  class HC meta;
  class REG store;`

const codeLz = computed(() => lz.compressToBase64(graphSource))
</script>

<template>
  <div class="tekton-chart-shell">
    <div class="tekton-chart-click-proxy" v-click aria-hidden="true"></div>

    <div class="tekton-chart-viewport">
      <div class="tekton-chart-content">
        <Mermaid :code-lz="codeLz" :scale="0.92" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tekton-chart-shell {
  position: relative;
  height: 100%;
}

.tekton-chart-click-proxy {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.tekton-chart-viewport {
  height: 100%;
  min-height: 34rem;
  overflow: hidden;
}

.tekton-chart-content {
  transform: translateY(0);
  transition: transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.tekton-chart-click-proxy.slidev-vclick-current ~ .tekton-chart-viewport .tekton-chart-content,
.tekton-chart-click-proxy.slidev-vclick-prior ~ .tekton-chart-viewport .tekton-chart-content {
  transform: translateY(-23.7rem);
}

.tekton-chart-content :deep(.mermaid) {
  display: block;
}

.tekton-chart-content :deep(.edgePath path),
.tekton-chart-content :deep(.flowchart-link),
.tekton-chart-content :deep(.marker path) {
  fill: none !important;
  filter: none !important;
  shape-rendering: geometricPrecision;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 1;
  vector-effect: non-scaling-stroke;
}

.tekton-chart-content :deep(svg) {
  max-height: none;
}
</style>