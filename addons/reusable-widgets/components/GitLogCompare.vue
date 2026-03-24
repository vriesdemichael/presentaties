<template>
  <div class="glc-wrap">
    <div class="glc-panel" :class="leftPanelClass">
      <div class="glc-panel-header">
        <span class="glc-dot red"></span><span class="glc-dot yellow"></span><span class="glc-dot green"></span>
        <span class="glc-title">{{ leftTitle }}</span>
      </div>
      <div class="glc-log">
        <div v-for="commit in leftCommits" :key="`left-${commit.hash}-${commit.msg}`" class="glc-commit">
          <span class="glc-hash">{{ commit.hash }}</span>
          <span class="glc-badge" :class="commit.type">{{ commit.type }}</span>
          <span class="glc-msg">{{ commit.msg }}</span>
        </div>
        <div v-if="leftFooter" class="glc-footer" :class="leftFooterClass">
          <span>{{ leftFooter }}</span>
        </div>
      </div>
    </div>

    <div class="glc-vs">{{ separatorLabel }}</div>

    <div class="glc-panel" :class="rightPanelClass">
      <div class="glc-panel-header">
        <span class="glc-dot red"></span><span class="glc-dot yellow"></span><span class="glc-dot green"></span>
        <span class="glc-title">{{ rightTitle }}</span>
      </div>
      <div class="glc-log">
        <div v-for="commit in rightCommits" :key="`right-${commit.hash}-${commit.msg}`" class="glc-commit">
          <span class="glc-hash">{{ commit.hash }}</span>
          <span class="glc-badge" :class="commit.type">{{ commit.type }}</span>
          <span class="glc-msg">{{ commit.msg }}</span>
        </div>
        <div v-if="rightFooter" class="glc-footer" :class="rightFooterClass">
          <span>{{ rightFooter }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  leftTitle: {
    type: String,
    required: true,
  },
  rightTitle: {
    type: String,
    required: true,
  },
  leftCommits: {
    type: Array,
    default: () => [],
  },
  rightCommits: {
    type: Array,
    default: () => [],
  },
  separatorLabel: {
    type: String,
    default: 'vs',
  },
  leftPanelClass: {
    type: String,
    default: 'panel-neutral',
  },
  rightPanelClass: {
    type: String,
    default: 'panel-success',
  },
  leftFooter: {
    type: String,
    default: '',
  },
  rightFooter: {
    type: String,
    default: '',
  },
  leftFooterClass: {
    type: String,
    default: '',
  },
  rightFooterClass: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.glc-wrap {
  display: flex;
  align-items: stretch;
  gap: 1.2rem;
  height: 100%;
  min-height: 0;
  font-family: "JetBrains Mono", "Fira Code", "Cascadia Code", ui-monospace, monospace;
}

.glc-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  min-height: 0;
  box-shadow: 0 2px 12px rgba(21, 66, 115, 0.12);
}

.glc-panel-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.8rem;
  background: #2d2d2d;
}

.glc-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.red { background: #ff5f57; }
.yellow { background: #ffbd2e; }
.green { background: #28c840; }

.glc-title {
  color: #aaa;
  font-size: 0.72rem;
  margin-left: 0.4rem;
  flex: 1;
  text-align: center;
}

.glc-log {
  flex: 1;
  padding: 0.4rem 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  overflow: hidden;
  min-height: 0;
}

.panel-neutral .glc-log { background: #1e1e2e; }
.panel-success .glc-log { background: #0f1e0f; }

.glc-commit {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.68rem;
  line-height: 1.4;
  flex-shrink: 0;
}

.glc-hash {
  color: #888;
  flex: 0 0 5.5rem;
  font-size: 0.68rem;
}

.glc-badge {
  flex: 0 0 auto;
  font-size: 0.62rem;
  padding: 0.05rem 0.35rem;
  border-radius: 3px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.feat { background: #154273; color: white; }
.fix { background: #A90061; color: white; }
.chore { background: #5E7F9A; color: white; }
.merge { background: #E17000; color: white; }

.glc-msg {
  color: #e0e0e0;
  flex: 1;
}

.panel-success .glc-msg { color: #b5f5b5; }

.glc-footer {
  margin-top: auto;
  font-size: 0.7rem;
  text-align: center;
  padding-top: 0.5rem;
  font-style: italic;
}

.panel-neutral .glc-footer { color: #9a9ab2; }
.panel-success .glc-footer { color: #5a8a5a; }

.glc-vs {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--bd-subtekst);
  flex: 0 0 auto;
  font-family: inherit;
}
</style>