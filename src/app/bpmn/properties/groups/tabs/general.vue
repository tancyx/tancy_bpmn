<template>
  <div>
    <general></general>
    <process-priority></process-priority>
    <candidate-starter-config></candidate-starter-config>
    <documentation></documentation>
  </div>
</template>

<script>
import General from '../../items/general';
import ProcessPriority from '../../items/processPriority';
import CandidateStarterConfig from '../../items/candidateStarterConfig';
import Documentation from '../../items/documentation';

export default {
  name: 'tabGeneral',
  components: {
    General,
    ProcessPriority,
    CandidateStarterConfig,
    Documentation
  }
};
</script>

<style scoped></style>
