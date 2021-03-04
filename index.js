// Setup BabylonJS in the usual way
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true
});

const scene = new BABYLON.Scene(engine);
const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

// Setup a Zappar camera instead of one of Babylon's cameras
const camera = new ZapparBabylon.Camera(scene);

// Request the necessary permission from the user
ZapparBabylon.permissionRequestUI().then((granted) => {
    if (granted) camera.start();
    else ZapparBabylon.permissionDeniedUI();
});


const imageTracker = new ZapparBabylon.ImageTrackerLoader().load("./example-tracking-image.zpt");
const trackerTransformNode = new ZapparBabylon.ImageAnchorTransformNode(camera, imageTracker);

// Add some content to the image tracker
const box = BABYLON.Mesh.CreateBox('box', 1, scene, false, BABYLON.Mesh.DOUBLESIDE)
box.parent = trackerTransformNode;


window.addEventListener('resize', () => {
    engine.resize();
});

// Set up our render loop
engine.runRenderLoop(() => {
    camera.updateFrame();
    scene.render();
});
