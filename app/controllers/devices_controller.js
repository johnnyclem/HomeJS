load('application');

before(loadDevice, {
    only: ['show', 'edit', 'update', 'destroy']
    });

action('new', function () {
    this.title = 'New device';
    this.device = new Device;
    render();
});

action(function create() {
    Device.create(req.body.Device, function (err, device) {
        if (err) {
            flash('error', 'Device can not be created');
            render('new', {
                device: device,
                title: 'New device'
            });
        } else {
            flash('info', 'Device created');
            redirect(path_to.devices);
        }
    });
});

action(function index() {
    this.title = 'Devices index';
    this.device = new Device;
    Device.all(function (err, devices) {
        switch(params.format) {
            case "json":
                send(devices);
                break;
            default:
                render({
                    devices: devices
                });
        }
    });
});

action(function show() {
    this.title = 'Device show';
    switch(params.format) {
        case "json":
            send(this.device);
            break;
        default:
            render();
    }
});

action(function edit() {
    this.title = 'Device edit';
    switch(params.format) {
        case "json":
            send(this.device);
            break;
        default:
            render();
    }
});

action(function update() {
    this.device.updateAttributes(body.Device, function (err) {
        if (!err) {
            flash('info', 'Device updated');
            redirect(path_to.device(this.device));
        } else {
            flash('error', 'Device can not be updated');
            this.title = 'Edit device details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.device.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy device');
        } else {
            flash('info', 'Device successfully removed');
        }
        send("'" + path_to.devices + "'");
    });
});

function loadDevice() {
    Device.find(params.id, function (err, device) {
        if (err || !device) {
            redirect(path_to.devices);
        } else {
            this.device = device;
            next();
        }
    }.bind(this));
}
