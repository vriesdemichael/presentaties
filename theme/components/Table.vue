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

  Note: the default style is minimal — horizontal dividers only, no backgrounds or stripes.
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
          <tr v-for="(row, rowIndex) in rows" :key="`row-${rowIndex}`">
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
 *
 * Default style: horizontal lines only (no outer border, no vertical borders).
 * A slightly heavier bottom border separates the header from the body.
 * No alternating row background by default — keep it minimal.
 */
.bd-table th,
.bd-table :deep(td) {
  border: none;
  border-bottom: 1px solid var(--bd-domeinkleur-lichtblauw-45);
  padding: 0.55rem 0.7rem;
  text-align: left;
  vertical-align: top;
  background: transparent;
}
.bd-table th {
  color: var(--bd-contrastkleur-lintblauw);
  font-family: var(--bd-font-bold-stack);
  font-weight: 400;
  border-bottom: 2px solid var(--bd-domeinkleur-lichtblauw-60);
}
</style>