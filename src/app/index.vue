<template>
  <div class="container" ref="container"></div>
</template>

<script>
// import Metadata from "../util/Metadata";
// import configureModeler from "./bpmn/util/configure";
// import { isFunction } from "min-dash";
import CamundaBpmnModeler from "./bpmn/modeler";
import bpmnXml from "./diagram.bpmn";

export default {
  name: "container",
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.createModeler();
    });
  },
  methods: {
    async createModeler() {
      // const xml = `<?xml version="1.0" encoding="UTF-8"?>
      // <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_{{ ID }}" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="3.0.0-dev">
      //   <bpmn:process id="Process_{{ ID:process }}" isExecutable="true">
      //     <bpmn:startEvent id="StartEvent_1" />
      //   </bpmn:process>
      //   <bpmndi:BPMNDiagram id="BPMNDiagram_1">
      //     <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_{{ ID:process }}">
      //       <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
      //         <dc:Bounds x="179" y="159" width="36" height="36" />
      //       </bpmndi:BPMNShape>
      //     </bpmndi:BPMNPlane>
      //   </bpmndi:BPMNDiagram>
      // </bpmn:definitions>
      // `;
      const xml = bpmnXml;
      console.log(xml);
      const canvas = this.$refs.container;
      // const { name, version } = Metadata;

      // const { getPlugins, onAction, onError } = props;

      // // notify interested parties that modeler will be configured
      // const handleMiddlewareExtensions = middlewares => {
      //   onAction("emit-event", {
      //     type: "bpmn.modeler.configure",
      //     payload: {
      //       middlewares
      //     }
      //   });
      // };

      // const { options, warnings } = configureModeler(
      //   getPlugins,
      //   {
      //     exporter: {
      //       name,
      //       version
      //     }
      //   },
      //   handleMiddlewareExtensions
      // );

      // if (warnings.length && isFunction(onError)) {
      //   onError(
      //     "Problem(s) configuring BPMN editor: \n\t" +
      //       warnings.map(error => error.message).join("\n\t") +
      //       "\n"
      //   );
      // }

      const modeler = new CamundaBpmnModeler({
        container: canvas,
        exporter: {
          name: "tancy modeler",
          version: new Date().getMilliseconds()
        },
        position: "absolute"
      });

      try {
        await modeler.importXML(xml);
      } catch (error) {
        console.log(error);
      }
      console.log(modeler)
      // const commandStack = modeler.get("commandStack");

      // const stackIdx = commandStack._stackIdx;

      // notify interested parties that modeler was created
      // onAction("emit-event", {
      //   type: "bpmn.modeler.created",
      //   payload: {
      //     modeler
      //   }
      // });
    }
  }
};
</script>

<style scoped>
</style>