<template>
  <div class="main">
    <div class="header">
      <div>
        <el-button size="mini" @click="exportXml">导出</el-button>
        <el-upload
          class="upload-demo"
          action="https://tancy.com"
          :multiple="false"
          :limit="1"
          accept="bpmn"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="importXml"
          :file-list="fileList"
        >
          <el-button size="mini">导入</el-button>
        </el-upload>
      </div>
    </div>
    <div
      :class="['box', theme]"
      ref="container"
      @mouseup="mouseupEvent"
      v-contextmenu:contextmenu
    ></div>

    <contextmenu
      class="context-menu"
      ref="contextmenu"
      :theme="theme"
      :disabled="disabled"
    >
      <contextmenu-item class="context-menu-item">更多配置</contextmenu-item>
    </contextmenu>

    <el-dialog :title="elementId" :modal="true" :visible.sync="dialogVisible">
      <properties-panel></properties-panel>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small"
          >保 存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Metadata from '../util/Metadata';
// import configureModeler from "./bpmn/util/configure";
// import { isFunction } from "min-dash";
import CamundaBpmnModeler from './bpmn/modeler';
import bpmnXml from './diagram.bpmn';
import replaceIds from '@bpmn-io/replace-ids';
import { generateId } from '../util';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import {
  directive,
  Contextmenu,
  ContextmenuItem
  // ContextmenuSubmenu
  // ContextmenuGroup
} from 'v-contextmenu/src';
import 'v-contextmenu/dist/index.css';

import PropertiesPanel from './bpmn/properties';

export default {
  name: 'container',
  components: {
    Contextmenu,
    ContextmenuItem,
    // ContextmenuSubmenu
    PropertiesPanel
  },
  directives: {
    contextmenu: directive
  },
  props: {
    theme: {
      type: String,
      default: 'default'
    }
  },
  data() {
    return {
      modeler: {},
      element: {},
      disabled: true,
      hoverElement: {},
      dialogVisible: false,
      elementId: '',
      fileList: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.createModeler();
    });
  },
  methods: {
    createModeler() {
      const xml = replaceIds(bpmnXml, generateId);
      console.log(xml);
      const canvas = this.$refs.container;
      Metadata.init({ name: 'tancy modeler', version: '1.0' });
      const { name, version } = Metadata;

      this.modeler = new CamundaBpmnModeler({
        container: canvas,
        exporter: {
          name: name,
          version: version
        }
      });
      this.modeler.importXML(xml);
      console.log(this.modeler);
      const commandStack = this.modeler.get('commandStack');
      console.log(commandStack);
      // const canvasobj = modeler.get("canvas");
      const eventBus = this.modeler.get('eventBus');
      console.log(eventBus);
      // eventBus.on("selection.changed", (e) => {
      //   console.log(e);
      //   if (e.newSelection && e.newSelection.length == 1) {
      //     this.element = e.newSelection[0];
      //   } else {
      //     this.element = canvasobj._rootElement;
      //   }
      // });
      // eventBus.on("element.hover", (e) => {
      //   console.log(e);
      //   this.hoverElement = e.element
      // });

      // eventBus.on("shape.move.hover", (e) => {
      //   console.log(e);
      //   this.hoverElement = e.element
      // });
      eventBus.on('element.dblclick', (e) => {
        console.log(e);
        this.elementId = e.element.id;
        this.dialogVisible = true;
      });

      // eventBus.on("element.click", (e) => {console.log(e.element, is(e.element, "bpmn:UserTask"));})

      // const stackIdx = commandStack._stackIdx;
      // notify interested parties that modeler was created
      // onAction("emit-event", {
      //   type: "bpmn.modeler.created",
      //   payload: {
      //     modeler
      //   }
      // });
    },
    async exportXml() {
      try {
        const result = await this.modeler.saveXML({ format: true });
        const rootElement = this.modeler.get('canvas')._rootElement;
        var downloadElement = document.createElement('a');
        var href =
          'data:application/bpmn20-xml;charset=UTF-8,' +
          encodeURIComponent(result.xml);
        downloadElement.href = href;
        downloadElement.download = rootElement.id + '.bpmn';
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
      } catch (error) {
        console.log(error);
      }
    },
    async importXml(file) {
      var reader = new FileReader();
      reader.onload = (event) => {
        this.modeler.importXML(event.target.result);
      };
      reader.readAsText(file.raw);
    },
    mouseupEvent(event) {
      if (this.hoverElement && event.button == 2) {
        console.log(this.hoverElement);
        const { clientX, clientY } = event;
        let position = {
          top: clientY,
          left: clientX
        };
        if (!is(this.hoverElement, 'bpmn:Process')) {
          const { x, y, width, height } = this.hoverElement;
          const endx = x + width;
          const endy = y + height;
          if (
            !(clientX > x && clientX < endx && clientY > y && clientY < endy)
          ) {
            return;
          }
        }
        if (is(this.hoverElement, 'bpmn:SequenceFlow')) {
          const reactWidth = 10;
          let showContex = false;
          const waypoints = this.hoverElement.waypoints;
          for (let index = 0; index < waypoints.length - 1; index++) {
            const currentPoint = waypoints[index];
            const nextPoint = waypoints[index + 1];
            const { currentx, currenty } = currentPoint;
            const { nextx, nexty } = nextPoint;
            if (currentx == nextx) {
              if (
                Math.abs(currentx - clientX) <= reactWidth &&
                clientY != Math.min(currenty, clientY, nexty) &&
                clientY != Math.max(currenty, clientY, nexty)
              ) {
                showContex = true;
                break;
              }
            }
            if (currenty == nexty) {
              if (
                Math.abs(currenty - clientY) <= reactWidth &&
                clientX != Math.min(currentx, clientX, nextx) &&
                clientX != Math.max(currentx, clientX, nextx)
              ) {
                showContex = true;
                break;
              }
            }
          }
          if (!showContex) {
            return;
          }
        }
        this.$refs.contextmenu.show(position);
      }
    }
  }
};
</script>

<style scoped>
.main {
  height: 700px;
}
.box {
  height: 90%;
}
.header {
  width: 100%;
  height: 10%;
  background-color: #e4e3e3;
}
.context-menu {
  width: 100px !important;
}
.context-menu-item {
  height: 30px !important;
}
</style>
