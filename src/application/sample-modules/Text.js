import ctw from "canvas-text-wrapper";

const CanvasTextWrapper = ctw.CanvasTextWrapper;

export default {
  meta: {
    name: "Text",
    type: "2d"
  },

  props: {
    text: {
      type: "text",
      default: "",
      set(args) {
        this.drawText(args);
      }
    },

    size: {
      type: "int",
      min: 0,
      max: 1000,
      default: 16,
      set(args) {
        this.drawText(args);
      }
    },

    positionX: {
      type: "float",
      default: 0.5,
      max: 1,
      min: 0,
      strict: true
    },

    positionY: {
      type: "float",
      default: 0.5,
      max: 1,
      min: 0,
      strict: true
    },

    strokeSize: {
      type: "float",
      default: 1,
      max: 50,
      min: 0,
      abs: true,
      set(args) {
        this.drawText(args);
      }
    },

    font: {
      type: "text",
      default: "Proxima Nova",
      set(args) {
        this.drawText(args);
      }
    },

    weight: {
      type: "text",
      default: "bold",
      set(args) {
        this.drawText(args);
      }
    },

    fill: {
      type: "bool",
      default: true,
      set(args) {
        this.drawText(args);
      }
    },

    fillColor: {
      type: "color",
      default: "#000000",
      set(args) {
        this.drawText(args);
      }
    },

    stroke: {
      type: "bool",
      default: false,
      set(args) {
        this.drawText(args);
      }
    },

    strokeColor: {
      type: "color",
      default: "#ffffff",
      set(args) {
        this.drawText(args);
      }
    }
  },

  init({ canvas: { width, height }, data, props }) {
    data.canvas = new OffscreenCanvas(width, height);
    data.context = data.canvas.getContext("2d");
    this.drawText({ props, data });
    return data;
  },

  resize({ canvas: { width, height }, props, data }) {
    data.canvas.width = width;
    data.canvas.height = height;
    this.drawText({ props, data });
    return data;
  },

  draw({ context, data }) {
    context.drawImage(data.canvas, 0, 0);
  },

  drawText({ props, data }) {
    const {
      size,
      text,
      strokeSize,
      font,
      weight,
      stroke,
      strokeColor,
      fillColor,
      fill
    } = props;

    const {
      canvas,
      canvas: { width, height },
      context
    } = data;

    if (fill) {
      context.fillStyle = fillColor;
    } else {
      context.fillStyle = "rgba(0,0,0,0)";
    }
    context.strokeStyle = strokeColor;
    context.lineWidth = strokeSize;
    context.clearRect(0, 0, width, height);

    CanvasTextWrapper(canvas, text, {
      font: `${weight} ${size}px ${font}`,
      verticalAlign: "middle",
      textAlign: "center",
      strokeText: stroke
    });
  }
};
