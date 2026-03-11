import XtxImagePreview from "./ImagePreview.vue";
import XtxSku from "./XtxSku/index.vue";

export const componentPlugin = {
  install(app) {
    app.component("XtxImagePreview", XtxImagePreview);
    app.component("XtxSku", XtxSku);
  },
};
