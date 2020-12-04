<template>
  <div>
    <general></general>
    <priority-config></priority-config>
    <candidate-starter-config></candidate-starter-config>
    <documentation></documentation>
  </div>
</template>

<script>
import General from '../../items/general';
import PriorityConfig from '../../items/priorityConfig';
import CandidateStarterConfig from '../../items/candidateStarterConfig';
import Documentation from '../../items/documentation';

export default {
  name: 'tabGeneral',
  components: {
    General,
    PriorityConfig,
    CandidateStarterConfig,
    Documentation
  }
};
</script>

<style scoped></style>
