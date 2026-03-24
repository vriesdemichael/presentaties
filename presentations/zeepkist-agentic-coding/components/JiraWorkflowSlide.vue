<script setup lang="ts">
import lz from 'lz-string'
import { computed } from 'vue'
import Mermaid from './Mermaid.vue'

const graphSource = String.raw`%%{init: {
  'theme': 'base',
  'themeVariables': {
    'fontFamily': 'RijksoverheidSansWebText, Segoe UI, Arial, sans-serif',
    'fontSize': '15px',
    'primaryColor': '#FFFFFF',
    'primaryTextColor': '#154273',
    'primaryBorderColor': '#8FCAE7',
    'lineColor': '#5E7F9A',
    'secondaryColor': '#DDEFF8',
    'tertiaryColor': '#F7FBFD',
    'mainBkg': '#FFFFFF',
    'nodeBorder': '#8FCAE7'
  },
  'flowchart': {
    'curve': 'linear',
    'htmlLabels': false,
    'nodeSpacing': 20,
    'rankSpacing': 22,
    'padding': 6
  }
}}%%
flowchart LR
  A([Pick Jira issue]) --> B[Read ADR\nsubagent]
  B --> C[Plan impl\nsubagent]
  C --> D[Implement\nagent]
  D --> E[Review work\nsubagent]
  E -->|feedback| F[Process feedback\nimpl agent]
  F --> D
  E -->|approved| G[Commit work\nopen PR]
  G --> H[Check CI]
  H -->|blocking| I[Fix CI]
  I --> H
  H -->|green| J[Human check\nautomerge]
  J --> K[Merge]
  K --> L([Done])

  classDef start fill:#DDEFF8,stroke:#7AA8C6,color:#154273,stroke-width:2px;
  classDef step fill:#FFFFFF,stroke:#8FCAE7,color:#154273,stroke-width:1.4px;
  classDef loop fill:#F7FBFD,stroke:#B5DDEF,color:#154273,stroke-width:1.2px;
  class A,L start;
  class B,C,D,E,G,H,J,K step;
  class F,I loop;`

const codeLz = computed(() => lz.compressToBase64(graphSource))
</script>

<template>
  <div class="jira-workflow-slide">
    <div class="jira-mermaid-lead">
      Autonoom werken vanaf Jira wordt pas echt bruikbaar als de workflow expliciet is: welke subagent doet wat, waar zit de feedback-loop, en wanneer stopt de automatisering voor een human check.
    </div>

    <div class="jira-mermaid-wrap">
      <Mermaid :code-lz="codeLz" :scale="0.64" />
    </div>
  </div>
</template>

<style scoped>
.jira-workflow-slide {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: 0.35rem;
}

.jira-mermaid-lead {
  max-width: 42rem;
  font-size: 0.94rem;
  line-height: 1.32;
  color: rgba(21, 66, 115, 0.82);
}

.jira-mermaid-wrap {
  display: flex;
  align-items: center;
  padding: 0.55rem 0.6rem 0.45rem;
  border: 1px solid rgba(143, 202, 231, 0.8);
  border-radius: 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
  box-shadow: 0 0.8rem 1.8rem rgba(21, 66, 115, 0.06);
  overflow: hidden;
  min-height: 18.25rem;
}

.jira-mermaid-wrap :deep(.mermaid) {
  display: block;
  width: 100%;
  transform: translateY(0.35rem);
}

.jira-mermaid-wrap :deep(svg) {
  width: 100%;
  height: auto;
}

.jira-mermaid-wrap :deep(.edgePath path),
.jira-mermaid-wrap :deep(.flowchart-link),
.jira-mermaid-wrap :deep(.marker path) {
  fill: none !important;
  filter: none !important;
  shape-rendering: geometricPrecision;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 1;
  vector-effect: non-scaling-stroke;
}
</style>