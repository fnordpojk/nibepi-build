# nibepi-build

Builds the NibePi image for Raspberry Pi: Raspberry Pi OS Lite (64-bit) with
NibePi installed natively, ready to connect to a NIBE heat pump over the serial
port on GPIO 14/15.

Supported boards: Raspberry Pi Zero 2 W, 3, 4 and 5.

## What the image contains

- Raspberry Pi OS Lite (64-bit), Debian Trixie
- Node.js 24 from NodeSource, updated through `apt`
- [nibepi-flow](https://github.com/fnordpojk/nibepi-flow) in
  `/opt/nibepi/data/nibepi-flow`, Node-RED's directory. Its dependencies bring
  the Node-RED version the release was made for, and
  [node-red-contrib-nibepi](https://github.com/fnordpojk/node-red-contrib-nibepi)
  and [nibepi-backend](https://github.com/fnordpojk/nibepi-backend) at the same
  release
- a `nibepi` service, running as the `nibepi` user, which may only run
  `reboot` and `halt` as root (the dashboard's restart and shutdown buttons)
- the serial port on GPIO 14/15 enabled for the pump, with Bluetooth turned
  off on the Zero 2 W, Pi 3 and Pi 4, and no login console on that port
- the host name `nibepi`
- a password on the Node-RED editor, made on the first boot and different on
  every Pi

NibePi keeps its settings, graphs and VV-AI profile in `/etc/nibepi`.

## Installing

Write the image to an SD card with Raspberry Pi Imager, then start the Pi.
NibePi's dashboard is at `http://nibepi.local:1880/ui`, or at the Pi's
address if your network does not resolve `.local` names.

## The Node-RED editor

NibePi does not need the editor, but it is at `http://nibepi.local:1880`. Log
in as `admin` with the password from the Pi:

```sh
sudo cat /etc/nibepi-node-red/editor-password
```

For a new password, run `sudo nibepi-editor-password` and then
`sudo systemctl restart nibepi`. The dashboard has no login.

## Updating

```sh
sudo nibepi-update           # to the newest release
sudo nibepi-update v2.0.3    # to a given release
```

A release replaces `flows.json`. If it was changed in the Node-RED editor, the
changed file is copied to `/opt/nibepi/backup` first.

Node.js and the operating system update with `sudo apt update && sudo apt upgrade`.

## Building

The image is built by the **Image** workflow in GitHub Actions, run by hand
with the NibePi version to install. It uses [pimod](https://github.com/Nature40/pimod)
to apply `nibepi.Pifile` to the Raspberry Pi OS image and leaves the result as
a draft release.

## License

MIT
