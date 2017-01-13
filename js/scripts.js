var container;
var camera, scene, renderer;
var loadedObj;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerheight / 2;

init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);

  // PerspectiveCamera( fov, aspect, near, far )
  camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 1000);
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
      obj.position.y = 0;
      obj.position.x = 0;
      scene.add(obj);

      loadedObj = obj;
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
  if(window.isAnimating === true){
    loadedObj.rotation.x += 2 * Math.PI / 180;
    loadedObj.rotation.y += 2 * Math.PI / 180;
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



// Rotating cube
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
//
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);
//
// camera.position.z = 5;
//
// var render = function() {
//   requestAnimationFrame(render);
//
//   cube.rotation.x += 0.1;
//   cube.rotation.y += 0.1;
//
//   renderer.render(scene, camera);
// }
// render();


//test1
// var scene, camera, renderer;
// var geometry, material, mesh;
//
// init();
// animate();
//
// function init() {
//
//     scene = new THREE.Scene();
//
//     camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
//     camera.position.z = 1000;
//
//     geometry = new THREE.BoxGeometry( 200, 200, 200 );
//     material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
//
//     mesh = new THREE.Mesh( geometry, material );
//     scene.add( mesh );
//
//     renderer = new THREE.WebGLRenderer();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//
//     document.body.appendChild( renderer.domElement );
//
// }
//
// function animate() {
//
//     requestAnimationFrame( animate );
//
//     mesh.rotation.x += 0.01;
//     mesh.rotation.y += 0.02;
//
//     renderer.render( scene, camera );
//
// }
