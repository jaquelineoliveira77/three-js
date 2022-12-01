var scene;
var camera;
var renderer;
var cube;
var mesh;
var aproximar = false;
var afastar = false;
var jump=false;
var raycaster;
var forca=0;
var init = function () {

  scene = new THREE.Scene();
 
  camera = new THREE.PerspectiveCamera(250, window.innerWidth / window.innerHeight, 0.10, 5);

  renderer = new THREE.WebGLRenderer();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
 
  document.body.appendChild(renderer.domElement);
 
 cube= createACube();
 cube.position.x=-4.5
 cube.position.y=4.5
 scene.add(cube);

 champ = bonequinho();
 champ.position.y = 4.2;
 champ.position.z = 0.5;
 scene.add(champ);

  floor = createFloor();
  floor.position.y = 6
  scene.add(floor)

  
  
  luz = luzAmbiente();
  scene.add(luz);
  
  luzCubo = luzCubo();
  scene.add(luzCubo);
  
  camera.position.z = 5;
  raycaster = new THREE.Raycaster();
  
  this.render();
  

};

var render = function () {
   processar();
            

  requestAnimationFrame(render);

  this.animateCube();

  renderer.render(scene, camera);
};


// trocar por classe
var createACube = function () {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({color:"gray"});
  cube = new THREE.Mesh(geometry, material);
  return cube;
};



var createFloor = function () {
  const geometry = new THREE.BoxGeometry( 20, 2,1 );
  const material = new THREE.MeshLambertMaterial( {color: 'gray', side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material);
  return plane;
};


const bonequinho = function(){
  const geometry = new THREE.SphereGeometry(0.5,32,16 );
  const material = new THREE.MeshBasicMaterial( {color: 'orange'});
  const plane = new THREE.Mesh( geometry, material);
  return plane;
}


var backgroundImage = function () {
  // Image ---------------------------

  // Create a texture loader so we can load our image file
  var loader = new THREE.TextureLoader();

  // Load an image file into a custom material
  var material = new THREE.MeshLambertMaterial({
      map: loader.load("texture\floor.jpg")
  });

  // create a plane geometry for the image with a width of 10
  // and a height that preserves the image's aspect ratio
  var geometry = new THREE.PlaneGeometry(10,10*.75);

  // combine our image geometry and material into a mesh
  mesh = new THREE.Mesh(geometry, material);

  // set the position of the image mesh in the x,y,z dimensions
  mesh.position.set(0, 0, 0)


  // add the image to the scene
  return mesh;
  // Image ---------------------------
}

var luzAmbiente = function () {
    var luz = new THREE.AmbientLight(0xFFFFFF, .4);
    return luz;
}

var luzCubo = function () {
    var luzPonto = new THREE.PointLight(0x222222, 10);
    luzPonto.position.set(1,2,3);
    return luzPonto;
}


var animateCube = function () {
    // cube.rotation.x += 0.05;
    // cube.rotation.y += 0.05;
    // cube2.rotation.x += 0.05;
    // cube.rotation.z = 0.5;
    // cube.rotation.y = 1;    
};

function processar (){
     
    var dir = cube.position.clone();
        dir.sub(champ.position);
        dir.normalize();

      raycaster.set(champ.position,dir);
      var intersecta = raycaster.intersectObjects(scene.children);

      var dist =  Math.POSITIVE_INFINITY;
      if(intersecta.length > 0){ 
        dist = intersecta[0].distance;

      }
        if (aproximar){
            console.log("teste1")
            if( dist > 0.5+0.1){
                champ.position.x-=0.1;
            } else {
                champ.position.x-=(dist - 0.25);

            }
        } 
            if ( afastar ){
                champ.position.x +=0.1;

            }
            
}


   
        
    

document.onkeydown = function(evt) {
  if (evt.keyCode == 38){
    console.log("teste")
      aproximar = true;
  }
  
  if (evt.keyCode == 40){
      afastar = true;
  }
  if(evt.keyCode ==32){
    forca+=0.5;
    console.log("jump")
    champ.position.y=Math.sin(this.forca) + 0; 
    
    jump = false;
}
}

document.onkeyup = function(evt) {
  if (evt.keyCode == 38){
      aproximar = false;

  }
  
  if (evt.keyCode == 40){
      afastar = false;
  }
  if(evt.keyCode ==32){
    console.log("jump")
    champ.position.y=4.2;
    jump = false;
}
  
}


window.onload = this.init;