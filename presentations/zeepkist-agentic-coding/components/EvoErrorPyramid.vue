<template>
  <div class="pyr-wrap">
    <div class="pyr-header">
      <span class="pyr-axis-label">Fouttype</span>
      <span></span>
      <span class="pyr-axis-label">Jouw rol</span>
    </div>

    <div class="pyr-body">
      <!-- Row 1: top tier (architecturaal) -->
      <div class="pyr-anno text-right">
        Architecturale afwijking<br>
        <span class="pyr-anno-sub">Koppeling die niet past bij domain design</span>
      </div>
      <div class="pyr-tier tier-top">
        <span class="pyr-tier-label">Toekomstige modellen<br><small style="color:rgba(255,255,255,0.28);font-size:0.56rem">(2026 Q4~)</small></span>
      </div>
      <div class="pyr-anno text-left">
        Software Architect<br>
        <span class="pyr-anno-sub">Domein- en koppelingsbeslissingen</span>
      </div>

      <!-- Row 2: mid tier (logisch) -->
      <div class="pyr-anno text-right">
        Logische fout<br>
        <span class="pyr-anno-sub">Edge case, race condition, state-bug</span>
      </div>
      <div class="pyr-tier tier-mid">
        <span class="pyr-tier-label">Nu<br><small>Frontier modellen</small></span>
      </div>
      <div class="pyr-anno text-left">
        Code Reviewer<br>
        <span class="pyr-anno-sub">Logica, correctheid, grensgevallen</span>
      </div>

      <!-- Row 3: bot tier (syntax) -->
      <div class="pyr-anno text-right">
        Syntax-fout<br>
        <span class="pyr-anno-sub">Hallucinated packages, deprecated API, missing bracket</span>
      </div>
      <div class="pyr-tier tier-bot">
        <span class="pyr-tier-label">Vroeger<br><small>gpt-oss / zwakkere modellen</small></span>
      </div>
      <div class="pyr-anno text-left">
        Human Linter<br>
        <span class="pyr-anno-sub">Syntax, imports, typos corrigeren</span>
      </div>
    </div>

    <div class="pyr-footnote">Hoe beter het model → minder fouten, maar de fouten die overblijven zijn subtieler en moeilijker te spotten</div>
  </div>
</template>

<style scoped>
.pyr-wrap {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0.4rem;
  padding: 0.25rem 0;
}

.pyr-header {
  display: grid;
  grid-template-columns: 1fr 280px 1fr;
  padding: 0 0.5rem;
}

.pyr-axis-label {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--bd-donkerblauw);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pyr-header .pyr-axis-label:first-child { text-align: right; }
.pyr-header .pyr-axis-label:last-child  { text-align: left;  }

/* 3-column grid: left anno | tier | right anno, 3 rows */
.pyr-body {
  display: grid;
  grid-template-columns: 1fr 280px 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.4rem 0.8rem;
  flex: 1;
  align-items: center;
  min-height: 0;
}

.pyr-anno {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--bd-tekst);
  line-height: 1.3;
  align-self: center;
}

.pyr-anno-sub {
  font-weight: 400;
  font-size: 0.68rem;
  color: var(--bd-subtekst);
}

.text-right { text-align: right; }
.text-left  { text-align: left;  }

/* Pyramid tiers */
.pyr-tier {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: stretch;
}

.pyr-tier-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  line-height: 1.3;
  pointer-events: none;
}

.pyr-tier-label small {
  font-weight: 400;
  font-size: 0.68rem;
  opacity: 0.88;
}

/* Top: narrowest trapezoid */
.tier-top {
  width: 35%;
  justify-self: center;
  background: #154273;
  clip-path: polygon(10% 100%, 90% 100%, 75% 0%, 25% 0%);
}

/* Mid tier */
.tier-mid {
  width: 65%;
  justify-self: center;
  background: #8FCAE7;
  clip-path: polygon(5% 100%, 95% 100%, 82% 0%, 18% 0%);
}

.tier-mid .pyr-tier-label { color: var(--bd-donkerblauw); }

/* Bottom tier: widest */
.tier-bot {
  width: 100%;
  background: #B5DDEF;
  clip-path: polygon(0% 100%, 100% 100%, 90% 0%, 10% 0%);
}

.tier-bot .pyr-tier-label { color: var(--bd-donkerblauw); }

.pyr-footnote {
  font-size: 0.72rem;
  color: var(--bd-subtekst);
  text-align: center;
  max-width: 56ch;
  align-self: center;
}
</style>