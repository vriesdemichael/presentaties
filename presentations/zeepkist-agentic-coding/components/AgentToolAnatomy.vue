<script setup>
const buildingBlocks = [
  {
    title: 'Sessies',
    body: 'Links staat de sessielijst: eerdere werksporen, context en vervolgstappen blijven beschikbaar zodat je niet steeds opnieuw hoeft te beginnen.',
    label: 'sessies',
    tag: { left: '1rem', top: '-0.58rem' },
    box: { top: '11.2%', left: '0.2%', width: '13.9%', height: '90.2%' },
    panel: { top: '9%', right: '4%', width: '20rem' },
  },
  {
    title: 'Chat',
    body: 'In het midden zit het actieve gesprek: opdracht, antwoord en voortgang bij elkaar op een manier die leesbaar blijft tijdens live uitleg.',
    label: 'chat',
    tag: { left: '1rem', top: '0.85rem' },
    box: { top: '32.6%', left: '16.4%', width: '48.3%', height: '33.4%' },
    panel: { top: '8%', right: '4%', width: '20rem' },
  },
  {
    title: 'Collapsed reasoning',
    body: 'Reasoning hoeft niet als hele tekst op het scherm te staan: je wilt laten zien dat het er is, maar compact en ingeklapt zodat de operator op resultaat kan sturen.',
    label: 'reasoning',
    tag: { right: '0.45rem', left: 'auto', top: '0.15rem' },
    box: { top: '24.9%', left: '16.4%', width: '48.3%', height: '5.9%' },
    panel: { top: '10%', right: '5%', width: '22rem' },
  },
  {
    title: 'Sub-agents',
    body: 'Vanuit het gesprek kan een sub-agent een deeltaak oppakken, zoals research of validatie, zonder dat je het hoofdgesprek kwijtraakt.',
    label: 'sub-agent',
    tag: { left: '0.8rem', top: '0.2rem' },
    box: { top: '67.9%', left: '16.4%', width: '32.8%', height: '14.8%' },
    panel: { top: '16%', right: '4%', width: '21rem' },
  },
  {
    title: 'Diff / Git',
    body: 'Rechts zie je de diff: groen en rood maken zichtbaar wat de agent echt wil veranderen, en dat is cruciaal voor review en bijsturing.',
    label: 'diff',
    tag: { left: '1rem', top: '-0.45rem' },
    box: { top: '14.4%', right: '1.45%', width: '31.55%', height: '72.8%' },
    panel: { top: '14%', left: '4%', width: '20rem' },
  },
  {
    title: 'Steering controls',
    body: 'Onderaan stuur je het gesprek: tekstinvoer gecombineerd met knoppen voor MCP-config, modelkeuze en reasoning effort bepaalt hoe hard en hoe slim de agent gaat werken.',
    tag: { left: '11rem', top: '-0.45rem' },
    label: 'steering',
    box: { bottom: '1.9%', left: '15.1%', width: '83.45%', height: '8.3%' },
    panel: { bottom: '14%', left: '4%', width: '22rem' },
  },
]

function getActiveIndex(click) {
  if (click <= 0)
    return -1

  return Math.min(click - 1, buildingBlocks.length - 1)
}

function getActiveItem(click) {
  const index = getActiveIndex(click)
  return index >= 0 ? buildingBlocks[index] : null
}
</script>

<template>
  <div class="ata-wrap">
    <div class="ata-header-row">
      <p class="ata-intro">
        Veel tools verschillen in UX, maar onder de motorkap zie je vaak dezelfde zes bouwstenen terug.
      </p>

      <div class="ata-hint">
        Klik door: per stap licht een onderdeel op en verschijnt alleen de uitleg van dat onderdeel.
      </div>
    </div>

    <section class="ata-stage-card">
      <div class="ata-stage-head">
        <div>
          <div class="ata-stage-kicker">Voorbeeldscherm</div>
          <h3>Sample coding workspace</h3>
        </div>

        <div class="ata-stage-status" :class="{ 'ata-stage-status-active': getActiveItem($clicks) }">
          <template v-if="getActiveItem($clicks)">
            Stap {{ getActiveIndex($clicks) + 1 }} van {{ buildingBlocks.length }}
          </template>
          <template v-else>
            Overzicht
          </template>
        </div>
      </div>

      <div class="ata-diagram-stage" :class="{ 'ata-diagram-stage-focus': getActiveIndex($clicks) >= 0 }">
        <div class="ata-window">
          <div class="ata-window-top">
            <span></span>
            <span></span>
            <span></span>
            <div class="ata-window-title">agentic-workspace</div>
          </div>

          <div class="ata-window-body">
            <aside class="ata-sidebar">
              <div class="ata-sidebar-title"></div>
              <div class="ata-sidebar-item ata-sidebar-item-active"></div>
              <div class="ata-sidebar-item"></div>
              <div class="ata-sidebar-item"></div>
              <div class="ata-sidebar-item ata-sidebar-item-short"></div>
            </aside>

            <main class="ata-main">
              <div class="ata-main-grid">
                <section class="ata-chat-shell">
                  <div class="ata-chat-head">
                    <div class="ata-chat-title"></div>
                    <div class="ata-chat-meta"></div>
                  </div>

                  <div class="ata-reasoning-pill-row">
                    <div class="ata-reasoning-pill ata-reasoning-pill-wide"></div>
                    <div class="ata-reasoning-pill ata-reasoning-pill-short"></div>
                  </div>

                  <div class="ata-chat">
                    <div class="ata-message ata-message-user"></div>
                    <div class="ata-message ata-message-agent ata-message-agent-long"></div>
                    <div class="ata-message ata-message-agent"></div>
                  </div>

                  <div class="ata-subagent-card">
                    <div class="ata-subagent-head">
                      <div class="ata-subagent-dot"></div>
                      <div class="ata-subagent-title"></div>
                    </div>
                    <div class="ata-subagent-progress"></div>
                    <div class="ata-subagent-progress ata-subagent-progress-short"></div>
                  </div>
                </section>

                <section class="ata-diff-shell">
                  <div class="ata-diff-shell-head">
                    <div class="ata-diff-shell-title"></div>
                    <div class="ata-diff-shell-meta"></div>
                  </div>

                  <div class="ata-diff-shell-body">
                    <div class="ata-diff-line ata-diff-line-add"></div>
                    <div class="ata-diff-line ata-diff-line-add ata-diff-line-mid"></div>
                    <div class="ata-diff-line ata-diff-line-neutral"></div>
                    <div class="ata-diff-line ata-diff-line-remove"></div>
                    <div class="ata-diff-line ata-diff-line-remove ata-diff-line-short"></div>
                    <div class="ata-diff-line ata-diff-line-neutral ata-diff-line-mid"></div>
                    <div class="ata-diff-line ata-diff-line-add ata-diff-line-short"></div>
                  </div>
                </section>
              </div>

              <div class="ata-command-bar">
                <div class="ata-control-pill ata-control-pill-mcp"></div>
                <div class="ata-control-pill ata-control-pill-model"></div>
                <div class="ata-control-pill ata-control-pill-reason"></div>
                <div class="ata-command-input"></div>
                <div class="ata-command-actions">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div
          v-for="(item, index) in buildingBlocks"
          :key="item.label"
          class="ata-focus-box"
          :class="{
            'ata-focus-box-active': getActiveIndex($clicks) === index,
            'ata-focus-box-overview': getActiveIndex($clicks) === -1,
            'ata-focus-box-dim': getActiveIndex($clicks) >= 0 && getActiveIndex($clicks) !== index,
          }"
          :style="item.box"
        >
          <span class="ata-focus-tag" :style="item.tag">{{ item.label }}</span>
        </div>

        <div
          v-if="getActiveItem($clicks)"
          class="ata-detail-panel"
          :style="getActiveItem($clicks).panel"
        >
          <div class="ata-detail-title">{{ getActiveItem($clicks).title }}</div>
          <div class="ata-detail-body">{{ getActiveItem($clicks).body }}</div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.ata-wrap {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 0.56rem;
  height: 100%;
  min-height: 26.8rem;
  padding-top: 0.1rem;
}

.ata-header-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
}

.ata-intro {
  margin: 0;
  max-width: 39rem;
  font-size: 0.86rem;
  line-height: 1.45;
  color: var(--bd-tekst);
}

.ata-hint {
  max-width: 18rem;
  font-size: 0.64rem;
  line-height: 1.4;
  color: var(--bd-subtekst);
  text-align: right;
}

.ata-stage-card {
  min-height: 0;
  border-radius: 1.05rem;
  border: 1px solid rgba(21, 66, 115, 0.1);
  background: linear-gradient(180deg, #f9fcfe 0%, #eef7fb 100%);
  padding: 0.8rem;
  box-shadow: 0 10px 24px rgba(21, 66, 115, 0.08);
}

.ata-stage-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.62rem;
}

.ata-stage-kicker {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--bd-subtekst);
  margin-bottom: 0.16rem;
}

.ata-stage-head h3 {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.2;
  color: var(--bd-donkerblauw);
}

.ata-stage-status {
  border-radius: 999px;
  border: 1px solid rgba(21, 66, 115, 0.1);
  background: rgba(255, 255, 255, 0.76);
  padding: 0.38rem 0.66rem;
  font-size: 0.58rem;
  font-weight: 700;
  color: var(--bd-donkerblauw);
}

.ata-stage-status-active {
  background: white;
  box-shadow: 0 8px 16px rgba(21, 66, 115, 0.08);
}

.ata-diagram-stage {
  position: relative;
  height: 22.2rem;
}

.ata-diagram-stage-focus::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(245, 250, 252, 0.14);
  pointer-events: none;
}

.ata-window {
  height: 100%;
  border-radius: 1rem;
  border: 1px solid rgba(21, 66, 115, 0.12);
  background: white;
  box-shadow: 0 16px 32px rgba(21, 66, 115, 0.08);
  overflow: hidden;
}

.ata-window-top {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.68rem 0.9rem;
  background: #edf5f9;
  border-bottom: 1px solid rgba(21, 66, 115, 0.08);
}

.ata-window-top span {
  width: 0.46rem;
  height: 0.46rem;
  border-radius: 999px;
  background: var(--bd-accentblauw);
}

.ata-window-top span:first-child {
  background: var(--bd-donkerblauw);
}

.ata-window-top span:last-of-type {
  background: var(--bd-magenta);
}

.ata-window-title {
  margin-left: 0.35rem;
  font-size: 0.66rem;
  color: var(--bd-subtekst);
}

.ata-window-body {
  display: grid;
  grid-template-columns: 7.3rem minmax(0, 1fr);
  height: calc(100% - 2.05rem);
}

.ata-sidebar {
  padding: 0.8rem 0.66rem;
  border-right: 1px solid rgba(21, 66, 115, 0.08);
  background: #f8fbfd;
}

.ata-sidebar-title,
.ata-sidebar-item {
  border-radius: 0.45rem;
  background: #d8ebf6;
}

.ata-sidebar-title {
  height: 0.76rem;
  width: 70%;
  margin-bottom: 0.95rem;
}

.ata-sidebar-item {
  height: 1.92rem;
  margin-bottom: 0.46rem;
}

.ata-sidebar-item-active {
  background: #b7ddf0;
  border: 1px solid rgba(21, 66, 115, 0.14);
}

.ata-sidebar-item-short {
  width: 72%;
}

.ata-main {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: 0.58rem;
  padding: 0.72rem;
}

.ata-main-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(0, 0.9fr);
  gap: 0.58rem;
  min-height: 0;
}

.ata-chat-shell,
.ata-diff-shell,
.ata-subagent-card {
  border-radius: 0.8rem;
  border: 1px solid rgba(21, 66, 115, 0.1);
  background: #f9fcfe;
}

.ata-chat-shell {
  display: grid;
  grid-template-rows: auto auto auto auto;
  gap: 0.42rem;
  padding: 0.62rem;
  background: linear-gradient(180deg, #fbfdff 0%, #f3f9fc 100%);
}

.ata-chat-head,
.ata-subagent-head,
.ata-diff-shell-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;
}

.ata-chat-title,
.ata-diff-shell-title,
.ata-subagent-title,
.ata-chat-meta,
.ata-diff-shell-meta,
.ata-reasoning-pill,
.ata-subagent-progress,
.ata-control-pill {
  border-radius: 999px;
  background: #e5f2f9;
}

.ata-chat-title {
  height: 0.92rem;
  width: 6.4rem;
}

.ata-chat-meta,
.ata-diff-shell-meta {
  height: 0.82rem;
  width: 2.7rem;
}

.ata-diff-shell-title {
  height: 0.92rem;
  width: 5.4rem;
}

.ata-reasoning-pill-row {
  display: flex;
  gap: 0.35rem;
}

.ata-reasoning-pill {
  height: 0.98rem;
}

.ata-reasoning-pill-wide {
  width: 7rem;
}

.ata-reasoning-pill-short {
  width: 2.8rem;
}

.ata-chat {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.ata-message {
  height: 1.95rem;
  border-radius: 0.68rem;
}

.ata-message-user {
  width: 64%;
  align-self: flex-end;
  background: #e8f4fa;
}

.ata-message-agent {
  width: 76%;
  background: #dceef8;
}

.ata-message-agent-long {
  width: 100%;
  height: 2.4rem;
}

.ata-subagent-card {
  width: 68%;
  align-self: flex-start;
  padding: 0.5rem 0.58rem;
  border-radius: 0.62rem;
  border-left: 3px solid rgba(21, 66, 115, 0.22);
  background: linear-gradient(180deg, #f6fbfe 0%, #edf6fb 100%);
}

.ata-subagent-dot {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 999px;
  background: var(--bd-accentblauw);
}

.ata-subagent-title {
  height: 0.68rem;
  width: 62%;
  flex: 0 0 auto;
}

.ata-subagent-progress {
  height: 0.44rem;
  margin-top: 0.3rem;
  border-radius: 0.28rem;
  width: 86%;
}

.ata-subagent-progress-short {
  width: 48%;
}

.ata-diff-shell {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 0.48rem;
  padding: 0.62rem;
  background: linear-gradient(180deg, #f8fbfd 0%, #eef6fb 100%);
}

.ata-diff-shell-body {
  min-height: 0;
  border-radius: 0.68rem;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(21, 66, 115, 0.08);
  padding: 0.58rem;
}

.ata-diff-line {
  height: 0.56rem;
  border-radius: 999px;
  margin-bottom: 0.36rem;
}

.ata-diff-line-neutral {
  background: rgba(21, 66, 115, 0.1);
}

.ata-diff-line-add {
  background: rgba(111, 184, 131, 0.35);
}

.ata-diff-line-remove {
  background: rgba(169, 0, 97, 0.18);
}

.ata-diff-line-short {
  width: 66%;
}

.ata-diff-line-mid {
  width: 82%;
}

.ata-command-bar {
  display: flex;
  align-items: center;
  gap: 0.42rem;
  padding-top: 0.06rem;
}

.ata-control-pill {
  height: 1.56rem;
  flex: 0 0 auto;
  border: 1px solid rgba(21, 66, 115, 0.08);
}

.ata-control-pill-mcp {
  width: 3rem;
}

.ata-control-pill-model {
  width: 4rem;
}

.ata-control-pill-reason {
  width: 4.5rem;
}

.ata-command-input {
  flex: 1;
  height: 1.78rem;
  border-radius: 999px;
  background: #e8f2f8;
  border: 1px solid rgba(21, 66, 115, 0.08);
}

.ata-command-actions {
  display: flex;
  gap: 0.42rem;
}

.ata-command-actions span {
  width: 1.56rem;
  height: 1.56rem;
  border-radius: 999px;
  background: var(--bd-donkerblauw);
  opacity: 0.9;
}

.ata-focus-box {
  position: absolute;
  z-index: 2;
  border: 2px solid rgba(21, 66, 115, 0.18);
  border-radius: 0.85rem;
  background: rgba(255, 255, 255, 0.18);
  transition: transform 180ms ease, border-color 180ms ease, opacity 180ms ease, box-shadow 180ms ease;
}

.ata-focus-box-overview {
  opacity: 1;
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.ata-focus-box-dim {
  opacity: 0;
  border-color: transparent;
  background: transparent;
  box-shadow: none;
}

.ata-focus-box-active {
  opacity: 1;
  border-color: var(--bd-donkerblauw);
  box-shadow: 0 0 0 999px rgba(255, 255, 255, 0.22);
  transform: scale(1.03);
}

.ata-focus-tag {
  position: absolute;
  top: -0.58rem;
  left: 0.55rem;
  font-size: 0.58rem;
  line-height: 1;
  color: var(--bd-donkerblauw);
  background: white;
  border: 1px solid rgba(21, 66, 115, 0.12);
  border-radius: 999px;
  padding: 0.28rem 0.44rem;
  box-shadow: 0 4px 10px rgba(21, 66, 115, 0.06);
}

.ata-focus-box-overview .ata-focus-tag {
  background: rgba(255, 255, 255, 0.95);
  border-color: rgba(21, 66, 115, 0.08);
}

.ata-focus-box-dim .ata-focus-tag {
  opacity: 0;
}

.ata-detail-panel {
  position: absolute;
  z-index: 3;
  border-radius: 0.95rem;
  border: 1px solid rgba(21, 66, 115, 0.12);
  background: rgba(255, 255, 255, 0.97);
  padding: 0.78rem 0.88rem;
  box-shadow: 0 16px 30px rgba(21, 66, 115, 0.14);
}

.ata-detail-title {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--bd-donkerblauw);
  margin-bottom: 0.28rem;
}

.ata-detail-body {
  font-size: 0.62rem;
  line-height: 1.45;
  color: var(--bd-tekst);
}

</style>