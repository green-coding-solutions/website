---
title: "NOP Linux"
date: 2023-06-26
draft: false
author: "Didi Hoffmann"
authorlink: "https://www.linkedin.com/in/dietgerhoffmann/"
socialmedia_preview: "/img/blog/social/nop-linux.webp"

---

At Green Coding Solutions (GCS), one goal is to enable reproducible runs on our cluster. An important step towards accurate measurements was the creation of NOP Linux, our custom Linux distro that disables as many background processes as possible to avoid interruptions during measurements. Another crucial step was ensuring the reliable operation of the [PowerSpy2](https://docs.green-coding.io/docs/measuring/metric-providers/psu-energy-ac-powerspy2/), so we could measure the entire power consumption.

We wanted to create a cluster that allowed users to select the server on which they'd like to run the benchmark. Initially, we aimed for full automation and looked at the excellent tool from Canonical, [MAAS](https://maas.io/). As we use Ubuntu as our reference system, this seemed to be the logical choice. Although the tool was impressive, it required a daemon running on the machine, which created multiple interruptions during our measurements. This led us to reevaluate our tooling, and we decided to try a simpler approach using PXE. While there is a great description [1], and the general flow worked very well, we invested a significant amount of time and effort in configuring the machines correctly. Getting the entire installation flow working with reboots, different configurations like PowerSpy, and the multitude of different servers we wanted to use presented a considerable overhead. Additionally, we have our machines distributed across various data centers, and we needed to set up a complex networking layer for the DHCP discovery to work. While this was a scalable solution, it required substantial overhead that had to be maintained. Moreover, our tool develops quite rapidly, so we would have to keep updating the installation process. As a small company, this was not feasible in our scenario. Consequently, we decided to sacrifice scalability in favor of simplicity. In the meantime, we had built a complex test setup with various servers and a complicated setup that we could now disassemble. The main lesson learned for the future is to start with the simplest solution that solves the problem and continually reevaluate your assumptions and needs.

We are aware that there are a multitude of configuration systems out there that don't require a client running on the machine to be configured and that automate some of the tasks we will now do manually. But we decided to keep it very simple for now and not invest more time into another solution.

At Green Coding Solutions, we are committed to not only creating efficient and reproducible programming solutions but also sharing our findings and tools with the wider community. We firmly believe in the principles of open-source, the power of shared knowledge, and the benefits of collaborative development. Our aim is to create tools and systems that can be utilized by anyone, without the restrictions of proprietary licenses. We don't just want to make our solutions better - we want to make programming better, for everyone. One of the exciting initiatives that align with our philosophy is the Blue Angel for Software. We support this cause and believe that our tools and systems should be made available for such uses. By making our developments publicly available, we hope to contribute to the broader objective of creating software that is efficient, effective, and transparent.

**The system we are using now**

As previously mentioned, the current system will not scale to accommodate thousands of machines, but it will suffice for a considerable amount of time in our situation.

> The files shown in this article might already be outdated when you read it as we will not update the article!
> For a detailed discussion please check out our documentation under [https://docs.green-coding.io/](https://docs.green-coding.io/)

We have now opted for quite a simple solution. You will need a server that exposes the database externally and all results will be written to this server. We then have a `client.py` script that runs on every server that periodically queries the server for jobs and if so executes the measurement undisturbed. After a job is finished the client does some cleanup tasks and checks if there is an update for the GMT and also for the operating system. It then retries to get a job till there are no more jobs left on which the client sleeps for 5 minutes and retries. On every wake up we send a message to the server that the client is up and functional. So we can check server side that all clients are up and working.

To create your own GCS cluster, you can follow these steps:

## 1) Install Ubuntu

These configurations are testes with Ubuntu 22.04 LTS, but newer versions should also work. Older versions are discouraged.

Use this cloud config file to install your client machine:

```yml
#cloud-config
autoinstall:
  apt:
    disable_components: []
    geoip: true
    preserve_sources_list: false
    primary:
    - arches:
      - amd64
      - i386
      uri: http://de.archive.ubuntu.com/ubuntu
    - arches:
      - default
      uri: http://ports.ubuntu.com/ubuntu-ports
  drivers:
    install: false
  identity:
    hostname: gc
    password: $6$exDY1mhS4KUYCE/2$zmn9ToZwTKLhCw.b4/b.ZRTIZM30JZ4QrOQ2aOXJ8yk96xpcCof0kxKwuX1kqLG/ygbJ1f8wxED22bTL4F46P0
    username: ubuntu
EOF
touch meta-data
    realname: gc
    username: gc
  kernel:
    package: linux-generic
  keyboard:
    layout: us
    toggle: null
    variant: ''
  locale: en_US.UTF-8
  network:
    ethernets:
      enp1s0:
        dhcp4: true
    version: 2
  source:
    id: ubuntu-server-minimal
    search_drivers: true
  ssh:
    allow-pw: true
    authorized-keys: []
    install-server: true
  storage:
    layout:
      name: direct
    match:
     ssd: yes
  updates: security
  version: 1
  shutdown: poweroff
```

 You can use the descriptions how to create a custom iso [Using another volume to provide the autoinstall config
](https://ubuntu.com/server/docs/install/autoinstall-quickstart). We then put the iso on a usb stick and boot the machine by hand. As we have physical access this is ok for now. In this example the password is ubuntu. Obviously change this in your case. Once the install has finished you can pull the usb stick and reboot.

## 2) Install NOP Linux

You can now ssh into the machine and start configuring. This is mainly done by copy pasting scripts manually. As we don't install machines that often this is totally ok for now. Please note that most of these commands need to be run as root.

```bash
#!/bin/bash
set -euox pipefail

# this is a patch. Firefox seems to have a trick to remove read-only filesystem. We need to unmount that first
sudo umount /var/snap/firefox/common/host-hunspell || true

# remov all snaps first as they mount read only filesystem that only snap itself can find and unmount
for i in {1..3}; do # we do this three times as packages depends on one another
    for snap_pkg in $(snap list | awk 'NR>1 {print $1}'); do sudo snap remove --purge "$snap_pkg"; done
done


# Remove all the packages we don't need
sudo apt purge -y --purge snapd cloud-guest-utils cloud-init apport apport-symptoms cryptsetup cryptsetup-bin cryptsetup-initramfs curl gdisk lxd-installer mdadm open-iscsi snapd squashfs-tools ssh-import-id wget xauth unattended-upgrades update-notifier-common python3-update-manager unattended-upgrades needrestart command-not-found cron lxd-agent-loader modemmanager motd-news-config pastebinit packagekit
sudo systemctl daemon-reload
sudo apt autoremove -y --purge

# Get newest versions of everything
sudo apt update

sudo apt install psmisc -y

# on some versions killall might be missing. Please insta
sudo killall unattended-upgrade-shutdown

sudo apt upgrade -y

# These are packages that are installed through the update
sudo apt remove -y --purge networkd-dispatcher multipath-tools

sudo apt autoremove -y --purge

# These are user running services
systemctl --user disable --now snap.firmware-updater.firmware-notifier.timer
systemctl --user disable --now launchpadlib-cache-clean.timer
systemctl --user disable --now snap.snapd-desktop-integration.snapd-desktop-integration.service


# Disable services that might do things
sudo systemctl disable --now apt-daily-upgrade.timer
sudo systemctl disable --now apt-daily.timer
sudo systemctl disable --now dpkg-db-backup.timer
sudo systemctl disable --now e2scrub_all.timer
sudo systemctl disable --now fstrim.timer
sudo systemctl disable --now motd-news.timer
sudo systemctl disable --now e2scrub_reap.service
sudo systemctl disable --now tinyproxy.service
sudo systemctl disable --now  anacron.timer


# these following timers might be missing on newer ubuntus
sudo systemctl disable --now systemd-tmpfiles-clean.timer
sudo systemctl disable --now fwupd-refresh.timer
sudo systemctl disable --now logrotate.timer
sudo systemctl disable --now ua-timer.timer
sudo systemctl disable --now man-db.timer

sudo systemctl disable --now sysstat-collect.timer
sudo systemctl disable --now sysstat-summary.timer

sudo systemctl disable --now systemd-journal-flush.service
sudo systemctl disable --now systemd-timesyncd.service

sudo systemctl disable --now systemd-fsckd.socket
sudo systemctl disable --now systemd-initctl.socket

sudo systemctl disable --now cryptsetup.target

sudo systemctl disable --now power-profiles-daemon.service
sudo systemctl disable --now thermald.service
sudo systemctl disable --now anacron.service



# Packages to install for editing and later bluetooth. some of us prefer nano, some vim :)
sudo apt install -y vim nano bluez

# Setup networking
NET_NAME=$(sudo networkctl list "en*" --no-legend | cut -f 4 -d " ")
cat <<EOT | sudo tee /etc/systemd/network/en.network
[Match]
Name=$NET_NAME

[Network]
DHCP=ipv4
EOT

# Disable the kernel watchdogs
echo 0 | sudo tee /proc/sys/kernel/soft_watchdog
echo 0 | sudo tee /proc/sys/kernel/nmi_watchdog
echo 0 | sudo tee /proc/sys/kernel/watchdog
echo 0 | sudo tee /proc/sys/kernel/watchdog_thresh

# Removes the large header when logging in
sudo rm /etc/update-motd.d/*

# Remove all cron files. Cron shouldn't be running anyway but just to be safe
rm -R /etc/cron*

sudo apt autoremove -y --purge

# Desktop systems have NetworkManager. Here we want to disable the periodic check to Host: connectivity-check.ubuntu.com.
if [ -f "/etc/NetworkManager/NetworkManager.conf" ]; then
    echo "[connectivity]" >> /etc/NetworkManager/NetworkManager.conf
    echo "uri=" >> /etc/NetworkManager/NetworkManager.conf
    echo "interval=0" >> /etc/NetworkManager/NetworkManager.conf
else
    echo "NetworkManager configuration file seems not to exist. Probably non desktop system"
fi

# List all timers and services to validate we have nothing left
sudo systemctl list timers
systemctl --user list-timers

echo "All done. Please reboot system!"

```

Now you should have a machine that only runs a minimal amount of services and hence should not create a significant amount of interrupts that disturb measurements. We can measure this by starting NOP Linux in an virtual machine and checking CPU statistics.

## 3) Install the Green Coding Tool

Now we need the tooling installed on the client to start the measurements.

```bash
#!/bin/bash
set -euox pipefail

apt update
apt install -y make gcc python3 python3-pip libpq-dev uidmap git iproute2
apt remove -y docker docker-engine docker.io containerd runc
apt install -y ca-certificates curl gnupg lsb-release

su gc << 'EOF'
git clone https://github.com/green-coding-solutions/green-metrics-tool ~/green-metrics-tool
cd ~/green-metrics-tool
git submodule update --init
python3 -m pip install -r ~/green-metrics-tool/requirements.txt
python3 -m pip install -r ~/green-metrics-tool/metric_providers/psu/energy/ac/xgboost/machine/model/requirements.txt
EOF

mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

 echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

apt update

apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
systemctl disable --now docker.service docker.socket
apt install -y docker-ce-rootless-extras dbus-user-session

shutdown -r now

#
# You need to reboot here
#

systemctl disable --now docker.service docker.socket

su - gc -c "dockerd-rootless-setuptool.sh install"

cat <<EOT >> /home/gc/.bashrc
docker context use rootless
EOT

su - gc -c 'systemctl --user enable docker; loginctl enable-linger $(whoami)'

apt install -y lm-sensors libsensors-dev libglib2.0-0 libglib2.0-dev
sensors-detect --auto

# You only need these commands if you are planning to use the PowerSpy2.
pip install pyserial==3.5
apt install -y bluez
```

This might also change, please refer to the [GMT Documentation](https://docs.green-coding.io/docs/installation/installation-linux/).

If you want to use the PowerSpy2 device please follow the installation under https://docs.green-coding.io/docs/measuring/metric-providers/psu-energy-ac-powerspy2/

## 4) Configure the GMT

Now that you installed the GMT you need to configure it to run in client mode. You can run the install script with the following parameters to give you the first version of the config file. You will need to change the api/ metrics endpoint to the url of your server.

```bash
./install_linux.sh
```

It is important that you don't run the GMT server or database on the same machine as you are doing your benchmarks on, as this will create additional load and falsify your measurements.

Now please also edit the following points in the `config.yml`:

- modify the `postgresql` section so that the `host` points to your server. You will need to replace the `green-coding-postgres-container` value. This should be the same url as you specified when running the install script. Check that the password is correct.
- Enable and configure the metric providers that make sense for your client. See the [GMT documentation](https://docs.green-coding.io/docs/measuring/metric-providers/metric-providers-overview/) for more details
- Set the `machine_id` to the number you gave the client when adding it to the `machines` table on the server.

In this setup we only have one machine configured to send emails, the server. You can add email sending capabilities to any client if you want by adding the `smtp` data in the configuration. Don't forget to also set the admin values (`email` and `no_emails=False`) at the end of the file. Also you will need to set up a cron job for this. Please see the GMT documentation for details.

## 5) Add the cleanup script to the sudoers file

```bash
chmod a+x /home/gc/green-metrics-tool/tools/cluster/cleanup.sh
echo "ALL ALL=(ALL) NOPASSWD:/home/gc/green-metrics-tool/tools/cluster/cleanup.sh" | sudo tee /etc/sudoers.d/green_coding_cleanup
```

## 6) Start the client service

To make sure that the client is always running you can create a service that will start at boot and keep running.

Create a file under: `/etc/systemd/system/green-coding-client-service.service` with following content

```init
[Unit]
Description=The Green Metrics Client Service
After=network.target

[Service]
Type=simple
User=gc
Group=gc
WorkingDirectory=/home/gc/green-metrics-tool/
ExecStart=/usr/bin/python3 /home/gc/green-metrics-tool/tools/client.py
Restart=always
RestartSec=30s

[Install]
WantedBy=multi-user.target
```

- Reload the systemd configuration by running:

```bash
sudo systemctl daemon-reload
```

- Start your new service:

```bash
sudo systemctl start green-coding-client-service
```

- Enable the service to run at boot:

```bash
sudo systemctl enable green-coding-client-service
```

- To check the status of your service, run:

```bash
sudo systemctl status green-coding-client-service
```

You should now see the client reporting it's status on the server.

[1] [Setup PXE Boot Server using cloud-init for Ubuntu 20.04](https://www.golinuxcloud.com/pxe-boot-server-cloud-init-ubuntu-20-04/)