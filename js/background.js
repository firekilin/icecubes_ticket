import * as ndarray from '/node_modules/ndarray/ndarray.js';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    const reshapedTensor = ndarray.wrappedNDArrayCtor(request.data, [1, 1, request.height, request.width]);

    sendResponse(reshapedTensor);
  });