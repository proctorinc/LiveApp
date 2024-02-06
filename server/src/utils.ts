var _generatedUIDs: Map<string, boolean> = new Map();
export function generateRoomId() {
  while (true) {
    var uid = (
      "0000" + ((Math.random() * Math.pow(36, 4)) | 0).toString(36)
    ).slice(-4);
    if (!_generatedUIDs.hasOwnProperty(uid)) {
      _generatedUIDs.set(uid, true);
      return uid;
    }
  }
}
