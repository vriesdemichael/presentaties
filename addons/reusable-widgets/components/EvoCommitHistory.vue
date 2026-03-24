<template>
  <GitLogCompare
    left-title="git log — gpt-oss"
    right-title="git log — Claude Opus 4.6"
    :left-commits="oldCommits"
    :right-commits="newCommits"
    right-footer="— geen fixes nodig —"
  />
</template>

<script setup>
import GitLogCompare from './GitLogCompare.vue'

const oldCommits = [
  { hash: 'a1f3c02', type: 'feat', msg: 'init dark mode' },
  { hash: 'b4d9e11', type: 'fix', msg: 'resolve syntax error in toggle component' },
  { hash: 'c2a8f54', type: 'fix', msg: 'AI forgot to use Tailwind classes' },
  { hash: 'd7b3c90', type: 'fix', msg: 'revert hallucinated color library import' },
  { hash: 'e5f1a23', type: 'chore', msg: 'update agent instructions: stop using styled-components' },
  { hash: 'f9e4d67', type: 'fix', msg: 'dark mode broken on Safari due to wrong CSS var' },
  { hash: 'g3c7b01', type: 'fix', msg: 'missing dark: prefix on text color classes' },
  { hash: 'h8a2e45', type: 'chore', msg: 'expand AGENTS.md with Tailwind constraint reminder' },
]

const newCommits = [
  { hash: '3d9f1c8', type: 'feat', msg: 'implement dark mode using existing Tailwind theme system' },
]
</script>