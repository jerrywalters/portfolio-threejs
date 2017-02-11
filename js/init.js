function init() {
  container = document.getElementById('container');

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

  // load stove
  loader.load(
    // resource path
    '../objects/stove.obj',
    // pass the loaded data to the onLoad function - assumed to be object
    // do some other shit
    function(obj) {
      obj.traverse(function(child) {
        if(child instanceof THREE.Mesh) {
        }
      });
      // add object to scene
      obj.position.y = 1.2;
      obj.position.x = 3;
      obj.position.z = 43;
      obj.rotation.y += 20 * Math.PI / 180;
      obj.rotation.x += 30 * Math.PI / 180;
      models.push(obj);
      scene.add(obj);

      stove = obj;
      setUpTween(stove);
    },
    // function called when download progresses
    // in this case defined globally
    onProgress,
    // function called when download error
    // also defined globally
    onError
  );

  var userOpts	= {
    range		: .035,
    duration	: 2500,
    delay		: 200,
    easing		: 'Elastic.EaseInOut'
  };

function setUpTween(object) {
  var update = function(){
    object.position.x = current.x;
    object.position.y = current.y;
    console.log('updating!');
  }
  // var position = { x : 3, y: 1.2 };
  // var target = { x: -1, y: -2 };
  var current	= { x: -userOpts.range, y: -userOpts.range };

  TWEEN.removeAll();

  var tweenTo = new TWEEN.Tween(current)
    .to({x: +userOpts.range, y: +userOpts.range}, 1700)
    .delay(10)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(update);

  var tweenBack = new TWEEN.Tween(current)
    .to({x: -userOpts.range, y: -userOpts.range}, 1700)
    .delay(10)
    .easing(TWEEN.Easing.Sinusoidal.InOut)
    .onUpdate(update);

    tweenTo.chain(tweenBack);
    tweenBack.chain(tweenTo);
    tweenTo.start();

  }

  // draw heart 
  var heartShape = new THREE.Shape();

  heartShape.moveTo( 25, 25 );
  heartShape.bezierCurveTo( 25, 25, 20, 0, 0, 0 );
  heartShape.bezierCurveTo( 30, 0, 30, 35,30,35 );
  heartShape.bezierCurveTo( 30, 55, 10, 77, 25, 95 );
  heartShape.bezierCurveTo( 60, 77, 80, 55, 80, 35 );
  heartShape.bezierCurveTo( 80, 35, 80, 0, 50, 0 );
  heartShape.bezierCurveTo( 35, 0, 25, 25, 25, 25 );

  var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

  var heartGeometry = new THREE.ExtrudeGeometry( heartShape, extrudeSettings );

  var heart = new THREE.Mesh( heartGeometry, new THREE.MeshPhongMaterial() );
  scene.add(heart);

  // loader.load(
  //   // resource path
  //   '../objects/raspberrypi.obj',
  //   // pass the loaded data to the onLoad function - assumed to be object
  //   // do some other shit
  //   function(obj) {
  //     obj.traverse(function(child) {
  //       if(child instanceof THREE.Mesh) {
  //       }
  //     });
  //     // add object to scene
  //     obj.position.y = 0;
  //     obj.position.x = 0;
  //     obj.position.z = 48;
  //     models.push(obj);
  //     scene.add(obj);
  //     console.log('loaded up ras', stove);
  //   },
  //   // function called when download progresses
  //   // in this case defined globally
  //   onProgress,
  //   // function called when download error
  //   // also defined globally
  //   onError
  // );



  // load broom
  // loader.load(
  //   // resource path
  //   '../objects/broom.obj',
  //   // pass the loaded data to the onLoad function - assumed to be object
  //   // do some other shit
  //   function(obj) {
  //     obj.traverse(function(child) {
  //       if(child instanceof THREE.Mesh) {
  //         child.material.map = texture;
  //       }
  //     });
  //     // add object to scene
  //     obj.position.y = -2;
  //     obj.position.x = -1500;
  //     obj.position.z = -3500;
  //     models.push(obj);
  //     scene.add(obj);

  //     broom = obj;
  //   },
  //   // function called when download progresses
  //   // in this case defined globally
  //   onProgress,
  //   // function called when download error
  //   // also defined globally
  //   onError
  // );

  // load courage
  // loader.load(
  //   // resource path
  //   '../objects/courage.obj',
  //   // pass the loaded data to the onLoad function - assumed to be object
  //   // do some other shit
  //   function(obj) {
  //     obj.traverse(function(child) {
  //       if(child instanceof THREE.Mesh) {
  //         child.material.map = texture;
  //       }
  //     });
  //     // add object to scene
  //     obj.position.y = -8;
  //     obj.position.x = 0;
  //     models.push(obj);
  //     scene.add(obj);

  //     courage = obj;
  //   },
  //   // function called when download progresses
  //   // in this case defined globally
  //   onProgress,
  //   // function called when download error
  //   // also defined globally
  //   onError
  // );

  // load sthugh
  // loader.load(
  //   // resource path
  //   '../objects/sthugh.obj',
  //   // pass the loaded data to the onLoad function - assumed to be object
  //   // do some other shit
  //   function(obj) {
  //     obj.traverse(function(child) {
  //       // if(child instanceof THREE.Mesh) {
  //       //   child.material.map = texture;
  //       // }
  //     });
  //     // add object to scene
  //     obj.position.y = -2;
  //     obj.position.x = 0;
  //     obj.position.z = 40;
  //     models.push(obj);
  //     scene.add(obj);
  //
  //     sthugh = obj;
  //   },
  //   // function called when download progresses
  //   // in this case defined globally
  //   onProgress,
  //   // function called when download error
  //   // also defined globally
  //   onError
  // );


  //
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor (0xccffee, 1);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', onWindowResize, false);

}
