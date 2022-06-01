class StandarResponse {
  constructor({
    ReturnCode = 200,
    ReturnMsg = 'Respuesta Exitosa',
    ReturnData = null
  }) {
    this.ReturnCode = ReturnCode;
    this.ReturnMsg = ReturnMsg;
    this.ReturnData = ReturnData;
  } 
}

module.exports = StandarResponse;
