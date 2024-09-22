function init() {
  let rot = 0;
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(".stage"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();

  starNight();
  function starNight() {
    const geometry = new THREE.Geometry();

    for (let i = 0; i < 1000; i++) {
      const star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(3000);
      star.y = THREE.Math.randFloatSpread(3000);
      star.z = THREE.Math.randFloatSpread(3000);

      geometry.vertices.push(star);
    }

    const material = new THREE.PointsMaterial({
      size: 10,
      color: 0xffffff,
    });
    const star = new THREE.Points(geometry, material);
    scene.add(star);
  }

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
  );

  const geometry = new THREE.SphereGeometry(100, 32, 32);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderScene();

  function renderScene() {
    rot += 0.5;
    const radian = (rot * Math.PI) / 180;

    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }
}

window.addEventListener("load", init);
