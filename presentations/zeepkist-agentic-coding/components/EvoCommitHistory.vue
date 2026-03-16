<template>
  <div class="ch-wrap">
    <!-- gpt-oss panel -->
    <div class="ch-panel panel-old">
      <div class="ch-panel-header">
        <span class="ch-dot red"></span><span class="ch-dot yellow"></span><span class="ch-dot green"></span>
        <span class="ch-title">git log — gpt-oss</span>
      </div>
      <div class="ch-log">
        <div v-for="commit in oldCommits" :key="commit.hash" class="ch-commit">
          <span class="ch-hash">{{ commit.hash }}</span>
          <span class="ch-badge" :class="commit.type">{{ commit.type }}</span>
          <span class="ch-msg">{{ commit.msg }}</span>
        </div>
      </div>
    </div>

    <!-- vsep -->
    <div class="ch-vs">vs</div>

    <!-- Claude panel -->
    <div class="ch-panel panel-new">
      <div class="ch-panel-header">
        <span class="ch-dot red"></span><span class="ch-dot yellow"></span><span class="ch-dot green"></span>
        <span class="ch-title">git log — Claude Opus 4.6</span>
      </div>
      <div class="ch-log">
        <div v-for="commit in newCommits" :key="commit.hash" class="ch-commit">
          <span class="ch-hash">{{ commit.hash }}</span>
          <span class="ch-badge" :class="commit.type">{{ commit.type }}</span>
          <span class="ch-msg">{{ commit.msg }}</span>
        </div>
        <div class="ch-silence">
          <span>— geen fixes nodig —</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const oldCommits = [
  { hash: 'a1f3c02', type: 'feat',  msg: 'init dark mode' },
  { hash: 'b4d9e11', type: 'fix',   msg: 'resolve syntax error in toggle component' },
  { hash: 'c2a8f54', type: 'fix',   msg: 'AI forgot to use Tailwind classes' },
  { hash: 'd7b3c90', type: 'fix',   msg: 'revert hallucinated color library import' },
  { hash: 'e5f1a23', type: 'chore', msg: 'update agent instructions: stop using styled-components' },
  { hash: 'f9e4d67', type: 'fix',   msg: 'dark mode broken on Safari due to wrong CSS var' },
  { hash: 'g3c7b01', type: 'fix',   msg: 'missing dark: prefix on text color classes' },
  { hash: 'h8a2e45', type: 'chore', msg: 'expand AGENTS.md with Tailwind constraint reminder' },
]

const newCommits = [
  { hash: '3d9f1c8', type: 'feat', msg: 'implement dark mode using existing Tailwind theme system' },
]
</script>

<style scoped>
.ch-wrap {
  display: flex;
  align-items: stretch;
  gap: 1.2rem;
  height: 100%;
  min-height: 0;
  font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace;
}

.ch-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  min-height: 0;
  box-shadow: 0 2px 12px rgba(21,66,115,0.12);
}

.ch-panel-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.8rem;
  background: #2d2d2d;
}

.ch-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}
.red    { background: #ff5f57; }
.yellow { background: #ffbd2e; }
.green  { background: #28c840; }

.ch-title {
  color: #aaa;
  font-size: 0.72rem;
  margin-left: 0.4rem;
  flex: 1;
  text-align: center;
}

.ch-log {
  flex: 1;
  padding: 0.4rem 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow: hidden;
  min-height: 0;
}

.panel-old .ch-log { background: #1e1e2e; }
.panel-new .ch-log { background: #0f1e0f; }

.ch-commit {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.68rem;
  line-height: 1.4;
  flex-shrink: 0;
}

.ch-hash {
  color: #888;
  flex: 0 0 5.5rem;
  font-size: 0.68rem;
}

.ch-badge {
  flex: 0 0 auto;
  font-size: 0.62rem;
  padding: 0.05rem 0.35rem;
  border-radius: 3px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.feat  { background: #154273; color: white; }
.fix   { background: #A90061; color: white; }
.chore { background: #5E7F9A; color: white; }

.ch-msg {
  color: #e0e0e0;
  flex: 1;
}
.panel-new .ch-msg { color: #b5f5b5; }

.ch-silence {
  margin-top: auto;
  color: #5a8a5a;
  font-size: 0.7rem;
  text-align: center;
  padding-top: 0.5rem;
  font-style: italic;
}

.ch-vs {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--bd-subtekst);
  flex: 0 0 auto;
  font-family: inherit;
}
</style>
