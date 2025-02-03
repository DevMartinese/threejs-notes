import * as THREE from 'three'
import gsap from 'gsap'

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

// Sizes
const sizes = {
  width: 800,
  heigth: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.heigth)
camera.position.x = 2
camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas
})
renderer.setSize(sizes.width, sizes.heigth)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {

  const elapsedTime = clock.getElapsedTime()

  mesh.rotation.y = Math.sin(elapsedTime)

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}

tick()