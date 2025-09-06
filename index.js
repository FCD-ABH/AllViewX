import { registerPlugin } from 'enmity/managers/plugins';

export default registerPlugin({
  name: "AllViewX",
  version: "1.0.0",
  description: "Test plugin",
  authors: ["Elder"],

  onStart() {
    console.log("AllViewX started");
  },

  onStop() {
    console.log("AllViewX stopped");
  }
});
