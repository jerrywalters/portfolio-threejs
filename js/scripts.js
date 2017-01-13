var container;
var camera, scene, renderer;

// declare objects that exist
var courage;
var stove;
var broom;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerheight / 2;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  // PerspectiveCamera( fov, aspect, near, far )
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 5000);
  camera.position.z = 50;

  // scene
  scene = new THREE.Scene();

  // ambient light "globall illuminates all objects in the scene equally" -- no shadows
  // AmbientLight( color, intensity )
  var ambient = new THREE.AmbientLight(0x101030);
  scene.add(ambient);

  // DirectionalLight( hex, intensity )
  var directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  // texture

  // handles and keeps track of loaded and pending data
  var manager = new THREE.LoadingManager();
  manager.onProgress = function(item, loaded, total) {
    console.log(item, loaded, total)
  };

  // Texture( image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy )
  var texture = new THREE.Texture();

  var onProgress = function(xhr) {
    if(xhr.lengthComputable) {
      var percentComplete = xhr.loaded/xhr.total*100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };

  var onError = function(xhr) {

  };

  var loader = new THREE.ImageLoader(manager);
  loader.load(
    '../textures/purple.jpg',
    // function when resource is added
    function(image) {
      // do stuff with it
      texture.image = image;
      texture.needsUpdate = true;
    }
  );

  // model

  var loader = new THREE.OBJLoader(manager);

  // load courage
  loader.load(
    // resource path
    '../objects/courage.obj',
    // pass the loaded data to the onLoad function - assumed to be object
    // do some other shit
    function(obj) {
      obj.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
          child.material.map = texture;
        }
      });
      // add object to scene
      obj.position.y = -7;
      obj.position.x = 4;
      scene.add(obj);

      courage = obj;
    },
    // function called when download progresses
    // in this case defined globally
    onProgress,
    // function called when download error
    // also defined globally
    onError
  );

  // load stove
  loader.load(
    // resource path
    '../objects/stove.obj',
    // pass the loaded data to the onLoad function - assumed to be object
    // do some other shit
    function(obj) {
      obj.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
          child.material.map = texture;
        }
      });
      // add object to scene
      obj.position.y = 1;
      obj.position.x = 4;
      obj.position.z = 43;
      scene.add(obj);

      stove = obj;
    },
    // function called when download progresses
    // in this case defined globally
    onProgress,
    // function called when download error
    // also defined globally
    onError
  );

  // load broom
  loader.load(
    // resource path
    '../objects/broom.obj',
    // pass the loaded data to the onLoad function - assumed to be object
    // do some other shit
    function(obj) {
      obj.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
          child.material.map = texture;
        }
      });
      // add object to scene
      obj.position.y = -2;
      obj.position.x = -1500;
      obj.position.z = -3500;
      scene.add(obj);

      broom = obj;
    },
    // function called when download progresses
    // in this case defined globally
    onProgress,
    // function called when download error
    // also defined globally
    onError
  );

  //
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //here do hover stuff
  // document.addEventListener('mousemove', onDocumentMouseMove, false);

  //
  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
  windowHalfX = window.innerWidth/2;
  windowHalfY = window.innerHeight/2;

  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

// function onDocumentMouseMove(e) {
//   mouseX = (e.clientX - windowHalfX) / 2;
//   mouseY = (e.clientY - windowHalfY) / 2;
// }

//

function animate() {
  // from WebGL, this works like setInterval but stops running when you switch tabs!
  requestAnimationFrame(animate);
  if(window.courageAnimating === true){
    courage.rotation.x += 2 * Math.PI / 180;
    courage.rotation.y += 2 * Math.PI / 180;
  } else if(window.broomAnimating === true) {
    broom.rotation.x += 1 * Math.PI / 180;
    broom.rotation.y += 3 * Math.PI / 180;
  } else if(window.stoveAnimating === true) {
    stove.rotation.y += 2 * Math.PI / 180;
  }
  render();
}



function render() {
  // camera.position.x += (mouseX - camera.position.x) * .05;
  // camera.position.y += (mouseY - camera.position.y) * .05;
  //
  // camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
