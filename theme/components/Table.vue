<!--
  Table - data table component with three levels of control.

  Pick the simplest level that covers your use case:

  ─────────────────────────────────────────────────────────
  LEVEL 1 - PROP-DRIVEN  (plain string tables, no markup)
  ─────────────────────────────────────────────────────────

  <Table
    :columns="['Kanaal', 'Score', 'Toelichting']"
    :rows="[
      ['Telefonie', '94%', 'Q1 stabiel'],
      ['Post',      '61%', 'Capaciteitstekort'],
    ]"
  />

  ─────────────────────────────────────────────────────────
  LEVEL 2 - CELL SLOT  (custom content per cell)
  ─────────────────────────────────────────────────────────

  Use this when individual cells need icons, coloured text, badges
  or a two-line layout, but the rows themselves are still data-driven.

  The slot provides: { value, row, rowIndex, colIndex }
  You return the *contents* of the <td> — not the <td> itself.

  <Table :columns="['Kanaal', 'Score', 'Status']" :rows="rows">
    <template #cell="{ value, colIndex }">
      <template v-if="colIndex === 2">
        <span
          class="bd-ro-icon"
          :style="{ color: value === 'Op norm'
            ? 'var(--bd-signaalkleur-groen)'
            : 'var(--bd-signaalkleur-rood)' }"
        >{{ value === 'Op norm' ? 'check' : 'close' }}</span>
        {{ value }}
      </template>
      <template v-else>{{ value }}</template>
    </template>
  </Table>

  ─────────────────────────────────────────────────────────
  LEVEL 3 - DEFAULT SLOT  (full row control)
  ─────────────────────────────────────────────────────────

  Use this when you need row-level styling (e.g. a highlighted row),
  merged cells, or anything the cell slot cannot express.
  Write your own <tr><td> elements. The header row is still
  driven by :columns — you only replace the body rows.

  <Table :columns="['Kanaal', 'Score', 'Status']">
    <tr>
      <td>Telefonie</td>
      <td><strong>94%</strong> <small>bereikbaarheid</small></td>
      <td style="color:var(--bd-signaalkleur-groen)">Op norm</td>
    </tr>
    <tr style="background:var(--bd-domeinkleur-lichtblauw-30)">
      <td>Post</td>
      <td><strong>61%</strong> <small>op tijd</small></td>
      <td style="color:var(--bd-signaalkleur-rood)">Onder norm</td>
    </tr>
  </Table>

  Note: even-row striping is not applied when using the default slot
  because the component no longer controls which rows are rendered.
  Add row backgrounds inline (as above) or via a class if you need them.
-->
<script setup>
defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
})
</script>

<template>
  <div class="bd-table-wrap">
    <table class="bd-table">
      <thead v-if="columns.length">
        <tr>
          <th v-for="(column, index) in columns" :key="`${index}-${column}`">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <slot>
          <!--
            .bd-table-auto-row scopes the even-row stripe to component-
            rendered rows, so slot-provided rows (level 3) are never overridden.
          -->
          <tr v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`" class="bd-table-auto-row">
            <td v-for="(cell, cellIndex) in row" :key="`${rowIndex}-${cellIndex}`">
              <slot name="cell" :value="cell" :row="row" :row-index="rowIndex" :col-index="cellIndex">
                {{ cell }}
              </slot>
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.bd-table-wrap {
  flex: 0 0 auto;
  align-self: flex-start;
  width: 100%;
  overflow: auto;
  background: transparent;
  border: 1px solid var(--bd-domeinkleur-lichtblauw-30);
}
.bd-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--bd-font-regular-stack);
  color: var(--bd-contrastkleur-lintblauw);
  font-size: 12.5pt;
}
/*
 * th lives in the component template → scoped selector is fine.
 * td can be template-rendered (level 1/2) OR slot-provided (level 3).
 * :deep() makes the selector pierce the slot boundary so level-3 rows
 * receive the same border / padding / background treatment.
 */
.bd-table th,
.bd-table :deep(td) {
  border: 1px solid var(--bd-domeinkleur-lichtblauw-45);
  padding: 0.55rem 0.7rem;
  text-align: left;
  vertical-align: top;
}
.bd-table th {
  background: var(--bd-domeinkleur-lichtblauw-60);
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-bold-stack);
  font-weight: 400;
}
.bd-table :deep(tbody td) {
  background: transparent;
}
/* Even-row stripe — scoped to auto-rows so level-3 slot rows are unaffected. */
.bd-table :deep(.bd-table-auto-row:nth-child(even) td) {
  background: var(--bd-domeinkleur-lichtblauw-15);
}
</style>