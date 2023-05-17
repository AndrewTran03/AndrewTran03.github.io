import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

const controls = new OrbitControls(camera, renderer.domElement);
const loader = new GLTFLoader();

// console.log(scene);
// console.log(camera);
// console.log(renderer);

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.MeshBasicMaterial({  
        map: new THREE.TextureLoader().load("./MapOfEarth.jpg")
    })
);
// console.log(sphere);
scene.add(sphere);
camera.position.z = 15;

const group = new THREE.Group();
group.add(sphere);
scene.add(group);

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

const starVertices = [];
for (let i = 0; i < 100000; i++)
{
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 3000;
    starVertices.push(x, y, z);
    starVertices.push(x, y, -z);
}
starGeometry.setAttribute("position", 
    new THREE.Float32BufferAttribute(
        starVertices, 3)
);
const stars = new THREE.Points(starGeometry, starMaterial);
// console.log(stars);
scene.add(stars);

const mouse = {
    x: undefined,
    y: undefined
};
addEventListener("mousemove", () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / innerHeight) * 2 + 1;
    // console.log(mouse);
});

function animate()
{
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.001;
    group.rotation.y = mouse.x;
}
animate();
