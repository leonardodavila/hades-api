const r = require('rethinkdb');

const defaultErrorTreatment = (err, reject) => {
  if (err) {
    console.log('Error ', err);
    reject(err);
  }
};

const listNetworks = function(dbConnection) {
  return new Promise(function(resolve, reject) {
    r.table('networks').run(dbConnection, function(err, cursor) {
      defaultErrorTreatment(err, reject);
      cursor.toArray(function(err, result) {
        defaultErrorTreatment(err, reject);
        resolve(result);
      });
    });
  });
};

const getNetwork = function(dbConnection, networkId) {
  return new Promise(function(resolve, reject) {
    r
      .table('networks')
      .get(networkId)
      .run(dbConnection, function(err, network) {
        defaultErrorTreatment(err, reject);
        resolve(network);
      });
  });
};

const createNetwork = function(dbConnection, network) {
  return new Promise(function(resolve, reject) {
    r
      .table('networks')
      .insert(network)
      .run(dbConnection, function(err, result) {
        defaultErrorTreatment(err, reject);

        if (result.inserted === 1) {
          resolve(result.generated_keys[0]);
        }

        resolve(result);
      });
  });
};

module.exports = {
  listNetworks: listNetworks,
  getNetwork: getNetwork,
  createNetwork: createNetwork
};
