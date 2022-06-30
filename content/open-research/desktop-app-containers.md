---
title: "Desktop Docker Containers"
date: 2022-01-13 19:00:00
draft: false
author: "Arne Tarara"
---

Problems with Chrome in COntainer:
- Might need --priviledged on Chrome. 
- needs special starting parameters with sandboxing

General way to make Desktop apps in containers:
- X11 Binding is way to go, even on wayland, as with XWayland a campatibility layer is in place by default. 
	+ Here jsut directory binding is needed on /tmp/.X11

## Future info for Wayland
Wayland directly is way more complicated than just mounting the X11 socket into the container:

```bash
docker run -e XDG_RUNTIME_DIR=/tmp \
           -e WAYLAND_DISPLAY=$WAYLAND_DISPLAY \
           -e QT_QPA_PLATFORM=wayland \
           -e GDK_BACKEND=wayland \
           -e CLUTTER_BACKEND=wayland \
           -e DISPLAY=:0 \
           --net=host \
           -v $XDG_RUNTIME_DIR/$WAYLAND_DISPLAY:/tmp/$WAYLAND_DISPLAY  \
           --user=$(id -u):$(id -g) \
           imagename
```

User has to be mapped and many variables have to be set.

Here is a good Stackoverflow posts, that mentions that in order to use the XWayland Compositor an xhost directive must be set to the 
current user and its ID must be mapped to the contaienr:

https://unix.stackexchange.com/questions/330366/how-can-i-run-a-graphical-application-in-a-container-under-wayland

For my example it just worked on Wayland by doing: docker run -ti -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix some:ubuntu xclock


## Special info
- QT may need special handling if mapped
- --ipc=host or --host=ipc must be done to map shared memory inside of the container. Otherwise graphic
glitches might occur
