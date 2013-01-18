exports.routes = function (map) {
    map.resources('devices');
    map.root('devices#index');
};