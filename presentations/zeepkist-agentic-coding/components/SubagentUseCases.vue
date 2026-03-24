<template>
  <div class="subagent-usecases-slide">
    <div class="subagent-usecases-intro">
      Drie praktische patronen waar subagents direct waarde leveren.
    </div>

    <div class="subagent-usecase-row">
      <div class="subagent-usecase-media">
        <img src="/images/explorer.png" alt="Gestileerde explorer die door bestanden en folders navigeert" class="subagent-usecase-image" />
      </div>
      <div class="subagent-usecase-copy">
        <div class="subagent-usecase-copy-title">Fast exploration of files</div>
        <p>Laat een subagent snel door code, mappen en docs zoeken zonder dat alle tussenstappen in je hoofdchat belanden.</p>
      </div>
    </div>

    <div class="subagent-usecase-row">
      <div class="subagent-usecase-media">
        <img src="/images/masked.png" alt="Gemaskerd gezicht als symbool voor persona switching" class="subagent-usecase-image" />
      </div>
      <div class="subagent-usecase-copy">
        <div class="subagent-usecase-copy-title">Switching persona</div>
        <p>Gebruik een aparte subagent als reviewer, critic of specialist zodat die stijl niet gaat lekken naar je normale implementatiegesprek.</p>
      </div>
    </div>

    <div class="subagent-usecase-row">
      <div class="subagent-usecase-media">
        <img src="/images/squire.png" alt="Ridder met schildknaap die werk overneemt als symbool voor offloading" class="subagent-usecase-image" />
      </div>
      <div class="subagent-usecase-copy">
        <div class="subagent-usecase-copy-title">Offloading skills or MCP</div>
        <p>Laat zware skill- of MCP-werkstromen in een aparte run gebeuren en krijg alleen de bruikbare samenvatting terug in je eigen context window.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subagent-usecases-slide {
  display: flex;
  flex-direction: column;
  gap: 0.66rem;
  margin-top: 0.25rem;
}

.subagent-usecases-intro {
  max-width: 34rem;
  font-size: 0.88rem;
  line-height: 1.3;
  color: rgba(21, 66, 115, 0.78);
}

.subagent-usecase-row {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.15fr);
  gap: 0.9rem;
  align-items: center;
}

.subagent-usecase-row:last-of-type {
  padding-top: 0.2rem;
}

.subagent-usecase-media {
  min-height: 6.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: visible;
}

.subagent-usecase-image {
  width: 100%;
  height: auto;
  max-height: 7.9rem;
  object-fit: contain;
  object-position: center;
  display: block;
}

.subagent-usecase-copy {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.subagent-usecase-copy-title {
  font-size: 0.94rem;
  font-weight: 800;
  color: #154273;
}

.subagent-usecase-copy p {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.34;
  color: rgba(21, 66, 115, 0.82);
}
</style>