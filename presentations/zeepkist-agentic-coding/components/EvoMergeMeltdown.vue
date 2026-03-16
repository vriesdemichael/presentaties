<template>
  <div class="emm-wrap">
    <!-- Left: doom loop terminal -->
    <div class="emm-terminal emm-left">
      <div class="emm-termbar">
        <span class="emm-dot dot-red"></span><span class="emm-dot dot-yellow"></span><span class="emm-dot dot-green"></span>
        <span class="emm-title">git log — gpt-oss (doom loop)</span>
      </div>
      <div class="emm-log">
        <div class="emm-commit" v-for="c in leftLog" :key="c.sha">
          <span class="emm-sha">{{ c.sha }}</span>
          <span class="emm-badge" :class="'b-' + c.type">{{ c.type }}</span>
          <span class="emm-msg">{{ c.msg }}</span>
          <span class="emm-note" v-if="c.note">{{ c.note }}</span>
        </div>
      </div>
      <div class="emm-burn-note">~20 min compute verbrand</div>
    </div>

    <!-- Divider -->
    <div class="emm-vs">
      <div class="emm-vs-line"></div>
      <div class="emm-vs-label">vs</div>
      <div class="emm-vs-line"></div>
    </div>

    <!-- Right: human intervention as plain text card -->
    <div class="emm-intervention">
      <div class="emm-int-title">🧐 Human Intervention</div>
      <div class="emm-int-subtitle">The Tax</div>
      <ol class="emm-int-list">
        <li>
          <span class="emm-int-action">Agent process killen</span>
          <span class="emm-int-detail">Ctrl+C — agent zat vast in retry-loop</span>
        </li>
        <li>
          <span class="emm-int-action"><code>git reset --hard HEAD~5</code></span>
          <span class="emm-int-detail">5 commits terugdraaien, inclusief de doom-loop fixpogingen</span>
        </li>
        <li>
          <span class="emm-int-action">Merge conflict handmatig oplossen</span>
          <span class="emm-int-detail">auth_service.ts open in editor, conflict met kennis van domein opgelost</span>
        </li>
      </ol>
      <div class="emm-int-result">
        <span class="emm-int-result-label">Resultaat:</span>
        Conflict opgelost in 4 minuten.
        <br>Conclusie: merge conflicts met structurele codewijzigingen zijn <strong>geen agentische taak</strong> voor zwakkere modellen.
      </div>
    </div>

  </div>
</template>

<script setup>
const leftLog = [
  { sha: 'a1b2c3d', type: 'feat',  msg: 'implement new oauth provider' },
  { sha: 'e4f5a6b', type: 'merge', msg: "branch 'main' into feature/oauth", note: '⚠ Conflict: auth_service.ts' },
  { sha: 'c7d8e9f', type: 'fix',   msg: 'resolve merge conflicts in auth_service.ts', note: '💀 <<<<<<< HEAD markers left in file' },
  { sha: 'a0b1c2d', type: 'fix',   msg: 'syntax error: unexpected token <<<<<<<', note: '💀 deletes conflict markers + auth function' },
  { sha: 'e3f4a5b', type: 'fix',   msg: 'restore missing auth function', note: '💀 hallucinates deprecated legacy-auth-lib' },
  { sha: 'c6d7e8f', type: 'fix',   msg: "cannot find module 'legacy-auth-lib'", note: '💀 installs nonexistent npm package' },
  { sha: 'a9b0c1d', type: 'fix',   msg: 'revert auth_service.ts and try merge again', note: '🔁 terug bij af' },
]
</script>

<style scoped>
.emm-wrap {
  display: flex;
  gap: 0;
  height: 100%;
  font-family: 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
}

/* ---- Left terminal ---- */
.emm-terminal {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
}

.emm-left { background: #1a0d1a; }

.emm-termbar {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  background: rgba(255,255,255,0.07);
  flex-shrink: 0;
}

.emm-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dot-red    { background: #ff5f57; }
.dot-yellow { background: #ffbd2e; }
.dot-green  { background: #28c840; }

.emm-title {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.55);
  margin-left: 0.4rem;
}

.emm-log {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0.4rem 0.8rem;
  overflow: hidden;
}

.emm-commit {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.3rem;
  padding: 0.2rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  font-size: 0.68rem;
  line-height: 1.35;
}

.emm-sha {
  color: rgba(255,255,255,0.3);
  font-size: 0.62rem;
  flex-shrink: 0;
}

.emm-badge {
  padding: 0.05rem 0.35rem;
  border-radius: 3px;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  flex-shrink: 0;
}

.b-feat  { background: #154273; color: #8FCAE7; }
.b-fix   { background: #5c001e; color: #ff88b2; }
.b-chore { background: #2a3a45; color: #8FCAE7; }
.b-merge { background: #6b4400; color: #ffc86b; }

.emm-msg { color: rgba(255,255,255,0.82); }

.emm-note {
  width: 100%;
  padding-left: 4rem;
  font-size: 0.62rem;
  color: rgba(255,100,100,0.75);
  font-style: italic;
}

.emm-burn-note {
  padding: 0.35rem 0.8rem 0.5rem;
  font-size: 0.66rem;
  color: rgba(255,80,80,0.65);
  font-style: italic;
  border-top: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0;
}

/* ---- vs divider ---- */
.emm-vs {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.8rem;
  gap: 0.4rem;
}

.emm-vs-line {
  flex: 1;
  width: 1px;
  background: rgba(100,130,160,0.25);
}

.emm-vs-label {
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--bd-subtekst);
  font-family: inherit;
}

/* ---- Right: plain intervention card ---- */
.emm-intervention {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1rem 1.2rem;
  background: var(--bd-lichtblauw, #DDEFF8);
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.emm-int-title {
  font-size: 1rem;
  font-weight: 800;
  color: var(--bd-donkerblauw, #154273);
}

.emm-int-subtitle {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--bd-subtekst, #5E7F9A);
  margin-top: -0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.emm-int-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-left: 1.4rem;
  flex: 1;
}

.emm-int-list li {
  color: var(--bd-tekst, #1f2f3f);
  line-height: 1.4;
}

.emm-int-action {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--bd-donkerblauw, #154273);
}

.emm-int-action code {
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.76rem;
  background: rgba(21,66,115,0.08);
  padding: 0.05rem 0.35rem;
  border-radius: 3px;
}

.emm-int-detail {
  display: block;
  font-size: 0.72rem;
  color: var(--bd-subtekst, #5E7F9A);
  margin-top: 0.1rem;
}

.emm-int-result {
  font-size: 0.74rem;
  color: var(--bd-tekst, #1f2f3f);
  border-top: 1px solid rgba(21,66,115,0.15);
  padding-top: 0.6rem;
  line-height: 1.55;
}

.emm-int-result-label {
  font-weight: 700;
  color: var(--bd-donkerblauw, #154273);
}
</style>