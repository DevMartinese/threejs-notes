import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/Addons.js'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// Cursor
const cursor = {
  x: 0,
  y: 0
}

// Sizes
const sizes = {
  width: 800,
  heigth: 600
}

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = - (event.clientY / sizes.heigth - 0.5)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth, 0.1, 100)
/*const aspectRatio = sizes.width / sizes.heigth
const camera = new THREE.OrthographicCamera(
  - 1 * aspectRatio,
  1 * aspectRatio,
  1,
  -1,
  0.1,
  100
)
camera.position.x = 2
camera.position.y = 2*/
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls.target.y = 1
//controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.heigth)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {

  //mesh.rotation.y = elapsedTime
  //const elapsedTime = clock.getElapsedTime()

  /*camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 3
  camera.lookAt(mesh.position)*/

  controls.update()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()