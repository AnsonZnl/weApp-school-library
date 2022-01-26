// 封装uploadFile请求
module.exports = function uploadFile(url, filePath, data = {}, name = 'fileName', ) {
  const baseUrl = wx.getStorageSync('_apiUrl') || '';
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: `${baseUrl}${url}`,
      filePath: filePath,
      name: name,
      formData: data,
      header: {
        "content-type": "multipart/form-data"
      },
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    })
  })
}
