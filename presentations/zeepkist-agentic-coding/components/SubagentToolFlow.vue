<template>
  <div class="tools-visual-shell">
    <div class="tools-visual-card tools-subagent-diagram-card">
      <div class="tools-visual-badge">Subagent tool</div>
      <div class="tools-subagent-diagram-stage">
        <div class="tools-subagent-context-stack tools-subagent-context-stack-main">
          <div class="tools-subagent-stack-head">
            <div class="tools-subagent-flow-title">Main context window</div>
          </div>

          <div class="tools-subagent-frame">
            <div class="tools-subagent-block tools-subagent-block-context">earlier context</div>
            <div class="tools-subagent-call-row">
              <div class="tools-subagent-call-block">tool call</div>
              <div class="tools-subagent-call-chips">
                <span class="tools-subagent-call-chip">instructions</span>
                <span class="tools-subagent-call-chip">config</span>
              </div>
            </div>
            <div class="tools-subagent-block tools-subagent-block-shared">summary</div>
            <div class="tools-subagent-block tools-subagent-block-context">continued context</div>
          </div>
        </div>

        <div class="tools-subagent-diagram-links" aria-hidden="true">
          <svg viewBox="0 0 120 340" class="tools-subagent-diagram-svg" preserveAspectRatio="none">
            <defs>
              <marker id="tools-subagent-arrow-run" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8" fill="#6c8aa6" />
              </marker>
              <marker id="tools-subagent-arrow-return" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8" fill="#6c8aa6" />
              </marker>
            </defs>
            <path d="M10 162 L108 162" class="tools-subagent-link tools-subagent-link-run" marker-end="url(#tools-subagent-arrow-run)" />
            <path d="M108 190 L10 190" class="tools-subagent-link tools-subagent-link-return" marker-end="url(#tools-subagent-arrow-return)" />
          </svg>
        </div>

        <div class="tools-subagent-context-stack tools-subagent-context-stack-subagent">
          <div class="tools-subagent-stack-head">
            <div class="tools-subagent-flow-title">Subagent</div>
          </div>

          <div class="tools-subagent-flow-chip-row">
            <span class="tools-subagent-flow-chip">instructions</span>
            <span class="tools-subagent-flow-chip">config</span>
          </div>

          <div class="tools-subagent-frame tools-subagent-frame-subagent">
            <div class="tools-subagent-block tools-subagent-block-run">prompt<br>work<br>response</div>
            <div class="tools-subagent-block tools-subagent-block-shared">summary</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tools-subagent-diagram-card {
  gap: 0.9rem;
}

.tools-subagent-diagram-stage {
  display: grid;
  grid-template-columns: minmax(0, 1.28fr) 4.7rem minmax(0, 1.06fr);
  gap: 0.45rem;
  align-items: center;
  flex: 1;
}

.tools-subagent-context-stack {
  padding: 0.8rem 0.95rem;
  border-radius: 1rem;
  border: 1px solid rgba(143, 202, 231, 0.82);
  background: linear-gradient(180deg, #ffffff 0%, #f7fbfd 100%);
}

.tools-subagent-context-stack-subagent {
  background: linear-gradient(180deg, #eef7fb 0%, #ffffff 100%);
}

.tools-subagent-stack-head {
  margin-bottom: 0.45rem;
}

.tools-subagent-flow-title {
  font-size: 0.92rem;
  font-weight: 800;
  color: #154273;
}

.tools-subagent-flow-chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.42rem;
  margin-top: 0.1rem;
  margin-bottom: 0.7rem;
}

.tools-subagent-flow-chip {
  padding: 0.24rem 0.48rem;
  border-radius: 999px;
  background: rgba(221, 239, 248, 0.95);
  border: 1px solid rgba(143, 202, 231, 0.82);
  font-size: 0.58rem;
  font-weight: 800;
  color: #154273;
}

.tools-subagent-frame {
  display: flex;
  flex-direction: column;
  gap: 0.52rem;
  min-width: 0;
}

.tools-subagent-call-row {
  display: flex;
  align-items: center;
  gap: 0.38rem;
  min-width: 0;
}

.tools-subagent-call-block {
  flex: 0 0 auto;
  padding: 0.36rem 0.54rem;
  border-radius: 0.72rem;
  border: 1px solid rgba(143, 202, 231, 0.72);
  background: rgba(221, 239, 248, 0.95);
  font-size: 0.55rem;
  font-weight: 800;
  line-height: 1;
  color: #154273;
  white-space: nowrap;
}

.tools-subagent-call-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  min-width: 0;
}

.tools-subagent-call-chip {
  padding: 0.16rem 0.34rem;
  border-radius: 999px;
  border: 1px solid rgba(143, 202, 231, 0.68);
  background: rgba(255, 255, 255, 0.96);
  font-size: 0.5rem;
  font-weight: 800;
  line-height: 1;
  color: #5e7f9a;
  white-space: nowrap;
}

.tools-subagent-block {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.35rem;
  padding: 0.62rem 0.82rem;
  border-radius: 0.82rem;
  border: 1px solid rgba(143, 202, 231, 0.62);
  background: rgba(255, 255, 255, 0.9);
  font-size: 0.68rem;
  font-weight: 800;
  line-height: 1.2;
  color: #154273;
  text-align: center;
}

.tools-subagent-block-context {
  min-height: 6rem;
  color: rgba(21, 66, 115, 0.66);
}

.tools-subagent-block-run {
  min-height: 10rem;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: rgba(255, 248, 238, 0.98);
  border-color: rgba(247, 181, 0, 0.42);
  color: #8a4b00;
}

.tools-subagent-block-shared {
  min-height: 2.9rem;
  background: rgba(210, 238, 176, 0.98);
  border-color: rgba(111, 159, 0, 0.42);
  color: #4f6f00;
}

.tools-subagent-diagram-links {
  position: relative;
  height: 100%;
  min-height: 20.5rem;
}

.tools-subagent-diagram-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.tools-subagent-link {
  fill: none;
  stroke: #6c8aa6;
  stroke-width: 1.8;
  stroke-linecap: round;
  opacity: 0.92;
}

.tools-subagent-link-return {
  stroke-dasharray: 4 4;
}

.tools-subagent-block-context {
  justify-content: flex-start;
  text-align: left;
}

.tools-subagent-block-context {
  align-items: center;
}

.tools-subagent-frame-subagent {
  gap: 0.68rem;
}

.tools-subagent-block-context,
.tools-subagent-block-run,
.tools-subagent-block-shared {
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
}

.tools-subagent-block-context {
  color: rgba(21, 66, 115, 0.62);
}
</style>